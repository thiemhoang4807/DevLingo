import { Request, Response } from "express";
import { AppDataSource } from "../db/dataSource";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, fullName } = req.body;
        
        const userRepository = AppDataSource.getRepository(User);
        
        // Check if the username already exists to prevent duplicate entries
        const existingUser = await userRepository.findOneBy({ username });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: "Username already exists. Please choose another one." 
            });
        }
        
        const newUser = new User();
        newUser.username = username;
        newUser.fullName = fullName;
        
        // Hash the password securely using bcrypt before saving to DB
        const saltRounds = 10;
        newUser.passwordHash = await bcrypt.hash(password, saltRounds); 

        await userRepository.save(newUser);
        
        // IMPORTANT: Return 'success: true' to match the Frontend React logic
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully" 
        });
    } catch (error: unknown) {
        // Return structured error
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error 
        });
    }
};