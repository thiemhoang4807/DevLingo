import bcrypt from "bcrypt";
import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export class UserService {

  static async getMe(userId: string) {
    return userRepo.findOne({
      where: { id: userId },
      select: ["id", "username", "fullName", "role", "xp", "level", "createdAt"]
    });
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
    select: ["id", "username", "role", "xp", "level", "createdAt"]
  });
  } 
}