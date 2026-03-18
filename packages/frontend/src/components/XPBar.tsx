import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Sử dụng context bạn đã có

interface XPBarProps {
  currentXP: number;
  xpToNextLevel: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, xpToNextLevel }) => {
  const { theme } = useTheme(); // Lấy theme "dark" hoặc "light"
  
  // Tính toán phần trăm thực tế dựa trên XP
  const percentage = Math.min(Math.round((currentXP / xpToNextLevel) * 100), 100);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      {/* Container chính: Bo góc 32px như thiết kế Figma */}
      <div className={`w-full h-9 px-0.5 py-px relative rounded-[32px] flex items-center transition-all duration-300
                      ${theme === 'dark' ? 'bg-black shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-white shadow-sm border border-gray-100'}`}>
        
        {/* Thanh Progress dùng Framer Motion để trượt mượt mà */}
        <motion.div
          initial={{ width: "7%" }} // Bắt đầu ở mức tối thiểu để lộ hình tròn chứa số %
          animate={{ width: `${Math.max(percentage, 7)}%` }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-7 bg-gradient-to-r from-teal-200 via-violet-400 to-red-300 rounded-[100px]"
        />

        {/* Text hiển thị % đặt tuyệt đối bên trái */}
        <div className={`absolute left-[10px] top-1/2 -translate-y-1/2 text-[10px] font-['Kode_Mono'] font-bold pointer-events-none
                        ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default XPBar;

// Lưu ý: Đảm bảo rằng bạn đã cài đặt và cấu hình Tailwind CSS cũng như Framer Motion trong dự án của mình để sử dụng component này một cách hiệu quả.
// dùng lệnh này để sử dụng component: <XPBar currentXP={0} xpToNextLevel={100} />