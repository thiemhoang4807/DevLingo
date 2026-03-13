import React from 'react';
import { Globe } from 'lucide-react';
import type { TopicData } from '../types/quiz';

const TopicCard: React.FC<TopicData> = ({ name, difficulty, borderColor, badgeBg }) => {
  return (
    <div className={`h-[75px] bg-transparent border-[1.5px] ${borderColor} rounded-[8px] flex justify-between items-center px-[20px] hover:bg-[#2A2A2A] transition-colors cursor-pointer w-full`}>
      
      <div className="flex items-center gap-[12px]">
        {/* Dùng chuẩn icon Globe từ thư viện */}
        <div className="w-[32px] h-[32px] text-white flex items-center justify-center">
           <Globe className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <h4 className="text-[20px] font-[600] leading-[48px] text-white font-['Inter']">
          {name}
        </h4>
      </div>

      <div className={`h-[25px] min-w-[65px] px-[12px] rounded-[100px] flex items-center justify-center ${badgeBg}`}>
        <span className="text-white text-[12px] font-medium text-center font-['Inter'] whitespace-nowrap leading-none">
          {difficulty}
        </span>
      </div>
      
    </div>
  );
};

export default TopicCard;