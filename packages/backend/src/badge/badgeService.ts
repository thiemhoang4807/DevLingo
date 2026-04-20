import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";
import { Badge } from "../entities/Badge";
import { UserBadge } from "../entities/UserBadge";
import { UserProgress } from "../entities/UserProgress";
import fs from "fs";
import path from "path";

const userRepo = AppDataSource.getRepository(User);
const badgeRepo = AppDataSource.getRepository(Badge);
const userBadgeRepo = AppDataSource.getRepository(UserBadge);
const progressRepo = AppDataSource.getRepository(UserProgress); 

export class BadgeService {

  // ==========================================
  // 🔴 ADMIN API: QUẢN LÝ HUY HIỆU
  // ==========================================
  static async getAllBadges() {
    return await badgeRepo.find();
  }

  static async createBadge(data: any, file?: any) {
    const newBadge = badgeRepo.create({
      name: data.name,
      description: data.description,
      conditionType: data.conditionType,
      conditionValue: data.conditionValue ? Number(data.conditionValue) : null,
      iconUrl: file ? `/uploads/badges/${file.filename}` : null
    });
    return await badgeRepo.save(newBadge);
  }

  static async updateBadge(id: number, data: any, file?: any) {
    const badge = await badgeRepo.findOneBy({ id });
    if (!badge) throw new Error("Badge not found");

    // Thay thế ảnh vật lý cũ
    if (file && badge.iconUrl) {
      const oldPath = path.join(process.cwd(), badge.iconUrl.startsWith('/') ? badge.iconUrl.substring(1) : badge.iconUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      badge.iconUrl = `/uploads/badges/${file.filename}`;
    }

    badge.name = data.name ?? badge.name;
    badge.description = data.description ?? badge.description;
    badge.conditionType = data.conditionType ?? badge.conditionType;
    if (data.conditionValue !== undefined) badge.conditionValue = Number(data.conditionValue);

    return await badgeRepo.save(badge);
  }

  static async deleteBadge(id: number) {
    const badge = await badgeRepo.findOneBy({ id });
    if (!badge) throw new Error("Badge not found");

    // Xóa file ảnh trên ổ cứng
    if (badge.iconUrl) {
      const fullPath = path.join(process.cwd(), badge.iconUrl.startsWith('/') ? badge.iconUrl.substring(1) : badge.iconUrl);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    return await badgeRepo.remove(badge);
  }

  // ==========================================
  // 🟢 USER API: XEM TÚI ĐỒ 
  // ==========================================
  static async getMyBadges(userId: string) {
    const userBadges = await userBadgeRepo.find({
      where: { userId },
      relations: ["badge"], 
      order: { unlockedAt: "DESC" }
    });

    return userBadges.map(ub => ({
      id: ub.badge.id,
      name: ub.badge.name,
      description: ub.badge.description,
      iconUrl: ub.badge.iconUrl,
      unlockedAt: ub.unlockedAt
    }));
  }

  // ==========================================
  // ⚙️ HỆ THỐNG: QUÉT VÀ PHÁT HUY HIỆU (Giữ nguyên của nhóm)
  // ==========================================
  static async checkAndUnlockBadges(userId: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return [];

    const newlyUnlocked: Badge[] = [];
    const progressList = await progressRepo.find({ where: { userId } });

    let totalCorrect = 0;
    progressList.forEach(p => totalCorrect += p.highestScore);
    const currentStreak = this.calculateStreak(progressList);

    const allBadges = await badgeRepo.find();

    for (const badge of allBadges) {
      if (!badge.conditionType || badge.conditionValue === null) continue; 

      let isEligible = false;

      switch (badge.conditionType) {
        case 'level':
          if (user.level >= badge.conditionValue!) isEligible = true;
          break;
        case 'score':
          if (totalCorrect >= badge.conditionValue!) isEligible = true;
          break;
        case 'streak':
          if (currentStreak >= badge.conditionValue!) isEligible = true;
          break;
      }

      if (isEligible) {
        await this.grantBadgeObj(userId, badge, newlyUnlocked);
      }
    }

    return newlyUnlocked; 
  }

  private static async grantBadgeObj(userId: string, badge: Badge, newlyUnlocked: Badge[]) {
    const exists = await userBadgeRepo.findOneBy({ userId, badgeId: badge.id });
    if (!exists) { 
      const newUnlock = userBadgeRepo.create({ userId, badgeId: badge.id, unlockedAt: new Date() });
      await userBadgeRepo.save(newUnlock);
      newlyUnlocked.push(badge);
    }
  }

  private static calculateStreak(progressList: UserProgress[]): number {
    if (!progressList || progressList.length === 0) return 0;

    const sortedDates = progressList
      .map(p => {
        const dateString = (p as any).completedAt || (p as any).updatedAt || new Date();
        return new Date(dateString).setHours(0, 0, 0, 0);
      })
      .sort((a, b) => b - a); 

    const uniqueDates = [...new Set(sortedDates)];

    let streak = 1;
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = today - 86400000; 

    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = uniqueDates[i] - uniqueDates[i + 1];
      if (diff === 86400000) { 
        streak++;
      } else {
        break; 
      }
    }
    return streak;
  }
}