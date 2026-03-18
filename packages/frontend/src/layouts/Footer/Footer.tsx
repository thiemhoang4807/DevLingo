import { GraduationCap, Twitter, Github } from "lucide-react";

// Move static data outside to prevent re-creation on every render
const LEARN_LIST = ["Browse Terms", "Quizzes", "Flashcards"];
const COMPANY_LIST = ["About Us", "Contact", "Privacy Policy"];

export default function Footer() {
    return (
        <div className="font-['Inter'] h-[293px] py-[48px] px-[32px] text-[#fff] flex flex-col gap-[32px] border-t border-[#1F2937] bg-[#1F2937]">
            <div className="flex justify-between gap-[32px]">
                
                {/* Brand Info */}
                <div className="flex flex-col w-[280px]">
                    <div className="flex flex-row justify-start items-center w-[280px] cursor-pointer">
                        <GraduationCap className="w-[30.03px] h-[18px] pr-[8px]" color="#3B82F6"/>
                        <p className="font-bold text-[18px] leading-[28px]"> DevLingo </p>
                    </div>
                    <div className="w-[280px] h-[40px] font-normal text-[14px] leading-[20px] flex justify-start text-[#9CA3AF] text-left mt-2">
                        <p>The ultimate gamified dictionary for computer and internet terminology.</p>
                    </div>
                </div>

                {/* Learn Links */}
                <div className="text-[#9CA3AF] w-[280px] flex flex-col justify-between items-start gap-[16px]">
                    <h3 className="font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#FFFFFF] cursor-default">
                        LEARN
                    </h3>
                    <ul className="text-left flex flex-col gap-[8px]">
                        {LEARN_LIST.map(el => (
                            <li key={el} className="list-none hover:text-white transition-colors">
                                <a href="#"> {el} </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company Links */}
                <div className="text-[#9CA3AF] w-[280px] flex flex-col justify-between items-start gap-[16px]">
                    <h3 className="font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#FFFFFF] cursor-default"> 
                        COMPANY 
                    </h3>
                    <ul className="text-left flex flex-col gap-[8px]">
                        {COMPANY_LIST.map(el => (
                            <li key={el} className="list-none hover:text-white transition-colors">
                                <a href="#"> {el} </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Connect */}
                <div className="text-[#9CA3AF] w-[280px] flex flex-col items-start gap-[16px]">
                    <div>
                        <h3 className="font-bold text-[14px] leading-[20px] tracking-[.7px] text-[#FFFFFF] cursor-default"> 
                            CONNECT 
                        </h3>
                    </div>
                    <div className="flex flex-row gap-[16px] text-[#9CA3AF]">
                        <a href="#" className="w-[24px] h-[24px] hover:text-[#3B82F6] transition-colors"> <Twitter /> </a>
                        <a href="#" className="w-[24px] h-[24px] hover:text-white transition-colors"> <Github /> </a>
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