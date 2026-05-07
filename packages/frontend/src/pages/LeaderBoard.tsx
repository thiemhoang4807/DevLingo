import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Crown, Medal, Award } from "lucide-react";
import top1 from "../assets/profile-page/top1.png"
import top2 from "../assets/profile-page/top2.png"
import top3 from "../assets/profile-page/top3.png"
import defaultAvatar from "../assets/images/avata.png";
import axiosClient from "../api/axiosClient";

// Level milestones
const LEVEL_MILESTONES = [
    { level: 1, minXp: 0, name: "Bronze" },
    { level: 2, minXp: 100, name: "Silver" },
    { level: 3, minXp: 250, name: "Gold" },
    { level: 4, minXp: 475, name: "Sapphire" },
    { level: 5, minXp: 800, name: "Ruby" },
    { level: 6, minXp: 1500, name: "Emerald" },
    { level: 7, minXp: 2500, name: "Pearl" },
    { level: 8, minXp: 4000, name: "Obsidian" },
    { level: 9, minXp: 6500, name: "Diamond" },
    { level: 10, minXp: 10000, name: "Legendary" },
];

function getRankName(xp: number) {
    for (let i = LEVEL_MILESTONES.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_MILESTONES[i].minXp) return LEVEL_MILESTONES[i].name;
    }
    return "Bronze";
}

function getAvatarUrl(avatarPath: string | null) {
    if (!avatarPath) return defaultAvatar;
    if (avatarPath.startsWith('http')) return avatarPath;
    return `https://devlingo-backend-vercel-1075077880290.europe-west1.run.app${avatarPath}`;
}

const trophies = [top2, top1, top3];
const podiumBorderColors = ["#C0C0C0", "#FFD700", "#CD7F32"];
const podiumBgColors = ["#CDCDCD", "#FFD365", "#B38A48"];

export default function LeaderBoard() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response: any = await axiosClient.get('/api/leaderboard?limit=50');
                const data = response.data?.data || response.data || response;
                if (Array.isArray(data)) {
                    setLeaderboardData(data);
                }
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    // Tách top 3 và phần còn lại
    const topThree = leaderboardData.slice(0, 3);
    const restPlayers = leaderboardData.slice(3);

    // Sắp xếp podium: [Top 2, Top 1, Top 3]
    const podiumOrder = topThree.length >= 3
        ? [topThree[1], topThree[0], topThree[2]]
        : topThree;

    if (isLoading) {
        return (
            <div className={`w-full min-h-screen flex items-center justify-center ${isDark ? "bg-[#0A0A0A]" : "bg-[#F9FAFB]"}`}>
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className={`w-full min-h-screen font-['Inter'] transition-colors duration-300 pb-20 ${isDark ? "bg-[#0A0A0A]" : "bg-[#F9FAFB]"}`}>
            <div className={`w-full max-w-[1002px] mx-auto pt-12 px-6`}>

                {/* Title */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Trophy size={32} className="text-[#FFD700]" />
                        <h1 className={`text-[36px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                            Leaderboard
                        </h1>
                    </div>
                    <p className={`text-[15px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Top learners ranked by XP — compete and climb the ranks!
                    </p>
                    <br />
                    <br />
                </div>

                {/* --- PODIUM TOP 3 --- */}
                {topThree.length >= 3 && (
                    <div className={`w-full flex flex-row items-end justify-center gap-4 sm:gap-6 h-[420px] mb-12`}>
                        {podiumOrder.map((user: any, idx: number) => {
                            const isTop1 = idx === 1;
                            const podiumHeight = isTop1 ? "h-[260px]" : idx === 0 ? "h-[200px]" : "h-[160px]";
                            const avatarSize = isTop1 ? "w-[100px] h-[100px]" : "w-[80px] h-[80px]";
                            const glowEffect = isTop1 && isDark ? "drop-shadow-[0_0_25px_rgba(255,211,101,0.15)]" : "";

                            return (
                                <div key={user.rank} onClick={() => navigate(`/profile/${user.id}`)} className={`w-[220px] sm:w-[280px] flex flex-col items-center cursor-pointer ${glowEffect}`}>

                                    {/* Avatar & Info */}
                                    <div className={`flex flex-col items-center justify-center gap-3 mb-6 ${isTop1 ? "-translate-y-4" : ""}`}>
                                        <div className={`${avatarSize} rounded-2xl shadow-lg border-4 transition-all overflow-hidden
                                        ${isDark ? "bg-[#2A2D35]" : "bg-white"}`}
                                            style={{ borderColor: podiumBorderColors[idx] }}
                                        >
                                            <img
                                                src={getAvatarUrl(user.avatar)}
                                                alt={user.username}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className={`font-bold text-[18px] truncate max-w-[180px] ${isDark ? "text-white" : "text-gray-900"}`}>
                                                {user.username}
                                            </p>
                                            <p className={`text-[12px] font-semibold ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                                {getRankName(user.xp)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Podium Block */}
                                    <div className="w-full flex flex-col items-center">
                                        <div style={{ clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)" }}
                                            className={`w-full h-[28px] ${isDark ? "bg-gradient-to-t from-[#0B0D16] to-[#181C2A]" : "bg-gradient-to-t from-gray-200 to-gray-300"}`}>
                                        </div>

                                        <div className={`w-full ${podiumHeight} flex flex-col items-center rounded-b-lg shadow-inner
                                        ${isDark ? "bg-gradient-to-b from-[#181D2B] to-[#0E0F15]" : "bg-gradient-to-b from-gray-100 to-white border-x border-b border-gray-200"}`}>

                                            {/* Trophy Icon */}
                                            <div className={`w-full h-14 flex items-center justify-center border-b ${isDark ? "border-[#FFFFFF12]" : "border-gray-200"}`}>
                                                <div style={{ background: podiumBgColors[idx] }}
                                                    className={`w-9 h-9 flex items-center justify-center rounded-lg shadow-sm`}>
                                                    <img src={trophies[idx]} alt="Trophy" className="w-6 h-6 object-contain" />
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className={`flex flex-col items-center justify-center flex-1 w-full gap-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                                                <div className="text-center">
                                                    <p className={`text-xl font-bold ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>{user.xp.toLocaleString()}</p>
                                                    <p className={`text-[11px] font-semibold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>XP</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className={`text-xl font-bold ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>Level {user.level}</p>
                                                    <p className={`text-[11px] font-semibold uppercase tracking-widest ${isDark ? "text-gray-500" : "text-gray-400"}`}>Rank</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* --- PLAYER LIST (Rank 4+) --- */}
                {restPlayers.length > 0 && (
                    <div className={`w-full mt-4`}>
                        <div className={`w-full flex flex-col gap-3`}>
                            {/* Table Header */}
                            <div className={`w-full grid grid-cols-[60px_1fr_120px_100px_120px] font-semibold text-[12px] uppercase tracking-wider px-6 mb-2 
                            ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                <p className="text-center">#</p>
                                <p>Player</p>
                                <p className="text-center">Rank</p>
                                <p className="text-center">Level</p>
                                <p className="text-center">XP</p>
                            </div>

                            {/* Player Rows */}
                            <div className={`flex flex-col gap-3`}>
                                {restPlayers.map((user: any) => (
                                    <div key={user.rank} onClick={() => navigate(`/profile/${user.id}`)} className={`w-full h-[72px] grid grid-cols-[60px_1fr_120px_100px_120px] items-center rounded-2xl px-6 transition-all hover:-translate-y-0.5 cursor-pointer
                                    ${isDark ? "bg-[#171C29] hover:bg-[#1E2536]" : "bg-white border border-gray-100 shadow-sm hover:shadow-md"}`}>

                                        <div className={`flex items-center justify-center text-[16px] font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                            #{user.rank}
                                        </div>

                                        <div className={`flex flex-row gap-4 items-center`}>
                                            <img
                                                src={getAvatarUrl(user.avatar)}
                                                alt={user.username}
                                                className={`w-11 h-11 rounded-full object-cover shadow-sm`}
                                            />
                                            <div className={`flex flex-col justify-center`}>
                                                <p className={`text-[15px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{user.username}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <span className={`text-[12px] font-bold px-3 py-1 rounded-full ${isDark ? "bg-[#252830] text-[#60A5FA]" : "bg-blue-50 text-[#2563EB]"
                                                }`}>
                                                {getRankName(user.xp)}
                                            </span>
                                        </div>

                                        <div className={`flex items-center justify-center text-[15px] font-semibold ${isDark ? "text-white" : "text-gray-700"}`}>
                                            {user.level}
                                        </div>

                                        <div className={`flex items-center justify-center text-[15px] font-bold ${isDark ? "text-[#60A5FA]" : "text-blue-600"}`}>
                                            {user.xp.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {leaderboardData.length === 0 && (
                    <div className={`text-center py-20 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        <Trophy size={60} className="mx-auto mb-4 opacity-30" />
                        <p className="text-[18px] font-semibold mb-2">No ranking data yet</p>
                        <p className="text-[14px]">Start learning and completing quizzes to appear on the leaderboard!</p>
                    </div>
                )}

            </div>
        </div>
    );
}