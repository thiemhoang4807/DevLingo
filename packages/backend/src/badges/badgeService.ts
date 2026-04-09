import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";
import { Badge } from "../entities/Badge";
import { UserBadge } from "../entities/UserBadge";
import { UserProgress } from "../entities/UserProgress";

const userRepo = AppDataSource.getRepository(User);
const badgeRepo = AppDataSource.getRepository(Badge);
const userBadgeRepo = AppDataSource.getRepository(UserBadge);
const progressRepo = AppDataSource.getRepository(UserProgress); 

export class BadgeService {
  
  // ==========================================
  // API: XEM TÚI ĐỒ (Dành cho Frontend)
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
  // API: QUÉT VÀ PHÁT HUY HIỆU (Chạy ngầm)
  // ==========================================
  static async checkAndUnlockBadges(userId: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return [];

    const newlyUnlocked: Badge[] = [];
    
    // Lấy toàn bộ lịch sử nộp bài của user này để làm "chất liệu" tính toán
    const progressList = await progressRepo.find({ where: { userId } });

    // 🏆 NHÓM 3: MILESTONE (Hệ thống Rank & Danh hiệu Tối thượng)
    const levelBadges = [
      // --- Khu vực rank ĐỒNG (Bronze) ---
      { req: 2, name: "Bronze 1" },
      { req: 3, name: "Bronze 2" },
      { req: 4, name: "Bronze 3" },

      // --- Khu vực rank BẠC (Silver) ---
      { req: 5, name: "Silver 1" },
      { req: 6, name: "Silver 2" },
      { req: 7, name: "Silver 3" },

      // --- Khu vực rank VÀNG (Gold) ---
      { req: 8, name: "Gold 1" },
      { req: 9, name: "Gold 2" },
      { req: 10, name: "Gold 3" },

      // --- CÁC DANH HIỆU TỐI THƯỢNG (Theo GDD) ---
      { req: 5, name: "DevLingo Pro" },
      { req: 8, name: "DevLingo Master" },
      { req: 10, name: "DevLingo Legendary" }
    ];

    for (const b of levelBadges) {
      if (user.level >= b.req) await this.grantBadge(userId, b.name, newlyUnlocked);
    }

    // 🎯 NHÓM 2: COMPLETION (Sưu tầm - Tổng số câu đúng)
    let totalCorrect = 0;
    progressList.forEach(p => totalCorrect += p.highestScore); // Cộng dồn tất cả điểm kỷ lục

    const completionBadges = [
      { req: 50, name: "Internet Explorer" }, // Tier 1 (Giả sử cần 50 câu)
      { req: 100, name: "A Hundred!" },       // Tier 2 
      { req: 500, name: "Flawless Finisher" } // Tier 3
    ];
    for (const b of completionBadges) {
      if (totalCorrect >= b.req) await this.grantBadge(userId, b.name, newlyUnlocked);
    }

    // 🏃‍♂️ NHÓM 1: CONSISTENCY (Chăm chỉ - Chuỗi ngày Streak)
    const currentStreak = this.calculateStreak(progressList);
    
    const streakBadges = [
      { req: 1, name: "First Lesson" },   // Tier 1 (Hoàn thành bài đầu)
      { req: 3, name: "3-day-streak" },   // Tier 2
      { req: 7, name: "Streak Holder" }   // Tier 3
    ];
    for (const b of streakBadges) {
      if (currentStreak >= b.req) await this.grantBadge(userId, b.name, newlyUnlocked);
    }

    return newlyUnlocked; 
  }

  // ==========================================
  // CÁC HÀM PHỤ TRỢ (Helper Functions)
  // ==========================================

  // 🛠️ Hàm "Đóng gói": Tìm huy hiệu trong kho và trao cho User
  private static async grantBadge(userId: string, badgeName: string, newlyUnlocked: Badge[]) {
    const badge = await badgeRepo.findOneBy({ name: badgeName });
    if (badge) {
      const exists = await userBadgeRepo.findOneBy({ userId, badgeId: badge.id });
      if (!exists) { // Nếu chưa có thì mới phát
        const newUnlock = userBadgeRepo.create({ userId, badgeId: badge.id, unlockedAt: new Date() });
        await userBadgeRepo.save(newUnlock);
        newlyUnlocked.push(badge);
      }
    }
  }

  // 🛠️ Hàm tính toán chuỗi ngày liên tiếp (Streak)
  private static calculateStreak(progressList: UserProgress[]): number {
    if (!progressList || progressList.length === 0) return 0;

    // Lấy danh sách các ngày user có nộp bài (chuẩn hóa về 0 giờ 0 phút để dễ so sánh)
    const sortedDates = progressList
      .map(p => new Date(p.completedAt).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a); // Sắp xếp từ mới nhất đến cũ nhất

    // Lọc bỏ các ngày trùng nhau (1 ngày nộp 10 bài thì cũng chỉ tính là 1 ngày)
    const uniqueDates = [...new Set(sortedDates)];

    let streak = 1;
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = today - 86400000; // Trừ đi 24 giờ (tính bằng mili-giây)

    // Nếu hôm nay và hôm qua đều KHÔNG đăng nhập -> Rớt chuỗi về 0
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;

    // Đếm ngược về quá khứ xem có liên tiếp không
    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = uniqueDates[i] - uniqueDates[i + 1];
      if (diff === 86400000) { // Nếu cách nhau đúng 1 ngày
        streak++;
      } else {
        break; // Chuỗi bị đứt gãy
      }
    }
    return streak;
  }
}
