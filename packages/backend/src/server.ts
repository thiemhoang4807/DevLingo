import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes"; 
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import { ApiResponse, User as SharedUser } from "@devlingo/shared";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);

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
    console.log("✅ SQLite Database connected successfully!");
    console.log("✅ TypeORM has synchronized the entities into tables!");
    
    // Start listening for requests only after DB is connected
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
  });
