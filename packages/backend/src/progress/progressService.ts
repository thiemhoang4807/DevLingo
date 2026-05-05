import { AppDataSource } from "../db/dataSource";
import { UserProgress } from "../entities/UserProgress";
import { UserAnswer } from "../entities/UserAnswer";
import { User } from "../entities/User";
import { Lesson } from "../entities/Lesson";
import { Question } from "../entities/Question";
import { Term } from "../entities/Term";
import { calculateXP, checkLevelUp } from "../utils/gamificationLogic";
import { BadgeService } from "../badge/badgeService";

const progressRepo = AppDataSource.getRepository(UserProgress);
const answerRepo = AppDataSource.getRepository(UserAnswer);
const userRepo = AppDataSource.getRepository(User);
const lessonRepo = AppDataSource.getRepository(Lesson);
const questionRepo = AppDataSource.getRepository(Question);
const termRepo = AppDataSource.getRepository(Term);

export class ProgressService {
  
  static async saveResult(userId: string, lessonId: number, score: number, answers?: { questionId: number; selectedOption: number; isCorrect: boolean }[]) {
    // 1. Lấy thông tin bài học và đếm tổng số câu hỏi
    const lesson = await lessonRepo.findOneBy({ id: lessonId });
    if (!lesson) throw new Error("Lesson not found");

    const totalQuestions = await questionRepo.count({ where: { lessonId } });

    // 🛡️ CHỐNG HACK: Không cho phép số câu đúng lớn hơn tổng số câu hỏi
    if (score < 0 || score > totalQuestions) {
      throw new Error("Invalid score: Có dấu hiệu gian lận điểm số!");
    }

    // 2. Tính toán XP nhận được (score ở đây được hiểu là số câu đúng)
    const currentAttemptXP = calculateXP(score, totalQuestions, lesson.difficulty || "easy");

    // 3. Xử lý lưu Progress
    let progress = await progressRepo.findOne({ where: { userId, lessonId } });
    let actualEarnedXP = 0;
    
    if (progress) {
      if (score > progress.highestScore) {
        const oldXP = calculateXP(progress.highestScore, totalQuestions, lesson.difficulty || "easy");
        actualEarnedXP = currentAttemptXP - oldXP; 
        
        progress.highestScore = score;
      }
      progress.status = "completed";
      progress.completedAt = new Date();
    } else {
      actualEarnedXP = currentAttemptXP;
      progress = progressRepo.create({
        userId, 
        lessonId, 
        highestScore: score, 
        status: "completed", 
        completedAt: new Date()
      });
    }
    await progressRepo.save(progress);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    let isLevelUp = false;
    let newLevelInfo = checkLevelUp(user.xp);

    if (actualEarnedXP > 0) {
      user.xp += actualEarnedXP;
      newLevelInfo = checkLevelUp(user.xp);
      
      if (newLevelInfo.level > user.level) {
        user.level = newLevelInfo.level; 
        isLevelUp = true;
      }

      // Cập nhật Peak Rank nếu XP/Level mới cao hơn peak cũ
      if (user.xp > (user.peakXp || 0)) {
        user.peakXp = user.xp;
      }
      if (user.level > (user.peakLevel || 0)) {
        user.peakLevel = user.level;
      }

      await userRepo.save(user);
    }

    const newlyUnlockedBadges = await BadgeService.checkAndUnlockBadges(userId);

    // Save individual answers if provided
    if (answers && answers.length > 0) {
      for (const ans of answers) {
        // Upsert: delete old answer for this user+question, insert new
        await answerRepo.delete({ userId, questionId: ans.questionId });
        const userAnswer = answerRepo.create({
          userId,
          questionId: ans.questionId,
          selectedOption: ans.selectedOption,
          isCorrect: ans.isCorrect,
          answeredAt: new Date()
        });
        await answerRepo.save(userAnswer);
      }
    }

    return {
      userId: progress.userId,
      lessonId: progress.lessonId,
      highestScore: progress.highestScore,
      status: progress.status,
      
      earnedXP: actualEarnedXP,
      totalXP: user.xp,
      isLevelUp,
      newLevel: user.level,
      levelName: newLevelInfo.name,
      unlockedBadges: newlyUnlockedBadges 
    };
  }

  static async getMyProgress(userId: string) {
    return progressRepo.find({
      where: { userId },
      relations: ["lesson"],
      order: { completedAt: "DESC" }
    });
  }

  static async getLearningHistory(userId: string) {
    // Get all user answers with question + term data
    const allAnswers = await answerRepo.find({
      where: { userId },
      relations: ["question"],
      order: { answeredAt: "DESC" }
    });

    // Collect unique correct and wrong question IDs
    const correctTermIds = new Set<number>();
    const wrongAnswers: { questionId: number; selectedOption: number }[] = [];

    for (const ans of allAnswers) {
      if (ans.isCorrect && ans.question) {
        correctTermIds.add(ans.question.termId);
      } else if (!ans.isCorrect && ans.question) {
        // Only add if not already mastered in a later attempt
        wrongAnswers.push({ questionId: ans.questionId, selectedOption: ans.selectedOption });
      }
    }

    // Get mastered terms (terms answered correctly)
    const masteredTerms = correctTermIds.size > 0
      ? await termRepo.find({ where: [...correctTermIds].map(id => ({ id })) })
      : [];

    // Get weak words: wrong answers with full question + term data
    const weakWords: any[] = [];
    const seenTermIds = new Set<number>();

    for (const wa of wrongAnswers) {
      const question = await questionRepo.findOne({ where: { id: wa.questionId } });
      if (!question || correctTermIds.has(question.termId) || seenTermIds.has(question.termId)) continue;
      seenTermIds.add(question.termId);

      const term = await termRepo.findOneBy({ id: question.termId });
      if (!term) continue;

      // Count how many times this term was answered wrong
      const failedCount = allAnswers.filter(
        a => !a.isCorrect && a.question && a.question.termId === question.termId
      ).length;

      // Get the option text the user last chose
      const optionMap = ['optionA', 'optionB', 'optionC', 'optionD'] as const;
      const selectedText = question[optionMap[wa.selectedOption]] || 'Unknown';

      weakWords.push({
        word: term.termName,
        correctDef: term.definition,
        lastChoice: selectedText,
        failedCount
      });
    }

    // Progress data
    const progress = await progressRepo.find({
      where: { userId },
      relations: ["lesson"],
      order: { completedAt: "DESC" }
    });

    return {
      masteredTerms: masteredTerms.map(t => ({ word: t.termName, definition: t.definition })),
      weakWords,
      totalAnswered: allAnswers.length,
      totalCorrect: allAnswers.filter(a => a.isCorrect).length,
      quizzesCompleted: progress.filter(p => p.status === "completed").length
    };
  }
}