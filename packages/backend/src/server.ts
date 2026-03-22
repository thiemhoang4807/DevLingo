import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./db/dataSource";
import dotenv from "dotenv";

import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import progressRoutes from "./progress/progressRoutes";
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (ĐÃ DỌN SẠCH CÁC DÒNG LẶP)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes); // Gắn bộ Router Admin vào