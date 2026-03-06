import React, { useState } from 'react';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer'; // ĐÃ THÊM: Import Footer của Khôi
import QuizPage from './pages/QuizPage';
import ActiveQuiz from './pages/ActiveQuiz';
import QuizResult from './pages/QuizResult';

export interface TopicData {
  id?: number;
  name: string;
  difficulty: string;
  borderColor: string;
  badgeBg: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'quiz' | 'active' | 'result'>('quiz');
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);

  const handleStartQuiz = (topic: TopicData) => {
    setSelectedTopic(topic);
    setCurrentPage('active');
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setCurrentPage('quiz');
  };

  const handleFinishQuiz = (score: number, total: number) => {
    setFinalScore(score);
    setTotalQuestions(total);
    setCurrentPage('result');
  };

  const handleTryAnother = (topic?: TopicData) => {
    if (topic) {
      setSelectedTopic(topic);
      setCurrentPage('active');
    } else {
      setCurrentPage('quiz');
    }
  };

  return (
    // ĐÃ FIX: Layout Flexbox để Footer luôn nằm dưới cùng
    <div className="min-h-screen flex flex-col bg-[#212121]">
      <Header />
      
      {/* Phần nội dung chính sẽ giãn ra để chiếm không gian trống */}
      <main className="flex-1">
        {currentPage === 'quiz' && (
          <QuizPage onStart={handleStartQuiz} />
        )}
        
        {currentPage === 'active' && (
          <ActiveQuiz 
            topic={selectedTopic} 
            onBack={handleBackToTopics} 
            onFinish={handleFinishQuiz} 
          />
        )}

        {currentPage === 'result' && selectedTopic && (
          <QuizResult 
            topic={selectedTopic}
            score={finalScore}
            totalQuestions={totalQuestions}
            onTryAnother={handleTryAnother}
          />
        )}
      </main>

      {/* ĐÃ THÊM: Footer của Khôi xuất hiện ở đây */}
      <Footer />
    </div>
  );
}

export default App;