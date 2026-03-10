import { Link } from "react-router-dom"
import { GraduationCap, Twitter, Github } from "lucide-react" // Đổi Box thành GraduationCap
import { useTheme } from "../../context/ThemeContext"

function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    // Đã cập nhật màu nền: bg-[#1A1C23] cho Dark Mode và bg-[#F3F4F6] (xám nhạt) cho Light Mode
    <footer className={`border-t transition-colors duration-300 ${
      isDark ? "border-gray-800 bg-[#1A1C23]" : "border-gray-200 bg-[#F3F4F6]"
    }`}>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* Brand - Sửa Logo chuẩn Figma */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <GraduationCap className={`h-6 w-6 transition-transform group-hover:scale-110 ${
                isDark ? "text-[#1A73E8]" : "text-[#2563EB]"
              }`} />
              <span className={`text-xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-[#2563EB]"
              }`}>
                DevLingo
              </span>
            </Link>
            <p className={`text-[13px] leading-relaxed pr-4 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              The ultimate gamified dictionary for computer and internet terminology.
            </p>
          </div>

          {/* Learn Links */}
          <div className="space-y-4">
            <h3 className={`text-[12px] font-bold uppercase tracking-wider ${
              isDark ? "text-gray-300" : "text-[#2563EB]"
            }`}>
              LEARN
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className={`text-[13px] font-medium transition-colors ${
                    isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                  }`}
                >
                  Browse Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/quizzes"
                  className={`text-[13px] font-medium transition-colors ${
                    isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                  }`}
                >
                  Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className={`text-[12px] font-bold uppercase tracking-wider ${
              isDark ? "text-gray-300" : "text-[#2563EB]"
            }`}>
              COMPANY
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className={`text-[13px] font-medium transition-colors ${
                    isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-[13px] font-medium transition-colors ${
                    isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={`text-[13px] font-medium transition-colors ${
                    isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="space-y-4">
            <h3 className={`text-[12px] font-bold uppercase tracking-wider ${
              isDark ? "text-gray-300" : "text-[#2563EB]"
            }`}>
              CONNECT
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                }`}
              >
                <Twitter className="h-[18px] w-[18px]" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#2563EB]"
                }`}
              >
                <Github className="h-[18px] w-[18px]" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - Điều chỉnh đường line và text mờ */}
        <div className={`mt-12 border-t pt-8 ${
          isDark ? "border-gray-800" : "border-gray-300"
        }`}>
          <p className={`text-center text-[13px] font-medium ${
            isDark ? "text-gray-500" : "text-gray-500"
          }`}>
            &copy;{new Date().getFullYear()} DevLingo
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer