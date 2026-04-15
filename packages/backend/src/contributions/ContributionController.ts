import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ContributionService } from "./ContributionService";

export class ContributionController {
  static async submit(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const data = await ContributionService.submitContribution(userId, req.body);

      return res.status(201).json({
        success: true,
        message: "Contribution submitted successfully",
        data,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({
        success: false,
        message,
      });
    }
  }

  static async getMyContributions(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const data = await ContributionService.getMyContributions(userId);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(400).json({
        success: false,
        message,
      });
    }
  }
}