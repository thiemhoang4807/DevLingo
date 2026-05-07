import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TermDetailPage() {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [objTerm, setObjTerm] = useState<any>(null);
    const [bIsLoading, setBIsLoading] = useState(true);

    useEffect(() => {
        const fetchTermDetail = async () => {
            try {
                // Gọi api lấy đúng 1 từ vựng theo ID
                const response = await axiosClient.get(`/api/terms/${id}`);
                const termData = response.data?.data || response.data;
                setObjTerm(termData);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết từ vựng:", error);
            } finally {
                setBIsLoading(false);
            }
        };

        if (id) {
            fetchTermDetail();
        }
    }, [id]);

    return (
        <div className={`inter container flex flex-col items-center justify-start gap-[30px] w-full max-w-4xl mx-auto py-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {/* Header: Nút Back và Tên từ vựng */}
            <div className="flex items-center justify-start w-full gap-4">
                <button
                    onClick={() => navigate(-1)} // navigate(-1) giúp quay lại trang trước đó mượt mà
                    className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                >
                    <ArrowLeft size={24} />
                </button>
                {bIsLoading ? (
                    <div className="h-8 w-48 bg-blue-400/30 animate-pulse rounded"></div>
                ) : (
                    <h2 className="text-[28px] font-[700] text-[#3B82F6]">
                        {objTerm?.termName || "Chi tiết từ vựng"}
                    </h2>
                )}
            </div>

            {/* Nội dung chính */}
            {bIsLoading ? (
                 <div className="w-full flex flex-col gap-4 animate-pulse">
                    <div className="h-[300px] bg-blue-400/20 rounded-[10px] w-full"></div>
                    <div className="h-4 bg-blue-400/20 rounded w-full"></div>
                    <div className="h-4 bg-blue-400/20 rounded w-5/6"></div>
                    <div className="h-4 bg-blue-400/20 rounded w-4/6"></div>
                 </div>
            ) : !objTerm ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-60 w-full">
                    <BookOpen size={64} className="mb-4" />
                    <p className="text-[18px]">Oups! Không tìm thấy từ vựng này.</p>
                </div>
            ) : (
                <div className={`w-full p-8 rounded-[12px] shadow-sm border-2 ${theme === 'dark' ? 'bg-[#1E1E1E] border-[#374151]' : 'bg-white border-gray-200'}`}>
                    
                    {/* Xử lý Ảnh xịn xò (không bị lỗi URL) */}
                    {objTerm.imageUrl && (
                        <img
                            src={objTerm.imageUrl.startsWith('http') ? objTerm.imageUrl : `https://devlingo-backend-vercel-1075077880290.europe-west1.run.app${objTerm.imageUrl}`}
                            alt={objTerm.termName}
                            // object-contain giúp ảnh giữ đúng tỷ lệ, không bị méo
                            className="w-full max-h-[400px] object-contain rounded-[8px] mb-8 bg-gray-50 dark:bg-gray-800/50" 
                        />
                    )}
                    
                    {/* Render Markdown để có chữ in đậm, xuống dòng chuẩn chỉnh */}
                    <div className={`text-[17px] leading-relaxed markdown-body ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <ReactMarkdown>
                            {objTerm.definition}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}