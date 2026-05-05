import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import { Term } from "../entities/Term";
import { Question } from "../entities/Question";

const lessonRepo = AppDataSource.getRepository(Lesson);
const termRepo = AppDataSource.getRepository(Term);
const questionRepo = AppDataSource.getRepository(Question);

export class LessonService {

  static async getAllPublishedLessons() {
    const lessons = await lessonRepo.find({
      where: { isPublished: true },
      order: { orderIndex: "ASC" }
    });

    return lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      name: lesson.category ?? lesson.title,
      category: lesson.category,
      difficulty: lesson.difficulty
    }));
  }

  static async getLessonDetailById(id: number) {
    const lesson = await lessonRepo.findOne({
      where: { id: id },
      relations: ["terms", "questions"] 
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }
    return {
    id: lesson.id,
    title: lesson.title,
    name: lesson.category ?? lesson.title,
    category: lesson.category,
    difficulty: lesson.difficulty,
    terms: lesson.terms.map(term => ({
      id: term.id,
      termName: term.termName,
      definition: term.definition
    })),
    questions: lesson.questions
      .sort((a, b) => a.id - b.id)
      .map(q => ({
        id: q.id,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: q.correctOption,
        xpReward: q.xpReward
      }))
  };
  }

  static async createLesson(title: string) {
    const existingLesson = await lessonRepo.findOne({
      where: { title: title }
    });

    if (existingLesson) {
      throw new Error("Lesson title already exists"); 
    }

    const newLesson = lessonRepo.create({
      title,
      isPublished: false 
    });

    await lessonRepo.save(newLesson);

    return {
      id: newLesson.id,
      title: newLesson.title,
      isPublished: newLesson.isPublished
    };
  }

  static async updateLesson(id: number, updateData: { title?: string; isPublished?: boolean }) {
    const lesson = await lessonRepo.findOne({
      where: { id: id }
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    if (updateData.title && updateData.title !== lesson.title) {
        const existingLesson = await lessonRepo.findOne({ where: { title: updateData.title } });
        if (existingLesson) throw new Error("Lesson title already exists");
    }

    Object.assign(lesson, updateData);
    await lessonRepo.save(lesson);

    return lesson;
  }

  static async deleteLesson(id: number) {
    const lesson = await lessonRepo.findOne({
      where: { id: id }
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    await lessonRepo.remove(lesson);
    return { message: "Lesson deleted successfully" };
  }

  static async addTermToLesson(lessonId: number, termData: any) {
    const newTerm = termRepo.create({
      ...termData,
      lessonId: lessonId
    });
    await termRepo.save(newTerm);
    return newTerm;
  }

  static async addQuestionToLesson(lessonId: number, questionData: any) {
    const newQuestion = questionRepo.create({
      ...questionData,
      lessonId: lessonId
    });
    await questionRepo.save(newQuestion);
    return newQuestion;
  }
}
