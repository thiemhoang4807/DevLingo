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

const dbPath = process.env.DB_PATH || "devLingoDb.sqlite";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: dbPath,
  synchronize: true,
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
