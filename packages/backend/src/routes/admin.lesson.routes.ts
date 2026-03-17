import { Router, Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import { uploadLesson } from "../middlewares/upload"; 
import fs from "fs"; 
import path from "path"; 

const router = Router();

// POST /api/admin/lessons
router.post("/lessons", uploadLesson.single("thumbnail"), async (req: any, res: Response) => {
  try {
    const { title, description, orderIndex } = req.body;
    const file = req.file; 

    if (!title) {
      if (file) fs.unlinkSync(file.path); 
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const lessonRepo = AppDataSource.getRepository(Lesson);
    
    const newLesson = lessonRepo.create({
      title,
      description,
      orderIndex: orderIndex ? Number(orderIndex) : null,
      isPublished: false,
      thumbnailUrl: file ? `/uploads/lessons/${file.filename}` : null, 
    } as any); 

    await lessonRepo.save(newLesson);

    return res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      data: newLesson,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE /api/admin/lessons/:id
router.delete("/lessons/:id", async (req: Request, res: Response) => {
  try {
    const lessonId = Number(req.params.id);
    const lessonRepo = AppDataSource.getRepository(Lesson);
    
    const lesson = await lessonRepo.findOneBy({ id: lessonId }) as any;

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    if (lesson.thumbnailUrl) {
      const fullPath = path.join(process.cwd(), lesson.thumbnailUrl.startsWith('/') ? lesson.thumbnailUrl.substring(1) : lesson.thumbnailUrl);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await lessonRepo.remove(lesson);

    return res.json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;