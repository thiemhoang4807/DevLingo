import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { BadgeService } from "./badgeService";

export class BadgeController {
  static async getMyBadges(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const data = await BadgeService.getMyBadges(userId);
      
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}