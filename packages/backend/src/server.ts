import express, { Request, Response } from "express";
import path from 'path';
import dotenv from "dotenv";
import cors from 'cors';
import { AppDataSource } from "./db/dataSource";
import { ApiResponse } from "@devlingo/shared";

import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import questionRoutes from "./questions/questionRoutes";
import adminRoutes from "./routes/adminRoutes";
import { badgeRoutes } from './routes/badgeRoutes';
import lessonRoutes from './routes/lessonRoutes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", badgeRoutes);
app.use("/api/admin", lessonRoutes);

app.get("/api/health", (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: true,
    message: "🚀 DevLingo Backend is connected and running!",
  };
  res.status(200).json(response);
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Data Source has been initialized!");
    console.log("✅ Database connected successfully!");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
  });