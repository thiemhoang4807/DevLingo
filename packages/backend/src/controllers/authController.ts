// Ví dụ logic trong authController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, fullName } = req.body;
        
        const userRepository = AppDataSource.getRepository(User);
        
        const newUser = new User();
        newUser.username = username;
        newUser.fullName = fullName;
        
        // QUAN TRỌNG: Gán mật khẩu từ frontend vào đúng cột passwordHash trong DB
        // Sau này ông nên dùng bcrypt để mã hóa chỗ này
        newUser.passwordHash = password; 

        await userRepository.save(newUser);
        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống", error });
    }
};