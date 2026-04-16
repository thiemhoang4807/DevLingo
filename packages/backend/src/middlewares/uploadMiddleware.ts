import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Đảm bảo thư mục lưu ảnh luôn tồn tại (nếu chưa có thì tự động tạo)
const ensureDirectoryExistence = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// 2. Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Sếp lưu ảnh vào thư mục uploads/badges (sau này có thể đổi tên tùy ý)
    const uploadPath = path.join(process.cwd(), "uploads/badges"); 
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Đổi tên file để không bao giờ bị trùng (VD: image-1710000000.png)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// 3. Bộ lọc: Chỉ cho phép người dùng up ảnh, cấm up file bậy bạ (exe, pdf...)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép tải lên file định dạng ảnh (JPG, PNG, GIF, WEBP)!"));
  }
};

// 4. Đóng gói lại thành biến uploadBadge để export ra ngoài
export const uploadBadge = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn ảnh tối đa 5MB cho nhẹ Server
});