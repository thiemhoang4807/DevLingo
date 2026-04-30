import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { getBadgeUrl } from "../utils/badgeHelper";
import { CalendarDays, Star, Dribbble, Type } from "lucide-react";
// 🚀 Lấy ảnh mặc định giống hệt Header
import defaultAvatar from "../assets/images/avata.png";
import axiosClient from '../api/axiosClient';

// Mock Data tạm cho các chỉ số chưa có trong DB (rank, streak...)
const mockStats = {
  joinDate: "April 29 2026",
  rank: "diamond", 
  tier: 1,         
  peakRank: "ruby",
  peakTier: 3,     
  stats: {
    streak: "12 days",
  },
};

export default function UserProfilePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🚀 Gọi API kéo dữ liệu thật y như Header
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: any = await axiosClient.get('/api/users/me');
        const userData = response.data?.data || response.data || response;
        setCurrentUser(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) {
      return defaultAvatar;
    }
    if (avatarPath.startsWith('http')) {
      return avatarPath;
    }
    return `http://localhost:5000${avatarPath}`;
  };

  if (isLoading) {
      return (
          <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#1A1D21]" : "bg-gray-50"}`}>
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
      );
  }

  // 🚀 Ghép dữ liệu thật vào giao diện
  const displayName = currentUser?.username || currentUser?.fullName || "User";
  const displayAvatar = getAvatarUrl(currentUser?.avatar);
  const displayLevel = currentUser?.level || 1;
  const displayWordsLearned = currentUser?.totalLearned || 0;

  return (
    <div className={`w-full min-h-screen pb-20 transition-colors ${isDark ? "bg-[#1A1D21]" : "bg-gray-50"}`}>
      <div className="container mx-auto max-w-[1184px] pt-10 px-8">
        
        <h1 className={`text-[40px] font-bold font-['Space_Grotesk'] mb-10 ${isDark ? "text-white" : "text-gray-900"}`}>
          Learning <span className="text-[#3B82F6]">Profile</span>
        </h1>

        {/* --- KHU VỰC THÔNG TIN CHÍNH --- */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16 items-center lg:items-start w-full">
          <img 
            src={displayAvatar} 
            alt="Avatar" 
            className="w-[273px] h-[273px] rounded-full object-cover shrink-0 shadow-2xl border-[6px] border-[#3B82F6]/20 bg-white"
          />

          <div className="flex flex-col flex-1 w-full justify-center mt-4">
            <h2 className={`text-[60px] leading-[60px] tracking-[-3px] font-bold font-['Inter'] mb-8 ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
              User <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">{displayName}</span>
            </h2>

            {/* Khung Badge Card */}
            <div className="bg-[#424141] rounded-[20px] h-[220px] w-full max-w-[841px] flex items-center justify-around px-10 shadow-xl">
              
              {/* Current Badge */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-white font-bold text-[32px] tracking-tight">Current:</span>
                    <span className="text-[#D1D5DB] text-[16px] font-medium">(DD/MM/YY)</span>
                </div>
                <img src={getBadgeUrl(mockStats.rank, mockStats.tier)} alt="Current Badge" className="w-[140px] h-[140px] object-contain drop-shadow-xl hover:scale-110 transition-transform" />
              </div>

              {/* Peak Badge */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-white font-bold text-[32px] tracking-tight">Peak:</span>
                    <span className="text-[#D1D5DB] text-[16px] font-medium">(DD/MM/YY)</span>
                </div>
                <img src={getBadgeUrl(mockStats.peakRank, mockStats.peakTier)} alt="Peak Badge" className="w-[140px] h-[140px] object-contain drop-shadow-xl hover:scale-110 transition-transform" />
              </div>

            </div>
          </div>
        </div>

        {/* --- KHU VỰC STATS GRID (BỐ CỤC ZIG-ZAG) --- */}
        <div className="flex flex-col gap-6 w-full">
          {/* Hàng 1: JOINED SINCE */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white shadow-lg">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">JOINED SINCE</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{mockStats.joinDate}</p>
            </div>
            <CalendarDays size={72} strokeWidth={1.5} className="text-white mr-12 opacity-80 group-hover:scale-110 transition-transform" />
          </div>

          {/* Hàng 2: LEVEL */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <Star size={72} strokeWidth={1.5} className="text-white ml-12 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#059669] to-[#34D399] text-white shadow-lg text-right">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">LEVEL</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{displayLevel}</p>
            </div>
          </div>

          {/* Hàng 3: STREAK */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center bg-gradient-to-r from-[#E11D48] to-[#F59E0B] text-white shadow-lg">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">STREAK</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{mockStats.stats.streak}</p>
            </div>
            <Dribbble size={72} strokeWidth={1.5} className="text-white mr-12 opacity-80 group-hover:scale-110 transition-transform" />
          </div>

          {/* Hàng 4: TOTAL WORDS LEARNED */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <Type size={72} strokeWidth={1.5} className="text-white ml-12 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#7DD3FC] to-[#D8B4FE] text-white shadow-lg text-right">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">TOTAL WORDS LEARNED</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{displayWordsLearned}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}