import { AppDataSource } from "../db/dataSource";
import { UserProgress } from "../entities/UserProgress";

const progressRepo = AppDataSource.getRepository(UserProgress);

export class ProgressService {
  
  static async saveResult(userId: string, lessonId: number, score: number) {
    // Tìm xem user đã làm bài này bao giờ chưa
    let progress = await progressRepo.findOne({
      where: { userId, lessonId }
    });

    if (progress) {
      // Nếu đã làm, chỉ cập nhật nếu điểm mới cao hơn điểm cũ
      if (score > progress.highestScore) {
        progress.highestScore = score;
      }
      progress.status = "completed";
      progress.completedAt = new Date();
    } else {
      // Nếu chưa làm, tạo bản ghi mới
      progress = progressRepo.create({
        userId,
        lessonId,
        highestScore: score,
        status: "completed",
        completedAt: new Date()
      });
    }

    await progressRepo.save(progress);
    return progress;
  }

  static async getMyProgress(userId: string) {
    // Lấy toàn bộ lịch sử học tập của user
    return progressRepo.find({
      where: { userId },
      relations: ["lesson"], // Lấy kèm thông tin bài học (title, description...)
      order: { completedAt: "DESC" }
    });
  }
}