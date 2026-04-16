import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ContributionService } from "./ContributionService";

// Interface mở rộng để TypeScript nhận diện req.file
interface MulterRequest extends AuthRequest {
  file?: any;
}

export class ContributionController {
  static async submit(req: MulterRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      // 🚀 Bóc tách dữ liệu text từ body
      const { lessonId, termName, definition } = req.body;
      
      // 🚀 Xử lý link ảnh nếu có file được gửi lên
      let imageUrl = null;
      if (req.file) {
        // Tùy theo cấu hình lưu trữ, ở đây mình lấy path cục bộ
        imageUrl = `/uploads/badges/${req.file.filename}`; 
      }

      const payload = {
        lessonId,
        termName,
        definition,
        imageUrl
      };

      const data = await ContributionService.submitContribution(userId, payload);

      return res.status(201).json({
        success: true,
        message: "Contribution submitted successfully",
        data,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({ success: false, message });
    }
  }

  static async getMyContributions(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

      const data = await ContributionService.getMyContributions(userId);
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}