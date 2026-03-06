import React, { useState } from 'react';
import TopicCard from '../components/TopicCard';

// Tự định nghĩa TopicData ngay tại đây để file chạy độc lập
export interface TopicData {
  id?: number;
  name: string;
  difficulty: string;
  borderColor: string;
  badgeBg: string;
}

interface QuizPageProps {
  onStart: (topic: TopicData) => void;
}

const topics: TopicData[] = [
  { id: 1, name: 'Topic 1', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]' },
  { id: 2, name: 'Topic 2', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]' },
  { id: 3, name: 'Topic 3', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]' },
  { id: 4, name: 'Topic 4', difficulty: 'Medium', borderColor: 'border-[#DFA700]', badgeBg: 'bg-[#DFA700]' },
  { id: 5, name: 'Topic 5', difficulty: 'Medium', borderColor: 'border-[#DFA700]', badgeBg: 'bg-[#DFA700]' },
  { id: 6, name: 'Topic 6', difficulty: 'Medium', borderColor: 'border-[#DFA700]', badgeBg: 'bg-[#DFA700]' },
  { id: 7, name: 'Topic 7', difficulty: 'Hard', borderColor: 'border-[#BD160A]', badgeBg: 'bg-[#BD160A]' },
  { id: 8, name: 'Topic 8', difficulty: 'Hard', borderColor: 'border-[#BD160A]', badgeBg: 'bg-[#BD160A]' },
  { id: 9, name: 'Topic 9', difficulty: 'Hard', borderColor: 'border-[#BD160A]', badgeBg: 'bg-[#BD160A]' },
  { id: 10, name: 'Topic 10', difficulty: 'Extreme', borderColor: 'border-[#780ABD]', badgeBg: 'bg-[#780ABD]' },
  { id: 11, name: 'Topic 11', difficulty: 'Extreme', borderColor: 'border-[#780ABD]', badgeBg: 'bg-[#780ABD]' },
  { id: 12, name: 'Topic 12', difficulty: 'Extreme', borderColor: 'border-[#780ABD]', badgeBg: 'bg-[#780ABD]' },
];

const QuizPage: React.FC<QuizPageProps> = ({ onStart }) => {
  // --- STATE DÀNH CHO RANDOM QUESTION ---
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Dữ liệu câu hỏi ngẫu nhiên ngoài trang chủ
  const randomQuestion = {
    question: "What does the acronym 'API' stand for in software development?",
    options: [
      'Application Programming Interface', 
      'Advanced Program Integration', 
      'Automated Protocol Interface', 
      'App Processing Information'
    ],
    correctAnswer: 0
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white pt-[40px] pb-12 font-['Inter'] flex flex-col items-center">
      <div className="w-full max-w-[1002px] px-[32px] flex flex-col items-start text-left">
        
        {/* --- SECTION 1: RANDOM QUESTION --- */}
        <section className="w-full mb-[48px] flex flex-col gap-[24px]">
          <h2 className="text-[24px] font-bold leading-[32px] text-[#E5E7EB] font-['Inter']">
            Random Quiz Question
          </h2>
          
          <h3 className="text-[18px] font-[500] leading-[28px] text-[#E5E7EB] text-left w-full font-['Inter']">
            {randomQuestion.question}
          </h3>

          <div className="flex flex-col gap-[16px] w-full">
            {randomQuestion.options.map((opt, i) => {
              let boxStyle = "border-[#4B5563] bg-transparent hover:border-[#3B82F6]";
              let letterBg = "bg-[#1E3A8A]";
              let letterColor = "text-[#3B82F6]";

              if (isAnswered) {
                if (i === randomQuestion.correctAnswer) {
                  boxStyle = "border-[#0ABD5A] bg-[#0ABD5A]/10";
                  letterBg = "bg-[#0ABD5A]";
                  letterColor = "text-white";
                } else if (i === selectedOption) {
                  boxStyle = "border-[#9B0000] bg-[#3F0500]"; // Câu sai
                  letterBg = "bg-[#8D0000]";
                  letterColor = "text-white";
                } else {
                  boxStyle = "border-[#374151] opacity-50";
                }
              }

              return (
                <button 
                  key={i} 
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`flex items-center p-[16px] gap-[24px] border-[1.5px] rounded-[8px] transition-all w-full text-left cursor-pointer font-['Inter'] ${boxStyle}`}
                >
                  <div className={`w-[32px] h-[32px] shrink-0 rounded-[6px] flex items-center justify-center font-[600] text-[14px] leading-[20px] transition-colors ${letterBg} ${letterColor}`}>
                    A
                  </div>
                  <span className="text-[#E5E7EB] text-[14px] font-[500] leading-[20px]">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* View API Definition (Chỉ hiện khi đã trả lời) */}
          <div className="flex justify-start items-center w-full pt-[8px]">
            {isAnswered && (
              <span className="text-[14px] text-[#E5E7EB] font-['Inter']">
                View the <span className="text-[#3B82F6] font-[500] hover:underline cursor-pointer transition-colors">API definition.</span>
              </span>
            )}
          </div>
        </section>

        {/* --- SECTION 2: CATEGORIES --- */}
        <section className="w-full">
          <h2 className="text-[24px] font-bold leading-[32px] text-[#E5E7EB] mb-[21px] font-['Inter']">
            Quiz Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
            {topics.map((topic) => (
              <div 
                key={topic.id} 
                onClick={() => onStart(topic)} 
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <TopicCard 
                  name={topic.name}
                  difficulty={topic.difficulty}
                  borderColor={topic.borderColor}
                  badgeBg={topic.badgeBg}
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default QuizPage;