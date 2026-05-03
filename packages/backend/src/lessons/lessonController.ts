import { Request, Response } from "express";
import { LessonService } from "./lessonService";
import logger from "../utils/logger";

// Cấu hình để TypeScript không báo lỗi khi nhận file từ middleware upload
interface MulterRequest extends Request { file?: any; }

export class LessonController {
  
  // 1. Lấy danh sách 
  static async getLessons(req: Request, res: Response) {
    try {
      const { search, difficulty, page = 1, limit = 10 } = req.query;
      
      const data = await LessonService.getLessons(
        search as string,
        difficulty as string,
        Number(page),
        Number(limit)
      );
      
      logger.info(`[USER] Fetched ${data.lessons.length} lessons | Query: ${JSON.stringify(req.query)}`);

      return res.status(200).json({
        success: true,
        data: data.lessons,
        pagination: {
          total: data.total,
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages
        }
      });
    } catch (error: any) {
      logger.error(`[USER] Error fetching lessons: ${error.message}`);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 2. Lấy chi tiết (Đã bao gồm Terms và Questions)
  static async getLessonDetailById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await LessonService.getLessonDetailById(id);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }

  // 3. Tạo bài học mới (Có nhận ảnh tải lên)
  static async createLesson(req: MulterRequest, res: Response) {
    try {
      // Lấy đường dẫn ảnh nếu middleware upload có trả về file
      const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null;
      
      const data = await LessonService.createLesson(req.body, thumbnailUrl);

      logger.info(`[ADMIN] Created new lesson: ${data.id}`);
      return res.status(201).json({ 
        success: true, 
        message: "Lesson created successfully", 
        data 
      });
    } catch (error: any) {
      logger.error(`[ADMIN] Error creating lesson: ${error.message}`);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 4. Cập nhật bài học (Có xử lý thay ảnh mới)
  static async updateLesson(req: MulterRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const newThumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const data = await LessonService.updateLesson(id, req.body, newThumbnailUrl);

      logger.info(`[ADMIN] Updated lesson: ${data.id}`);
      return res.status(200).json({ 
        success: true, 
        message: "Lesson updated successfully", 
        data 
      });
    } catch (error: any) {
      logger.error(`[ADMIN] Error updating lesson: ${error.message}`);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 5. Xóa bài học (Xóa luôn ảnh trên ổ cứng)
  static async deleteLesson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await LessonService.deleteLesson(id);

      logger.info(`[ADMIN] Deleted lesson: ${id}`);
      return res.status(200).json({ success: true, message: data.message });
    } catch (error: any) {
      logger.error(`[ADMIN] Error deleting lesson: ${error.message}`);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 6. Thêm từ vựng vào bài học
  static async addTerm(req: Request, res: Response) {
    try {
      const lessonId = parseInt(req.params.id);
      const data = await LessonService.addTermToLesson(lessonId, req.body);
      
      return res.status(201).json({ success: true, message: "Đã thêm từ vựng", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 7. Thêm câu hỏi vào bài học
  static async addQuestion(req: Request, res: Response) {
    try {
      const lessonId = parseInt(req.params.id);
      const data = await LessonService.addQuestionToLesson(lessonId, req.body);
      
      return res.status(201).json({ success: true, message: "Đã thêm câu hỏi", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
