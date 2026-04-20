import { Router } from "express";
import { upload } from "../middlewares/uploadMiddleware"; 
// Lưu ý: Dùng đúng tên 'requireAdmin' hoặc 'isAdmin' mà bạn có trong authMiddleware nhé
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";
import { BadgeController } from "./badgeController";

const router = Router();

// ==========================================
// 🟢 PUBLIC / USER ROUTES
// ==========================================
router.get("/me", verifyToken, BadgeController.getMyBadges);
router.get("/", verifyToken, BadgeController.getBadges); // Ai cũng xem được danh sách huy hiệu

// ==========================================
// 🔴 ADMIN ROUTES
// ==========================================
router.use(verifyToken, requireAdmin); // Gắn khiên bảo vệ từ đây trở xuống

router.post("/", upload.single("image"), BadgeController.createBadge); 
router.put("/:id", upload.single("image"), BadgeController.updateBadge); 
router.delete("/:id", BadgeController.deleteBadge);

export { router as badgeRoutes };