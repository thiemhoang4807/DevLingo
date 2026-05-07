import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path"; 
import logger from "./utils/logger";
import { AppDataSource } from "./db/dataSource";
import { runSeeder } from "./db/seeder";

// ==========================================
// 📦 IMPORT CÁC MODULE TÍNH NĂNG (FEATURE-BASED)
// ==========================================
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes"; 
import questionRoutes from "./questions/questionRoutes";
import termRoutes from "./terms/termRoutes"; 
import ContributionRoutes from './contributions/ContributionRoutes'; 
import progressRoutes from "./progress/progressRoutes";
import leaderboardRoutes from "./leaderboard/leaderboardRoutes";
import { badgeRoutes } from "./badge/badgeRoutes";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000; 

// ==========================================
// 🛡️ MIDDLEWARE BẢO MẬT & TIỆN ÍCH
// ==========================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Cho phép frontend load ảnh từ backend
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Link Frontend 
  credentials: true                
}));

app.use(express.json()); 

// Cấp quyền truy cập công khai cho thư mục chứa ảnh upload
app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); 

// 🛑 KHIÊN CHỐNG SPAM (Rate Limiter)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 1000, // Giới hạn 100 requests / 1 IP
  message: { success: false, message: "Spam ít thôi bro" }
});
app.use("/api", limiter); 

// 📝 LOGGER: Ghi nhận mọi request gửi tới
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// ==========================================
// 🚀 ĐĂNG KÝ TUYẾN ĐƯỜNG (ROUTER MOUNTING)
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/terms", termRoutes); 
app.use("/api/contributions", ContributionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes); 
app.use("/api/badges", badgeRoutes);

// ==========================================
// 🗄️ KHỞI ĐỘNG DATABASE & SERVER
// ==========================================

// Luôn luôn khởi động server ngay lập tức để Cloud Run không báo lỗi container failed to start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  logger.info(`Server is running on port ${PORT}`);
});

// Khởi tạo Database chạy ngầm
AppDataSource.initialize()
  .then(async () => {
    console.log("🚀 Data Source has been initialized!");
    logger.info("Data Source has been initialized!");
    
    // Tự động chạy seeder để nạp dữ liệu mẫu nếu DB trống
    await runSeeder();
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("❌ Error during Data Source initialization:", error.message);
      logger.error("Error during Data Source initialization: " + error.message);
    } else {
      console.error("❌ Unknown error during Data Source initialization");
      logger.error("Unknown error during Data Source initialization");
    }
  });