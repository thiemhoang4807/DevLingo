import { useTheme } from "../context/ThemeContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
// Import ảnh cúp
import top1 from "../assets/profile-page/top1.png"
import top2 from "../assets/profile-page/top2.png"
import top3 from "../assets/profile-page/top3.png"

const period = ["Daily", "Monthly"];

type user = {
    name: string,
    points: string,
    terms: string,
    email?: string,
    colorBgTrophy?: string,
};

// Style cho những người top đầu (Thứ tự: Top 2, Top 1, Top 3)
var topPlayer: Array<user> = [ 
    {name: "Nguyen Van C", points: "50,000", terms: "6,666", colorBgTrophy: "#CDCDCD"}, // Top 2
    {name: "Pham Van C", points: "100,000", terms: "8,999", colorBgTrophy: "#FFD365"}, // Top 1
    {name: "Nguyen Van B", points: "20,000", terms: "3,200", colorBgTrophy: "#B38A48"}  // Top 3
];

const trophies = [top2, top1, top3]; // Đã sắp xếp lại ảnh cúp cho khớp với Data: Bạc, Vàng, Đồng

const baseUser = {
    points: "3,667",
    terms: "1,241",
    email: "@hoangtuaruma"
};

const players: Array<user> = [
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser },
    { name: "Nguyen Van A", ...baseUser }
];

const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

export default function LeaderBoard() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    
    const [activeTab, setActiveTab] = useState<"daily" | "monthly">("daily");
    const [index, setIndex] = useState(1);

    return (
        <div className={`w-full min-h-screen font-['Inter'] transition-colors duration-300 pb-20 ${isDark ? "bg-[#0A0A0A]" : "bg-[#F9FAFB]"}`}>
            <div className={`w-full max-w-[1002px] mx-auto pt-12 px-6`}>
                
                {/* --- 1. THANH ĐIỀU CHỈNH THỜI GIAN --- */}
                <div className={`w-full flex justify-center mb-16`}>
                    <div className={`p-1.5 rounded-xl flex transition-all ${isDark ? "bg-[#181C2A] shadow-md" : "bg-white border border-gray-200 shadow-sm"}`}>
                        {period.map(el => {
                            const isActive = activeTab === el.toLocaleLowerCase();
                            return (
                                <button key={el} 
                                    onClick={() => setActiveTab(el.toLocaleLowerCase() as "daily" | "monthly")}
                                    className={`w-[140px] h-[36px] rounded-lg flex items-center justify-center font-medium text-sm transition-all duration-300
                                        ${isActive 
                                            ? (isDark ? "bg-[#293047] text-white shadow-sm" : "bg-blue-600 text-white shadow-sm") 
                                            : (isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900")
                                        }`}
                                >
                                    {el}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* --- 2. BỤC VINH QUANG (PODIUM) --- */}
                <div className={`w-full flex flex-row items-end justify-center gap-4 sm:gap-6 h-[420px]`}>
                    {topPlayer.map((el, idx) => {
                        const isTop1 = idx === 1;
                        // Tính toán chiều cao linh hoạt cho thân bục (Top 1 cao nhất)
                        const podiumHeight = isTop1 ? "h-[260px]" : idx === 0 ? "h-[200px]" : "h-[160px]";
                        const avatarSize = isTop1 ? "w-[100px] h-[100px]" : "w-[80px] h-[80px]";
                        const glowEffect = isTop1 && isDark ? "drop-shadow-[0_0_25px_rgba(255,211,101,0.15)]" : "";

                        return (
                            <div key={idx} className={`w-[220px] sm:w-[280px] flex flex-col items-center ${glowEffect}`}>
                                
                                {/* Avatar & Info */}
                                <div className={`flex flex-col items-center justify-center gap-3 mb-6 ${isTop1 ? "-translate-y-4" : ""}`}>
                                    <div className={`${avatarSize} rounded-2xl shadow-lg border-4 transition-all
                                        ${isTop1 ? "border-[#FFD365]" : idx === 0 ? "border-[#CDCDCD]" : "border-[#B38A48]"}
                                        ${isDark ? "bg-[#2A2D35]" : "bg-white"}`}>
                                    </div>
                                    <div className="text-center">
                                        <p className={`font-bold text-[18px] truncate max-w-[180px] ${isDark ? "text-white" : "text-gray-900"}`}>
                                            {el.name}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Khối Bục 3D */}
                                <div className="w-full flex flex-col items-center">
                                    {/* Mặt trên bục (Nắp bục) */}
                                    <div style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
                                         className={`w-full h-[28px] ${isDark ? "bg-gradient-to-t from-[#0B0D16] to-[#181C2A]" : "bg-gradient-to-t from-gray-200 to-gray-300"}`}>
                                    </div>
                                            
                                    {/* Thân bục */}
                                    <div className={`w-full ${podiumHeight} flex flex-col items-center rounded-b-lg shadow-inner
                                        ${isDark ? "bg-gradient-to-b from-[#181D2B] to-[#0E0F15]" : "bg-gradient-to-b from-gray-100 to-white border-x border-b border-gray-200"}`}>
                                        
                                        {/* Icon Cúp */}
                                        <div className={`w-full h-14 flex items-center justify-center border-b ${isDark ? "border-[#FFFFFF12]" : "border-gray-200"}`}>
                                            <div style={{ background: el.colorBgTrophy ?? "white" }}
                                                 className={`w-9 h-9 flex items-center justify-center rounded-lg shadow-sm`}>
                                                <img src={trophies[idx]} alt="Trophy" className="w-6 h-6 object-contain" />
                                            </div>
                                        </div>
                                        
                                        {/* Điểm & Số Terms */}
                                        <div className={`flex flex-col items-center justify-center flex-1 w-full gap-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                                            <div className="text-center">
                                                <p className={`text-xl font-bold ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>{el.points}</p>
                                                <p className={`text-[11px] font-semibold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>Points</p>
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-xl font-bold ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>{el.terms}</p>
                                                <p className={`text-[11px] font-semibold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>Terms</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* --- 3. BẢNG DANH SÁCH PLAYERS --- */} 
                <div className={`w-full mt-16`}>
                    <div className={`w-full flex flex-col gap-3`}>
                        {/* Header Bảng */}
                        <div className={`w-full grid grid-cols-[80px_1fr_120px_120px] md:grid-cols-[80px_1fr_150px_150px] font-semibold text-[13px] uppercase tracking-wider px-6 mb-2 
                            ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                            <p className="text-center">Rank</p>
                            <p>Username</p>
                            <p className="text-center">Terms</p>
                            <p className="text-center">Points</p>
                        </div>
                        
                        {/* List */}
                        <div className={`flex flex-col gap-3`}>
                            {players.map((el, idx) => (
                                <div key={idx} className={`w-full h-[72px] grid grid-cols-[80px_1fr_120px_120px] md:grid-cols-[80px_1fr_150px_150px] items-center rounded-2xl px-6 transition-all hover:-translate-y-0.5
                                    ${isDark ? "bg-[#171C29] hover:bg-[#1E2536]" : "bg-white border border-gray-100 shadow-sm hover:shadow-md"}`}>
                                    
                                    <div className={`flex items-center justify-center text-[16px] font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                        #{idx + 4}
                                    </div>
                                    
                                    <div className={`flex flex-row gap-4 items-center`}>
                                        <div className={`w-11 h-11 rounded-full shadow-sm ${isDark ? "bg-[#2A2D35]" : "bg-gray-200"}`}></div>
                                        <div className={`flex flex-col justify-center`}>
                                            <p className={`text-[15px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{el.name}</p>
                                            <p className={`font-medium text-[13px] ${isDark ? "text-gray-500" : "text-gray-400"}`}>{el.email}</p>
                                        </div>
                                    </div>
                                    
                                    <div className={`flex items-center justify-center text-[15px] font-semibold ${isDark ? "text-white" : "text-gray-700"}`}>
                                        {el.terms}
                                    </div>
                                    
                                    <div className={`flex items-center justify-center text-[15px] font-bold ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>
                                        {el.points}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- 4. FOOTER: THANH THỜI GIAN & ĐIỀU HƯỚNG --- */}
                <div className={`w-full flex flex-col md:flex-row justify-between items-center gap-6 py-10 mt-6 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                    
                    <div className={`flex flex-col items-center md:items-start`}>
                        <h1 className={`font-bold text-[18px] ${isDark ? "text-white" : "text-gray-900"}`}>Season ends in</h1>
                        <p className={`font-medium text-[14px] mt-1 ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>10d : 23h : 23s</p>
                    </div>
                    
                    <div className={`flex items-center gap-2`}>
                        <button onClick={() => setIndex(index - 2 < 0 ? numbers.length : index - 1)}
                            className={`p-2 rounded-full transition-colors ${isDark ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"}`}>
                            <ChevronLeft size={20} />
                        </button>
                        
                        <div className={`flex items-center gap-1.5`}>
                            {[...numbers.slice(0,3), "...", ...numbers.slice(numbers.length - 2, numbers.length)].map((el, i) => {
                                if (el === "...") return <span key={i} className={`px-2 font-bold ${isDark ? "text-gray-600" : "text-gray-400"}`}>...</span>
                                
                                const num = el as number;
                                const isCurrent = index === num;
                                return (
                                    <button key={i} onClick={() => setIndex(num)}
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-[14px] font-bold transition-all
                                            ${isCurrent 
                                                ? (isDark ? "bg-blue-600 text-white shadow-lg" : "bg-blue-600 text-white shadow-md") 
                                                : (isDark ? "text-gray-400 hover:bg-[#171C29] hover:text-white" : "text-gray-600 hover:bg-gray-200")}`}>
                                        {num}
                                    </button>
                                )
                            })}
                        </div>
                        
                        <button onClick={() => setIndex(index + 1 > numbers.length ? 1 : index + 1)}
                            className={`p-2 rounded-full transition-colors ${isDark ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"}`}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}