const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

const MOCK_DATA_DIR = path.join(__dirname, 'TermsData'); 
const API_URL = 'https://devlingo-backend-vercel-1075077880290.europe-west1.run.app/api/terms';  
const ADMIN_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMDUzZWU3LTBhZmMtNDJjNS1hNDRhLThmZGRiMTgwYjQ0OSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3Nzk4OTA2OSwiZXhwIjoxNzc4NTkzODY5fQ.2R3YeMVdcXd8iR_W5AMrREwRjGecxAkUMle4FC9BTPE'; 

// BẢNG DỊCH THUẬT
const categoryToLessonId = {
    "Internet Terms": 1,
    "Hardware Terms": 2,
    "Software Terms": 3,  
    "Technical Terms": 4 
};

// ⏱️ HÀM MỚI: Bắt hệ thống dừng lại một chút (tính bằng mili-giây)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function seedData() {
    console.log("🚀 Bắt đầu quét file .md...");

    // --- ĐOẠN CODE TỰ ĐỘNG TẠO LESSON ---
    const lessonApiUrl = API_URL.replace('/terms', '/lessons'); // Đổi link terms thành lessons
    const lessonNames = ["Internet Terms", "Hardware Terms", "Software Terms", "Technical Terms"];
    
    console.log("📦 Đang kiểm tra và khởi tạo các Bài học (Lessons)...");
    for (const name of lessonNames) {
        try {
            await axios.post(lessonApiUrl, {
                title: name,
                description: `Học từ vựng chủ đề ${name}`
            }, {
                headers: { 'Authorization': ADMIN_TOKEN }
            });
            console.log(`✅ Đã tạo bài học: ${name}`);
            await delay(300); // Nghỉ 1 xíu
        } catch (err) {
            console.log(`⚠️ Bài học [${name}] có thể đã tồn tại hoặc lỗi:`, err.response?.data?.message || err.message);
        }
    }
    console.log("-----------------------------------------");
    // --- KẾT THÚC ĐOẠN TẠO LESSON ---

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
                // 📦 ĐÓNG GÓI DỮ LIỆU GỬI LÊN BACKEND
                await axios.post(API_URL, {
                    termName: data.title,             
                    definition: content.trim(),       
                    lessonId: mappedLessonId,         
                    imageUrl: data.imageUrl || null   
                }, {
                    headers: { 'Authorization': ADMIN_TOKEN }
                });

                console.log(`✅ Đã nạp thành công: ${data.title}`);
                
                // ⏱️ Nghỉ giải lao 200ms (0.2 giây) trước khi nạp từ tiếp theo 
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
