import { Request, Response } from "express";
import { AuthService } from "./authService";

export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const { username, password, fullName } = req.body;

      const data = await AuthService.register(username, password, fullName);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data
      });

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const data = await AuthService.login(username, password);

      return res.status(200).json({
        success: true,
        data
      });

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}