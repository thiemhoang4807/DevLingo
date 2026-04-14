import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Badge } from "../entities/Badge";
import { BadgeService } from "../services/badgeService";
import { AuthRequest } from "../middlewares/authMiddleware";
import fs from "fs";
import path from "path";

interface MulterRequest extends Request {
  file?: any;
}

const badgeRepo = AppDataSource.getRepository(Badge);

export const getMyBadges = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id; // Lấy ID từ token đăng nhập
    const data = await BadgeService.getMyBadges(userId);
    
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBadges = async (req: Request, res: Response) => {
  try {
    const badges = await badgeRepo.find();
    return res.status(200).json({ success: true, data: badges });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBadge = async (req: MulterRequest, res: Response) => {
  try {
    const { name, description, conditionType, conditionValue } = req.body;
    const file = req.file;

    if (!name) {
      if (file) fs.unlinkSync(file.path);
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    const newBadge = badgeRepo.create({
      name,
      description,
      conditionType,
      conditionValue: conditionValue ? Number(conditionValue) : null,
      iconUrl: file ? `/uploads/badges/${file.filename}` : null
    });

    await badgeRepo.save(newBadge);
    return res.status(201).json({ success: true, data: newBadge });
  } catch (error: any) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBadge = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, conditionType, conditionValue } = req.body;
    const file = req.file;

    const badge = await badgeRepo.findOneBy({ id: Number(id) });
    if (!badge) {
      if (file) fs.unlinkSync(file.path);
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    if (file && badge.iconUrl) {
      const oldPath = path.join(process.cwd(), badge.iconUrl.startsWith('/') ? badge.iconUrl.substring(1) : badge.iconUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      badge.iconUrl = `/uploads/badges/${file.filename}`;
    }

    badge.name = name ?? badge.name;
    badge.description = description ?? badge.description;
    badge.conditionType = conditionType ?? badge.conditionType;
    if (conditionValue !== undefined) badge.conditionValue = Number(conditionValue);

    await badgeRepo.save(badge);
    return res.status(200).json({ success: true, data: badge });
  } catch (error: any) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBadge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const badge = await badgeRepo.findOneBy({ id: Number(id) });

    if (!badge) {
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    if (badge.iconUrl) {
      const fullPath = path.join(process.cwd(), badge.iconUrl.startsWith('/') ? badge.iconUrl.substring(1) : badge.iconUrl);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await badgeRepo.remove(badge);
    return res.status(200).json({ success: true, message: "Badge deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};