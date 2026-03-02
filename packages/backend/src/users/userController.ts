import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { UserService } from "./user.service";

export class UserController {

  static async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const user = await UserService.getMe(userId);

      return res.json({ success: true, data: user });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { fullName } = req.body;

      const user = await UserService.updateProfile(userId, fullName);

      return res.json({ success: true, data: user });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async changePassword(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { newPassword } = req.body;

      await UserService.changePassword(userId, newPassword);

      return res.json({ success: true, message: "Password changed" });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  static async getAll(req: AuthRequest, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    return res.json({ success: true, data: users });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
  }
}

