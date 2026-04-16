import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import { Question } from "../entities/Question";
import { Contribution } from "../entities/Contribution";
import { Term } from "../entities/Term";
import logger from "../utils/logger"; // Giữ lại logger từ nhánh develop

const lessonRepo = AppDataSource.getRepository(Lesson);
const questionRepo = AppDataSource.getRepository(Question);
const contributionRepo = AppDataSource.getRepository(Contribution);
const termRepo = AppDataSource.getRepository(Term);

export const adminController = {
  // === LOGIC TỪ NHÁNH DEVELOP: Đã có phân trang, lọc và logger ===
  getLessons: async (req: Request, res: Response): Promise<void> => {
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

      res.status(200).json({ 
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
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  // === LOGIC TỪ NHÁNH FEATURE CỦA SẾP ===
  getQuestions: async (req: Request, res: Response): Promise<void> => {
    try {
      const { lessonId } = req.query;
      const whereCondition = lessonId ? { lessonId: parseInt(lessonId as string) } : {};

      const questions = await questionRepo.find({ where: whereCondition });
      res.json({ success: true, data: questions });
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
        xpReward,
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
        xpReward: xpReward || 10,
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
  },

  getContributions: async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.query;
      const whereCondition = status
        ? { status: String(status) as Contribution["status"] }
        : undefined;

      const contributions = await contributionRepo.find({
        where: whereCondition,
        relations: ["lesson", "contributor"],
        order: { createdAt: "DESC" },
      });

      res.json({ success: true, data: contributions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  approveContribution: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { reviewNote } = req.body;

      const contribution = await contributionRepo.findOneBy({ id: parseInt(id) });
      if (!contribution) {
        res.status(404).json({ success: false, message: "Contribution not found" });
        return;
      }

      if (contribution.status !== "pending") {
        res.status(400).json({ success: false, message: "Contribution has already been processed" });
        return;
      }

      const existingTerm = await termRepo.findOneBy({
        lessonId: contribution.lessonId,
        termName: contribution.termName,
      });

      if (existingTerm) {
        res.status(400).json({ success: false, message: "Term already exists in this lesson" });
        return;
      }

      const newTerm = termRepo.create({
        lessonId: contribution.lessonId,
        termName: contribution.termName,
        definition: contribution.definition,
        imageUrl: contribution.imageUrl || null,
      });

      await termRepo.save(newTerm);

      contribution.status = "approved";
      contribution.reviewNote = reviewNote || null;
      contribution.reviewedAt = new Date();
      await contributionRepo.save(contribution);

      res.json({
        success: true,
        message: "Contribution approved successfully",
        data: {
          contribution,
          term: newTerm,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },

  rejectContribution: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { reviewNote } = req.body;

      const contribution = await contributionRepo.findOneBy({ id: parseInt(id) });
      if (!contribution) {
        res.status(404).json({ success: false, message: "Contribution not found" });
        return;
      }

      if (contribution.status !== "pending") {
        res.status(400).json({ success: false, message: "Contribution has already been processed" });
        return;
      }

      contribution.status = "rejected";
      contribution.reviewNote = reviewNote?.trim() || "Rejected by admin";
      contribution.reviewedAt = new Date();
      await contributionRepo.save(contribution);

      res.json({
        success: true,
        message: "Contribution rejected successfully",
        data: contribution,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
};