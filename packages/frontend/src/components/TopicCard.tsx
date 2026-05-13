import { Globe, Cpu, Code, ArrowRight } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";

interface TopicCardProps
{
    name: string;
    difficulty: string;
    description: string;
}

export default function TopicCard({ name, difficulty, description }: TopicCardProps)
{
    const { theme } = useTheme();
    const cleanName = name.replace(/ Term$/i, '').trim();

    const getIcon = () =>
    {
        const lowerName = cleanName.toLowerCase();
        if (lowerName.includes('internet'))
        {
            return <Globe size={20} />;
        }
        if (lowerName.includes('hardware'))
        {
            return <Cpu size={20} />;
        }
        if (lowerName.includes('software'))
        {
            return <Code size={20} />;
        }
        return <Code size={20} />;
    };

    const normalizedDiff = (difficulty || 'easy').toLowerCase();

    // Thiết lập màu sắc viền và nền mặc định theo Theme
    let borderColor = theme === 'dark' ? 'border-[#2D3748]' : 'border-gray-200';
    let badgeColor = 'bg-gray-500';
    let bgColor = theme === 'dark' ? 'bg-[#1a1a1a]/60' : 'bg-white';

    // Đổ màu theo độ khó (Opacity nền sẽ nhạt hơn ở Light Mode cho thanh lịch)
    if (normalizedDiff === 'easy')
    {
        borderColor = 'border-[#0ABD5A]';
        badgeColor = 'bg-[#0ABD5A]';
        bgColor = theme === 'dark' ? 'bg-[#0ABD5A]/15 hover:bg-[#0ABD5A]/25' : 'bg-[#0ABD5A]/10 hover:bg-[#0ABD5A]/20';
    }
    else if (normalizedDiff === 'medium')
    {
        borderColor = 'border-[#8B5CF6]';
        badgeColor = 'bg-[#8B5CF6]';
        bgColor = theme === 'dark' ? 'bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25' : 'bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20';
    }
    else if (normalizedDiff === 'hard' || normalizedDiff === 'extreme')
    {
        borderColor = 'border-[#EF4444]';
        badgeColor = 'bg-[#EF4444]';
        bgColor = theme === 'dark' ? 'bg-[#EF4444]/15 hover:bg-[#EF4444]/25' : 'bg-[#EF4444]/10 hover:bg-[#EF4444]/20';
    }

    // 🚀 Quy định màu chữ sẽ tự động lật ngược theo Theme
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const descColor = theme === 'dark' ? 'text-[#A0AEC0]' : 'text-gray-700';
    const arrowHover = theme === 'dark' ? 'group-hover:text-white' : 'group-hover:text-gray-900';

    return (
        <div className={`flex flex-col justify-between p-4 sm:p-[20px] rounded-xl border-[1.5px] ${bgColor} ${borderColor} transition-all duration-300 min-h-[170px] group`}>
            <div className="flex justify-between items-start gap-3 w-full">
                <div className={`flex items-center gap-2 min-w-0 ${textColor}`}>
                    {getIcon()}
                    <h3 className="font-bold text-[17px] sm:text-[18px] break-words">{cleanName}</h3>
                </div>
                <span className={`${badgeColor} shrink-0 text-white text-[12px] font-bold px-3 py-1 rounded-full capitalize`}>
                    {difficulty}
                </span>
            </div>
            
            <p className={`${descColor} text-[14px] mt-4 flex-1 line-clamp-2`}>
                {description}
            </p>
            
            <div className="flex justify-end w-full mt-2">
                <ArrowRight className={`text-gray-500 ${arrowHover} transition-colors`} size={20} />
            </div>
        </div>
    );
}
