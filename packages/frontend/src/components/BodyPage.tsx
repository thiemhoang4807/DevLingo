import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function load_menu(title: string, list_menu: any[]) {
    return (
        <div className="inter h-[265px] p-[20px]">
            <h3 className="border-b border-[#374151] dark:border-gray-600 pb-[12px] w-[344px] font-[700] font-bold text-[18px] leading-[28px] text-[#000000] dark:text-[#FFFFFF] text-left cursor-default"> 
                {title}
            </h3>
            <div className="text-left">
                <ol className="list-decimal list-inside mt-2">
                    {list_menu.length > 0 ? list_menu.map(term => (
                        <li key={term.id} className="font-[500] font-medium text-[16px] leading-[24px] pt-[12px] marker:text-[#6B7280]">
                            <Link to={`/term/detail/${term.id}`} className="text-[#3B82F6] hover:underline pl-[12px]"> {term.termName} </Link>
                        </li>
                    )) : (
                        <p className="text-gray-500 text-sm italic mt-4">Loading...</p>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default function Body() {
    const [recentTerms, setRecentTerms] = useState<any[]>([]);
    const [trendingTerms, setTrendingTerms] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recentRes, trendingRes]: any = await Promise.all([
                    axiosClient.get('/api/terms/recent?limit=5'),
                    axiosClient.get('/api/terms/trending?limit=5')
                ]);
                
                setRecentTerms(recentRes.data?.data || recentRes.data || []);
                setTrendingTerms(trendingRes.data?.data || trendingRes.data || []);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="skeleton-body py-[40px] px-[32px] bg-[#FFFFFF] dark:bg-[#212121]">
            <div className="body flex flex-row justify-between gap-[32px]">

                {/* KHU VỰC BÊN TRÁI: Dùng Outlet để React Router tự động nhét trang con vào */}
                <div className="flex flex-1">
                    <Outlet />
                </div>

                {/* KHU VỰC BÊN PHẢI: Thanh Menu */}
                <div className="menu w-[384px] h-[562px] flex flex-col gap-[32px]">
                    {load_menu("Recently Added Terms", recentTerms)}
                    {load_menu("Trending Terms", trendingTerms)}
                </div>

            </div>
        </div>
    );
}