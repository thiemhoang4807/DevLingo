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

// Layout wrapper hỗ trợ chuyển đổi Theme cho phần nền main
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
          <Route path="letter" element={<TermPageCategorySpecializedLetter />} />
        </Route>

        {/* Mặc định mở web lên sẽ vào trang Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;