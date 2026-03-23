import express from "express";
import cors from "cors"; // 1. Thêm dòng này
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import progressRoutes from "./progress/progressRoutes";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/adminRoutes";
import leaderboardRoutes from "./leaderboard/leaderboardRoutes";
import badgeRoutes from "./badges/badgeRoutes";

const app = express();
const PORT = 5000;

// 2. Cấu hình CORS (Phải đặt TRƯỚC các Routes)
app.use(cors({
  origin: "http://localhost:5173", // Cho phép Frontend của bạn
  credentials: true                // Cho phép gửi cookie/token nếu cần
}));

app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes); 
app.use("/api/users/me/badges", badgeRoutes);

// Khởi tạo Database rồi chạy Server
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
  });
