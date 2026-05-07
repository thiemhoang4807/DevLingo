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

            {/* ĐÃ CHUYỂN ĐỔI THÀNH GIAO DIỆN GRID (LƯỚI) GIỐNG BÊN CATEGORY */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ?
                (
                    // Loading Skeleton dạng khối vuông
                    [1, 2, 3, 4, 5, 6].map(skeleton =>
                    (
                        <div key={skeleton} className="h-[200px] bg-blue-400/20 animate-pulse rounded-[10px] w-full"></div>
                    ))
                ) : terms.length === 0 ?
                (
                    // Trạng thái trống trải dài toàn bộ lưới (col-span-full)
                    <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-60 dark:text-white">
                        <BookOpen size={48} className="mb-4" />
                        <p className="text-[16px]">Chưa có từ vựng nào bắt đầu bằng chữ '{letter}'</p>
                    </div>
                ) :
                (
                    // Render Data thật dạng Card
                    terms.map((term: any) =>
                    (
                        <div
                            key={term.id}
                            onClick={() => navigate(`/term/detail/${term.id}`)} // Nối ống sang trang chi tiết
                            className="p-6 rounded-[10px] border-2 transition-all hover:border-[#3B82F6] shadow-sm cursor-pointer bg-white border-gray-200 dark:bg-[#1E1E1E] dark:border-[#374151]"
                        >
                            {/* Hiển thị ảnh nếu có */}
                            {term.imageUrl && (
                                <img
                                    src={term.imageUrl.startsWith('http') ? term.imageUrl : `http://localhost:5000${term.imageUrl}`}
                                    alt={term.termName}
                                    className="w-full h-32 object-cover rounded-[8px] mb-4 bg-gray-50 dark:bg-gray-800/50"
                                />
                            )}
                            
                            {/* Tên từ vựng */}
                            <h3 className="text-[20px] font-[700] text-[#3B82F6]">
                                {term.termName}
                            </h3>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
