import { Router, Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Term } from "../entities/Term";
import { Lesson } from "../entities/Lesson";
import { verifyToken } from "../middlewares/authMiddleware"; // Thêm import

const router = Router();

// Bọc verifyToken cho tất cả các route
router.post("/lessons/:id/terms", verifyToken, async (req: Request, res: Response) => {
  try {
    const lessonId = Number(req.params.id);
    const { termName, definition } = req.body;
    if (!termName || !definition) return res.status(400).json({ success: false, message: "Missing data" });

    const lessonRepo = AppDataSource.getRepository(Lesson);
    const termRepo = AppDataSource.getRepository(Term);
    const lesson = await lessonRepo.findOneBy({ id: lessonId });

    if (!lesson) return res.status(404).json({ success: false, message: "Lesson not found" });

    const term = termRepo.create({ lessonId, termName, definition });
    await termRepo.save(term);

    return res.status(201).json({ success: true, message: "Term created", data: term });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/lessons/:id/terms", verifyToken, async (req: Request, res: Response) => {
  try {
    const lessonId = Number(req.params.id);
    const termRepo = AppDataSource.getRepository(Term);
    const terms = await termRepo.find({ where: { lessonId } });
    return res.json({ success: true, data: terms });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/terms/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { termName, definition, example } = req.body;
    const termRepo = AppDataSource.getRepository(Term);
    const term = await termRepo.findOneBy({ id });

    if (!term) return res.status(404).json({ success: false, message: "Term not found" });

    term.termName = termName ?? term.termName;
    term.definition = definition ?? term.definition;
    term.example = example ?? term.example;

    await termRepo.save(term);
    return res.json({ success: true, message: "Term updated", data: term });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/terms/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const termRepo = AppDataSource.getRepository(Term);
    const term = await termRepo.findOneBy({ id });

    if (!term) return res.status(404).json({ success: false, message: "Term not found" });

    await termRepo.remove(term);
    return res.json({ success: true, message: "Term deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;