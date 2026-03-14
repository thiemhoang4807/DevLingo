import express from "express";
import { AppDataSource } from "./db/dataSource";
import adminRoutes from "./routes/adminRoutes";

const app = express();
const PORT = 5000;

app.use(express.json()); // Phải có dòng này để đọc được req.body

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
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });