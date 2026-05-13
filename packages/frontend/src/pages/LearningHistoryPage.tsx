import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { BookOpen, Target, Flame, CheckCircle, AlertCircle, RefreshCcw, Loader2 } from "lucide-react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function LearningHistoryPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [historyData, setHistoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response: any = await axiosClient.get('/api/progress/history');
        const data = response.data?.data || response.data || response;
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching learning history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className={`w-full min-h-screen flex items-center justify-center ${isDark ? "bg-[#0F141A]" : "bg-gray-50"}`}>
        <Loader2 size={40} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  const {
    masteredTerms = [],
    weakWords = [],
    totalAnswered = 0,
    totalCorrect = 0,
    quizzesCompleted = 0
  } = historyData || {};

  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const statsData = [
    { id: 1, label: "TOTAL QUESTIONS ANSWERED", value: totalAnswered.toLocaleString(), icon: BookOpen, bgClass: "bg-[#3B82F6]" },
    { id: 2, label: "OVERALL ACCURACY", value: `${accuracy}%`, icon: Target, bgClass: "bg-[#10B981]" },
    { id: 3, label: "QUIZZES COMPLETED", value: quizzesCompleted.toString(), icon: Flame, bgClass: "bg-gradient-to-r from-[#EC4899] to-[#F43F5E]" },
  ];

  return (
    <div className={`w-full min-h-screen font-['Inter'] transition-colors duration-300 py-12 ${isDark ? "bg-[#0F141A]" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="mb-[48px]">
          <div className="mb-4">
            <span className={`text-[12px] uppercase font-bold tracking-[3.6px] border-b border-dashed pb-1 ${isDark ? "text-[#90ABFF] border-[#90ABFF]" : "text-[#3B82F6] border-[#3B82F6]"}`}>
              Performance Log
            </span>
          </div>
          
          <h1 className="text-[40px] sm:text-[60px] font-bold leading-tight font-['Space_Grotesk']">
            <span className={isDark ? "text-[#F1F3FC]" : "text-gray-900"}>
              Learning{' '}
            </span>
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#90ABFF] bg-clip-text text-transparent">
              History
            </span>
          </h1>
        </div>

        {/* --- 2. STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[64px]">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className={`${stat.bgClass} text-white rounded-[8px] h-[140px] p-[24px] shadow-lg flex flex-col justify-between transition-transform hover:-translate-y-1`}
              >
                <p className="text-[12px] font-bold uppercase tracking-wider opacity-90">
                  {stat.label}
                </p>
                <div className="flex items-end justify-between">
                  <p className="text-[40px] font-extrabold leading-none tracking-tight">
                    {stat.value}
                  </p>
                  <Icon className="h-6 w-6 text-white opacity-80 mb-1" strokeWidth={2.5} />
                </div>
              </div>
            );
          })}
        </div>

        {/* --- 3. MAIN CONTENT SPLIT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[48px]">
          
          {/* CỘT TRÁI: Mastered Words */}
          <div className="flex flex-col gap-[32px]">
            {/* Header row: Cập nhật py-[16px] chuẩn Figma thay vì h cố định */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-[16px]">
              <h2 className={`text-[24px] font-bold font-['Space_Grotesk'] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
                Mastered Words
              </h2>
              <span className="text-[#69F6B8] bg-[#69F6B8]/10 border border-[#69F6B8]/20 rounded-full px-[12px] py-[4px] font-['Manrope'] text-[10px] leading-[15px] tracking-[1px] uppercase font-bold">
                VERIFIED PROFICIENCY
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {masteredTerms.length > 0 ? (
                masteredTerms.map((item: any, index: number) => (
                  <div key={index} className={`p-6 rounded-[8px] border flex items-start gap-4 transition-colors ${isDark ? "bg-[#1A1E24] border-[#2A2E36]" : "bg-white border-gray-200 shadow-sm"}`}>
                    <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <h3 className={`text-[16px] font-bold mb-1 font-['Space_Grotesk'] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>{item.word}</h3>
                      <p className={`text-[14px] leading-[21px] ${isDark ? "text-[#A8ABB3]" : "text-gray-600"}`}>
                        {item.definition}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`p-6 rounded-[8px] border text-center ${isDark ? "bg-[#1A1E24] border-[#2A2E36] text-[#A8ABB3]" : "bg-white border-gray-200 text-gray-500"}`}>
                  You haven't mastered any terms yet. Keep practicing!
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: Weak Words Section */}
          <div className={`p-5 sm:p-[32px] rounded-[12px] flex flex-col gap-[32px] ${isDark ? "bg-[#20262F] border-l-[4px] border-[#FF6F7E]" : "bg-white border border-gray-200 border-l-[4px] border-l-[#FF6F7E] shadow-sm"}`}>
            
            {/* Header Weak Words */}
            <div className="flex items-center gap-[12px]">
              <AlertCircle className="w-[24px] h-[24px] text-[#FF6F7E]" strokeWidth={2.5} />
              <h2 className={`text-[24px] font-bold font-['Space_Grotesk'] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
                Weak Words
              </h2>
            </div>

            {/* List Weak Words */}
            <div className="flex flex-col gap-[32px]">
              {weakWords.length > 0 ? (
                weakWords.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col gap-[16px]">
                    
                    {/* Word Title & Failed Badge */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <h3 className={`text-[16px] font-bold font-['Space_Grotesk'] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
                        {item.word}
                      </h3>
                      <span className="text-[#FF6F7E] font-['Manrope'] text-[9px] leading-[13.5px] font-bold border border-[#FF6F7E]/30 bg-transparent px-[8px] py-[2px] rounded-[4px]">
                        Failed {item.failedCount}x
                      </span>
                    </div>
                    
                    {/* Definition Boxes */}
                    <div className="flex flex-col gap-[8px]">
                      
                      {/* Last Choice */}
                      <div className={`p-[16px] rounded-[4px] border-l-[2px] flex flex-col gap-[3px] ${isDark ? "bg-[#FF6F7E]/5 border-[#FF6F7E]/40" : "bg-red-50/50 border-red-200"}`}>
                        <p className="text-[#FF6F7E] font-['Manrope'] text-[10px] font-bold uppercase tracking-[1px] leading-[15px]">
                          Your last choice
                        </p>
                        <p className={`font-['Manrope'] text-[14px] leading-[22.75px] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
                          "{item.lastChoice}"
                        </p>
                      </div>
                      
                      {/* Correct Def */}
                      <div className={`p-[16px] rounded-[4px] border-l-[2px] flex flex-col gap-[3px] ${isDark ? "bg-[#69F6B8]/5 border-[#69F6B8]/40" : "bg-green-50/50 border-green-200"}`}>
                        <p className="text-[#69F6B8] font-['Manrope'] text-[10px] font-bold uppercase tracking-[1px] leading-[15px]">
                          Correct definition
                        </p>
                        <p className={`font-['Manrope'] text-[14px] leading-[22.75px] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
                          {item.correctDef}
                        </p>
                      </div>
                      
                    </div>
                  </div>
                ))
              ) : (
                <div className={`text-center py-6 font-['Manrope'] text-[14px] ${isDark ? "text-[#A8ABB3]" : "text-gray-500"}`}>
                  Great job! You don't have any weak words yet.
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-[12px] mt-2">
              <button 
                onClick={() => navigate('/quizzes')}
                className="w-full flex items-center justify-center gap-[12px] bg-[#90ABFF] hover:bg-[#7a95eb] text-[#002873] py-[16px] rounded-[8px] font-bold text-[16px] leading-[24px] font-['Manrope'] transition-colors"
              >
                <RefreshCcw className="w-[18px] h-[18px]" strokeWidth={2.5} />
                Practice More Quizzes
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
