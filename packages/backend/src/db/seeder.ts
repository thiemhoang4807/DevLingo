import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AppDataSource } from "./dataSource";
import { Lesson } from "../entities/Lesson";
import { Term } from "../entities/Term";
import logger from "../utils/logger";

export async function runSeeder() {
    try {
        const lessonRepo = AppDataSource.getRepository(Lesson);
        const termRepo = AppDataSource.getRepository(Term);

        // 1. Kiểm tra xem database đã có dữ liệu chưa
        const lessonCount = await lessonRepo.count();
        if (lessonCount > 0) {
            logger.info("📦 Database already has lessons. Skipping seeder.");
            return;
        }

        logger.info("🚀 Starting database seeding from TermsData...");

        // 2. Tạo Lessons và lưu lại Map ID
        const categoryToLessonIdMap: Record<string, number> = {};
        const lessonNames = ["Internet Terms", "Hardware Terms", "Software Terms", "Technical Terms"];
        
        for (const name of lessonNames) {
            const lesson = new Lesson();
            lesson.title = name;
            lesson.description = `Học từ vựng chủ đề ${name}`;
            lesson.category = name;
            lesson.isPublished = true;
            const savedLesson = await lessonRepo.save(lesson);
            categoryToLessonIdMap[name] = savedLesson.id;
            logger.info(`✅ Created lesson: ${name}`);
        }

        // 3. Tìm thư mục TermsData
        // Khi chạy local, nó ở root. Khi trong Docker, nó được copy vào root của app (/app/TermsData)
        // Ta sẽ check một vài đường dẫn phổ biến
        const possiblePaths = [
            path.join(process.cwd(), "TermsData"), // Root workspace (e:\devLingo\TermsData hoặc /app/TermsData)
            path.join(__dirname, "../../../../TermsData"), // ts-node-dev từ src/db
            path.join(__dirname, "../../../TermsData") // dist/db
        ];

        let termsDataDir = "";
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                termsDataDir = p;
                break;
            }
        }

        if (!termsDataDir) {
            logger.error(`❌ TermsData directory not found! Database seeding failed.`);
            return;
        }

        // 4. Tạo Terms từ các file .md
        const categories = fs.readdirSync(termsDataDir);

        for (const category of categories) {
            const categoryPath = path.join(termsDataDir, category);
            if (!fs.statSync(categoryPath).isDirectory()) continue;

            const files = fs.readdirSync(categoryPath);

            for (const file of files) {
                if (!file.endsWith('.md')) continue;

                const filePath = path.join(categoryPath, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                
                const parsed = matter(fileContent); 
                const data = parsed.data;
                const content = parsed.content; 

                // Lấy lessonId dựa trên category từ markdown frontmatter
                const mappedLessonId = categoryToLessonIdMap[data.category] || Object.values(categoryToLessonIdMap)[0];

                const term = new Term();
                term.termName = data.title;
                term.definition = content.trim();
                term.lessonId = mappedLessonId;
                term.imageUrl = data.imageUrl || null;
                term.slangExplanation = data.slangExplanation || null;
                term.example = data.example || null;

                await termRepo.save(term);
                logger.info(`✅ Seeded term: ${data.title}`);
            }
        }
        logger.info("🎉 Database seeding completed successfully!");
    } catch (error) {
        logger.error("❌ Error during seeding: " + error);
    }
}
