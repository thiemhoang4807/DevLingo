import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import logger from "../utils/logger";

const lessonRepo = AppDataSource.getRepository(Lesson);

export const getAdminLessons = async (req: Request, res: Response) => {
  try {
    const { search, difficulty, isPublished, page = 1, limit = 10 } = req.query;
    const query = lessonRepo.createQueryBuilder("lesson");

    // Admin có quyền search theo tiêu đề
    if (search) {
      query.andWhere("lesson.title LIKE :search", { search: `%${search}%` });
    }

    // Lọc theo độ khó
    if (difficulty) {
      query.andWhere("lesson.difficulty = :difficulty", { difficulty });
    }

    // Admin lọc được cả trạng thái Published/Draft
    if (isPublished !== undefined) {
      query.andWhere("lesson.isPublished = :isPublished", { isPublished: isPublished === 'true' });
    }

    // 🚀 BẮT BUỘC PHẢI PHÂN TRANG
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    query.skip((pageNumber - 1) * limitNumber).take(limitNumber);

    const [lessons, total] = await query.getManyAndCount();

    // 🚀 Ghi log gọn gàng không bị rớt dòng để sau này trace bug cho dễ
    logger.info(`[ADMIN] Fetched ${lessons.length} lessons | Query: ${JSON.stringify(req.query)}`);

    return res.status(200).json({ 
      success: true, 
      data: lessons,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber)
      }
    });
  } catch (error: any) {
    logger.error(`[ADMIN] Error fetching lessons: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};