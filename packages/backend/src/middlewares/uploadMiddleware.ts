import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Hàm tạo storage linh hoạt cho từng thư mục (badges, lessons, v.v.)
const createStorage = (subFolder: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        // Đường dẫn: packages/backend/uploads/badges hoặc packages/backend/uploads/lessons
        const rootDir = process.cwd(); // Đảm bảo lấy đúng thư mục gốc của backend
        const uploadPath = path.join(rootDir, 'uploads', subFolder);
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Tên file: thumbnail-123456.png hoặc image-123456.jpg
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Bộ lọc định dạng ảnh dùng chung
const imageFilter = (req: any, file: any, cb: any) => {
    const filetypes = /jpeg|jpg|png|svg|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Định dạng không hỗ trợ! Chỉ chấp nhận jpg, png, svg, webp."));
};

// --- EXPORTS ---

// Dùng cho Admin Badge API (Giới hạn 2MB)
export const uploadBadge = multer({ 
    storage: createStorage('badges'),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: imageFilter
});

// Dùng cho Admin Lesson API (Giới hạn 5MB cho ảnh bài học chất lượng cao hơn)
export const uploadLesson = multer({ 
    storage: createStorage('lessons'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFilter
});