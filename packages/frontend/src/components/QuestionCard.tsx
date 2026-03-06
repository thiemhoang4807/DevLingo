import React from 'react';

interface Props {
  question: string;
  options: string[];
}

const QuestionCard: React.FC<Props> = ({ question, options }) => {
  return (
    /* Thêm p-[24px] ở đây: Nó sẽ tạo khoảng lề trong, ép chữ chạy sang phải 24px */
    <div className="bg-[#212121] flex flex-col gap-[24px] text-left w-full p-[24px]">
      
      <h3 className="text-[18px] font-medium leading-[28px] text-[#E5E7EB] font-['Inter']">
        {question}
      </h3>
      
      <div className="flex flex-col gap-[12px]">
        {options.map((opt, i) => (
          <button 
            key={i} 
            className="flex items-center gap-[16px] p-[16px] bg-transparent border border-[#4B5563] rounded-[6px] hover:border-[#3B82F6] transition-all w-full group"
          >
            <div className="w-[32px] h-[32px] flex-shrink-0 rounded-[6px] bg-[#1E3A8A] flex items-center justify-center">
              <span className="text-[#3B82F6] text-[14px] font-bold leading-[20px] font-['Inter']">
                {String.fromCharCode(65 + i)}
              </span>
            </div>
            
            <span className="text-[#E5E7EB] text-[16px] font-['Inter']">
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;