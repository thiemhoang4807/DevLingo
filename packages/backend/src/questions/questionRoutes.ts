import { Router } from "express";
import { QuestionController } from "./questionController";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";

const router = Router();

// 🟢 PUBLIC: Lấy danh sách câu hỏi theo lessonId (để làm bài quiz)
router.get("/", QuestionController.getQuestionsByLesson);

// 🟢 PUBLIC: Cho phép lấy thông tin câu hỏi (để làm bài test)
router.get("/:id", QuestionController.getQuestion);

// 🔴 ADMIN ONLY: Các thao tác can thiệp dữ liệu
router.use(verifyToken, requireAdmin);

router.put("/:id", QuestionController.updateQuestion);
router.delete("/:id", QuestionController.deleteQuestion);

export default router;