import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function TermPageCategory()
{
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        const fetchCategories = async () =>
        {
            try
            {
                const response: any = await axiosClient.get('/api/lessons');
                const data = response.data?.data || response.data || response;

                // 🚀 BỘ LỌC THẦN THÁNH: Chỉ giữ lại 1 chủ đề duy nhất cho mỗi tên
                const uniqueCategories = data.filter((lesson: any, index: number, self: any[]) =>
                    index === self.findIndex((t: any) => t.title === lesson.title)
                );

                setCategories(uniqueCategories);
            }
            catch (error)
            {
                console.error(error);
            }
            finally
            {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const alphabetList: string[] = ["#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const alphabetListElements = alphabetList.map(letter =>
    (
        <li 
            key={letter} 
            onClick={() => navigate(`/term/letter/${letter === '#' ? '%23' : letter}`)}
            className="cursor-pointer list-none w-full h-[62px] rounded-[6px] border border-[#597DFF] flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] transition-colors font-[600] text-[17px] leading-[32px] text-[#FFFFFF]"
        >
            {letter}
        </li>
    ));

    // 🚀 Hàm format gọt bỏ chữ "Term" cho giao diện thanh thoát
    const formatTitle = (title: string) => title ? title.replace(/ Term$/i, '').trim() : '';

    return (
        <div className="inter container flex flex-col items-center justify-start gap-[50px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
                <h2 className="font-[700] text-[24px] leading-[24px] text-[#3B82F6] dark:text-[#E5E7EB] text-left">
                    Categories
                </h2>
                <div className="w-full grid grid-cols-4 gap-[16px]">
                    {isLoading ? 
                    (
                        [1, 2, 3, 4].map(skeleton => 
                        (
                            <div key={skeleton} className="h-[62px] bg-blue-400/30 animate-pulse rounded-[6px]"></div>
                        ))
                    ) : 
                    (
                        categories.map((category) => 
                        (
                            <button
                                key={category.id}
                                onClick={() => navigate(`/term/category/${category.id}`)}
                                className="cursor-pointer list-none w-full h-[62px] rounded-[6px] border border-[#597DFF] flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] transition-colors font-[600] text-[17px] leading-[32px] text-[#FFFFFF]"
                            >
                                {formatTitle(category.title)}
                            </button>
                        ))
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-[16px] w-full mt-4">
                <h2 className="font-[700] text-[24px] leading-[24px] text-[#3B82F6] dark:text-[#E5E7EB] text-left">
                    Alphabet
                </h2>
                <div className="w-full grid grid-cols-9 gap-[12px]">
                    {alphabetListElements}
                </div>
            </div>
        </div>
    );
}