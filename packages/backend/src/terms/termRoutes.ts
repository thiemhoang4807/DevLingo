import { Router } from "express";
import { TermController } from "./termController";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";

const router = Router();

// =================================================================
// ✅ KHU VỰC PUBLIC: Ai cũng vào xem được (Không cần đăng nhập/Admin)
// =================================================================
router.get("/", TermController.getTerms);       // Lấy danh sách từ vựng
router.get("/recent", TermController.getRecent);     // Lấy từ mới nhất
router.get("/trending", TermController.getTrending); // Lấy từ đang hot
router.get("/:id", TermController.getTermById); // Lấy chi tiết 1 từ vựng

// =================================================================
// 🛑 KHU VỰC BẢO MẬT: Bắt đầu từ dòng này, bắt buộc phải là ADMIN
// =================================================================
router.use(verifyToken, requireAdmin);

router.post("/", TermController.createTerm);
router.put("/:id", TermController.updateTerm);
router.delete("/:id", TermController.deleteTerm);

export default router;
