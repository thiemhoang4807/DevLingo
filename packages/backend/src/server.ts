import express from "express";
import cors from "cors"; 
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import progressRoutes from "./progress/progressRoutes";
import adminRoutes from "./routes/adminRoutes";
import leaderboardRoutes from "./leaderboard/leaderboardRoutes";
import { badgeRoutes } from "./badges/badgeRoutes"; 
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path"; 

dotenv.config();

const app = express();
const PORT = 5000;

app.use(helmet());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));

app.use(express.json()); 

app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // Điều chỉnh đường dẫn '../uploads' tùy cấu trúc thư mục của bạn

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { success: false, message: "Spam ít thôi bro, đi lọ 1 tí đi!" }
});
app.use("/api", limiter); 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes); 
app.use("/api", badgeRoutes); 

AppDataSource.initialize()
  .then(() => {
    console.log("🚀 Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
  });
