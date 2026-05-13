import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function load_menu(title: string, list_menu: any[], isLoading: boolean) {
    return (
        <div className="inter h-auto p-5">
            <h3 className="border-b border-[#374151] dark:border-gray-600 pb-[12px] w-full font-[700] font-bold text-[18px] leading-[28px] text-[#000000] dark:text-[#FFFFFF] text-left cursor-default"> 
                {title}
            </h3>
            <div className="text-left">
                <ol className="list-decimal list-inside mt-2">
                    {isLoading ? (
                        <p className="text-gray-500 text-sm italic mt-4 animate-pulse">Loading...</p>
                    ) : list_menu.length > 0 ? (
                        list_menu.map(term => (
                            <li key={term.id} className="font-[500] font-medium text-[16px] leading-[24px] pt-[12px] marker:text-[#6B7280]">
                                <Link to={`/term/detail/${term.id}`} className="text-[#3B82F6] hover:underline pl-[12px]"> {term.termName} </Link>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm italic mt-4">No terms found</p>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default function Body() {
    const [recentTerms, setRecentTerms] = useState<any[]>([]);
    const [trendingTerms, setTrendingTerms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Đồng bộ hóa với logic của LandingPage.tsx
                const response: any = await axiosClient.get('/api/terms');
                const allTerms = response.data?.data || response.data || [];
                
                if (Array.isArray(allTerms)) {
                    // Lấy 5 mục cuối làm "mới nhất" và 5 mục đầu làm "trending" (giống LandingPage)
                    setRecentTerms(allTerms.slice(-5).reverse());
                    setTrendingTerms(allTerms.slice(0, 5));
                }
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="skeleton-body py-6 sm:py-[40px] px-4 sm:px-[32px] bg-[#FFFFFF] dark:bg-[#212121]">
            <div className="body flex flex-col lg:flex-row justify-between gap-8">

                {/* KHU VỰC BÊN TRÁI: Dùng Outlet để React Router tự động nhét trang con vào */}
                <div className="flex flex-1 min-w-0">
                    <Outlet />
                </div>

                {/* KHU VỰC BÊN PHẢI: Thanh Menu */}
                <div className="menu w-full lg:w-[384px] lg:shrink-0 h-auto flex flex-col gap-6 lg:gap-[32px]">
                    {load_menu("Recently Added Terms", recentTerms, isLoading)}
                    {load_menu("Trending Terms", trendingTerms, isLoading)}
                </div>

            </div>
        </div>
    );
}
