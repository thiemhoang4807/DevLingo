import { Sun, Moon, GraduationCap, Search } from "lucide-react";
import logo from "../../assets/images/icon_user.png";
import { useTheme } from "../../context/ThemeContext";

const TABS = ["Terms", "Quizzes", "Contribution"];

export default function Header() {
    // Kéo theme và hàm toggleTheme từ Context ra dùng
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`font-['Inter'] flex justify-between h-[65px] border-b pr-8 pl-8 transition-colors ${theme === 'dark' ? 'bg-[#1E1E1E] border-[#374151]' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-row items-center gap-[40px]">
                
                <div className={`flex items-center cursor-pointer ${theme === 'dark' ? 'text-[#fff]' : 'text-gray-900'}`} title="DevLingo">
                    <div className="flex justify-center items-center pr-[8px]">
                        <GraduationCap className="w-[27.54px] h-[22.5px]" color="#3B82F6"/>
                    </div>
                    <div className="flex justify-start items-center font-bold text-[20px] leading-[28px] tracking-tight">
                        <p>DevLingo</p>
                    </div>
                </div>

                <div className="relative flex items-center">
                    <input 
                        id="search" 
                        placeholder="Search" 
                        className={`w-[306px] border rounded-[10px] h-[40px] pl-[12px] pr-[40px] font-medium text-[15px] focus:outline-none focus:border-[#3B82F6] transition-colors ${
                            theme === 'dark' 
                            ? 'border-[#626262] bg-[#4A4A4AA6] text-[#B2B2B2]' 
                            : 'border-gray-300 bg-gray-100 text-gray-800'
                        }`}
                    />
                    <button className="absolute right-[12px] flex items-center justify-center cursor-pointer">
                        <Search className={`w-[18px] h-[18px] transition-colors ${theme === 'dark' ? 'text-[#A9A9A9] hover:text-white' : 'text-gray-500 hover:text-black'}`}/>
                    </button>
                </div>
            </div>

            <div className="flex justify-end items-center gap-[32px]">
                <ul className="flex gap-[32px]">
                    {TABS.map(el => (
                        <li key={el} className={`list-none cursor-pointer font-medium text-[16px] leading-[24px] h-[64px] flex flex-col items-center justify-center transition-colors relative group ${theme === 'dark' ? 'text-[#D1D5DB] hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                            <a href="#">{el}</a>
                            <div className="absolute bottom-0 w-full h-[3px] rounded-t-[5px] bg-[#3B82F6] hidden group-hover:block"></div>
                        </li>
                    ))}
                </ul>

                {/* --- NÚT ĐỔI THEME CHÍNH THỨC HOẠT ĐỘNG --- */}
                <div className="p-[8px] cursor-pointer" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                        <Sun className="text-[#D1D5DB] hover:text-white transition-colors"/>
                    ) : (
                        <Moon className="text-gray-600 hover:text-black transition-colors"/>
                    )}
                </div>

                <div className="pl-[8px] flex justify-end items-center">
                    <div className="w-[41px] h-[41px] rounded-full bg-[#fafafa] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#3B82F6] transition-all" title="User">
                        <img src={logo} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}