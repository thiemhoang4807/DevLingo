import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Search, Book, ArrowRight, Loader2 } from "lucide-react";
import axiosClient from "../api/axiosClient";

export default function SearchResultsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response: any = await axiosClient.get(`/api/terms?search=${encodeURIComponent(query)}`);
        const data = response.data?.data || response.data || response;
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className={`w-full min-h-screen font-['Inter'] transition-colors duration-300 py-12 ${isDark ? "bg-[#0F141A]" : "bg-gray-50"}`}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10">
          <h1 className={`text-[40px] font-bold font-['Space_Grotesk'] mb-2 ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
            Search Results
          </h1>
          <p className={`text-[16px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {isLoading ? (
              <span>Searching for "{query}"...</span>
            ) : (
              <span>Found {results.length} results for "{query}"</span>
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={40} className="text-blue-500 animate-spin" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {results.map((term: any) => (
              <div 
                key={term.id}
                onClick={() => navigate(`/term/detail/${term.id}`)}
                className={`p-6 rounded-xl border flex items-start justify-between cursor-pointer transition-all hover:-translate-y-1 ${
                  isDark 
                    ? "bg-[#1A1E24] border-[#2A2E36] hover:bg-[#1E2530]" 
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-3 rounded-lg ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                    <Book size={20} />
                  </div>
                  <div>
                    <h3 className={`text-[20px] font-bold mb-2 font-['Space_Grotesk'] ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
                      {term.termName}
                    </h3>
                    <p className={`text-[15px] leading-relaxed line-clamp-2 ${isDark ? "text-[#A8ABB3]" : "text-gray-600"}`}>
                      {term.definition}
                    </p>
                  </div>
                </div>
                <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  isDark ? "bg-[#252A34] text-gray-400 group-hover:bg-[#3B82F6] group-hover:text-white" : "bg-gray-100 text-gray-500 group-hover:bg-[#3B82F6] group-hover:text-white"
                }`}>
                  <ArrowRight size={18} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`p-16 rounded-xl border text-center ${isDark ? "bg-[#1A1E24] border-[#2A2E36]" : "bg-white border-gray-200 shadow-sm"}`}>
            <Search size={48} className={`mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-300"}`} />
            <h3 className={`text-[20px] font-bold font-['Space_Grotesk'] mb-2 ${isDark ? "text-[#F1F3FC]" : "text-gray-900"}`}>
              No terms found
            </h3>
            <p className={`text-[15px] mb-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              We couldn't find anything matching "{query}". Try different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
