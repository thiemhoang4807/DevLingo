import { Router } from "express";
import { LessonController } from "./lessonController";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// ==========================================
// 🟢 PUBLIC ROUTES (Ai cũng có thể truy cập)
// ==========================================
// Đã đổi tên hàm thành getLessons cho khớp với Controller mới
router.get("/", LessonController.getLessons);
router.get("/:id", LessonController.getLessonDetailById);


// ==========================================
// 🔴 ADMIN ROUTES (Bọc thép bảo mật)
// ==========================================
router.use(verifyToken, requireAdmin);

// Gọi upload.single("thumbnail") để hứng file ảnh có tên là "thumbnail" từ Frontend gửi lên
router.post("/", upload.single("thumbnail"), LessonController.createLesson);
router.put("/:id", upload.single("thumbnail"), LessonController.updateLesson);

router.delete("/:id", LessonController.deleteLesson);

// Thêm từ vựng và câu hỏi cần quyền Admin
router.post("/:id/terms", LessonController.addTerm);
router.post("/:id/questions", LessonController.addQuestion);

export default router;