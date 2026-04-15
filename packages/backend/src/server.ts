import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./db/dataSource";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./users/userRoutes";
import lessonRoutes from "./lessons/lessonRoutes";
import questionRoutes from "./questions/questionRoutes";
import adminRoutes from "./routes/adminRoutes";
import contributionRoutes from "./contributions/ContributionRoutes";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/contributions", contributionRoutes);
app.use("/api/admin", adminRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("❌ Error during Data Source initialization:", error.message);
      return;
    }

    console.error("❌ Unknown error during Data Source initialization");
  });