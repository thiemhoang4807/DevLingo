import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Admin Pages
import TermManagement from './pages/admin/TermManagement';
import QuizManagement from './pages/admin/QuizManagement';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          
          {/* =========================================
              NHÁNH 1: GIAO DIỆN PUBLIC (NGƯỜI DÙNG)
              - Bao gồm Header và Footer của trang chủ
              - Nền màu tối linh hoạt
          ========================================== */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col bg-[#0f172a] dark:bg-[#0f172a] light:bg-white transition-colors">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route index element={<LandingPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignUpPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />

          {/* =========================================
              NHÁNH 2: GIAO DIỆN ADMIN (QUẢN TRỊ VIÊN)
              - Sử dụng AdminLayout riêng biệt (Sidebar đen)
              - Chứa trọn bộ 3 trang quản lý chức năng
          ========================================== */}
          <Route path="/admin" element={<AdminLayout />}>
             
             {/* Trang Quản Lý Từ Vựng */}
             <Route path="terms" element={<TermManagement />} />
             
             {/* Trang Quản Lý Câu Hỏi */}
             <Route path="quizzes" element={<QuizManagement />} />
             
             {/* Trang Quản Lý User & Badge */}
             <Route path="users" element={<UserManagement />} />
             
          </Route>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;