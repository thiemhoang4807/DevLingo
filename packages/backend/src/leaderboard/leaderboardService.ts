import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

let cachedLeaderboards: Record<number, any> = {}; // Dùng object thay vì mảng đơn
let lastCacheTimes: Record<number, number> = {};
const CACHE_DURATION = 60 * 1000;

export class LeaderboardService {
  static async getTopUsers(limit: number = 10) {
    const now = Date.now();

    // Kiểm tra cache RIÊNG BIỆT cho từng mức limit (10, 50, 100...)
    if (cachedLeaderboards[limit] && (now - lastCacheTimes[limit] < CACHE_DURATION)) {
      return cachedLeaderboards[limit];
    }

    const users = await userRepo.find({
      select: ["id", "username", "avatar", "xp", "level"],
      order: { xp: "DESC" },
      take: limit,
    });

    const formattedData = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      xp: user.xp,
      level: user.level
    }));

    // Cập nhật Cache RIÊNG cho limit này
    cachedLeaderboards[limit] = formattedData;
    lastCacheTimes[limit] = now;

    return formattedData;
  }
}