import express, { Request, Response } from 'express';
import { User, ApiResponse } from '@devlingo/shared';

const app = express();
const PORT = 5000;

// Middleware parse JSON
app.use(express.json());

// API test thử hệ thống
app.get('/api/health', (req: Request, res: Response) => {
  const mockUser: User = {
    id: "dev-001",
    username: "backendLead",
    fullName: "DevLingo PM",
    role: "admin",
    xp: 9999,
    level: 100
  };

  const response: ApiResponse<User> = {
    success: true,
    message: "Backend is running perfectly!",
    data: mockUser
  };

  res.status(200).json(response);
});

// Chạy server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});