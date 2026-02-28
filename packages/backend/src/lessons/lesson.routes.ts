import { Router } from "express";
import { LessonController } from "./lesson.controller";

const router = Router();

router.get("/", LessonController.getAllPublishedLessons);
router.get("/:id", LessonController.getLessonDetailById);
router.post("/", LessonController.createLesson);
router.put("/:id", LessonController.updateLesson);
router.delete("/:id", LessonController.deleteLesson);
router.post("/:id/terms", LessonController.addTerm);
router.post("/:id/questions", LessonController.addQuestion);

export default router;