const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

const MOCK_DATA_DIR = path.join(__dirname, 'TermsData'); 
const API_URL = 'http://localhost:5000/api/terms';       
const ADMIN_TOKEN = 'Bearer <Dán token vào đây>'; 

// BẢNG DỊCH THUẬT
const categoryToLessonId = {
    "Internet Terms": 1,
    "Hardware Terms": 4,
    "Software Terms": 7,  
    "Technical Terms": 10 
};

// ⏱️ HÀM MỚI: Bắt hệ thống dừng lại một chút (tính bằng mili-giây)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function seedData() {
    console.log("🚀 Bắt đầu quét file .md...");

    const categories = fs.readdirSync(MOCK_DATA_DIR);

    for (const category of categories) {
        const categoryPath = path.join(MOCK_DATA_DIR, category);
        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const files = fs.readdirSync(categoryPath);

        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            const filePath = path.join(categoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            
            const parsed = matter(fileContent); 
            const data = parsed.data;
            const content = parsed.content; 

            const mappedLessonId = categoryToLessonId[data.category] || 1;

            try {
                await axios.post(API_URL, {
                    termName: data.title,             
                    definition: content.trim(),       
                    lessonId: mappedLessonId,         
                    relatedTerms: data.relatedTerms ? JSON.stringify(data.relatedTerms) : "[]" 
                }, {
                    headers: { 'Authorization': ADMIN_TOKEN }
                });

                console.log(`✅ Đã nạp thành công: ${data.title}`);
                
                // ⏱️ Nghỉ giải lao 200ms (0.2 giây) trước khi nạp từ tiếp theo để lách luật ông Kiệt
                await delay(200); 

            } catch (error) {
                const backendErrorMessage = error.response?.data?.message || error.message;
                console.error(`❌ Lỗi khi nạp [${data.title}]:`, backendErrorMessage);
            }
        }
    }
    console.log("🎉 Hoàn tất nạp toàn bộ dữ liệu!");
}

seedData();