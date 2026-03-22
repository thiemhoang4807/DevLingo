import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import fs from "fs";
import path from "path";

// 🚀 Khai báo interface đè lên Request mặc định để TypeScript nhận diện req.file
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

    return res.status(201).json({ success: true, message: "Lesson created successfully", data: newLesson });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path); 
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const handleDeleteLesson = async (req: Request, res: Response) => {
  try {
    const lessonId = Number(req.params.id);
    const lesson = await lessonRepo.findOneBy({ id: lessonId });

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    if (lesson.thumbnailUrl) {
      const fullPath = path.join(process.cwd(), lesson.thumbnailUrl.startsWith('/') ? lesson.thumbnailUrl.substring(1) : lesson.thumbnailUrl);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await lessonRepo.remove(lesson);
    return res.json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};