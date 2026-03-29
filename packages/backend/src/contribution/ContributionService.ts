import { AppDataSource } from "../db/dataSource";
import { Contribution } from "../entities/Contribution";

export class ContributionService {
  // Đảm bảo userId ở đây nhận vào là string
  static async recordActivity(userId: string) {
    const repo = AppDataSource.getRepository(Contribution);
    const today = new Date().toISOString().split('T')[0];

    // Chỗ này hết đỏ vì cả 2 đều là string
    let activity = await repo.findOne({ where: { userId, date: today } });

    if (activity) {
      activity.count += 1;
      await repo.save(activity);
    } else {
      const newActivity = repo.create({ 
        userId, // Hết đỏ ở đây luôn
        date: today, 
        count: 1 
      });
      await repo.save(newActivity);
    }
  }

  static async getMyContributions(userId: string) {
    const repo = AppDataSource.getRepository(Contribution);
    return await repo.find({
      where: { userId },
      order: { date: "ASC" }
    });
  }
}