import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { UserService } from "./userService";

export class UserController {

  static async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const user = await UserService.getMe(userId);

      return res.json({ success: true, data: user });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({ success: false, message });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { fullName } = req.body;

      const user = await UserService.updateProfile(userId, fullName);
      const { passwordHash, ...safeUser } = user;

      return res.json({ success: true, data: safeUser });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({ success: false, message });
    }
  }

  static async changePassword(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { newPassword } = req.body;

      await UserService.changePassword(userId, newPassword);

      return res.json({ success: true, message: "Password changed successfully" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({ success: false, message });
    }
  }

  static async getHistory(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const history = await UserService.getHistory(userId);
      
      return res.json({ success: true, data: history });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({ success: false, message });
    }
  }

  static async getAll(req: AuthRequest, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.json({ success: true, data: users });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({ success: false, message });
    }
  }
}
