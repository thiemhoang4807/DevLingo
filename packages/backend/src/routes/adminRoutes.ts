import { Router } from "express";
import { adminController } from "../controllers/adminController";

const router = Router();

router.get("/lessons", adminController.getLessons);
router.get("/lessons/:id", adminController.getLessonById);
router.post("/lessons", adminController.createLesson);
router.put("/lessons/:id", adminController.updateLesson);
router.delete("/lessons/:id", adminController.deleteLesson);

router.get("/questions", adminController.getQuestions);
router.get("/questions/:id", adminController.getQuestionById);
router.post("/questions", adminController.createQuestion);
router.put("/questions/:id", adminController.updateQuestion);
router.delete("/questions/:id", adminController.deleteQuestion);

router.get("/contributions", adminController.getContributions);
router.put("/contributions/:id/approve", adminController.approveContribution);
router.put("/contributions/:id/reject", adminController.rejectContribution);

export default router;