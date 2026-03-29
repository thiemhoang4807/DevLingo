import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware"; 
import { ContributionService } from "./ContributionService";
export class ContributionController {
  static async getHeatmap(req: AuthRequest, res: Response) {
    const userId = req.user!.id;
    const data = await ContributionService.getMyContributions(userId);
    return res.json({ success: true, data });
  }
}