import "reflect-metadata";
import { DataSource } from "typeorm";

// Import all entities
import { User } from "../entities/User";
import { Lesson } from "../entities/Lesson";
import { Term } from "../entities/Term";
import { Question } from "../entities/Question";
import { UserProgress } from "../entities/UserProgress";
import { UserAnswer } from "../entities/UserAnswer";
import { Badge } from "../entities/Badge";
import { UserBadge } from "../entities/UserBadge";
import { Contribution } from "../entities/Contribution";

export const AppDataSource = new DataSource({
  type: "postgres", // Đã chuyển sang dùng PostgreSQL
  url: process.env.DATABASE_URL, // Lấy đường link kết nối từ biến môi trường
  ssl: true, // Bắt buộc bật SSL khi dùng Database trên mây (Render)
  extra: {
    ssl: {
      rejectUnauthorized: false, // Bỏ qua lỗi tự chứng thực chứng chỉ SSL
    },
  },
  synchronize: true, // Vẫn giữ true để TypeORM tự động tạo bảng cho sếp
  logging: false,
  entities: [
    User,
    Lesson,
    Term,
    Question,
    UserProgress,
    UserAnswer,
    Badge,
    UserBadge,
    Contribution
  ],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});