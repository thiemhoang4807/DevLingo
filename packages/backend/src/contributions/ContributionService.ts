import { AppDataSource } from "../db/dataSource";
import { Contribution } from "../entities/Contribution";
import { Lesson } from "../entities/Lesson";
import { Term } from "../entities/Term"; 

const contributionRepo = AppDataSource.getRepository(Contribution);
const lessonRepo = AppDataSource.getRepository(Lesson);
const termRepo = AppDataSource.getRepository(Term); 

interface SubmitContributionInput {
  lessonId?: number;
  termName?: string;
  definition?: string;
  imageUrl?: string | null;
}

export class ContributionService {
  // ==========================================
  // 🟢 USER METHODS
  // ==========================================

  static async submitContribution(userId: string, payload: SubmitContributionInput) {
    const lessonId = Number(payload.lessonId);
    const termName = payload.termName?.trim();
    const definition = payload.definition?.trim();
    const imageUrl = payload.imageUrl; 

    // Validation
    if (!lessonId || Number.isNaN(lessonId)) throw new Error("lessonId is required");
    if (!termName) throw new Error("termName is required");
    if (!definition) throw new Error("definition is required");

    const lesson = await lessonRepo.findOneBy({ id: lessonId });
    if (!lesson) throw new Error("Lesson not found");

    const contribution = contributionRepo.create({
      lessonId,
      termName,
      definition,
      imageUrl,
      contributorId: userId,
      status: "pending",
    });

    await contributionRepo.save(contribution);

    return await contributionRepo.findOne({
      where: { id: contribution.id },
      relations: ["lesson", "contributor"],
    });
  }

  static async getMyContributions(userId: string) {
    return await contributionRepo.find({
      where: { contributorId: userId },
      relations: ["lesson"],
      order: { createdAt: "DESC" }
    });
  }

  // ==========================================
  // 🔴 ADMIN METHODS
  // ==========================================

  static async getContributions(status?: string) {
    // Ép kiểu status để tránh lỗi TypeORM nếu status không khớp Enum
    const whereCondition = status ? { status: String(status) as any } : undefined;
    
    return await contributionRepo.find({
      where: whereCondition,
      relations: ["lesson", "contributor"],
      order: { createdAt: "DESC" }, 
    });
  }

  static async approveContribution(id: number, reviewNote?: string) {
    const contribution = await contributionRepo.findOneBy({ id });
    if (!contribution) return null; 

    if (contribution.status !== "pending") {
      throw new Error("Contribution has already been processed");
    }

    const existingTerm = await termRepo.findOneBy({
      lessonId: contribution.lessonId,
      termName: contribution.termName,
    });

    if (existingTerm) {
      throw new Error("Term already exists in this lesson");
    }

    // 1. Tạo từ vựng mới đưa vào bài học
    const newTerm = termRepo.create({
      lessonId: contribution.lessonId,
      termName: contribution.termName,
      definition: contribution.definition,
      imageUrl: contribution.imageUrl || null,
    });
    await termRepo.save(newTerm);

    // 2. Cập nhật trạng thái đóng góp
    contribution.status = "approved";
    contribution.reviewNote = reviewNote || null;
    contribution.reviewedAt = new Date();
    await contributionRepo.save(contribution);

    return { contribution, term: newTerm };
  }

  static async rejectContribution(id: number, reviewNote?: string) {
    const contribution = await contributionRepo.findOneBy({ id });
    if (!contribution) return null;

    if (contribution.status !== "pending") {
      throw new Error("Contribution has already been processed");
    }

    contribution.status = "rejected";
    contribution.reviewNote = reviewNote?.trim() || "Rejected by admin";
    contribution.reviewedAt = new Date();
    
    return await contributionRepo.save(contribution);
  }
}