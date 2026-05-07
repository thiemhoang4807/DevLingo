import React, { useState, useEffect } from 'react';
import TopicCard from '../components/TopicCard';
import axiosClient from '../api/axiosClient';
import type { TopicData, UserAnswerHistory } from '../types/quiz';

interface QuizResultProps {
  topic: TopicData;
  score: number;
  totalQuestions: number;
  history: UserAnswerHistory[];
  earnedXP?: number;
  onTryAnother: (topic?: TopicData) => void;
}

const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : 'Easy';

const QuizResult: React.FC<QuizResultProps> = ({ topic, score, totalQuestions, history = [], earnedXP = 0, onTryAnother }) => {
  const [topicsList, setTopicsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response: any = await axiosClient.get('/api/lessons');
        const data = response.data?.data || response.data || response;

        let filtered = data.filter((lesson: any) => {
          if (!lesson.title) return false;
          return ['Internet', 'Hardware', 'Software'].some(keyword =>
            lesson.title.toLowerCase().includes(keyword.toLowerCase())
          );
        });

        const orderMap: any = { 'internet': 1, 'hardware': 2, 'software': 3 };
        const diffMap: any = { 'easy': 1, 'medium': 2, 'hard': 3, 'extreme': 4 };

        filtered.sort((a: any, b: any) => {
          const aName = a.title.toLowerCase().replace(' term', '');
          const bName = b.title.toLowerCase().replace(' term', '');
          const aDiff = a.difficulty?.toLowerCase() || 'easy';
          const bDiff = b.difficulty?.toLowerCase() || 'easy';
          if (orderMap[aName] !== orderMap[bName]) return orderMap[aName] - orderMap[bName];
          return diffMap[aDiff] - diffMap[bDiff];
        });

        setTopicsList(filtered);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
    fetchTopics();
  }, []);
  const percentage = Math.round((score / totalQuestions) * 100) || 0;
  const incorrectCount = totalQuestions - score;

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Filter terms based on user history
  const correctTerms = history.filter(h => h.isCorrect);
  const incorrectTerms = history.filter(h => !h.isCorrect);

  return (
    <div className="w-full flex flex-col items-center pt-[40px] pb-[100px] bg-[#212121] text-white font-['Inter']">
      <div className="w-full max-w-[1002px] px-[32px] flex flex-col items-center gap-[40px]">

        {/* --- 1. BADGE TOPIC --- */}
        {(() => {
          const diff = (topic.difficulty || 'easy').toLowerCase();
          const colorMap: Record<string, string> = {
            easy: 'border-[#0ABD5A] bg-[#0ABD5A]',
            medium: 'border-[#7C3AED] bg-[#7C3AED]',
            hard: 'border-[#BD160A] bg-[#BD160A]',
            extreme: 'border-[#780ABD] bg-[#780ABD]',
          };
          const colors = colorMap[diff] || colorMap['easy'];
          const topicName = (topic as any).title || topic.name;
          return (
            <div className={`flex items-center w-[378px] h-[44px] border-[1.5px] ${colors} rounded-[100px] shrink-0 overflow-hidden`}>
              <div className="bg-[#FFFFFF] text-[#1D4ED8] pl-[20px] flex items-center justify-start font-[700] text-[16px] w-[65%] h-full">
                {topicName}
              </div>
              <div className="text-[#FFFFFF] flex items-center justify-center font-[600] text-[15px] flex-1 uppercase tracking-wide h-full">
                {capitalize(topic.difficulty)}
              </div>
            </div>
          );
        })()}

        {/* --- 2. STATISTIC --- */}
        <div className="flex flex-col items-center w-full">
          <h2 className="text-[24px] font-[700] leading-[32px] text-[#E5E7EB] text-center mb-[24px]">
            Statistic
          </h2>

          <div className="relative w-[160px] h-[160px] flex items-center justify-center mb-[24px]">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="80" cy="80" r={radius}
                fill="rgba(0, 20, 72, 0.25)"
                stroke="transparent"
              />
              <circle
                cx="80" cy="80" r={radius}
                stroke="#1D4ED8" strokeWidth="16" fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <span className="absolute text-[36px] font-[700] text-[#3B82F6]">
              {percentage}%
            </span>
          </div>

          {earnedXP > 0 && (
            <div className="flex items-center gap-2 mb-[16px] text-[#FCD34D] font-bold text-[18px] bg-[#FCD34D]/10 px-4 py-2 rounded-lg border border-[#FCD34D]/30 shadow-[0_0_10px_rgba(252,211,77,0.2)] animate-pulse">
              <span>🎉 +{earnedXP} XP</span>
            </div>
          )}

          <div className="flex gap-[16px] mb-[12px]">
            <div className="flex items-center gap-[8px] border border-[#0ABD5A] bg-[#0ABD5A]/10 px-[16px] py-[8px] rounded-[6px]">
              <span className="text-[#0ABD5A] font-bold text-lg">✓</span>
              <span className="text-white font-[600]">{score} <span className="text-[#9CA3AF] font-normal">/ {totalQuestions}</span></span>
            </div>
            <div className="flex items-center gap-[8px] border border-[#EF4444] bg-[#EF4444]/10 px-[16px] py-[8px] rounded-[6px]">
              <span className="text-[#EF4444] font-bold text-lg">✕</span>
              <span className="text-white font-[600]">{incorrectCount} <span className="text-[#9CA3AF] font-normal">/ {totalQuestions}</span></span>
            </div>
          </div>

          {/* Updated View Ranking button to italic as per Figma */}
          <button className="text-[#3B82F6] text-[14px] hover:underline font-[500] italic cursor-pointer transition-colors mt-[4px]">
            View Ranking
          </button>
        </div>

        {/* --- 3. INCORRECT TERMS --- */}
        {incorrectTerms.length > 0 && (
          <div className="w-full flex flex-col gap-[16px]">
            <h3 className="text-[18px] font-[700] text-[#E5E7EB]">Incorrect Terms</h3>
            <div className="flex flex-col gap-[12px] w-full">
              {incorrectTerms.map((term, i) => (
                <div key={`inc-${i}`} className="flex justify-between items-center w-full bg-[#3F0500] border-[1.5px] border-[#9B0000] rounded-[8px] p-[16px] hover:bg-[#4d0700] transition-colors">
                  <span className="text-[#E5E7EB] text-[14px] font-[500] truncate pr-4">{term.questionText}</span>
                  <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[14px] font-[500] px-[16px] py-[8px] rounded-[6px] transition-all whitespace-nowrap cursor-pointer">
                    View more...
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 4. CORRECT TERMS --- */}
        {correctTerms.length > 0 && (
          <div className="w-full flex flex-col gap-[16px]">
            <h3 className="text-[18px] font-[700] text-[#E5E7EB]">Correct Terms</h3>
            <div className="flex flex-col gap-[12px] w-full">
              {correctTerms.map((term, i) => (
                <div key={`cor-${i}`} className="flex justify-between items-center w-full bg-[#0ABD5A]/10 border-[1.5px] border-[#0ABD5A] rounded-[8px] p-[16px] hover:bg-[#0abd5a]/20 transition-colors">
                  <span className="text-[#E5E7EB] text-[14px] font-[500] truncate pr-4">{term.questionText}</span>
                  <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[14px] font-[500] px-[16px] py-[8px] rounded-[6px] transition-all whitespace-nowrap cursor-pointer">
                    View more...
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 5. TRY ANOTHER QUIZ --- */}
        <div className="w-full flex flex-col items-center gap-[24px] mt-[8px]">
          <h2 className="text-[20px] font-[700] text-[#E5E7EB] w-full text-center">Try another quiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] w-full">
            {topicsList.map((t: any) => (
              <div
                key={t.id}
                onClick={() => onTryAnother(t)}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <TopicCard
                  name={t.title}
                  difficulty={capitalize(t.difficulty)}
                  description="Test your knowledge with these specialized questions."
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizResult;