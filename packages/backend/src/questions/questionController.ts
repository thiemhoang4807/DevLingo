import { Request, Response } from "express";
import { QuestionService } from "./questionService";

export class QuestionController {
  
  static async getQuestionsByLesson(req: Request, res: Response) {
    try {
      const lessonId = parseInt(req.query.lessonId as string);
      if (isNaN(lessonId)) {
        return res.status(400).json({ success: false, message: "lessonId is required" });
      }
      const data = await QuestionService.getQuestionsByLessonId(lessonId);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await QuestionService.getQuestionById(id);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }

  static async updateQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const updateData = req.body; 

      const data = await QuestionService.updateQuestion(id, updateData);
      return res.status(200).json({ success: true, message: "Cập nhật thành công", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteQuestion(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await QuestionService.deleteQuestion(id);
      return res.status(200).json({ success: true, message: data.message });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
