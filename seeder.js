const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const axios = require('axios');

// 1. CẤU HÌNH ĐƯỜNG DẪN VÀ API
const MOCK_DATA_DIR = path.join(__dirname, 'mock-data'); // Thư mục chứa các file .md
    const API_URL = 'http://localhost:5000/api/terms';       
    const ADMIN_TOKEN = 'ĐIỀN_TOKEN_ADMIN_VÀO_ĐÂY';          

async function seedData() {
    console.log("🚀 Bắt đầu quét file .md và nạp vào Database...");

    // Lấy danh sách các thư mục chủ đề (Internet Terms, Hardware Terms...)
    const categories = fs.readdirSync(MOCK_DATA_DIR);

    for (const category of categories) {
        const categoryPath = path.join(MOCK_DATA_DIR, category);
        
        // Bỏ qua nếu không phải là thư mục
        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const files = fs.readdirSync(categoryPath);

        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            // 2. ĐỌC VÀ BÓC TÁCH FILE .MD
            const filePath = path.join(categoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const parsed = matter(fileContent); // Bóc tách bằng gray-matter
            const data = parsed.data; // Đây chính là cục data nằm trong ---

            // 3. GỌI API ĐỂ BƠM VÀO DATABASE
            try {
                await axios.post(API_URL, {
                    termName: data.termName,
                    definition: data.definition,
                    example: data.example,
                    lessonId: data.lessonId 
                    // Có thể truyền thêm description là parsed.content (nội dung bên dưới ---)
                }, {
                    headers: { 'Authorization': ADMIN_TOKEN }
                });

                console.log(`✅ Đã nạp thành công: ${data.termName}`);
            } catch (error) {
                console.error(`❌ Lỗi khi nạp ${data.termName}:`, error.response?.data?.message || error.message);
            }
        }
    }
    console.log("🎉 Hoàn tất nạp toàn bộ dữ liệu!");
}

seedData();