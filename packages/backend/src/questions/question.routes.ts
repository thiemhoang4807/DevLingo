import { Router } from "express";
import { QuestionController } from "./question.controller";

const router = Router();

router.get("/:id", QuestionController.getQuestion);
router.put("/:id", QuestionController.updateQuestion);
router.delete("/:id", QuestionController.deleteQuestion);

export default router;