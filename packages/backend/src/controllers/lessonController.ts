import { Like } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import fs from "fs";
import path from "path";
import logger from "../utils/logger";

interface MulterRequest extends Request {
  file?: any;
}

const lessonRepo = AppDataSource.getRepository(Lesson);

export const handleCreateLesson = async (req: MulterRequest, res: Response) => {
  try {
    const { title, description, orderIndex, difficulty } = req.body;
    const file = req.file; 

    if (!title) {
      if (file) fs.unlinkSync(file.path); 
      return res.status(400).json({ success: false, message: "Title is required" });
    }
    
    const newLesson = lessonRepo.create({
      title,
      description,
      orderIndex: orderIndex ? Number(orderIndex) : null,
      isPublished: false,
      difficulty: difficulty || "easy",
      thumbnailUrl: file ? `/uploads/lessons/${file.filename}` : null, 
    }); 

    await lessonRepo.save(newLesson);

    logger.info(`[LESSON] Created: ${title} | ID: ${newLesson.id}`);

    return res.status(201).json({ success: true, message: "Lesson created successfully", data: newLesson });
  } catch (error: any) {
    if (req.file) fs.unlinkSync(req.file.path); 
    
    logger.error(`[LESSON] Create Failed: ${error.message}`);
    
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const handleDeleteLesson = async (req: Request, res: Response) => {
  try {
    const lessonId = Number(req.params.id);
    const lesson = await lessonRepo.findOneBy({ id: lessonId });

    if (!lesson) {
      logger.warn(`[LESSON] Delete Attempt Failed: Lesson ID ${lessonId} not found`);
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    if (lesson.thumbnailUrl) {
      const fullPath = path.join(process.cwd(), lesson.thumbnailUrl.startsWith('/') ? lesson.thumbnailUrl.substring(1) : lesson.thumbnailUrl);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    const lessonTitle = lesson.title;
    await lessonRepo.remove(lesson);

    logger.info(`[LESSON] Deleted: ${lessonTitle} | ID: ${lessonId}`);

    return res.json({ success: true, message: "Lesson deleted successfully" });
  } catch (error: any) {
    logger.error(`[LESSON] Delete Failed: ID ${req.params.id} | ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getLessons = async (req: Request, res: Response) => {
  try {
    console.log(">>> HIT CONTROLLER")
    const { search, difficulty, isPublished } = req.query;

    const query = lessonRepo.createQueryBuilder("lesson");

    if (search) {
      query.andWhere("lesson.title LIKE :search", { search: `%${search}%` });
    }

    if (difficulty) {
      query.andWhere("lesson.difficulty = :difficulty", { difficulty });
    }

    if (isPublished !== undefined) {
      query.andWhere("lesson.isPublished = :isPublished", { 
        isPublished: isPublished === "true" 
      });
    }

    query.orderBy("lesson.orderIndex", "ASC");

    const lessons = await query.getMany();

    logger.info(`[LESSON] Fetched ${lessons.length} lessons | Query: ${JSON.stringify(req.query)}`);

    return res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error: any) {
    logger.error(`[LESSON] Fetch Failed: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const handleUpdateLesson = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, orderIndex, difficulty, isPublished } = req.body;
    const file = req.file;

    const lesson = await lessonRepo.findOneBy({ id: Number(id) });
    if (!lesson) {
      if (file) fs.unlinkSync(file.path);
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    if (file && lesson.thumbnailUrl) {
      const oldPath = path.join(process.cwd(), lesson.thumbnailUrl.substring(1));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      lesson.thumbnailUrl = `/uploads/lessons/${file.filename}`;
    }

    lesson.title = title ?? lesson.title;
    lesson.description = description ?? lesson.description;
    lesson.difficulty = difficulty ?? lesson.difficulty;
    lesson.orderIndex = orderIndex ? Number(orderIndex) : lesson.orderIndex;
    lesson.isPublished = isPublished !== undefined ? isPublished === "true" : lesson.isPublished;

    await lessonRepo.save(lesson);
    logger.info(`[LESSON] Updated: ID ${id} - ${lesson.title}`);

    return res.json({ success: true, data: lesson });
  } catch (error: any) {
    if (req.file) fs.unlinkSync(req.file.path);
    logger.error(`[LESSON] Update Failed: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};