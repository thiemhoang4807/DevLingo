import { Router } from "express";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware"; 
import { ContributionController } from "./ContributionController";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// User gửi đóng góp (Gắn thêm upload ảnh để nhận ảnh từ vựng)
router.post("/", verifyToken, upload.single("image"), ContributionController.createContribution);

// Lấy danh sách đóng góp của CÁ NHÂN User đó (gợi ý từ VS Code của bạn)
router.get("/my-contributions", verifyToken, ContributionController.getMyContributions);

// ==========================================
// 🔴 Chỉ dành cho Admin duyệt/từ chối
// ==========================================
router.use(verifyToken, requireAdmin);
router.get("/", ContributionController.getContributions);
router.put("/:id/approve", ContributionController.approveContribution);
router.put("/:id/reject", ContributionController.rejectContribution);

export default router;