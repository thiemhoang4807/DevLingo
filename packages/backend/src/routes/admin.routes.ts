import { Router } from "express";
import { adminController } from "../controllers/adminController";

const router = Router();

// ================= ROUTES CHO LESSON =================
router.get("/lessons", adminController.getLessons);          // Lấy danh sách
router.get("/lessons/:id", adminController.getLessonById);   // Lấy chi tiết
router.post("/lessons", adminController.createLesson);       // Thêm mới
router.put("/lessons/:id", adminController.updateLesson);    // Sửa
router.delete("/lessons/:id", adminController.deleteLesson); // Xóa

// ================= ROUTES CHO QUESTION =================
router.get("/questions", adminController.getQuestions);          // Lấy danh sách (có thể truyền ?lessonId=1)
router.get("/questions/:id", adminController.getQuestionById);   // Lấy chi tiết
router.post("/questions", adminController.createQuestion);       // Thêm mới
router.put("/questions/:id", adminController.updateQuestion);    // Sửa
router.delete("/questions/:id", adminController.deleteQuestion); // Xóa

export default router;