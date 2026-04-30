import { Request, Response } from "express";
import { TermService } from "./termService";

export class TermController {
  static async updateTerm(req: Request, res: Response) {
    try {
      const data = await TermService.updateTerm(Number(req.params.id), req.body);
      return res.status(200).json({ success: true, message: "Term updated", data });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  static async deleteTerm(req: Request, res: Response) {
    try {
      const data = await TermService.deleteTerm(Number(req.params.id));
      return res.status(200).json({ success: true, message: data.message });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}