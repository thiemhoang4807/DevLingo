import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import QuizManager from './pages/QuizManager';
import LandingPage from './pages/LandingPage';
import TermPageCategory from './pages/TermPageCaterory';
import TermPageCategorySpecializedLetter from './pages/TermPageCategorySpecializedLetter';
import Body from './components/BodyPage';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

// === CÁC COMPONENT ADMIN ĐƯỢC THÊM VÀO TỪ SPRINT NÀY ===
import AdminLayout from './layouts/AdminLayout';
import TermManagement from './pages/admin/TermManagement';
import QuizManagement from './pages/admin/QuizManagement';
import UserManagement from './pages/admin/UserManagement';

// Layout wrapper to include Header and Footer for inner pages
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-[#212121]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<MainLayout><LandingPage /></MainLayout>} />

        {/* Quizzes Route */}
        <Route path="/quizzes" element={<MainLayout><QuizManager /></MainLayout>} />

        {/* PHÂN HỆ TERMS (TỪ ĐIỂN) - Đã sửa lại chuẩn Router */}
        <Route 
          path="/term" 
          element={
            <MainLayout>
              <Body /> {/* Body làm bộ khung chứa Sidebar bên phải */}
            </MainLayout>
          }
        >
          {/* Mặc định vào /term sẽ hiện trang Categories (Ảnh 1) */}
          <Route index element={<TermPageCategory />} />
          
          {/* Vào /term/letter sẽ hiện danh sách từ theo chữ cái (Ảnh 2) */}
          <Route path="letter" element={<TermPageCategorySpecializedLetter />} />
        </Route>
        
        {/* ========================================================
            PHÂN HỆ ADMIN DASHBOARD (THÊM MỚI CHỈ DÀNH CHO ADMIN)
            - Nằm ngoài MainLayout để không bị dính Header/Footer cũ
            - Dùng AdminLayout (Sidebar đen)
        ======================================================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="terms" element={<TermManagement />} />
          <Route path="quizzes" element={<QuizManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        {/* Mặc định mở web lên sẽ vào trang Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;