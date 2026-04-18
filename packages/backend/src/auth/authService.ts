import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

// 🛡️ BẢO MẬT: Chỉ lấy từ .env, KHÔNG DÙNG chuỗi mặc định nữa
const JWT_SECRET = process.env.JWT_SECRET;

// Báo lỗi đỏ lòm và dừng server ngay lập tức nếu quên cấu hình .env
if (!JWT_SECRET) {
  console.error("🚨 CRITICAL ERROR: Thiếu biến môi trường JWT_SECRET!");
  process.exit(1); // Ép server dừng hoạt động
}

export class AuthService {

  static async register(username: string, password: string, fullName?: string) {

    const existingUser = await userRepo.findOne({
      where: { username }
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      username,
      passwordHash,
      fullName,
    });

    await userRepo.save(user);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      xp: user.xp,
      level: user.level
    };
  }

  static async login(username: string, password: string) {

    const user = await userRepo.findOne({
      where: { username }
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      JWT_SECRET as string, 
      { expiresIn: "7d" }
    );

    return { 
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        xp: user.xp,
        level: user.level
      }
    };
  }
}