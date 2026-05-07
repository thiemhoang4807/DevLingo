import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Search, Zap, Shuffle, SquarePen, Trophy, Crown, Medal, Award } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import QuestionCard from "../components/QuestionCard"
import axiosClient from "../api/axiosClient"
import defaultAvatar from "../assets/images/avata.png"

// Dữ liệu bóc tách cho QuestionCard dùng chung
const quizQuestionText = 'What does the acronym "API" stand for in software development?';
const quizOptions = ["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Interface", "App Processing Information"];
const correctAnswerIndex = 0;

function getAvatarUrl(avatarPath: string | null) {
  if (!avatarPath) return defaultAvatar;
  if (avatarPath.startsWith('http')) return avatarPath;
  return `https://devlingo-backend-vercel-1075077880290.europe-west1.run.app${avatarPath}`;
}

export default function LandingPage() {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const isDark = theme === "dark"
  
  const [searchQuery, setSearchQuery] = useState("")
  const [showPrevious, setShowPrevious] = useState(false)
  const [allTerms, setAllTerms] = useState<any[]>([])
  const [leaderboardData, setLeaderboardData] = useState<any[]>([])

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response: any = await axiosClient.get('/api/terms');
        const data = response.data?.data || response.data || response;
        if (Array.isArray(data)) {
          setAllTerms(data);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response: any = await axiosClient.get('/api/leaderboard?limit=5');
        const data = response.data?.data || response.data || response;
        if (Array.isArray(data)) {
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchTerms();
    fetchLeaderboard();
  }, []);

  // Derive display lists from fetched terms
  const recentlyAddedTerms = allTerms.slice(-5).reverse();
  const trendingTerms = allTerms.slice(0, 5);
  const termOfTheDay = allTerms.length > 0 ? allTerms[allTerms.length - 1] : null;
  const previousTermsList = allTerms.length > 1 ? allTerms.slice(-3, -1).reverse() : [];

  // State cho Daily Challenge Quiz
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleRandomTerm = async () => {
    if (allTerms.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTerms.length)
      const randomTerm = allTerms[randomIndex]
      navigate(`/term/detail/${randomTerm.id}`)
    } else {
      navigate('/term')
    }
  }

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  }

  // Mini rank icon for sidebar
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={16} className="text-[#FFD700]" />;
    if (rank === 2) return <Medal size={15} className="text-[#C0C0C0]" />;
    if (rank === 3) return <Award size={15} className="text-[#CD7F32]" />;
    return <span className={`text-[12px] font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>{rank}</span>;
  };

  return (
    <main className={`flex-1 ${isDark ? "bg-[#1A1C23]" : "bg-gray-50"} min-h-screen font-['Inter'] transition-colors duration-300`}>
      
      {/* 1. Hero Section */}
      <section className={`relative pt-16 pb-20 ${isDark ? "bg-[#1A1C23]" : "bg-[#1E3A8A]"}`}>
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-[50px] font-bold tracking-tight mb-4">
            <span className="text-[#60A5FA]">Dev</span>
            <span className="text-white">Lingo</span>
          </h1>
          <p className="mx-auto max-w-2xl text-[17px] mb-8 text-blue-100">
            Master IT terminology through gamification
          </p>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search for terms (e.g. Kubernetes, API, DevOps)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearchSubmit() }}
                className={`h-14 w-full rounded-md border-0 pl-14 pr-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg ${
                  isDark ? "bg-[#2A2D35] text-white placeholder:text-gray-500" : "bg-white text-gray-900 placeholder:text-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/term')} className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
              <Zap className="mr-2 h-4 w-4" /> Advanced Search
            </button>
            <button onClick={handleRandomTerm} className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
              <Shuffle className="mr-2 h-4 w-4" /> Random Term
            </button>
            <button onClick={() => navigate('/quizzes')} className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
              <SquarePen className="mr-2 h-4 w-4" /> Quick Quiz
            </button>
          </div>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-3">
            
            {/* Cột trái */}
            <div className="space-y-12 lg:col-span-2">
              
              {/* Term of the Day */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className={`text-[20px] font-bold ${isDark ? "text-white" : "text-[#2563EB]"}`}>Term of the Day</h2>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}>TODAY • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</span>
                </div>

                {termOfTheDay ? (
                <div className="mb-6">
                  <Link to={`/term/detail/${termOfTheDay.id}`} className={`text-[28px] font-bold mb-4 block hover:underline ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>{termOfTheDay.termName}</Link>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex h-32 w-40 shrink-0 items-center justify-center bg-[#1E293B] rounded-sm">
                      {termOfTheDay.imageUrl ? (
                        <img src={termOfTheDay.imageUrl.startsWith('http') ? termOfTheDay.imageUrl : `https://devlingo-backend-vercel-1075077880290.europe-west1.run.app${termOfTheDay.imageUrl}`} alt={termOfTheDay.termName} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#2563EB] text-2xl font-bold">{termOfTheDay.termName?.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[15px] leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{termOfTheDay.definition?.substring(0, 250)}{termOfTheDay.definition?.length > 250 ? '...' : ''}</p>
                      <Link to={`/term/detail/${termOfTheDay.id}`} className={`text-[13px] font-medium hover:underline inline-block ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>Read Full Definition →</Link>
                    </div>
                  </div>
                </div>
                ) : (
                <div className="mb-6">
                  <p className={`text-[15px] ${isDark ? "text-gray-400" : "text-gray-500"}`}>Loading term of the day...</p>
                </div>
                )}

                <hr className={`my-6 ${isDark ? "border-gray-800" : "border-gray-300"}`} />

                {showPrevious && (
                  <div className="mb-8 space-y-8">
                    {previousTermsList.map((term: any) => (
                      <div key={term.id} className="space-y-2">
                        <h4 className={`text-[18px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{term.termName}</h4>
                        <p className={`text-[14px] leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{term.definition?.substring(0, 150)}...</p>
                        <Link to={`/term/detail/${term.id}`} className={`text-[12px] font-medium hover:underline inline-block ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>Read Full Definition →</Link>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => setShowPrevious(!showPrevious)}
                  className={`rounded px-5 py-2.5 text-[13px] font-medium text-white transition-colors ${isDark ? "bg-[#3B82F6] hover:bg-blue-600" : "bg-[#2563EB] hover:bg-blue-700"}`}
                >
                  {showPrevious ? "Hide Previous Terms" : "View Previous Terms"}
                </button>
              </div>

              {/* --- ĐÃ REFACTOR: TÁI SỬ DỤNG QUESTIONCARD --- */}
              <div className="pt-4">
                <h2 className={`text-[20px] font-bold mb-6 ${isDark ? "text-white" : "text-[#2563EB]"}`}>
                  Daily Challenge Quiz
                </h2>
                {/* Đã sửa màu nền từ bg-[#212121] thành bg-transparent để hòa vào nền của trang */}
                <div className="rounded-xl overflow-hidden bg-transparent">
                    <QuestionCard 
                        question={quizQuestionText}
                        options={quizOptions}
                        selectedOption={selectedOption}
                        correctAnswer={correctAnswerIndex}
                        isAnswered={isAnswered}
                        onSelect={handleSelect}
                    />
                    {isAnswered && (
                        <div className="p-[24px] pt-0">
                            <p className={`text-[13px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            View the <a href="#" className={`hover:underline font-medium ${isDark ? "text-[#3B82F6]" : "text-[#2563EB]"}`}>API definition</a>.
                            </p>
                        </div>
                    )}
                </div>
              </div>

            </div>

            {/* Cột Phải */}
            <div className="space-y-10">
              <div>
                <h2 className={`text-[16px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Recently Added Terms</h2>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-200"}`} />
                <ol className="space-y-3.5">
                  {recentlyAddedTerms.map((term: any, index: number) => (
                    <li key={term.id} className="flex items-center gap-3">
                      <span className={`text-[13px] font-medium w-4 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>{index + 1}.</span>
                      <Link to={`/term/detail/${term.id}`} className={`text-[14px] hover:underline font-medium ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>{term.termName}</Link>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className={`text-[16px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Trending Terms</h2>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-200"}`} />
                <ol className="space-y-3.5">
                  {trendingTerms.map((term: any, index: number) => (
                    <li key={term.id} className="flex items-center gap-3">
                      <span className={`text-[13px] font-medium w-4 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>{index + 1}.</span>
                      <Link to={`/term/detail/${term.id}`} className={`text-[14px] hover:underline font-medium ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>{term.termName}</Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mini Leaderboard */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-[#FFD700]" />
                    <h2 className={`text-[16px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Top Rankings</h2>
                  </div>
                  <button 
                    onClick={() => navigate('/leader-board')}
                    className={`text-[12px] font-semibold hover:underline ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}
                  >
                    View All →
                  </button>
                </div>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-200"}`} />
                
                <div className="space-y-2.5">
                  {leaderboardData.map((user: any) => (
                    <div 
                      key={user.rank} 
                      onClick={() => navigate(`/profile/${user.id}`)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                        user.rank <= 3
                          ? (isDark ? "bg-[#1E2536]/60" : "bg-blue-50/60")
                          : ""
                      } ${isDark ? "hover:bg-[#1E2536]" : "hover:bg-gray-100"}`}
                    >
                      {/* Rank icon */}
                      <div className="w-[24px] flex justify-center shrink-0">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar */}
                      <img 
                        src={getAvatarUrl(user.avatar)} 
                        alt={user.username}
                        className="w-[32px] h-[32px] rounded-full object-cover shrink-0"
                        style={user.rank === 1 ? { border: '2px solid #FFD700' } : user.rank === 2 ? { border: '2px solid #C0C0C0' } : user.rank === 3 ? { border: '2px solid #CD7F32' } : { border: '2px solid transparent' }}
                      />

                      {/* Name */}
                      <span className={`text-[13px] font-semibold flex-1 truncate ${
                        user.rank === 1 ? "text-[#FFD700]" : isDark ? "text-white" : "text-gray-900"
                      }`}>
                        {user.username}
                      </span>

                      {/* XP */}
                      <span className={`text-[12px] font-bold shrink-0 ${
                        user.rank <= 3 ? "text-[#F59E0B]" : isDark ? "text-[#60A5FA]" : "text-[#2563EB]"
                      }`}>
                        {user.xp.toLocaleString()} <span className={`text-[10px] font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}>XP</span>
                      </span>
                    </div>
                  ))}

                  {leaderboardData.length === 0 && (
                    <p className={`text-center text-[13px] py-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                      No rankings yet
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}