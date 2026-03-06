import React from 'react';

interface TopicProps {
  name: string;
  difficulty: string;
  borderColor: string;
  badgeBg: string;
}

const TopicCard: React.FC<TopicProps> = ({ name, difficulty, borderColor, badgeBg }) => {
  return (
    <div className={`h-[75px] bg-transparent border-2 ${borderColor} rounded-[8px] flex justify-between items-center px-[15px] hover:bg-[#2A2A2A] transition-colors cursor-pointer w-full`}>
      
      <div className="flex items-center gap-[12px]">
        <div className="w-[32px] h-[32px] text-white flex items-center justify-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <h4 className="text-[20px] font-medium leading-[48px] text-white font-['Inter']">
          {name}
        </h4>
      </div>

      {/* --- KHU VỰC ĐÃ CẬP NHẬT KÍCH THƯỚC KHUNG --- */}
      {/* Cố định Cao 25px, Rộng tối thiểu 48px chuẩn Figma */}
      <div className={`h-[25px] min-w-[48px] px-[12px] rounded-[100px] flex items-center justify-center ${badgeBg}`}>
        {/* whitespace-nowrap: Ngăn không cho chữ rớt xuống dòng nếu quá dài */}
        <span className="text-white text-[12px] font-medium text-center font-['Inter'] whitespace-nowrap leading-none">
          {difficulty}
        </span>
      </div>
      
    </div>
  );
};

export default TopicCard;