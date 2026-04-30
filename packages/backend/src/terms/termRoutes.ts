import { Router } from "express";
import { TermController } from "./termController";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";

const router = Router();

// Toàn bộ thao tác với Term (Sửa/Xóa) đều cần quyền Admin
router.use(verifyToken, requireAdmin);

router.put("/:id", TermController.updateTerm);
router.delete("/:id", TermController.deleteTerm);

export default router;