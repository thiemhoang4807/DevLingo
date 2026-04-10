import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes"; // Đã import
import questionRoutes from "./questions/questionRoutes";
import progressRoutes from "./progress/progressRoutes";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes"; 
import logger from "./utils/logger";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));

app.use(express.json()); 

// 🚀 Các middleware ghi log cơ bản (tùy chọn)
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes); // 🚀 ĐÃ BỎ DẤU COMMENT Ở ĐÂY
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/progress", progressRoutes);

AppDataSource.initialize()
  .then(() => {
    logger.info("Data Source has been initialized!");
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(`❌ Error during Data Source initialization: ${error.message}`);
  });