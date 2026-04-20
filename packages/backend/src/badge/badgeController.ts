import { Request, Response } from "express";
import { BadgeService } from "./badgeService";
import { AuthRequest } from "../middlewares/authMiddleware";
import fs from "fs";

interface MulterRequest extends Request {
  file?: any;
}

export class BadgeController {
  
  static async getMyBadges(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id; // Vẫn giữ kiểu string nhé
      const data = await BadgeService.getMyBadges(userId);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getBadges(req: Request, res: Response) {
    try {
      const badges = await BadgeService.getAllBadges();
      return res.status(200).json({ success: true, data: badges });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async createBadge(req: MulterRequest, res: Response) {
    try {
      if (!req.body.name) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({ success: false, message: "Name is required" });
      }

      const data = await BadgeService.createBadge(req.body, req.file);
      return res.status(201).json({ success: true, data });
    } catch (error: any) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async updateBadge(req: MulterRequest, res: Response) {
    try {
      const data = await BadgeService.updateBadge(Number(req.params.id), req.body, req.file);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  static async deleteBadge(req: Request, res: Response) {
    try {
      await BadgeService.deleteBadge(Number(req.params.id));
      return res.status(200).json({ success: true, message: "Badge deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}