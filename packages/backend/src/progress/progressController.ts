import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ProgressService } from "./progressService";

export class ProgressController {

  static async submitQuiz(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id; // Lấy từ authMiddleware
      const { lessonId, score } = req.body;

      if (!lessonId || score === undefined) {
        return res.status(400).json({ success: false, message: "Missing lessonId or score" });
      }

      const result = await ProgressService.saveResult(userId, lessonId, score);

      return res.json({ 
        success: true, 
        message: "Quiz result saved and XP calculated", 
        data: result 
      });
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