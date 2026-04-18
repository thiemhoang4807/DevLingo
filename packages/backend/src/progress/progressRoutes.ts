    import { Router } from "express";
    import { verifyToken } from "../middlewares/authMiddleware";
    import { ProgressController } from "./progressController";

    const router = Router();

    // Phải đăng nhập (có Token) mới được gọi 2 API này
    router.post("/submit", verifyToken, ProgressController.submitQuiz);
    router.get("/me", verifyToken, ProgressController.getProgress);

    export default router;