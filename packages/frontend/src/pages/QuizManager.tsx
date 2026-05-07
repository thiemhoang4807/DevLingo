import React, { useState } from 'react';
import QuizPage from './QuizPage';
import ActiveQuiz from './ActiveQuiz';
import QuizResult from './QuizResult';
import type { TopicData, UserAnswerHistory } from '../types/quiz';

const QuizManager: React.FC = () => {
  // State variables to control the flow and data
  const [step, setStep] = useState<'SELECT' | 'QUIZ' | 'RESULT'>('SELECT');
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);

  // States for quiz results
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answerHistory, setAnswerHistory] = useState<UserAnswerHistory[]>([]);
  const [earnedXP, setEarnedXP] = useState<number>(0);

  // Handler for starting a quiz from QuizPage
  const handleStart = (topic: TopicData) => {
    setSelectedTopic(topic);
    setStep('QUIZ');
  };

  // Handler for finishing the quiz in ActiveQuiz
  const handleFinish = (finalScore: number, total: number, history: UserAnswerHistory[], earned: number = 0) => {
    setScore(finalScore);
    setTotalQuestions(total);
    setAnswerHistory(history);
    setEarnedXP(earned);
    setStep('RESULT');
  };

  // Handler for trying another quiz from QuizResult
  const handleTryAnother = (topic?: TopicData) => {
    if (topic) {
      setSelectedTopic(topic);
      setStep('QUIZ');
    } else {
      setStep('SELECT');
    }
  };

  // Render components based on the current step
  if (step === 'QUIZ') {
    return (
      <ActiveQuiz
        onBack={() => setStep('SELECT')}
        topic={selectedTopic}
        onFinish={handleFinish}
      />
    );
  }

  if (step === 'RESULT' && selectedTopic) {
    return (
      <QuizResult
        topic={selectedTopic}
        score={score}
        totalQuestions={totalQuestions}
        history={answerHistory} // Successfully passing the history here!
        earnedXP={earnedXP}
        onTryAnother={handleTryAnother}
      />
    );
  }

  // Default step: Select a topic
  return <QuizPage onStart={handleStart} />;
};

export default QuizManager;