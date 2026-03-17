import { Router } from "express";
import { uploadBadge } from "../middlewares/upload"; // Middleware mình đã viết ở upload.ts
import { 
    createBadge, 
    getBadges, 
    updateBadge, 
    deleteBadge 
} from "../controllers/badge.controller";

const router = Router();

// Định nghĩa các API cho Admin quản lý huy hiệu
// 1. Tạo mới huy hiệu (có upload 1 ảnh với key là 'image')
router.post("/badges", uploadBadge.single("image"), createBadge);

// 2. Lấy danh sách tất cả huy hiệu
router.get("/badges", getBadges);

// 3. Cập nhật huy hiệu (có thể upload lại ảnh mới)
router.put("/badges/:id", uploadBadge.single("image"), updateBadge);

// 4. Xóa huy hiệu
router.delete("/badges/:id", deleteBadge);

export { router as badgeRoutes };