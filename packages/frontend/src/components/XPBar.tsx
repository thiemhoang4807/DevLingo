import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface XPBarProps {
  currentXP: number;
  xpToNextLevel: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXP, xpToNextLevel }) => {
  const { theme } = useTheme();
  
  // Fix lỗi chia cho 0: Đảm bảo mẫu số luôn lớn hơn 0
  const safeXpToNextLevel = xpToNextLevel > 0 ? xpToNextLevel : 1;
  const percentage = Math.min(Math.round((currentXP / safeXpToNextLevel) * 100), 100);

  return (
    <div 
      className="flex flex-col gap-2 w-full max-w-[320px]"
      role="progressbar" 
      aria-valuenow={percentage} 
      aria-valuemin={0} 
      aria-valuemax={100}
    >
      <div className={`w-full h-9 px-0.5 py-px relative rounded-[32px] flex items-center transition-all duration-300
                      ${theme === 'dark' ? 'bg-black shadow-[0_0_15px_rgba(168,85,247,0.15)]' : 'bg-white shadow-sm border border-gray-100'}`}>
        
        <motion.div
          initial={{ width: "7%" }}
          animate={{ width: `${Math.max(percentage, 7)}%` }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-7 bg-gradient-to-r from-teal-200 via-violet-400 to-red-300 rounded-[100px]"
        />

        {/* Fix lỗi màu chữ: Luôn để text-gray-900 vì nền gradient sáng màu */}
        <div className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[10px] font-['Kode_Mono'] font-bold text-gray-900 pointer-events-none">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default XPBar;