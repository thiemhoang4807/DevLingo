import { useState, useEffect, useRef } from "react";
import { Sun, Moon, GraduationCap, Search, User, LogOut, History } from "lucide-react";
// 🚀 Đã đổi sang avata.png đồng bộ
import defaultAvatar from "../../assets/images/avata.png";
import { useTheme } from "../../context/ThemeContext";
import axiosClient from '../../api/axiosClient';
import { useNavigate } from "react-router-dom";

const TABS = ["Terms", "Quizzes", "Contribution", "Contact"];

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response: any = await axiosClient.get('/api/users/me');
                const userData = response.data?.data || response.data || response;
                setCurrentUser(userData);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProfile();

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getAvatarUrl = (avatarPath: string) => {
        if (!avatarPath) {
            return defaultAvatar; // Dùng ảnh mặc định mới
        }
        if (avatarPath.startsWith('http')) {
            return avatarPath;
        }
        return `http://localhost:5000${avatarPath}`;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleTabClick = (tab: string) => {
        if (tab === "Terms") {
            navigate("/term");
        }
        else if (tab === "Quizzes") {
            navigate("/quizzes");
        }
        else if (tab === "Contribution") {
            navigate("/contribution");
        }
        else if (tab === "Contact") {
            navigate("/contact");
        }
    };

    return (
        <div className={`font-['Inter'] flex justify-between items-center h-[65px] border-b pr-8 pl-8 transition-colors ${theme === 'dark' ? 'bg-[#1E1E1E] border-[#374151]' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-row items-center gap-[40px]">
                <div
                    onClick={() => navigate('/dashboard')}
                    className={`flex items-center cursor-pointer ${theme === 'dark' ? 'text-[#fff]' : 'text-gray-900'}`}
                    title="DevLingo"
                >
                    <div className="flex justify-center items-center pr-[8px]">
                        <GraduationCap className="w-[27.54px] h-[22.5px]" color="#3B82F6" />
                    </div>
                    <div className="flex justify-start items-center font-bold text-[20px] leading-[28px] tracking-tight">
                        <p>DevLingo</p>
                    </div>
                </div>

                <div className="relative flex items-center">
                    <input
                        id="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchQuery.trim()) {
                                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                                setSearchQuery("");
                            }
                        }}
                        className={`w-[306px] border rounded-[10px] h-[40px] pl-[12px] pr-[40px] font-medium text-[15px] focus:outline-none focus:border-[#3B82F6] transition-colors ${theme === 'dark'
                            ? 'border-[#626262] bg-[#4A4A4AA6] text-[#B2B2B2]'
                            : 'border-gray-300 bg-gray-100 text-gray-800'
                            }`}
                    />
                    <div 
                        className="absolute right-[12px] flex items-center justify-center cursor-pointer"
                        onClick={() => {
                            if (searchQuery.trim()) {
                                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                                setSearchQuery("");
                            }
                        }}
                    >
                        <Search className={`w-[18px] h-[18px] transition-colors ${theme === 'dark' ? 'text-[#A9A9A9] hover:text-white' : 'text-gray-500 hover:text-black'}`} />
                    </div>
                </div>
            </div>

            <div className="flex justify-end items-center gap-[32px]">
                <ul className="flex gap-[32px]">
                    {TABS.map(el => (
                        <li
                            key={el}
                            onClick={() => handleTabClick(el)}
                            className={`list-none cursor-pointer font-medium text-[16px] leading-[24px] h-[64px] flex flex-col items-center justify-center transition-colors relative group ${theme === 'dark' ? 'text-[#D1D5DB] hover:text-white' : 'text-gray-600 hover:text-black'}`}
                        >
                            <span>{el}</span>
                            <div className="absolute bottom-0 w-full h-[3px] rounded-t-[5px] bg-[#3B82F6] hidden group-hover:block"></div>
                        </li>
                    ))}
                </ul>

                <div className="p-[8px] cursor-pointer" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                        <Sun className="text-[#D1D5DB] hover:text-white transition-colors" />
                    ) : (
                        <Moon className="text-gray-600 hover:text-black transition-colors" />
                    )}
                </div>

                <div className="pl-[8px] flex items-center gap-3">
                    {isLoading ? (
                        <div className="flex items-center gap-3 animate-pulse">
                            <div className="w-24 h-4 bg-gray-500/30 rounded-md"></div>
                            <div className="w-[41px] h-[41px] rounded-full bg-gray-500/30"></div>
                        </div>
                    ) : currentUser ? (
                        <div className="relative flex items-center gap-3" ref={dropdownRef}>
                            <div className="text-right hidden md:block">
                                <p className={`font-bold text-[14px] leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {currentUser.username || currentUser.fullName || "User"}
                                </p>
                                <p className="text-[12px] text-[#3B82F6] font-semibold">
                                    Level {currentUser.level || 1} • {currentUser.xp || 0} XP
                                </p>
                            </div>

                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-[41px] h-[41px] rounded-full bg-[#fafafa] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#3B82F6] transition-all shadow-sm"
                            >
                                <img
                                    src={getAvatarUrl(currentUser.avatar)}
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {isDropdownOpen && (
                                <div className={`absolute top-[120%] right-0 w-48 py-2 rounded-lg shadow-xl border z-50 ${theme === 'dark' ? 'bg-[#2A2A2A] border-gray-700' : 'bg-white border-gray-200'}`}>
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            navigate('/profile');
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-[#3A3A3A]' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <User size={16} /> User Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            navigate('/learning-history');
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${theme === 'dark' ? 'text-gray-200 hover:bg-[#3A3A3A]' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <History size={16} /> Learning History
                                    </button>

                                    <div className={`h-px my-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

                                    <button
                                        onClick={handleLogout}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors ${theme === 'dark' ? 'hover:bg-[#3A3A3A]' : 'hover:bg-red-50'}`}
                                    >
                                        <LogOut size={16} /> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className={`font-bold text-[14px] px-4 py-1.5 border rounded-md transition-colors ${theme === 'dark'
                                ? 'text-white border-gray-600 hover:bg-gray-800'
                                : 'text-black border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}