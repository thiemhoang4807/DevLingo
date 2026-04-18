import { Request, Response } from "express";
import { LeaderboardService } from "./leaderboardService";

export class LeaderboardController {
 static async getLeaderboard(req: Request, res: Response) {
  try {
    // Lấy limit từ query (VD: /api/leaderboard?limit=20), nếu không có thì mặc định là 10
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    // Khống chế không cho lấy quá 100 người để tránh lag server
    const safeLimit = limit > 100 ? 100 : limit; 

    const data = await LeaderboardService.getTopUsers(safeLimit); 
    
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
  // Ghi log lỗi vào hệ thống để tự mình xem
  console.error("Leaderboard Error:", error);
  // Chỉ báo với user là server đang bảo trì
  return res.status(500).json({ success: false, message: "Lỗi hệ thống, không thể tải bảng xếp hạng lúc này." });
}
  }
}