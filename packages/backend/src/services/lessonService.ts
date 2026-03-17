import { AppDataSource } from "../db/dataSource";
import { Lesson } from "../entities/Lesson";

export const createLesson = async (data: {
  title: string;
  description?: string;
}) => {
  const lessonRepo = AppDataSource.getRepository(Lesson);

  const lesson = lessonRepo.create({
    title: data.title,
    description: data.description,
    isPublished: false,
  });

  return await lessonRepo.save(lesson);
};