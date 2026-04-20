import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ContributionService } from "./ContributionService";

// Interface mở rộng để TypeScript nhận diện req.file
interface MulterRequest extends AuthRequest {
  file?: any;
}

export class ContributionController {
  
  // ==========================================
  // 🟢 PUBLIC / USER METHODS
  // ==========================================

  // 1. User gửi đóng góp (Đã đổi tên từ submit -> createContribution cho khớp Route)
  static async createContribution(req: MulterRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      // Bóc tách dữ liệu text từ body
      const { lessonId, termName, definition } = req.body;
      
      // Xử lý link ảnh nếu có file được gửi lên
      let imageUrl = null;
      if (req.file) {
        // ✅ Đã sửa lại đường dẫn, xóa chữ 'badges' đi để lưu đúng sảnh chính
        imageUrl = `/uploads/${req.file.filename}`; 
      }

      const payload = {
        lessonId: parseInt(lessonId),
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

  // 2. Lấy danh sách đóng góp của cá nhân User
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


  // ==========================================
  // 🔴 ADMIN METHODS
  // ==========================================

  // 3. Admin lấy toàn bộ danh sách đóng góp (có thể lọc theo status)
  static async getContributions(req: Request, res: Response) {
    try {
      // Gọi qua Service (nhớ đảm bảo ContributionService có hàm getContributions nhé)
      const contributions = await ContributionService.getContributions(req.query.status as string);
      return res.status(200).json({ success: true, data: contributions });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
  }

  // 4. Admin duyệt đóng góp
  static async approveContribution(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { reviewNote } = req.body;

      const result = await ContributionService.approveContribution(id, reviewNote);
      
      if (!result) {
        return res.status(404).json({ success: false, message: "Contribution not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Contribution approved successfully",
        data: result
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // 5. Admin từ chối đóng góp
  static async rejectContribution(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { reviewNote } = req.body;

      const contribution = await ContributionService.rejectContribution(id, reviewNote);
      
      if (!contribution) {
        return res.status(404).json({ success: false, message: "Contribution not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Contribution rejected successfully",
        data: contribution
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}