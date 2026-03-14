import { Request, Response } from "express";
import { LessonService } from "./lesson.service";

export class LessonController {

  static async getAllPublishedLessons(req: Request, res: Response) {
    try {
      const data = await LessonService.getAllPublishedLessons();
      
      return res.status(200).json({
        success: true,
        data
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async getLessonDetailById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await LessonService.getLessonDetailById(id);

      return res.status(200).json({
        success: true,
        data
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async createLesson(req: Request, res: Response) {
    try {
      const { title } = req.body;

      if (!title) {
        throw new Error("Title is required");
      }

      const data = await LessonService.createLesson(title);

      return res.status(201).json({
        success: true,
        message: "Lesson created successfully",
        data
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async updateLesson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { title, isPublished } = req.body;

      const data = await LessonService.updateLesson(id, { title, isPublished });

      return res.status(200).json({
        success: true,
        message: "Lesson updated successfully",
        data
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async deleteLesson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      
      const data = await LessonService.deleteLesson(id);

      return res.status(200).json({
        success: true,
        message: data.message
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async addTerm(req: Request, res: Response) {
    try {
      const lessonId = parseInt(req.params.id);
      const termData = req.body; 

      const data = await LessonService.addTermToLesson(lessonId, termData);
      
      return res.status(201).json({ success: true, message: "Đã thêm từ vựng", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async addQuestion(req: Request, res: Response) {
    try {
      const lessonId = parseInt(req.params.id);
      const questionData = req.body; 

      const data = await LessonService.addQuestionToLesson(lessonId, questionData);
      
      return res.status(201).json({ success: true, message: "Đã thêm câu hỏi", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}