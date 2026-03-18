import { useState } from "react"
import { Search, Zap, Shuffle, SquarePen, Trophy } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import QuestionCard from "../components/QuestionCard"

// --- MOCK DATA ---
const termOfTheDay = {
  name: "Kubernetes",
  definition: "Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform that automates many of the manual processes involved in deploying, managing, and scaling containerized applications. Originally designed by Google, it is now maintained by the Cloud Native Computing Foundation.",
}

const previousTermsList = [
  { date: "OCT 23", name: "API", definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { date: "OCT 22", name: "DOM", definition: "The Document Object Model is a cross-platform and language-independent interface..." },
]

const recentlyAddedTerms = ["Zero Trust Architecture", "Edge Computing", "GraphQL", "WebAssembly", "DevSecOps"]
const trendingTerms = ["LLM (Large Language Model)", "Prompt Engineering", "Generative AI", "Quantum Computing", "Ransomware"]

// Dữ liệu bóc tách cho QuestionCard dùng chung
const quizQuestionText = 'What does the acronym "API" stand for in software development?';
const quizOptions = ["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Interface", "App Processing Information"];
const correctAnswerIndex = 0;

export default function LandingPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const [searchQuery, setSearchQuery] = useState("")
  const [showPrevious, setShowPrevious] = useState(false)

  // State cho Daily Challenge Quiz
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  }

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
                className={`h-14 w-full rounded-md border-0 pl-14 pr-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg ${
                  isDark ? "bg-[#2A2D35] text-white placeholder:text-gray-500" : "bg-white text-gray-900 placeholder:text-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-4">
            <button className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
              <Zap className="mr-2 h-4 w-4" /> Advanced Search
            </button>
            <button className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
              <Shuffle className="mr-2 h-4 w-4" /> Random Term
            </button>
            <button className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
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
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}>TODAY • OCT 24</span>
                </div>

                <div className="mb-6">
                  <h3 className={`text-[28px] font-bold mb-4 ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>{termOfTheDay.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex h-32 w-40 shrink-0 items-center justify-center bg-[#1E293B] rounded-sm">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#2563EB] text-2xl font-bold">⎈</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className={`text-[15px] leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{termOfTheDay.definition}</p>
                      <a href="#" className={`text-[13px] font-medium hover:underline inline-block ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>Read Full Definition →</a>
                    </div>
                  </div>
                </div>

                <hr className={`my-6 ${isDark ? "border-gray-800" : "border-gray-300"}`} />

                {showPrevious && (
                  <div className="mb-8 space-y-8">
                    {previousTermsList.map((term, index) => (
                      <div key={index} className="space-y-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-blue-400" : "text-[#2563EB]"}`}>{term.date}</span>
                        <h4 className={`text-[18px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{term.name}</h4>
                        <p className={`text-[14px] leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>{term.definition}</p>
                        <a href="#" className={`text-[12px] font-medium hover:underline inline-block ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>Read Full Definition →</a>
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
                <div className={`rounded-xl overflow-hidden ${isDark ? "bg-[#212121]" : "bg-white border border-gray-200 shadow-sm"}`}>
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

              {/* Leaderboard */}
              <div className={`flex items-center justify-between rounded-md p-5 mt-8 ${isDark ? "bg-[#1E293B]" : "bg-[#1E3A8A]"}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-[16px]">Weekly Leaderboard</h3>
                    <p className="text-[13px] text-blue-100 mt-0.5">Compete with friends and master new terms!</p>
                  </div>
                </div>
                <button className={`rounded px-5 py-2 text-[13px] font-bold transition-colors ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-white text-[#1E3A8A] hover:bg-gray-100"}`}>
                  View Rankings
                </button>
              </div>

            </div>

            {/* Cột Phải */}
            <div className="space-y-10">
              <div>
                <h2 className={`text-[16px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Recently Added Terms</h2>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-200"}`} />
                <ol className="space-y-3.5">
                  {recentlyAddedTerms.map((term, index) => (
                    <li key={term} className="flex items-center gap-3">
                      <span className={`text-[13px] font-medium w-4 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>{index + 1}.</span>
                      <a href="#" className={`text-[14px] hover:underline font-medium ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>{term}</a>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className={`text-[16px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Trending Terms</h2>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-200"}`} />
                <ol className="space-y-3.5">
                  {trendingTerms.map((term, index) => (
                    <li key={term} className="flex items-center gap-3">
                      <span className={`text-[13px] font-medium w-4 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>{index + 1}.</span>
                      <a href="#" className={`text-[14px] hover:underline font-medium ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>{term}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}