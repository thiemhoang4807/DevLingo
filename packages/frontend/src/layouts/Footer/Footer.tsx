import { GraduationCap, Facebook, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Đã chuyển sang mảng Object để chứa được cả Tên và Đường dẫn (Path)
const LEARN_LIST = [
    { name: "Browse Terms", path: "/term" },
    { name: "Quizzes", path: "/quizzes" },
    { name: "Learning History", path: "/learning-history" }
];

const TEAM_LIST = [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
];

export default function Footer() {
    return (
        <div className="font-['Inter'] h-auto py-10 sm:py-[48px] px-5 sm:px-[32px] text-[#fff] flex flex-col gap-[32px] border-t border-[#1F2937] bg-[#1F2937]">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[32px]">
                
                {/* Brand Info */}
                <div className="flex flex-col w-full max-w-[280px]">
                    <div className="flex flex-row justify-start items-center w-full cursor-pointer">
                        <GraduationCap className="w-[30.03px] h-[18px] pr-[8px]" color="#3B82F6"/>
                        <p className="font-bold text-[18px] leading-[28px]"> DevLingo </p>
                    </div>
                    <div className="w-full font-normal text-[14px] leading-[20px] flex justify-start text-[#9CA3AF] text-left mt-2">
                        <p>The ultimate gamified dictionary for computer and internet terminology.</p>
                    </div>
                </div>

                {/* Learn Links */}
                <div className="text-[#9CA3AF] w-full max-w-[280px] flex flex-col justify-between items-start gap-[16px]">
                    <h3 className="font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#FFFFFF] cursor-default">
                        LEARN
                    </h3>
                    <ul className="text-left flex flex-col gap-[8px]">
                        {LEARN_LIST.map(el => (
                            <li key={el.name} className="list-none hover:text-white transition-colors">
                                <Link to={el.path}> {el.name} </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Team Links */}
                <div className="text-[#9CA3AF] w-full max-w-[280px] flex flex-col justify-between items-start gap-[16px]">
                    <h3 className="font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#FFFFFF] cursor-default"> 
                        TEAM 
                    </h3>
                    <ul className="text-left flex flex-col gap-[8px]">
                        {TEAM_LIST.map(el => (
                            <li key={el.name} className="list-none hover:text-white transition-colors">
                                <Link to={el.path}> {el.name} </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Connect */}
                <div className="text-[#9CA3AF] w-full max-w-[280px] flex flex-col items-start gap-[16px]">
                    <div>
                        <h3 className="font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#FFFFFF] cursor-default"> 
                            CONNECT 
                        </h3>
                    </div>
                    <div className="flex flex-row gap-[16px] text-[#9CA3AF]">
                        <a href="https://www.facebook.com/diamond487/" target="_blank" rel="noopener noreferrer" className="w-[24px] h-[24px] hover:text-[#3B82F6] transition-colors"> 
                            <Facebook /> 
                        </a>
                        <a href="https://github.com/thiemhoang4807" target="_blank" rel="noopener noreferrer" className="w-[24px] h-[24px] hover:text-white transition-colors"> 
                            <Github /> 
                        </a>
                        <a href="mailto:hoanglvt.4807@gmail.com" className="w-[24px] h-[24px] hover:text-[#EA4335] transition-colors" aria-label="Email hoanglvt.4807@gmail.com">
                            <Mail />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[#374151] pt-[32px] text-center">
                <p className="font-normal text-[14px] leading-[20px] text-[#9CA3AF]">
                    © 2026 DevLingo. All rights reserved.
                </p>
            </div>
        </div>
    );
}
