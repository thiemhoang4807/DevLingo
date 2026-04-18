import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";
import { getLessons, handleCreateLesson, handleDeleteLesson, handleUpdateLesson } from "../controllers/lessonController";

const router = Router();

router.post("/lessons", verifyToken, upload.single("thumbnail"), handleCreateLesson);
router.delete("/lessons/:id", verifyToken, handleDeleteLesson);
router.put("/lessons/:id", verifyToken, upload.single("thumbnail"), handleUpdateLesson);
router.get("/lessons", getLessons);
export default router;
