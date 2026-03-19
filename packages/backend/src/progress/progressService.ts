import { AppDataSource } from "../db/dataSource";
import { UserProgress } from "../entities/UserProgress";
import { User } from "../entities/User";
import { Lesson } from "../entities/Lesson";
import { Question } from "../entities/Question";
import { calculateXP, checkLevelUp } from "../utils/gamificationLogic";

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
    const earnedXP = calculateXP(score, totalQuestions, lesson.difficulty);

    // 3. Xử lý lưu Progress (như Sprint 2)
    let progress = await progressRepo.findOne({ where: { userId, lessonId } });
    if (progress) {
      if (score > progress.highestScore) progress.highestScore = score;
      progress.status = "completed";
      progress.completedAt = new Date();
    } else {
      progress = progressRepo.create({
        userId, lessonId, highestScore: score, status: "completed", completedAt: new Date()
      });
    }
    await progressRepo.save(progress);

    // 4. Cộng XP cho User và kiểm tra lên cấp
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    user.xp += earnedXP;
    const newLevelInfo = checkLevelUp(user.xp);
    
    let isLevelUp = false;
    if (newLevelInfo.level > user.level) {
      user.level = newLevelInfo.level; // Cập nhật level mới
      isLevelUp = true;
    }
    await userRepo.save(user);

    // 5. Trả về thông tin để Frontend hiển thị hiệu ứng
    return {
      progress,
      earnedXP,
      totalXP: user.xp,
      isLevelUp,
      newLevel: user.level,
      levelName: newLevelInfo.name
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