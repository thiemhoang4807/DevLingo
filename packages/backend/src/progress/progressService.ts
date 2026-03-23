import { AppDataSource } from "../db/dataSource";
import { UserProgress } from "../entities/UserProgress";
import { User } from "../entities/User";
import { Lesson } from "../entities/Lesson";
import { Question } from "../entities/Question";
import { calculateXP, checkLevelUp } from "../utils/gamificationLogic";
import { BadgeService } from "../badges/badgeService";

const progressRepo = AppDataSource.getRepository(UserProgress);
const userRepo = AppDataSource.getRepository(User);
const lessonRepo = AppDataSource.getRepository(Lesson);
const questionRepo = AppDataSource.getRepository(Question);

export class ProgressService {
  
  static async saveResult(userId: string, lessonId: number, score: number) {
    // 1. Lấy thông tin bài học và đếm tổng số câu hỏi
    const lesson = await lessonRepo.findOneBy({ id: lessonId });
    if (!lesson) throw new Error("Lesson not found");

    const totalQuestions = await questionRepo.count({ where: { lessonId } });

    // 2. Tính toán XP nhận được (score ở đây được hiểu là số câu đúng)
    const currentAttemptXP = calculateXP(score, totalQuestions, lesson.difficulty || "easy");

    // 3. Xử lý lưu Progress (như Sprint 2)
    let progress = await progressRepo.findOne({ where: { userId, lessonId } });
    let actualEarnedXP = 0;
    if (progress) {
      if (score > progress.highestScore) {
        const oldXP = calculateXP(progress.highestScore, totalQuestions, lesson.difficulty || "easy");
        actualEarnedXP = currentAttemptXP - oldXP; 
        
        progress.highestScore = score;
      }
      progress.status = "completed";
      progress.completedAt = new Date();
    } else {
      actualEarnedXP = currentAttemptXP;
      progress = progressRepo.create({
        userId, 
        lessonId, 
        highestScore: score, 
        status: "completed", 
        completedAt: new Date()
      });
    }
    await progressRepo.save(progress);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    let isLevelUp = false;
    let newLevelInfo = checkLevelUp(user.xp);

    if (actualEarnedXP > 0) {
      user.xp += actualEarnedXP;
      newLevelInfo = checkLevelUp(user.xp);
      
      if (newLevelInfo.level > user.level) {
        user.level = newLevelInfo.level; 
        isLevelUp = true;
      }
      await userRepo.save(user);
    }

    const newlyUnlockedBadges = await BadgeService.checkAndUnlockBadges(userId);

    return {
      userId: progress.userId,
      lessonId: progress.lessonId,
      highestScore: progress.highestScore,
      status: progress.status,
      
      earnedXP: actualEarnedXP,
      totalXP: user.xp,
      isLevelUp,
      newLevel: user.level,
      levelName: newLevelInfo.name,
      unlockedBadges: newlyUnlockedBadges 
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
