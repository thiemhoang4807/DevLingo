import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { uploadLesson } from "../middlewares/uploadMiddleware"; 
import { handleCreateLesson, handleDeleteLesson } from "../controllers/lessonController";

const router = Router();

router.post("/lessons", verifyToken, uploadLesson.single("thumbnail"), handleCreateLesson);
router.delete("/lessons/:id", verifyToken, handleDeleteLesson);

export default router;