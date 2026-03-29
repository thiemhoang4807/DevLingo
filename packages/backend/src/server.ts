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
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();
app.use(helmet());
const PORT = 5000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Mỗi IP chỉ được gọi tối đa 100 lần trong 15 phút
  message: { success: false, message: "Spam ít thôi bro, đi lọ 1 tí đi!" }
});

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
app.use("/api", limiter);

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
