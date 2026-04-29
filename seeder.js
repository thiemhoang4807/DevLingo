const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

const MOCK_DATA_DIR = path.join(__dirname, 'TermsData'); 
const API_URL = 'http://localhost:5000/api/terms';       
const ADMIN_TOKEN = 'Bearer ĐIỀN_TOKEN_VÀO_ĐÂY';          

// 🚀 BẢNG DỊCH THUẬT: Biến chữ Category thành số lessonId cho API 
const categoryToLessonId = {
    "Internet Terms": 1,
    "Hardware Terms": 4,
    "Software Terms": 7,  
    "Technical Terms": 10 
};

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
            
            // gray-matter sẽ tách làm 2 phần:
            // parsed.data: Chứa title, category, relatedTerms
            // parsed.content: Chứa TOÀN BỘ chữ nằm dưới dấu --- (# Backend \n In the computer world...)
            const parsed = matter(fileContent); 
            const data = parsed.data;
            const content = parsed.content; 

            // Tự động suy ra lessonId từ bảng dịch thuật ở trên
            const mappedLessonId = categoryToLessonId[data.category] || 1;

            try {
                // Đóng gói hàng gửi cho Kiệt
                await axios.post(API_URL, {
                    termName: data.title,             
                    definition: content.trim(),       
                    lessonId: mappedLessonId,         // Gửi số ID chứ không gửi chữ
                    
                    // Xử lý mảng relatedTerms thành chuỗi JSON để Database dễ lưu
                    relatedTerms: data.relatedTerms ? JSON.stringify(data.relatedTerms) : "[]" 
                }, {
                    headers: { 'Authorization': ADMIN_TOKEN }
                });

                console.log(`✅ Đã nạp thành công: ${data.title}`);
            } catch (error) {
                console.error(`❌ Lỗi khi nạp ${data.title}:`, error.message);
            }
        }
    }
    console.log("🎉 Hoàn tất nạp toàn bộ dữ liệu!");
}

seedData();
