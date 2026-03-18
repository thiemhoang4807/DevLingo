<<<<<<< HEAD
import express, { Request, Response } from "express";
import { AppDataSource } from "./db/dataSource";
// Import interfaces from the shared folder
import { ApiResponse, User as SharedUser } from "@devlingo/shared";
import path from 'path';
import { badgeRoutes } from './routes/badge.routes';
import lessonRoutes from './routes/admin.lesson.routes';

const app = express();
const PORT = 5000;

// Middleware to parse JSON body
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 4. Đăng ký các API Routes
// Chúng ta gom tất cả vào tiền tố /api/admin
app.use('/api/admin', badgeRoutes);
app.use('/api/admin', lessonRoutes);
// Health check API
app.get("/api/health", (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: true,
    message: "🚀 Backend and TypeORM Database are connected and running!",
  };

  res.status(200).json(response);
});

// Initialize the database connection, THEN start the Express server
AppDataSource.initialize()
  .then(() => {
    console.log("✅ PostgreSQL Database connected successfully!");
    console.log("✅ TypeORM has synchronized the entities into tables!");
    
    // Start listening for requests only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
  });
=======
import express from "express";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import { ApiResponse, User as SharedUser } from "@devlingo/shared";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/adminRoutes";

const app = express();
const PORT = 5000;

app.use(express.json()); // Phải có dòng này để đọc được req.body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
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
>>>>>>> 97b136bf6c485d282f9a818e9d6d76d981804781
