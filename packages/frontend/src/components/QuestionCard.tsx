import { useTheme } from "../context/ThemeContext";

interface QuestionCardProps
{
    question: string;
    options: string[];
    selectedOption: number | null;
    correctAnswer: number;
    isAnswered: boolean;
    onSelect: (idx: number) => void;
}

export default function QuestionCard({ question, options, selectedOption, correctAnswer, isAnswered, onSelect }: QuestionCardProps)
{
    const { theme } = useTheme();

    const letters = ['A', 'B', 'C', 'D'];

    return (
        <div className="w-full flex flex-col gap-6">
            {/* 🚀 Màu chữ câu hỏi tự đổi: Đen cho Light, Xám sáng cho Dark */}
            <p className={`text-[18px] font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {question}
            </p>

            <div className="flex flex-col gap-4">
                {options.map((option, idx) =>
                {
                    const isSelected = selectedOption === idx;
                    const isCorrect = isAnswered && idx === correctAnswer;
                    const isWrong = isAnswered && isSelected && idx !== correctAnswer;

                    // 🚀 Cài đặt màu sắc mặc định theo Theme
                    let borderClass = theme === 'dark' ? 'border-gray-700' : 'border-[#CBD5E1]';
                    let bgClass = theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white';
                    let textClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

                    // Xử lý màu sắc khi chọn Đúng/Sai
                    if (isCorrect)
                    {
                        borderClass = 'border-[#0ABD5A]';
                        bgClass = theme === 'dark' ? 'bg-[#0ABD5A]/20' : 'bg-[#0ABD5A]/10';
                        textClass = theme === 'dark' ? 'text-[#0ABD5A]' : 'text-[#068a41]';
                    }
                    else if (isWrong)
                    {
                        borderClass = 'border-[#EF4444]';
                        bgClass = theme === 'dark' ? 'bg-[#EF4444]/20' : 'bg-[#EF4444]/10';
                        textClass = theme === 'dark' ? 'text-[#EF4444]' : 'text-[#b91c1c]';
                    }
                    else if (isSelected && !isAnswered)
                    {
                        borderClass = 'border-[#3B82F6]';
                        bgClass = theme === 'dark' ? 'bg-[#3B82F6]/20' : 'bg-[#F0F9FF]';
                    }

                    return (
                        <div
                            key={idx}
                            onClick={() => onSelect(idx)}
                            className={`flex items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border-[1.5px] cursor-pointer transition-all ${borderClass} ${bgClass} ${!isAnswered && 'hover:border-[#3B82F6]'}`}
                        >
                            <div className={`flex shrink-0 items-center justify-center w-8 h-8 rounded text-sm font-bold ${
                                isCorrect ? 'bg-[#0ABD5A] text-white' :
                                isWrong ? 'bg-[#EF4444] text-white' :
                                theme === 'dark' ? 'bg-[#2D3748] text-white' : 'bg-[#1E3A8A] text-white'
                            }`}>
                                {letters[idx]}
                            </div>
                            <span className={`text-[15px] sm:text-[16px] font-medium break-words min-w-0 ${textClass}`}>
                                {option}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
