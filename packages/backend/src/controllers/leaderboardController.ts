import { Request, Response } from "express";
import { LeaderboardService } from "../services/leaderboardService";

export class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    try {
      const data = await LeaderboardService.getTopUsers(10); 
      
      return res.status(200).json({
        success: true,
        data
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
