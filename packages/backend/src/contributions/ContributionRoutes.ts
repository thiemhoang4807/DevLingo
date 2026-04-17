import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { ContributionController } from "./ContributionController";
// 🚀 Đã đổi tên thành 'upload' cho đồng bộ với toàn hệ thống
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// Thêm upload.single("image") vào giữa verifyToken và Controller
router.post("/", verifyToken, upload.single("image"), ContributionController.submit);

router.get("/me", verifyToken, ContributionController.getMyContributions);

export default router;
