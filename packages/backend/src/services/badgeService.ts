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
  // API: QUÉT VÀ PHÁT HUY HIỆU (ĐỘNG 100%)
  // ==========================================
  static async checkAndUnlockBadges(userId: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return [];

    const newlyUnlocked: Badge[] = [];
    
    // Lấy toàn bộ lịch sử nộp bài của user này để làm "chất liệu" tính toán
    const progressList = await progressRepo.find({ where: { userId } });

    // 1. Tính toán các chỉ số hiện tại của User
    let totalCorrect = 0;
    progressList.forEach(p => totalCorrect += p.highestScore);
    const currentStreak = this.calculateStreak(progressList);

    // 2. Lấy TẤT CẢ huy hiệu đang có trong Database (Do Admin/Leader tạo)
    const allBadges = await badgeRepo.find();

    // 3. Quét từng huy hiệu xem User có đạt điều kiện không
    for (const badge of allBadges) {
      // Nếu huy hiệu bị lỗi thiếu điều kiện thì bỏ qua
      if (!badge.conditionType || badge.conditionValue === null) continue; 

      let isEligible = false;

      switch (badge.conditionType) {
        case 'level':
          // Thêm dấu ! vào sau conditionValue
          if (user.level >= badge.conditionValue!) isEligible = true;
          break;
        case 'score':
          if (totalCorrect >= badge.conditionValue!) isEligible = true;
          break;
        case 'streak':
          if (currentStreak >= badge.conditionValue!) isEligible = true;
          break;
      }

      // Nếu đủ điều kiện -> Trao huy hiệu
      if (isEligible) {
        await this.grantBadgeObj(userId, badge, newlyUnlocked);
      }
    }

    return newlyUnlocked; 
  }

  // ==========================================
  // CÁC HÀM PHỤ TRỢ (Helper Functions)
  // ==========================================

  // 🛠️ Hàm "Đóng gói": Trao huy hiệu (Đã tối ưu tốc độ, không cần chọc DB tìm Badge nữa)
  private static async grantBadgeObj(userId: string, badge: Badge, newlyUnlocked: Badge[]) {
    const exists = await userBadgeRepo.findOneBy({ userId, badgeId: badge.id });
    if (!exists) { 
      const newUnlock = userBadgeRepo.create({ userId, badgeId: badge.id, unlockedAt: new Date() });
      await userBadgeRepo.save(newUnlock);
      newlyUnlocked.push(badge);
    }
  }

  // 🛠️ Hàm tính toán chuỗi ngày liên tiếp (Streak)
  private static calculateStreak(progressList: UserProgress[]): number {
    if (!progressList || progressList.length === 0) return 0;

    // Lấy danh sách các ngày user có nộp bài 
    // Dùng (p as any) để lách lỗi gạch đỏ TypeScript nếu Dev 1 chưa cập nhật Entity
    const sortedDates = progressList
      .map(p => {
        const dateString = (p as any).completedAt || (p as any).updatedAt || new Date();
        return new Date(dateString).setHours(0, 0, 0, 0);
      })
      .sort((a, b) => b - a); // Sắp xếp từ mới nhất đến cũ nhất

    // Lọc bỏ các ngày trùng nhau
    const uniqueDates = [...new Set(sortedDates)];

    let streak = 1;
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = today - 86400000; // Trừ đi 24 giờ

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