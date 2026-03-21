import { Router, Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Question } from "../entities/Question";

const router = Router();

// CREATE QUESTION
router.post("/questions", async (req: Request, res: Response) => {
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

    if (!lessonId || !termId || !questionText) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const questionRepo = AppDataSource.getRepository(Question);

    const question = questionRepo.create({
      lessonId,
      termId,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctOption,
      xpReward
    });

    await questionRepo.save(question);

    return res.status(201).json({
      success: true,
      message: "Question created",
      data: question
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});

export default router;