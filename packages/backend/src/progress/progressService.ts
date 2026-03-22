import { AppDataSource } from "../db/dataSource";
import { UserProgress } from "../entities/UserProgress";
import { User } from "../entities/User"; // Đảm bảo import bảng User

const progressRepo = AppDataSource.getRepository(UserProgress);
const userRepo = AppDataSource.getRepository(User);

// Bảng mốc Level theo GDD
const LEVEL_THRESHOLDS = [
  { level: 10, xp: 10000, title: "Legendary" },
  { level: 9, xp: 6500, title: "Diamond" },
  { level: 8, xp: 4000, title: "Obsidian" },
  { level: 7, xp: 2500, title: "Pearl" },
  { level: 6, xp: 1500, title: "Emerald" },
  { level: 5, xp: 800, title: "Ruby" },
  { level: 4, xp: 475, title: "Sapphire" },
  { level: 3, xp: 250, title: "Gold" },
  { level: 2, xp: 100, title: "Silver" },
  { level: 1, xp: 0, title: "Bronze" }
];

export class ProgressService {
  
  // Helper function tính Level
  static calculateLevel(totalXP: number) {
    for (const threshold of LEVEL_THRESHOLDS) {
      if (totalXP >= threshold.xp) {
        return threshold.level;
      }
    }
    return 1;
  }

  static async saveResult(userId: string, lessonId: number, score: number, totalQuestions: number, difficulty: string) {
    // 1. TÍNH TOÁN XP THEO CÔNG THỨC GDD
    const BASE_XP_PER_QUESTION = 10;
    let multiplier = 1.0;
    if (difficulty === 'Medium') multiplier = 1.5;
    if (difficulty === 'Hard') multiplier = 2.0;

    const baseXP = score * BASE_XP_PER_QUESTION;
    const isPerfect = score === totalQuestions;
    const perfectBonus = isPerfect ? 50 : 0;
    
    // Total XP = (Base XP * Difficulty Multiplier) + Perfect Bonus
    const earnedXP = Math.round((baseXP * multiplier) + perfectBonus);

    // 2. LƯU LỊCH SỬ VÀO BẢNG PROGRESS
    let progress = await progressRepo.findOne({ where: { userId, lessonId } });

    if (progress) {
      if (score > progress.highestScore) {
        progress.highestScore = score;
      }
      progress.status = "completed";
      progress.completedAt = new Date();
    } else {
      progress = progressRepo.create({
        userId,
        lessonId,
        highestScore: score,
        status: "completed",
        completedAt: new Date()
      });
    }
    await progressRepo.save(progress);

    // 3. CỘNG XP VÀ UPDATE LEVEL CHO USER
    const user = await userRepo.findOne({ where: { id: userId } });
    let levelUpData = null;

    if (user) {
      user.xp += earnedXP;
      const newLevel = this.calculateLevel(user.xp);
      
      // Kiểm tra xem có thăng cấp không
      if (newLevel > user.level) {
        user.level = newLevel;
        levelUpData = {
          newLevel: newLevel,
          title: LEVEL_THRESHOLDS.find(t => t.level === newLevel)?.title
        };
      }
      await userRepo.save(user);
    }

    return {
      progress,
      earnedXP,
      levelUp: levelUpData // Trả về cho Frontend biết để bắn pháo hoa
    };
  }

  static async getMyProgress(userId: string) {
    return progressRepo.find({
      where: { userId },
      relations: ["lesson"],
      order: { completedAt: "DESC" }
    });
  }
}