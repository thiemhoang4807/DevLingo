import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { getBadgeUrl } from "../utils/badgeHelper";
import { CalendarDays, Star, Zap, Trophy, Target, TrendingUp, Camera, Loader2 } from "lucide-react";
import defaultAvatar from "../assets/images/avata.png";
import axiosClient from '../api/axiosClient';

// Gamification milestones matching GamificationLogic.md
const LEVEL_MILESTONES = [
  { level: 1,  minXp: 0,     name: "Bronze",    badgeRank: "bronze" },
  { level: 2,  minXp: 100,   name: "Silver",    badgeRank: "silver" },
  { level: 3,  minXp: 250,   name: "Gold",      badgeRank: "gold" },
  { level: 4,  minXp: 475,   name: "Sapphire",  badgeRank: "sapphire" },
  { level: 5,  minXp: 800,   name: "Ruby",      badgeRank: "ruby" },
  { level: 6,  minXp: 1500,  name: "Emerald",   badgeRank: "emerald" },
  { level: 7,  minXp: 2500,  name: "Pearl",     badgeRank: "obsidian" },
  { level: 8,  minXp: 4000,  name: "Obsidian",  badgeRank: "obsidian" },
  { level: 9,  minXp: 6500,  name: "Diamond",   badgeRank: "diamond" },
  { level: 10, minXp: 10000, name: "Legendary", badgeRank: "diamond" },
];

function getLevelInfo(xp: number) {
  let current = LEVEL_MILESTONES[0];
  let next = LEVEL_MILESTONES[1];
  for (let i = LEVEL_MILESTONES.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_MILESTONES[i].minXp) {
      current = LEVEL_MILESTONES[i];
      next = LEVEL_MILESTONES[i + 1] || null;
      break;
    }
  }
  const xpInLevel = xp - current.minXp;
  const xpNeeded = next ? next.minXp - current.minXp : 0;
  const progress = next ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 100;
  return { current, next, xpInLevel, xpNeeded, progress };
}

export default function UserProfilePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, progressRes]: any[] = await Promise.all([
          axiosClient.get('/api/users/me'),
          axiosClient.get('/api/progress/me').catch(() => ({ data: [] }))
        ]);
        const userData = userRes.data?.data || userRes.data || userRes;
        setCurrentUser(userData);
        const pData = progressRes.data?.data || progressRes.data || progressRes;
        setProgressData(Array.isArray(pData) ? pData : []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAvatarUrl = (avatarPath: string) => {
    if (!avatarPath) return defaultAvatar;
    if (avatarPath.startsWith('http')) return avatarPath;
    return avatarPath;
  };

  const handleAvatarClick = () => {
    if (!isUploadingAvatar) {
      fileInputRef.current?.click();
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ cho phép tải lên file ảnh (JPG, PNG, GIF, WEBP)!');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File ảnh không được vượt quá 5MB!');
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/me/avatar', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setCurrentUser((prev: any) => ({
          ...prev,
          avatar: result.data.avatar,
        }));
      } else {
        alert(result.message || 'Đổi avatar thất bại!');
      }
    } catch (error) {
      console.error('Avatar upload error:', error);
      alert('Có lỗi xảy ra khi tải ảnh lên!');
    } finally {
      setIsUploadingAvatar(false);
      // Reset input để có thể chọn lại cùng file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#1A1D21]" : "bg-gray-50"}`}>
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const displayName = currentUser?.username || currentUser?.fullName || "User";
  const displayAvatar = getAvatarUrl(currentUser?.avatar);
  const userXP = currentUser?.xp || 0;
  const userLevel = currentUser?.level || 1;
  const levelInfo = getLevelInfo(userXP);
  const peakXp = currentUser?.peakXp || userXP;
  const peakLevelInfo = getLevelInfo(peakXp);
  const completedQuizzes = progressData.filter((p: any) => p.status === "completed").length;
  const joinDate = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : "Unknown";

  return (
    <div className={`w-full min-h-screen pb-20 transition-colors ${isDark ? "bg-[#1A1D21]" : "bg-gray-50"}`}>
      <div className="container mx-auto max-w-[1184px] pt-10 px-8">
        
        <h1 className={`text-[40px] font-bold font-['Space_Grotesk'] mb-10 ${isDark ? "text-white" : "text-gray-900"}`}>
          Learning <span className="text-[#3B82F6]">Profile</span>
        </h1>

        {/* --- USER INFO SECTION --- */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16 items-center lg:items-start w-full">
          
          {/* Avatar with upload overlay */}
          <div 
            className="relative shrink-0 cursor-pointer group"
            onMouseEnter={() => setAvatarHover(true)}
            onMouseLeave={() => setAvatarHover(false)}
            onClick={handleAvatarClick}
          >
            <img 
              src={displayAvatar} 
              alt="Avatar" 
              className={`w-[273px] h-[273px] rounded-full object-cover shadow-2xl border-[6px] border-[#3B82F6]/20 bg-white transition-all duration-300 ${
                avatarHover ? "brightness-75 scale-[1.02]" : ""
              }`}
            />
            
            {/* Overlay khi hover */}
            <div 
              className={`absolute inset-0 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
                avatarHover || isUploadingAvatar ? "opacity-100" : "opacity-0"
              }`}
            >
              {isUploadingAvatar ? (
                <Loader2 size={48} className="text-white animate-spin" />
              ) : (
                <>
                  <Camera size={40} className="text-white mb-2 drop-shadow-lg" />
                  <span className="text-white text-[14px] font-semibold font-['Inter'] drop-shadow-lg tracking-wide">
                    Đổi Avatar
                  </span>
                </>
              )}
            </div>

            {/* Badge nhỏ ở góc */}
            <div className={`absolute bottom-3 right-3 w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isDark ? "bg-[#3B82F6]" : "bg-[#2563EB]"
            } ${avatarHover ? "scale-110" : ""}`}>
              <Camera size={20} className="text-white" />
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex flex-col flex-1 w-full justify-center mt-4">
            <h2 className={`text-[60px] leading-[60px] tracking-[-3px] font-bold font-['Inter'] mb-4 ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
              User <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]">{displayName}</span>
            </h2>

            {/* Rank + XP Progress Card */}
            <div className={`rounded-[20px] w-full max-w-[841px] p-8 shadow-xl ${isDark ? "bg-[#424141]" : "bg-gray-200"}`}>
              <div className="flex items-center gap-6 mb-6">
                <img 
                  src={getBadgeUrl(levelInfo.current.badgeRank, 1)} 
                  alt={levelInfo.current.name} 
                  className="w-[100px] h-[100px] object-contain drop-shadow-xl" 
                />
                <div className="flex-1">
                  <p className={`text-[14px] font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Current Rank</p>
                  <p className="text-[36px] font-bold text-white leading-tight">{levelInfo.current.name}</p>
                  <p className="text-[16px] text-[#3B82F6] font-semibold">Level {userLevel}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[14px] font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Total XP</p>
                  <p className="text-[36px] font-bold text-[#3B82F6] leading-tight">{userXP.toLocaleString()}</p>
                </div>
              </div>

              {/* Peak Rank */}
              <div className={`flex items-center gap-4 mb-6 rounded-[12px] px-5 py-4 ${isDark ? "bg-[#2A2A2A]/60" : "bg-gray-300/60"}`}>
                <img 
                  src={getBadgeUrl(peakLevelInfo.current.badgeRank, 1)} 
                  alt={peakLevelInfo.current.name} 
                  className="w-[52px] h-[52px] object-contain drop-shadow-md" 
                />
                <div className="flex-1">
                  <p className={`text-[12px] font-semibold uppercase tracking-wider mb-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>⭐ Peak Rank</p>
                  <p className="text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#EF4444] leading-tight">{peakLevelInfo.current.name}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[12px] font-semibold uppercase tracking-wider mb-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Peak XP</p>
                  <p className="text-[22px] font-bold text-[#F59E0B] leading-tight">{peakXp.toLocaleString()}</p>
                </div>
              </div>

              {/* XP Progress Bar */}
              {levelInfo.next ? (
                <div>
                  <div className="flex justify-between text-[13px] font-medium mb-2">
                    <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                      {levelInfo.xpInLevel.toLocaleString()} / {levelInfo.xpNeeded.toLocaleString()} XP to {levelInfo.next.name}
                    </span>
                    <span className="text-[#3B82F6] font-bold">{Math.round(levelInfo.progress)}%</span>
                  </div>
                  <div className={`w-full h-[12px] rounded-full overflow-hidden ${isDark ? "bg-[#2A2A2A]" : "bg-gray-300"}`}>
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] transition-all duration-700"
                      style={{ width: `${levelInfo.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-[#FFD700] font-bold text-center text-[18px]">🏆 Maximum Level Reached!</p>
              )}
            </div>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1: JOINED SINCE */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white shadow-lg">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">JOINED SINCE</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{joinDate}</p>
            </div>
            <CalendarDays size={72} strokeWidth={1.5} className="text-white mr-12 opacity-80 group-hover:scale-110 transition-transform" />
          </div>

          {/* Row 2: LEVEL */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <Star size={72} strokeWidth={1.5} className="text-white ml-12 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#059669] to-[#34D399] text-white shadow-lg text-right">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">LEVEL & RANK</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">Level {userLevel} — {levelInfo.current.name}</p>
            </div>
          </div>

          {/* Row 3: TOTAL XP */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center bg-gradient-to-r from-[#E11D48] to-[#F59E0B] text-white shadow-lg">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">TOTAL XP</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{userXP.toLocaleString()} XP</p>
            </div>
            <Zap size={72} strokeWidth={1.5} className="text-white mr-12 opacity-80 group-hover:scale-110 transition-transform" />
          </div>

          {/* Row 4: QUIZZES COMPLETED */}
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <Trophy size={72} strokeWidth={1.5} className="text-white ml-12 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#7DD3FC] to-[#D8B4FE] text-white shadow-lg text-right">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">QUIZZES COMPLETED</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{completedQuizzes}</p>
            </div>
          </div>

          {/* Row 5: NEXT MILESTONE */}
          {levelInfo.next && (
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white shadow-lg">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">NEXT MILESTONE</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">{levelInfo.next.name} — {levelInfo.next.minXp.toLocaleString()} XP</p>
            </div>
            <TrendingUp size={72} strokeWidth={1.5} className="text-white mr-12 opacity-80 group-hover:scale-110 transition-transform" />
          </div>
          )}

          {/* Row 6: ACCURACY */}
          {progressData.length > 0 && (
          <div className="flex items-center justify-between w-full hover:-translate-y-1 transition-transform cursor-pointer group">
            <Target size={72} strokeWidth={1.5} className="text-white ml-12 opacity-80 group-hover:scale-110 transition-transform" />
            <div className="w-[666px] h-[140px] rounded-[8px] p-8 flex flex-col justify-center items-end bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] text-white shadow-lg text-right">
                <p className="text-[15px] font-bold opacity-90 uppercase tracking-[2px] font-['Inter'] mb-2">BEST QUIZ SCORE</p>
                <p className="text-[36px] font-bold font-['Inter'] leading-[40px]">
                  {Math.max(...progressData.map((p: any) => p.highestScore || 0))} correct answers
                </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
