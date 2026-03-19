import express from "express";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import { ApiResponse, User as SharedUser } from "@devlingo/shared";
import dotenv from "dotenv";
import progressRoutes from "./progress/progressRoutes";
dotenv.config();
import adminRoutes from "./routes/adminRoutes";

const app = express();
const PORT = 5000;

app.use(express.json()); // Phải có dòng này để đọc được req.body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
// Gắn bộ Router Admin vào
app.use("/api/admin", adminRoutes);

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
