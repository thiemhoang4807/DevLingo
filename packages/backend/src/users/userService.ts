import bcrypt from "bcrypt";
import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";
import { UserProgress } from "../entities/UserProgress";
import { checkLevelUp } from "../utils/gamificationLogic";

const userRepo = AppDataSource.getRepository(User);
const progressRepo = AppDataSource.getRepository(UserProgress);

export class UserService {

  static async getMe(userId: string) {
    const user = await userRepo.findOne({
      where: { id: userId },
      select: ["id", "username", "fullName", "role", "avatar", "xp", "level", "peakXp", "peakLevel", "createdAt"]
    });
    if (!user) return null;
    const levelInfo = checkLevelUp(user.xp);
    return { ...user, rankName: levelInfo.name };
  }

  static async updateProfile(userId: string, fullName: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    user.fullName = fullName;
    await userRepo.save(user);

    return user;
  }

  static async changePassword(userId: string, newPassword: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await userRepo.save(user);

    return true;
  }
  static async getAllUsers() {
  return userRepo.find({
    select: ["id", "username", "role", "avatar", "xp", "level", "peakXp", "peakLevel", "createdAt"]
  });
  } 

  static async getHistory(userId: string) {
    return progressRepo.find({
      where: { userId: userId },
      relations: ["lesson"], 
      order: { completedAt: "DESC" }
    });
  }

  static async updateAvatar(userId: string, avatarPath: string) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    user.avatar = avatarPath;
    await userRepo.save(user);

    return user;
  }

  static async getPublicProfile(userId: string) {
    const user = await userRepo.findOne({
      where: { id: userId },
      select: ["id", "username", "fullName", "avatar", "xp", "level", "peakXp", "peakLevel", "createdAt"]
    });
    if (!user) throw new Error("User not found");

    const history = await progressRepo.find({
      where: { userId },
      relations: ["lesson"],
      order: { completedAt: "DESC" }
    });

    return { user, history };
  }
}
