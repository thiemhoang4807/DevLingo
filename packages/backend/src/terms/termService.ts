import { AppDataSource } from "../db/dataSource";
import { Term } from "../entities/Term";

const termRepo = AppDataSource.getRepository(Term);

export class TermService {
  static async updateTerm(id: number, data: any) {
    const term = await termRepo.findOneBy({ id });
    if (!term) throw new Error("Term not found");

    if (data.termName) term.termName = data.termName;
    if (data.definition) term.definition = data.definition;
    if (data.example) term.example = data.example;

    return await termRepo.save(term);
  }

  static async deleteTerm(id: number) {
    const term = await termRepo.findOneBy({ id });
    if (!term) throw new Error("Term not found");

    await termRepo.remove(term);
    return { message: "Term deleted successfully" };
  }

  static async getRecentTerms(limit: number = 5) {
    return await termRepo.find({
      order: { createdAt: "DESC" },
      take: limit
    });
  }

  static async getTrendingTerms(limit: number = 5) {
    return await termRepo.find({
      order: { viewCount: "DESC", termName: "ASC" },
      take: limit
    });
  }
}
