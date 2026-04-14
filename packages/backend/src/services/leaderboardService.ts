import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

let cachedLeaderboard: any = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000; 

export class LeaderboardService {
  static async getTopUsers(limit: number = 10) {
    const now = Date.now();

    if (cachedLeaderboard && (now - lastCacheTime < CACHE_DURATION)) {
      console.log("⚡ Trả về dữ liệu từ Cache!");
      return cachedLeaderboard;
    }

    console.log("🗄️ Lấy dữ liệu mới từ Database!");
    const users = await userRepo.find({
      select: ["id", "username", "xp", "level"],
      order: { xp: "DESC" },
      take: limit,
    });

    const formattedData = users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      xp: user.xp,
      level: user.level
    }));

    cachedLeaderboard = formattedData;
    lastCacheTime = now;

    return formattedData;
  }
}