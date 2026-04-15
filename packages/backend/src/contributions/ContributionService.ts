import { AppDataSource } from "../db/dataSource";
import { Contribution } from "../entities/Contribution";
import { Lesson } from "../entities/Lesson";

const contributionRepo = AppDataSource.getRepository(Contribution);
const lessonRepo = AppDataSource.getRepository(Lesson);

interface SubmitContributionInput {
  lessonId?: number;
  termName?: string;
  definition?: string;
  imageUrl?: string;
}

export class ContributionService {
  static async submitContribution(userId: string, payload: SubmitContributionInput) {
    const lessonId = Number(payload.lessonId);
    const termName = payload.termName?.trim();
    const definition = payload.definition?.trim();
    const imageUrl = payload.imageUrl?.trim() || null;

    if (!lessonId || Number.isNaN(lessonId)) {
      throw new Error("lessonId is required");
    }

    if (!termName) {
      throw new Error("termName is required");
    }

    if (!definition) {
      throw new Error("definition is required");
    }

    const lesson = await lessonRepo.findOneBy({ id: lessonId });
    if (!lesson) {
      throw new Error("Lesson not found");
    }

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
      order: { createdAt: "DESC" },
    });
  }
}