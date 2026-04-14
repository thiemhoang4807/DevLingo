import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import logger from "../utils/logger";
import fs from "fs";
import path from "path";

// Cấu hình MulterRequest nếu có dùng ở file này
interface MulterRequest extends Request { file?: any; }

const lessonRepo = AppDataSource.getRepository(Lesson);

// 🚀 API LẤY DANH SÁCH BÀI HỌC CÓ SEARCH + FILTER + PAGINATION
export const getLessons = async (req: Request, res: Response) => {
  try {
    const { search, difficulty, page = 1, limit = 10 } = req.query;
    const query = lessonRepo.createQueryBuilder("lesson");

    // Quy tắc 1: User thường chỉ thấy bài đã Publish
    query.where("lesson.isPublished = :isPublished", { isPublished: true });

    // Quy tắc 2: Tìm kiếm theo tiêu đề
    if (search) {
      query.andWhere("lesson.title LIKE :search", { search: `%${search}%` });
    }

    // Quy tắc 3: Lọc theo độ khó
    if (difficulty) {
      query.andWhere("lesson.difficulty = :difficulty", { difficulty });
    }

    // 🚀 BẮT BUỘC PHẢI PHÂN TRANG: Tránh sập RAM Server
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    query.skip((pageNumber - 1) * limitNumber).take(limitNumber);

    // Lấy data và đếm tổng số lượng
    const [lessons, total] = await query.getManyAndCount();

    // 🚀 Ghi log gọn gàng trên 1 dòng
    logger.info(`[USER] Fetched ${lessons.length} lessons | Query: ${JSON.stringify(req.query)}`);

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
    logger.error(`[USER] Error fetching lessons: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ... Các hàm handleCreateLesson, handleDeleteLesson sếp giữ nguyên như Sprint 2 nhé ...