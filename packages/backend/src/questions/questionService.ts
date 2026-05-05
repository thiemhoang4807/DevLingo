import { AppDataSource } from "../db/dataSource";
import { Question } from "../entities/Question";

const questionRepo = AppDataSource.getRepository(Question);

export class QuestionService {

  static async getQuestionsByLessonId(lessonId: number) {
    const questions = await questionRepo.find({
      where: { lessonId },
      order: { id: "ASC" }
    });
    return questions;
  }

  static async getQuestionById(id: number) {
    const question = await questionRepo.findOne({ where: { id: id } });
    if (!question) throw new Error("Không tìm thấy câu hỏi này");
    return question;
  }

  static async updateQuestion(id: number, updateData: any) {
    const question = await questionRepo.findOne({ where: { id: id } });
    if (!question) throw new Error("Không tìm thấy câu hỏi này");

    Object.assign(question, updateData);
    await questionRepo.save(question);
    
    return question;
  }

  static async deleteQuestion(id: number) {
    const question = await questionRepo.findOne({ where: { id: id } });
    if (!question) throw new Error("Không tìm thấy câu hỏi này");

    await questionRepo.remove(question);
    return { message: "Đã xóa câu hỏi thành công" };
  }
}
