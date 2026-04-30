import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TermPageCategorySpecializedLetter()
{
    // Lấy chữ cái từ trên URL (ví dụ: /term/letter/A)
    const { letter } = useParams();
    const navigate = useNavigate();
    
    const [terms, setTerms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        const fetchTermsByLetter = async () =>
        {
            try
            {
                // Lấy toàn bộ từ vựng
                const response: any = await axiosClient.get('/api/terms');
                const allTerms = response.data?.data || response.data || response;

                // Lọc ra những từ bắt đầu bằng chữ cái đang chọn
                const filteredTerms = allTerms.filter((term: any) =>
                {
                    if (!term.termName) return false;
                    
                    const firstChar = term.termName.charAt(0).toUpperCase();
                    
                    // Xử lý trường hợp bấm vào dấu "#" (các từ bắt đầu bằng số)
                    if (letter === '#')
                    {
                        return !/[A-Z]/.test(firstChar);
                    }
                    
                    return firstChar === letter?.toUpperCase();
                });

                setTerms(filteredTerms);
            }
            catch (error)
            {
                console.error("Lỗi tải từ vựng alphabet:", error);
            }
            finally
            {
                setIsLoading(false);
            }
        };

        if (letter)
        {
            fetchTermsByLetter();
        }
    }, [letter]);

    return (
        <div className="inter container flex flex-col gap-[30px] w-full p-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/term')}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors dark:text-white"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="font-bold text-[30px] text-[#000000] dark:text-[#E5E7EB] text-left leading-[32px]">
                    Terms that start with '{letter}'
                </h2>
            </div>

            <div className="container__list flex flex-col gap-[10px] w-full">
                {isLoading ?
                (
                    // Loading Skeleton
                    [1, 2, 3, 4, 5].map(skeleton =>
                    (
                        <div key={skeleton} className="h-[66px] bg-blue-400/20 animate-pulse rounded-[6px] w-full"></div>
                    ))
                ) : terms.length === 0 ?
                (
                    // Trạng thái trống
                    <div className="flex flex-col items-center justify-center py-20 opacity-60 dark:text-white">
                        <BookOpen size={48} className="mb-4" />
                        <p className="text-[16px]">Chưa có từ vựng nào bắt đầu bằng chữ '{letter}'</p>
                    </div>
                ) :
                (
                    // Render Data thật
                    terms.map((term: any) =>
                    (
                        <li 
                            key={term.id} 
                            className="list-none bg-[#E8E7E7] dark:bg-[#4A4A4A] rounded-[6px] border border-[#B9B8B8] dark:border-[#777676] flex flex-row gap-[16px] items-center p-[16px] min-h-[66px] cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                        >
                            <div className="icon min-w-[32px] h-[32px] rounded-[6px] flex items-center justify-center bg-gradient-to-b from-[#B1B1B1] to-[#FFFFFF] dark:to-[#4B4B4B]">
                                <p className="cursor-default font-bold text-[14px] text-[#000000] dark:text-[#FFFFFF] leading-[20px]">
                                    {term.termName.charAt(0).toUpperCase()}
                                </p>
                            </div>

                            <div className="content flex-1 text-left flex flex-col">
                                <p className="font-[600] text-[16px] text-[#000000] dark:text-[#FFFEFE] leading-[24px]">
                                    {term.termName}
                                </p>
                                {/* Hiển thị thêm dòng định nghĩa ngắn gọn */}
                                <p className="text-[13px] text-gray-600 dark:text-gray-300 line-clamp-1 mt-1">
                                    {term.definition}
                                </p>
                            </div>
                        </li>
                    ))
                )}
            </div>
        </div>
    );
}