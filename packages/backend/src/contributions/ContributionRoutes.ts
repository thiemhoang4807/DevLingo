import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { ContributionController } from "./ContributionController";

const router = Router();

router.post("/", verifyToken, ContributionController.submit);
router.get("/me", verifyToken, ContributionController.getMyContributions);

export default router;