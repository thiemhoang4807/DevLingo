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
import LearningHistoryPage from './pages/LearningHistoryPage';
import UserProfilePage from "./pages/UserProfilePage";
import LeaderBoard from './pages/LeaderBoard';

// 🚀 Đã xóa bg-[#212121] ở thẻ main
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow"> 
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
          <Route path="letter" element={<TermPageCategorySpecializedLetter />} />
        </Route>

        {/* Leader Board */}
        <Route path="/leader-board" element={<MainLayout><LeaderBoard /></MainLayout>} />

        {/* Điều hướng mặc định */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/profile" element={<MainLayout><UserProfilePage /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;