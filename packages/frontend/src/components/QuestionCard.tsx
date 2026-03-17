import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption: number | null;
  correctAnswer?: number; // Optional: Only provided when we want to reveal the answer
  isAnswered: boolean;
  onSelect: (index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  options, 
  selectedOption, 
  correctAnswer, 
  isAnswered, 
  onSelect 
}) => {
  return (
    <div className="flex flex-col gap-[24px] w-full p-[24px]">
      <h3 className="text-[18px] font-[500] leading-[28px] text-[#E5E7EB] text-left w-full font-['Inter']">
        {question}
      </h3>
      
      <div className="flex flex-col gap-[16px] w-full">
        {options.map((opt, i) => {
          let boxStyle = "border-[#4B5563] bg-transparent hover:border-[#3B82F6]";
          let letterBg = "bg-[#1E3A8A]";
          let letterColor = "text-[#3B82F6]";

          // Logic to apply colors after an answer is submitted
          if (isAnswered && correctAnswer !== undefined) {
            if (i === correctAnswer) {
              boxStyle = "border-[#0ABD5A] bg-[#0ABD5A]/10";
              letterBg = "bg-[#0ABD5A]";
              letterColor = "text-white";
            } else if (i === selectedOption) {
              boxStyle = "border-[#9B0000] bg-[#3F0500]"; 
              letterBg = "bg-[#8D0000]";
              letterColor = "text-white";
            } else {
              boxStyle = "border-[#374151] opacity-50";
            }
          }

          return (
            <button 
              key={i} 
              onClick={() => onSelect(i)}
              disabled={isAnswered}
              className={`flex items-center p-[16px] gap-[24px] border-[1.5px] rounded-[8px] transition-all w-full text-left font-['Inter'] ${isAnswered ? 'cursor-default' : 'cursor-pointer'} ${boxStyle}`}
            >
              <div className={`w-[32px] h-[32px] shrink-0 rounded-[6px] flex items-center justify-center font-[600] text-[14px] leading-[20px] transition-colors ${letterBg} ${letterColor}`}>
                {String.fromCharCode(65 + i)}
              </div>
              <span className="text-[#E5E7EB] text-[14px] font-[500] leading-[20px]">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;