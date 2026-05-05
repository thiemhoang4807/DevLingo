import { Request, Response } from "express";
import { TermService } from "./termService";
// Nhớ import 2 cái này để thao tác trực tiếp với Database
import { AppDataSource } from "../db/dataSource"; 
import { Term } from "../entities/Term";         

export class TermController {
  
  // =========================================================
  // 🟢 2 HÀM MỚI BỔ SUNG ĐỂ LẤY DỮ LIỆU (GET) TỪ FRONTEND
  // =========================================================
  static async getTerms(req: Request, res: Response) {
    try {
      const { lessonId, search } = req.query;
      const termRepo = AppDataSource.getRepository(Term);
      
      const whereConditions: any = {};
      if (lessonId) {
        whereConditions.lessonId = Number(lessonId);
      }
      
      let terms;
      if (search && typeof search === 'string') {
        const { ILike } = require('typeorm');
        whereConditions.termName = ILike(`%${search}%`);
      }
      
      terms = await termRepo.find({ where: whereConditions });

      // Trả về đúng cấu trúc { data: [...] } mà React của bạn đang chờ
      return res.status(200).json({ success: true, data: terms });
    } catch (error: any) {
      console.error("❌ Lỗi getTerms:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getTermById(req: Request, res: Response) {
    try {
      const termRepo = AppDataSource.getRepository(Term);
      const term = await termRepo.findOneBy({ id: Number(req.params.id) });

      if (!term) {
        return res.status(404).json({ success: false, message: "Không tìm thấy từ vựng" });
      }

      return res.status(200).json({ success: true, data: term });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // =========================================================
  // 🔵 CÁC HÀM CŨ BẠN ĐÃ LÀM HOÀN HẢO
  // =========================================================
  static async createTerm(req: Request, res: Response) {
    try {
      const { termName, definition, lessonId, imageUrl } = req.body;

      if (!termName || !definition || !lessonId) {
        return res.status(400).json({ 
          success: false, 
          message: "Thiếu thông tin bắt buộc (termName, definition, lessonId)" 
        });
      }

      const termRepo = AppDataSource.getRepository(Term);

      const newTerm = termRepo.create({
        termName: termName,
        definition: definition,
        lessonId: lessonId,
        imageUrl: imageUrl 
      });

      await termRepo.save(newTerm);

      return res.status(201).json({ 
        success: true, 
        message: "Tạo từ vựng thành công", 
        data: newTerm 
      });

    } catch (error: any) {
      console.error("❌ Lỗi khi tạo Term:", error.message);
      return res.status(500).json({ 
        success: false, 
        message: error.message || "Lỗi server không xác định" 
      });
    }
  }

  static async updateTerm(req: Request, res: Response) {
    try {
      const data = await TermService.updateTerm(Number(req.params.id), req.body);
      return res.status(200).json({ success: true, message: "Term updated", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteTerm(req: Request, res: Response) {
    try {
      const data = await TermService.deleteTerm(Number(req.params.id));
      return res.status(200).json({ success: true, message: data.message });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
