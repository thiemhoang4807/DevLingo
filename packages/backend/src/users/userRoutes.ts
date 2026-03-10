import { Router } from "express";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";
import { UserController } from "./userController";

const router = Router();

router.get("/me", verifyToken, UserController.getMe);
router.get("/", verifyToken, requireAdmin, UserController.getAll);
router.put("/me", verifyToken, UserController.updateProfile);
router.put("/me/password", verifyToken, UserController.changePassword);

export default router;