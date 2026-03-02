import express, { Request, Response } from "express";
import { AppDataSource } from "./db/dataSource";
// Import interfaces from the shared folder
import { ApiResponse, User as SharedUser } from "@devlingo/shared";
import { Lesson } from "./entities/Lesson";

const app = express();
const PORT = 5000;

// Middleware to parse JSON body
app.use(express.json());

// Health check API
app.get("/api/health", (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: true,
    message: "🚀 Backend and TypeORM Database are connected and running!",
  };

  res.status(200).json(response);
});
// ================= ADMIN LESSON APIs =================

// CREATE LESSON
app.post("/api/admin/lessons", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const lessonRepo = AppDataSource.getRepository(Lesson);

    const lesson = lessonRepo.create({
      title,
      isPublished: false,
    });

    await lessonRepo.save(lesson);

    res.status(201).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
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