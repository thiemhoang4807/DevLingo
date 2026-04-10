import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { uploadLesson } from "../middlewares/uploadMiddleware"; 
import { getLessons, handleCreateLesson, handleDeleteLesson, handleUpdateLesson } from "../controllers/lessonController";

const router = Router();

router.post("/lessons", verifyToken, uploadLesson.single("thumbnail"), handleCreateLesson);
router.delete("/lessons/:id", verifyToken, handleDeleteLesson);
router.put("/lessons/:id", verifyToken, uploadLesson.single("thumbnail"), handleUpdateLesson);
router.get("/lessons", getLessons);
export default router;