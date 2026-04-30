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

  static async getLessons(search?: string, difficulty?: string, page: number = 1, limit: number = 10) {
    const query = lessonRepo.createQueryBuilder("lesson");

    query.where("lesson.isPublished = :isPublished", { isPublished: true });

    if (search) query.andWhere("lesson.title LIKE :search", { search: `%${search}%` });
    if (difficulty) query.andWhere("lesson.difficulty = :difficulty", { difficulty });

    query.skip((page - 1) * limit).take(limit);
    const [lessons, total] = await query.getManyAndCount();

    return {
      lessons,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getLessonDetailById(id: number) {
    const lesson = await lessonRepo.findOne({
      where: { id: id },
      relations: ["terms", "questions"] 
    });

    if (!lesson) throw new Error("Lesson not found");

    return {
      id: lesson.id,
      title: lesson.title,
      category: lesson.category,
      description: lesson.description,
      difficulty: lesson.difficulty,
      thumbnailUrl: lesson.thumbnailUrl,
      isPublished: lesson.isPublished,
      terms: lesson.terms.map(term => ({
        id: term.id,
        termName: term.termName,
        definition: term.definition,
        imageUrl: term.imageUrl
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

  static async createLesson(data: any, thumbnailUrl: string | null) {
    if (!data.title) throw new Error("Title is required");

    const existingLesson = await lessonRepo.findOne({ where: { title: data.title } });
    if (existingLesson) throw new Error("Lesson title already exists"); 

    const newLesson = lessonRepo.create({
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      isPublished: data.isPublished === 'true' || data.isPublished === true,
      thumbnailUrl, 
    });

    return await lessonRepo.save(newLesson);
  }

  static async updateLesson(id: number, data: any, newThumbnailUrl: string | null) {
    const lesson = await lessonRepo.findOne({ where: { id: id } });
    if (!lesson) throw new Error("Lesson not found");

    if (data.title && data.title !== lesson.title) {
        const existingLesson = await lessonRepo.findOne({ where: { title: data.title } });
        if (existingLesson) throw new Error("Lesson title already exists");
    }

    if (newThumbnailUrl) {
      if (lesson.thumbnailUrl) {
        const oldImagePath = path.join(process.cwd(), lesson.thumbnailUrl); 
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      lesson.thumbnailUrl = newThumbnailUrl;
    }

    if (data.title) lesson.title = data.title;
    if (data.description) lesson.description = data.description;
    if (data.difficulty) lesson.difficulty = data.difficulty;
    if (data.isPublished !== undefined) lesson.isPublished = data.isPublished === 'true' || data.isPublished === true;

    return await lessonRepo.save(lesson);
  }

  static async deleteLesson(id: number) {
    const lesson = await lessonRepo.findOne({ where: { id: id } });
    if (!lesson) throw new Error("Lesson not found");

    if (lesson.thumbnailUrl) {
      const imagePath = path.join(process.cwd(), lesson.thumbnailUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await lessonRepo.remove(lesson);
    return { message: "Lesson deleted successfully" };
  }

  static async addTermToLesson(lessonId: number, termData: any) {
    const newTerm = termRepo.create({ ...termData, lessonId: lessonId });
    return await termRepo.save(newTerm);
  }

  static async addQuestionToLesson(lessonId: number, questionData: any) {
    const newQuestion = questionRepo.create({ ...questionData, lessonId: lessonId });
    return await questionRepo.save(newQuestion);
  }
}