import { Router } from "express";
import { ContributionController } from "./ContributionController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/heatmap", verifyToken, ContributionController.getHeatmap);

export default router;