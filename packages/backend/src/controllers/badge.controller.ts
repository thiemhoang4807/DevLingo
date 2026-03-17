import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { Badge } from "../entities/Badge";
import fs from "fs";
import path from "path";

const badgeRepo = AppDataSource.getRepository(Badge);

// 1. Lấy danh sách huy hiệu
export const getBadges = async (req: Request, res: Response) => {
  try {
    const badges = await badgeRepo.find();
    return res.status(200).json({ success: true, data: badges });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Tạo huy hiệu mới
export const createBadge = async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    if (!title) {
      if (file) fs.unlinkSync(file.path); // Xóa ảnh vừa upload nếu thiếu title
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const newBadge = badgeRepo.create({
      title,
      description,
      imageUrl: file ? `/uploads/badges/${file.filename}` : null
    } as any);

    await badgeRepo.save(newBadge);
    return res.status(201).json({ success: true, data: newBadge });
  } catch (error: any) {
    if (req.file) fs.unlinkSync(req.file.path); // Lỗi DB thì xóa ảnh luôn cho sạch
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Cập nhật huy hiệu
export const updateBadge = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file;

    const badge = await badgeRepo.findOneBy({ id: Number(id) }) as any;
    if (!badge) {
      if (file) fs.unlinkSync(file.path);
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    // Nếu có ảnh mới, xóa ảnh cũ đi
    if (file && badge.imageUrl) {
      const oldPath = path.join(process.cwd(), badge.imageUrl.startsWith('/') ? badge.imageUrl.substring(1) : badge.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      badge.imageUrl = `/uploads/badges/${file.filename}`;
    }

    badge.title = title ?? badge.title;
    badge.description = description ?? badge.description;

    await badgeRepo.save(badge);
    return res.status(200).json({ success: true, data: badge });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Xóa huy hiệu
export const deleteBadge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const badge = await badgeRepo.findOneBy({ id: Number(id) }) as any;

    if (!badge) {
      return res.status(404).json({ success: false, message: "Badge not found" });
    }

    // Xóa file vật lý trước khi xóa record trong DB
    if (badge.imageUrl) {
      const fullPath = path.join(process.cwd(), badge.imageUrl.startsWith('/') ? badge.imageUrl.substring(1) : badge.imageUrl);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await badgeRepo.remove(badge);
    return res.status(200).json({ success: true, message: "Badge deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};