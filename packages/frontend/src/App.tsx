import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import QuizManager from './pages/QuizManager';
import LandingPage from './pages/LandingPage'; // <-- Import Landing Page của Quân
import TermPageCategory from './pages/TermPageCaterory';
import TermPageCategorySpecializedLetter from './pages/TermPageCategorySpecializedLetter';
import Body from './components/BodyPage'; // Để render TermPage
import Header from './layouts/Header';
import Footer from './layouts/Footer';

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
        
        {/* Dashboard Route (Trang chủ sau khi đăng nhập) -> Hiện Landing Page */}
        <Route 
          path="/dashboard" 
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          } 
        />

        {/* Quizzes Route -> Hiện trang chọn Topic và làm bài */}
        <Route 
          path="/quizzes" 
          element={
            <MainLayout>
              <QuizManager />
            </MainLayout>
          } 
        />

        <Route 
          path="/term"
          element={
            <MainLayout>
              <Body />
              {/* <TermPageCategory /> */}
              {/* <TermPageCategorySpecializedLetter /> */}
            </MainLayout>
          }
        />
        
        {/* Mặc định mở web lên sẽ vào trang Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;