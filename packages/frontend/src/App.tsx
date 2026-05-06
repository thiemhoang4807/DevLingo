import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import QuizManager from './pages/QuizManager';
import LandingPage from './pages/LandingPage';
import TermPageCategory from './pages/TermPageCaterory';
import TermPageCategorySpecializedLetter from './pages/TermPageCategorySpecializedLetter';
import ContributionPage from './pages/ContributionPage';
import Body from './components/BodyPage';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import LearningHistoryPage from './pages/LearningHistoryPage';
import UserProfilePage from "./pages/UserProfilePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import LeaderBoard from './pages/LeaderBoard';
import TermPageCategoryDetail from './pages/TermPageCategoryDetail';
import ScrollToTop from './utils/ScrollToTop';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

import TermDetailPage from './pages/TermDetailPage'; 

// Layout wrapper hỗ trợ chuyển đổi Theme cho phần nền main

// === CÁC COMPONENT ADMIN ĐƯỢC THÊM VÀO TỪ SPRINT NÀY ===
import AdminLayout from './layouts/AdminLayout';
import TermManagement from './pages/admin/TermManagement';
import QuizManagement from './pages/admin/QuizManagement';
import UserManagement from './pages/admin/UserManagement';

import SearchResultsPage from './pages/SearchResultsPage';

// Layout wrapper to include Header and Footer for inner pages
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* bg-white: Nền trắng cho Light Mode, dark:bg-[#212121]: Nền xám đen cho Dark Mode */}
      <main className="flex-grow bg-white dark:bg-[#212121] transition-colors duration-300">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<MainLayout><LandingPage /></MainLayout>} />

        {/* Quizzes Route */}
        <Route path="/quizzes" element={<MainLayout><QuizManager /></MainLayout>} />

        {/* Contribution Route */}
        <Route path="/contribution" element={<MainLayout><ContributionPage /></MainLayout>} />
        {/* Route cho Learning History */}
        <Route path="/learning-history" element={<MainLayout><LearningHistoryPage /></MainLayout>} />

        {/* PHÂN HỆ TERMS (TỪ ĐIỂN) */}
        <Route 
          path="/term" 
          element={
            <MainLayout>
              <Body /> 
            </MainLayout>
          }
        >
          <Route index element={<TermPageCategory />} />
          <Route path="letter/:letter" element={<TermPageCategorySpecializedLetter />} />
          <Route path="category/:categoryId" element={<TermPageCategoryDetail />} />
          
          {/* 👇 2. ĐÂY LÀ DÒNG NỐI ỐNG ĐỂ CLICK VÀO CARD NÓ BAY SANG TRANG CHI TIẾT */}
          <Route path="detail/:id" element={<TermDetailPage />} />
          
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

        {/* Leader Board */}
        <Route path="/leader-board" element={<MainLayout><LeaderBoard /></MainLayout>} />

        {/*Profile*/}
        <Route path="/profile" element={<MainLayout><UserProfilePage /></MainLayout>} />
        <Route path="/profile/:userId" element={<MainLayout><PublicProfilePage /></MainLayout>} />
        
        {/* Điều hướng mặc định */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        
        {/* About Us */}
        <Route path="/about" element={<MainLayout><AboutUs /></MainLayout>} />

        {/* Contact */}
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        
        {/* Search Results */}
        <Route path="/search" element={<MainLayout><SearchResultsPage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
