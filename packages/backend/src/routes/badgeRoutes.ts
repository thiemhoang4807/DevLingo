import { Router } from "express";
import { uploadBadge } from "../middlewares/uploadMiddleware"; 
import { verifyToken } from "../middlewares/authMiddleware";
import { createBadge, getBadges, updateBadge, deleteBadge } from "../controllers/badgeController";

const router = Router();

router.post("/badges", verifyToken, uploadBadge.single("image"), createBadge);
router.get("/badges", verifyToken, getBadges);
router.put("/badges/:id", verifyToken, uploadBadge.single("image"), updateBadge);
router.delete("/badges/:id", verifyToken, deleteBadge);

export { router as badgeRoutes };