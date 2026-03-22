import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ProgressService } from "./progressService";

export class ProgressController {

  static async submitQuiz(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id; 
      // Nhận thêm độ khó và tổng số câu hỏi để tính XP theo đúng GDD
      const { lessonId, score, totalQuestions, difficulty = 'Easy' } = req.body;

      if (!lessonId || score === undefined || !totalQuestions) {
        return res.status(400).json({ success: false, message: "Missing lessonId, score, or totalQuestions" });
      }

      // TODO (Technical Debt): Chuyển sang nhận mảng answers và tự chấm điểm backend để chống cheat
      const result = await ProgressService.saveResult(userId, lessonId, score, totalQuestions, difficulty);

      return res.json({ success: true, message: "Quiz result and XP saved", data: result });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ success: false, message });
    }
  }

  static async getProgress(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const progress = await ProgressService.getMyProgress(userId);

      return res.json({ success: true, data: progress });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ success: false, message });
    }
  }
}