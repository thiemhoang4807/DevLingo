import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export class LeaderboardService {
  static async getTopUsers(limit: number = 10) {
    const users = await userRepo.find({
      select: ["id", "username", "xp", "level"],
      order: { xp: "DESC" }, 
      take: limit,
    });

    return users.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      xp: user.xp,
      level: user.level
    }));
  }
}