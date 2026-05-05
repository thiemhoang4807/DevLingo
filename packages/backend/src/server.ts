import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path"; 
import logger from "./utils/logger";
import { AppDataSource } from "./db/dataSource";

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
const PORT = process.env.PORT || 5000; 

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
AppDataSource.initialize()
  .then(() => {
    console.log("🚀 Data Source has been initialized!");
    logger.info("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      logger.info(`Server is running on port ${PORT}`);
    });
  }) 
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("❌ Error during Data Source initialization:", error.message);
      return;
    }
    console.error("❌ Unknown error during Data Source initialization");
  });