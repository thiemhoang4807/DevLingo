import { useState } from "react"
// Đã thay đổi icon: Thêm Zap (Tia chớp), SquarePen (Hình vuông có cây bút)
import { Search, Zap, Shuffle, SquarePen, Trophy } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

// Mock data
const termOfTheDay = {
  name: "Kubernetes",
  definition:
    "Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform that automates many of the manual processes involved in deploying, managing, and scaling containerized applications. Originally designed by Google, it is now maintained by the Cloud Native Computing Foundation.",
  icon: "/placeholder.svg",
}

// Data cho các terms trước đó 
const previousTermsList = [
  {
    date: "OCT 23",
    name: "API",
    definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "OCT 22",
    name: "API",
    definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    date: "OCT 21",
    name: "API",
    definition: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
]

const recentlyAddedTerms = [
  "Zero Trust Architecture",
  "Edge Computing",
  "GraphQL",
  "WebAssembly",
  "DevSecOps",
]

const trendingTerms = [
  "LLM (Large Language Model)",
  "Prompt Engineering",
  "Generative AI",
  "Quantum Computing",
  "Ransomware",
]

const quizQuestion = {
  question: 'What does the acronym "API" stand for in software development?',
  options: [
    { id: "A", text: "Application Programming Interface", isCorrect: true },
    { id: "A", text: "Application Programming Interface", isCorrect: false },
    { id: "A", text: "Application Programming Interface", isCorrect: false },
    { id: "A", text: "Application Programming Interface", isCorrect: false },
  ],
}

function LandingPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showPrevious, setShowPrevious] = useState(false)

  const handleAnswerSelect = (optionId: string, index: number) => {
    setSelectedAnswer(`${optionId}-${index}`)
    setShowResult(true)
  }

  const getOptionStyle = (option: { id: string; isCorrect: boolean }, index: number) => {
    const isSelected = selectedAnswer === `${option.id}-${index}`
    if (!isDark) {
      if (!showResult) return "border-gray-300 bg-white hover:border-blue-500"
      if (option.isCorrect) return "border-[#86EFAC] bg-[#86EFAC] text-black font-medium"
      if (isSelected && !option.isCorrect) return "border-[#FCA5A5] bg-[#FCA5A5] text-black font-medium"
      return "border-gray-300 bg-white opacity-60"
    }
    const baseDark = "border-gray-700 bg-[#2A2D35]"
    if (!showResult) return `${baseDark} hover:border-blue-500`
    if (option.isCorrect) return "border-green-500 bg-green-500/20 text-white"
    if (isSelected && !option.isCorrect) return "border-red-500 bg-red-500/20 text-white"
    return `${baseDark} opacity-50`
  }

  const getLetterStyle = (option: { id: string; isCorrect: boolean }, index: number) => {
    const isSelected = selectedAnswer === `${option.id}-${index}`
    if (!isDark) {
      if (!showResult) return "bg-gray-200 text-gray-600 border-gray-300"
      if (option.isCorrect) return "bg-[#22C55E] text-white border-[#22C55E]"
      if (isSelected && !option.isCorrect) return "bg-[#EF4444] text-white border-[#EF4444]"
      return "bg-gray-200 text-gray-500 border-gray-300 opacity-60"
    }
    if (!showResult) return "bg-gray-700 text-gray-300 border-gray-600"
    if (option.isCorrect) return "bg-green-500 text-white border-green-500"
    if (isSelected && !option.isCorrect) return "bg-red-500 text-white border-red-500"
    return "bg-gray-700 text-gray-500 border-gray-600 opacity-50"
  }

  return (
    <main className={`flex-1 ${isDark ? "bg-[#1A1C23]" : "bg-white"} min-h-screen`}>
      
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
            {/* Đã cập nhật icon chuẩn Figma */}
            <button className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${
              isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}>
              <Zap className="mr-2 h-4 w-4" />
              Advanced Search
            </button>
            <button className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${
              isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}>
              <Shuffle className="mr-2 h-4 w-4" />
              Random Term
            </button>
            <button className={`flex items-center rounded px-5 py-2.5 text-[13px] font-medium transition-colors ${
              isDark ? "bg-[#2A2D35] text-gray-300 hover:bg-gray-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}>
              <SquarePen className="mr-2 h-4 w-4" />
              Quick Quiz
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
              
              {/* Khu vực Term of the Day & Previous Terms */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className={`text-[20px] font-bold ${isDark ? "text-white" : "text-[#2563EB]"}`}>
                    Term of the Day
                  </h2>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-800"}`}>
                    TODAY • OCT 24
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className={`text-[28px] font-bold mb-4 ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>
                    {termOfTheDay.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex h-32 w-40 shrink-0 items-center justify-center bg-[#1E293B] rounded-sm">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#2563EB] text-2xl font-bold">⎈</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className={`text-[15px] leading-relaxed mb-4 ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                        {termOfTheDay.definition}
                      </p>
                      <a href="#" className={`text-[13px] font-medium hover:underline inline-block ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>
                        Read Full Definition →
                      </a>
                    </div>
                  </div>
                </div>

                <hr className={`my-6 ${isDark ? "border-gray-800" : "border-gray-300"}`} />

                {/* Danh sách bài cũ */}
                {showPrevious && (
                  <div className="mb-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    {previousTermsList.map((term, index) => (
                      <div key={index} className="space-y-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-blue-400" : "text-[#2563EB]"}`}>
                          {term.date}
                        </span>
                        <h4 className={`text-[18px] font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {term.name}
                        </h4>
                        <p className={`text-[14px] leading-relaxed ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                          {term.definition}
                        </p>
                        <a href="#" className={`text-[12px] font-medium hover:underline inline-block ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>
                          Read Full Definition →
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => setShowPrevious(!showPrevious)}
                  className={`rounded px-5 py-2.5 text-[13px] font-medium text-white transition-colors ${
                    isDark ? "bg-[#3B82F6] hover:bg-blue-600" : "bg-[#2563EB] hover:bg-blue-700"
                  }`}
                >
                  {showPrevious ? "Load more..." : "View Previous Terms"}
                </button>
              </div>

              {/* Daily Challenge Quiz */}
              <div className="pt-4">
                <h2 className={`text-[20px] font-bold mb-6 ${isDark ? "text-white" : "text-[#2563EB]"}`}>
                  Daily Challenge Quiz
                </h2>
                <p className={`mb-6 text-[15px] font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                  {quizQuestion.question}
                </p>
                <div className="space-y-3">
                  {quizQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option.id, index)}
                      disabled={showResult}
                      className={`flex w-full items-center gap-4 rounded-md border px-4 py-3 text-left transition-all ${getOptionStyle(option, index)}`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border text-[12px] font-bold ${getLetterStyle(option, index)}`}>
                        {option.id}
                      </span>
                      <span className="text-[14px]">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
                <p className={`mt-6 text-[13px] ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                  View the <a href="#" className={`hover:underline ${isDark ? "text-blue-400" : "text-[#2563EB]"}`}>API definition</a>.
                </p>
              </div>

              {/* Weekly Leaderboard Banner */}
              <div className={`flex items-center justify-between rounded-md p-5 mt-8 ${
                isDark ? "bg-[#1E293B]" : "bg-[#1E3A8A]"
              }`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-[16px]">Weekly Leaderboard</h3>
                    <p className="text-[13px] text-blue-100 mt-0.5">
                      Compete with friends and master new terms to climb the ranks!
                    </p>
                  </div>
                </div>
                <button className={`rounded px-5 py-2 text-[13px] font-bold transition-colors ${
                  isDark ? "bg-white text-black hover:bg-gray-200" : "bg-white text-[#1E3A8A] hover:bg-gray-100"
                }`}>
                  View Rankings
                </button>
              </div>

            </div>

            {/* 3. Cột Phải */}
            <div className="space-y-10">
              
              <div>
                <h2 className={`text-[16px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Recently Added Terms
                </h2>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-400"}`} />
                <ol className="space-y-3.5">
                  {recentlyAddedTerms.map((term, index) => (
                    <li key={term} className="flex items-center gap-3">
                      <span className={`text-[13px] font-medium w-4 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {index + 1}.
                      </span>
                      <a href="#" className={`text-[14px] hover:underline ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>
                        {term}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className={`text-[16px] font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Trending Terms
                </h2>
                <hr className={`mb-4 ${isDark ? "border-gray-800" : "border-gray-400"}`} />
                <ol className="space-y-3.5">
                  {trendingTerms.map((term, index) => (
                    <li key={term} className="flex items-center gap-3">
                      <span className={`text-[13px] font-medium w-4 text-right ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {index + 1}.
                      </span>
                      <a href="#" className={`text-[14px] hover:underline ${isDark ? "text-[#60A5FA]" : "text-[#2563EB]"}`}>
                        {term}
                      </a>
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

export default LandingPage