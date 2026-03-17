import { Request, Response } from "express";
import { createLesson } from "../services/lessonService";

export const handleCreateLesson = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const lesson = await createLesson({ title, description });

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create lesson",
    });
  }
};