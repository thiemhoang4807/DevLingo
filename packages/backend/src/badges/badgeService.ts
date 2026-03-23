import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";
import { Badge } from "../entities/Badge";
import { UserBadge } from "../entities/UserBadge";

const userRepo = AppDataSource.getRepository(User);
const badgeRepo = AppDataSource.getRepository(Badge);
const userBadgeRepo = AppDataSource.getRepository(UserBadge);

export class BadgeService {
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

  static async checkAndUnlockBadges(userId: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return [];

    const newlyUnlocked = [];

    const milestoneBadges = [
      { levelReq: 5, badgeName: "DevLingo Pro" },
      { levelReq: 8, badgeName: "DevLingo Master" },
      { levelReq: 10, badgeName: "DevLingo Legendary" }
    ];

    for (const milestone of milestoneBadges) {
      if (user.level >= milestone.levelReq) {
        const badge = await badgeRepo.findOneBy({ name: milestone.badgeName });
        if (badge) {
          const exists = await userBadgeRepo.findOneBy({ userId: user.id, badgeId: badge.id });
          if (!exists) {
            const newUnlock = userBadgeRepo.create({ userId: user.id, badgeId: badge.id, unlockedAt: new Date() });
            await userBadgeRepo.save(newUnlock);
            newlyUnlocked.push(badge);
          }
        }
      }
    }
    return newlyUnlocked; 
  }
}