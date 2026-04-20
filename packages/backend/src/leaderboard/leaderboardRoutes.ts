import { Router } from "express";
import { LeaderboardController } from "./leaderboardController";

const router = Router();

router.get("/", LeaderboardController.getLeaderboard);

export default router;