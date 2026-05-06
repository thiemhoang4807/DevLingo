import { Router } from "express";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware";
import { UserController } from "./userController";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.get("/me", verifyToken, UserController.getMe);
router.get("/me/history", verifyToken, UserController.getHistory);
router.get("/:id/profile", verifyToken, UserController.getPublicProfile);
router.get("/", verifyToken, requireAdmin, UserController.getAll);
router.put("/me", verifyToken, UserController.updateProfile);
router.put("/me/password", verifyToken, UserController.changePassword);
router.put("/me/avatar", verifyToken, upload.single("avatar"), UserController.updateAvatar);

export default router;
