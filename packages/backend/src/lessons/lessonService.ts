import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";
import { Term } from "../entities/Term";
import { Question } from "../entities/Question";
import fs from "fs";
import path from "path";

const lessonRepo = AppDataSource.getRepository(Lesson);
const termRepo = AppDataSource.getRepository(Term);
const questionRepo = AppDataSource.getRepository(Question);

export class LessonService {

  static async getLessons(search?: string, difficulty?: string, page: number = 1, limit: number = 10) {
    const queryBuilder = lessonRepo.createQueryBuilder("lesson");

    if (search) {
      queryBuilder.andWhere("lesson.title LIKE :search", { search: `%${search}%` });
    }
    
    if (difficulty) {
      queryBuilder.andWhere("lesson.difficulty = :difficulty", { difficulty });
    }

    const [lessons, total] = await queryBuilder
      .orderBy("lesson.orderIndex", "ASC")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      lessons,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getAllPublishedLessons() {
    const lessons = await lessonRepo.find({
      where: { isPublished: true },
      order: { orderIndex: "ASC" },
      select: ["id", "title", "category", "difficulty"]
    });

    return lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      name: lesson.category ?? lesson.title,
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
      category: lesson.category,
      difficulty: lesson.difficulty,
      terms: lesson.terms.map(term => ({
        id: term.id,
        termName: term.termName,
        definition: term.definition
      })),
      questions: lesson.questions.map(q => ({
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

  static async createLesson(data: any, thumbnailUrl?: string | null): Promise<any> {
    if (data.title) {
      const existingLesson = await lessonRepo.findOne({ where: { title: data.title } });
      if (existingLesson) {
        throw new Error("Lesson title already exists");
      }
    }

    const newLesson = lessonRepo.create({
      ...data,
      thumbnailUrl: thumbnailUrl
    });
    await lessonRepo.save(newLesson);
    return newLesson;

  }



  static async updateLesson(id: number, updateData: any, newThumbnailUrl?: string | null) {
    const lesson = await lessonRepo.findOne({ where: { id: id } });
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    if (updateData.title && updateData.title !== lesson.title) {
      const existingLesson = await lessonRepo.findOne({ where: { title: updateData.title } });
      if (existingLesson) throw new Error("Lesson title already exists");
    }
    Object.assign(lesson, updateData);

    if (newThumbnailUrl) {
      lesson.thumbnailUrl = newThumbnailUrl;
    }
    await lessonRepo.save(lesson);
    return lesson;
  }

  static async deleteLesson(id: number) {
    const lesson: any = await lessonRepo.findOne({ where: { id: id } });
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    if (lesson.thumbnailUrl) {
        const filePath = path.join(__dirname, "../../", lesson.thumbnailUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
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
