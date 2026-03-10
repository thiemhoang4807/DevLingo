import React from 'react';
import TopicCard from '../components/TopicCard';
import type { TopicData, UserAnswerHistory } from '../types/quiz';

interface QuizResultProps {
  topic: TopicData;
  score: number;
  totalQuestions: number;
  history: UserAnswerHistory[]; // Receives actual test data
  onTryAnother: (topic?: TopicData) => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ topic, score, totalQuestions, history = [], onTryAnother }) => {
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
        <div className={`flex items-center w-[378px] h-[44px] border-[1.5px] ${topic.borderColor} rounded-[100px] shrink-0 overflow-hidden`}>
          <div className="flex-[2] bg-[#FFFFFF] text-[#1D4ED8] pl-[20px] flex items-center justify-start font-[700] text-[16px] h-full">
            {topic.name}
          </div>
          <div className={`flex-[1] ${topic.badgeBg} text-[#FFFFFF] flex items-center justify-center font-[600] text-[15px] h-full uppercase tracking-wide`}>
            {topic.difficulty}
          </div>
        </div>

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
        </div>

        {/* --- 3. INCORRECT TERMS --- */}
        {incorrectTerms.length > 0 && (
          <div className="w-full flex flex-col gap-[16px]">
            <h3 className="text-[18px] font-[700] text-[#E5E7EB]">Incorrect Terms</h3>
            <div className="flex flex-col gap-[12px] w-full">
              {incorrectTerms.map((term, i) => (
                <div key={`inc-${i}`} className="flex justify-between items-center w-full bg-[#3F0500] border-[1.5px] border-[#9B0000] rounded-[8px] p-[16px] hover:bg-[#4d0700] transition-colors">
                  <span className="text-[#E5E7EB] text-[14px] font-[500] truncate pr-4">{term.questionText}</span>
                  <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[14px] font-[500] px-[16px] py-[8px] rounded-[6px] transition-all whitespace-nowrap">
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
                  <button className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[14px] font-[500] px-[16px] py-[8px] rounded-[6px] transition-all whitespace-nowrap">
                    View more...
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default QuizResult;