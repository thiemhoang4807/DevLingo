import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import { Question } from "../entities/Question";

const lessonRepo = AppDataSource.getRepository(Lesson);
const questionRepo = AppDataSource.getRepository(Question);

export const adminController = {
  // ================= LESSON APIs =================
  getLessons: async (req: Request, res: Response): Promise<void> => {
    try {
      const lessons = await lessonRepo.find();
      res.json({ success: true, data: lessons });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  getLessonById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const lesson = await lessonRepo.findOneBy({ id: parseInt(id) });
      if (!lesson) {
        res.status(404).json({ success: false, message: "Lesson not found" });
        return;
      }
      res.json({ success: true, data: lesson });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  createLesson: async (req: Request, res: Response): Promise<void> => {
    try {
      const lesson = lessonRepo.create({ ...req.body, isPublished: false });
      await lessonRepo.save(lesson);
      res.status(201).json({ success: true, data: lesson });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  updateLesson: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await lessonRepo.update(id, req.body);
      const updated = await lessonRepo.findOneBy({ id: parseInt(id) });
      res.json({ success: true, data: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  deleteLesson: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await lessonRepo.delete(id);
      res.json({ success: true, message: "Lesson deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  // ================= QUESTION APIs =================
  getQuestions: async (req: Request, res: Response): Promise<void> => {
    try {
      const { lessonId } = req.query;
      // Nếu có truyền lessonId trên URL (?lessonId=1) thì lọc theo Lesson, không thì lấy hết
      const whereCondition = lessonId ? { lessonId: parseInt(lessonId as string) } : {};
      
      const questions = await questionRepo.find({ where: whereCondition });
      res.json({ success: true, data: questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  getQuestionById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const question = await questionRepo.findOneBy({ id: parseInt(id) });
      if (!question) {
        res.status(404).json({ success: false, message: "Question not found" });
        return;
      }
      res.json({ success: true, data: question });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  createQuestion: async (req: Request, res: Response): Promise<void> => {
    try {
      const { 
        lessonId, 
        termId, 
        questionText, 
        optionA, 
        optionB, 
        optionC, 
        optionD, 
        correctOption, 
        xpReward 
      } = req.body;
      
      const lesson = await lessonRepo.findOneBy({ id: parseInt(lessonId) });
      if (!lesson) {
        res.status(404).json({ success: false, message: "Lesson not found" });
        return;
      }

      const newQuestion = questionRepo.create({ 
        lessonId: parseInt(lessonId),
        termId: parseInt(termId),
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        xpReward: xpReward || 10 
      });
      
      await questionRepo.save(newQuestion);
      res.status(201).json({ success: true, data: newQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  updateQuestion: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      // TypeORM sẽ tự động map các trường truyền vào body để update (questionText, correctOption...)
      await questionRepo.update(id, req.body);
      const updated = await questionRepo.findOneBy({ id: parseInt(id) });
      res.json({ success: true, data: updated });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  deleteQuestion: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await questionRepo.delete(id);
      res.json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};