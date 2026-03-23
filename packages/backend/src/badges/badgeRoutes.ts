import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { BadgeController } from "./badgeController";

const router = Router();

router.get("/", verifyToken, BadgeController.getMyBadges);

export default router;