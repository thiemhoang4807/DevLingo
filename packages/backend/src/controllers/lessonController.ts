import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import logger from "../utils/logger";
import fs from "fs";
import path from "path";

// Cấu hình MulterRequest để TypeScript không báo lỗi khi dùng req.file
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

// 🚀 API TẠO BÀI HỌC MỚI (Kèm upload thumbnail)
export const handleCreateLesson = async (req: MulterRequest, res: Response) => {
  try {
    const { title, description, difficulty, isPublished } = req.body;
    
    // Lấy đường dẫn file nếu có upload
    const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newLesson = lessonRepo.create({
      title,
      description,
      difficulty,
      isPublished: isPublished === 'true' || isPublished === true,
      thumbnailUrl, // Đã xóa order ở đây
    });

    await lessonRepo.save(newLesson);
    logger.info(`[ADMIN] Created new lesson: ${newLesson.id}`);

    return res.status(201).json({ success: true, data: newLesson });
  } catch (error: any) {
    logger.error(`[ADMIN] Error creating lesson: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 🚀 API CẬP NHẬT BÀI HỌC (Kèm xử lý thay ảnh mới)
export const handleUpdateLesson = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await lessonRepo.findOneBy({ id: parseInt(id) });

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    // Nếu người dùng upload ảnh mới, ta xóa ảnh cũ đi
    if (req.file) {
      if (lesson.thumbnailUrl) {
        const oldImagePath = path.join(__dirname, "..", lesson.thumbnailUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      lesson.thumbnailUrl = `/uploads/${req.file.filename}`;
    }

    // Cập nhật các field khác
    const { title, description, difficulty, isPublished } = req.body;
    if (title) lesson.title = title;
    if (description) lesson.description = description;
    if (difficulty) lesson.difficulty = difficulty;
    if (isPublished !== undefined) lesson.isPublished = isPublished === 'true' || isPublished === true;
    // Đã xóa dòng if (order) ở đây

    await lessonRepo.save(lesson);
    logger.info(`[ADMIN] Updated lesson: ${lesson.id}`);

    return res.status(200).json({ success: true, data: lesson });
  } catch (error: any) {
    logger.error(`[ADMIN] Error updating lesson: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// 🚀 API XÓA BÀI HỌC
export const handleDeleteLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await lessonRepo.findOneBy({ id: parseInt(id) });

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    // Xóa file ảnh vật lý trên ổ cứng nếu bài học đó có ảnh
    if (lesson.thumbnailUrl) {
      const imagePath = path.join(__dirname, "..", lesson.thumbnailUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await lessonRepo.remove(lesson);
    logger.info(`[ADMIN] Deleted lesson: ${id}`);

    return res.status(200).json({ success: true, message: "Lesson deleted successfully" });
  } catch (error: any) {
    logger.error(`[ADMIN] Error deleting lesson: ${error.message}`);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
