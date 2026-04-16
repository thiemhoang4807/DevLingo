import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { ContributionController } from "./ContributionController";
// 🚀 Nhớ dùng đúng cái middleware upload của team (ở đây tôi dùng uploadBadge như file badgeRoutes sếp gửi)
import { uploadBadge } from "../middlewares/uploadMiddleware"; 

const router = Router();

// Thêm uploadBadge.single("image") vào giữa verifyToken và Controller
router.post("/", verifyToken, uploadBadge.single("image"), ContributionController.submit);

router.get("/me", verifyToken, ContributionController.getMyContributions);

export default router;