import { Router } from "express";
import { upload } from "../middlewares/uploadMiddleware"; 
import { verifyToken } from "../middlewares/authMiddleware";
import { 
  createBadge, 
  getBadges, 
  updateBadge, 
  deleteBadge,
  getMyBadges 
} from "../controllers/badgeController";

const router = Router();

router.get("/badges/me", verifyToken, getMyBadges);
router.post("/badges", verifyToken, upload.single("image"), createBadge); 
router.get("/badges", verifyToken, getBadges);
router.put("/badges/:id", verifyToken, upload.single("image"), updateBadge); 
router.delete("/badges/:id", verifyToken, deleteBadge);

export { router as badgeRoutes };
