import { Sun, GraduationCap, Search } from "lucide-react";
import logo from "../../assets/images/icon_user.png";

// Move static tabs outside
const TABS = ["Terms", "Quizzes", "Contribution"];

export default function Header() {
    return (
        <div className="font-['Inter'] flex justify-between h-[65px] border-b border-[#374151] pr-8 pl-8 bg-[#1E1E1E]">
            <div className="flex flex-row items-center gap-[40px]">
                
                {/* Logo */}
                <div className="flex items-center text-[#fff] cursor-pointer" title="DevLingo">
                    <div className="flex justify-center items-center pr-[8px]">
                        <GraduationCap className="w-[27.54px] h-[22.5px]" color="#3B82F6"/>
                    </div>
                    <div className="flex justify-start items-center font-bold text-[20px] leading-[28px] tracking-tight text-[#E5E7EB]">
                        <p>DevLingo</p>
                    </div>
                </div>

                {/* Search Bar - Wrapped in relative for better icon positioning */}
                <div className="relative flex items-center">
                    <input 
                        id="search" 
                        placeholder="Search" 
                        className="w-[306px] border border-[#626262] rounded-[10px] h-[40px] bg-[#4A4A4AA6] pl-[12px] pr-[40px] text-[#B2B2B2] font-medium text-[15px] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                    <button className="absolute right-[12px] flex items-center justify-center cursor-pointer">
                        <Search className="w-[18px] h-[18px] text-[#A9A9A9] hover:text-white transition-colors"/>
                    </button>
                </div>
            </div>

            {/* Right Menu */}
            <div className="flex text-[#fff] justify-end items-center gap-[32px]">
                {/* Navigation Tabs */}
                <ul className="flex gap-[32px]">
                    {TABS.map(el => (
                        <li key={el} className="list-none cursor-pointer font-medium text-[16px] leading-[24px] text-[#D1D5DB] h-[64px] flex flex-col items-center justify-center hover:text-white transition-colors relative group">
                            <a href="#">{el}</a>
                            {/* Hover effect indicator */}
                            <div className="absolute bottom-0 w-full h-[3px] rounded-t-[5px] bg-[#3B82F6] hidden group-hover:block"></div>
                        </li>
                    ))}
                </ul>

                {/* Theme Toggle */}
                <div className="p-[8px]">
                    <Sun className="text-[#D1D5DB] hover:text-white cursor-pointer transition-colors"/>
                </div>

                {/* User Avatar */}
                <div className="pl-[8px] flex justify-end items-center">
                    <div className="w-[41px] h-[41px] rounded-full bg-[#fafafa] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#3B82F6] transition-all" title="User">
                        <img src={logo} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}