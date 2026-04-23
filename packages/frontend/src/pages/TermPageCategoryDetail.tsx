import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, BookOpen, PlayCircle } from "lucide-react";

export default function TermPageCategoryDetail()
{
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();

    const [objLesson, setObjLesson] = useState<any>(null);
    const [arrTerms, setArrTerms] = useState<any[]>([]);
    const [bIsLoading, setBIsLoading] = useState(true);

    useEffect(() =>
    {
        const fetchTermDetail = async () =>
        {
            try
            {
                const [objLessonRes, objTermsRes] = await Promise.all([
                    axiosClient.get(`/api/lessons/${categoryId}`),
                    axiosClient.get(`/api/terms`, { params: { lessonId: categoryId } })
                ]);

                const objLessonData = objLessonRes.data?.data || objLessonRes.data || objLessonRes;
                const arrTermsData = objTermsRes.data?.data || objTermsRes.data || objTermsRes;

                setObjLesson(objLessonData);
                setArrTerms(arrTermsData);
            }
            catch (objError)
            {
                console.error(objError);
            }
            finally
            {
                setBIsLoading(false);
            }
        };

        if (categoryId)
        {
            fetchTermDetail();
        }
    }, [categoryId]);

    return (
        <div className={`inter container flex flex-col items-center justify-start gap-[30px] w-full ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/term')}
                        className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    {bIsLoading ?
                    (
                        <div className="h-8 w-48 bg-blue-400/30 animate-pulse rounded"></div>
                    ) :
                    (
                        <h2 className="text-[24px] font-[700] text-[#3B82F6]">
                            {objLesson?.title || "Vocabulary List"}
                        </h2>
                    )}
                </div>

                <button
                    onClick={() => navigate(`/quiz/${categoryId}`)}
                    disabled={arrTerms.length === 0}
                    className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] disabled:bg-gray-500 text-white font-[600] py-2 px-4 rounded-[6px] transition-colors"
                >
                    <PlayCircle size={20} />
                    Luyện tập (Quiz)
                </button>
            </div>

            {bIsLoading ?
            (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(nSkeleton =>
                    (
                        <div key={nSkeleton} className="h-[120px] bg-blue-400/20 animate-pulse rounded-[10px]"></div>
                    ))}
                </div>
            ) : arrTerms.length === 0 ?
            (
                <div className="flex flex-col items-center justify-center py-20 opacity-60 w-full">
                    <BookOpen size={64} className="mb-4" />
                    <p className="text-[18px]">Chủ đề này hiện chưa có từ vựng nào!</p>
                </div>
            ) :
            (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {arrTerms.map((objTerm: any) =>
                    (
                        <div
                            key={objTerm.id}
                            className={`p-6 rounded-[10px] border-2 transition-all hover:border-[#3B82F6] shadow-sm ${theme === 'dark' ? 'bg-[#1E1E1E] border-[#374151]' : 'bg-white border-gray-200'}`}
                        >
                            {objTerm.imageUrl &&
                            (
                                <img src={`http://localhost:5000${objTerm.imageUrl}`} alt={objTerm.termName} className="w-full h-32 object-cover rounded-[8px] mb-4" />
                            )}
                            <h3 className="text-[20px] font-[700] text-[#3B82F6] mb-2">{objTerm.termName}</h3>
                            <p className={`text-[15px] leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                {objTerm.definition}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}