import { Link } from "react-router-dom"
import { GraduationCap, Sun, Moon } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
      theme === "dark" ? "bg-[#1e293b] border-[#334155]" : "bg-[#163073] border-transparent"
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-6xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <GraduationCap className={`h-6 w-6 transition-transform group-hover:scale-110 ${
            theme === "dark" ? "text-[#1A73E8]" : "text-white"
          }`} />
          <span className="text-xl font-bold tracking-tight text-white">
            DevLingo
          </span>
        </Link>

        {/* Right Group: Menu và Nút bấm */}
        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Navigation - Đã gỡ bỏ class "hidden md:flex" để không bị mất khi thu nhỏ cửa sổ */}
          <nav className="flex items-center gap-3 md:gap-6">
            <Link
              to="/terms"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              to="/quizzes"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Quizzes
            </Link>
            <Link
              to="/contribution"
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Contribution
            </Link>
          </nav>

          {/* Actions: Nút Theme & Nút Login */}
          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={toggleTheme}
              className="text-gray-300 hover:text-white transition-colors flex items-center justify-center"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            
            <Link
              to="/login"
              className={`px-4 py-2 md:px-5 text-sm font-semibold rounded-md transition-colors ${
                theme === "dark" 
                  ? "bg-[#1A73E8] text-white hover:bg-blue-600" 
                  : "bg-[#3B82F6] text-white hover:bg-blue-600"
              }`}
            >
              Log in
            </Link>
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header