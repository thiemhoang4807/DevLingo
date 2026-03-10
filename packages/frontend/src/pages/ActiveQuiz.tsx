import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import type { TopicData, Question, UserAnswerHistory } from '../types/quiz';

// Mock database for testing
const quizData: Question[] = [
  { id: 1, question: "What does the acronym 'API' stand for in software development?", options: ['Application Programming Interface', 'Advanced Program Integration', 'Automated Protocol Interface', 'App Processing Information'], correctAnswer: 0 },
  { id: 2, question: "Which hook is used to manage state in a React functional component?", options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 1 },
];

interface ActiveQuizProps {
  onBack: () => void;
  topic?: TopicData | null;
  onFinish: (score: number, total: number, history: UserAnswerHistory[]) => void;
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({ onBack, topic, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  
  // Track history for the result page
  const [history, setHistory] = useState<UserAnswerHistory[]>([]);

  const currentQuestion = quizData[currentStep];
  const totalQuestions = quizData.length;

  const activeTopic = topic || {
    id: 1, name: 'Topic 1', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]'
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const currentScore = isCorrect ? score + 1 : score;
    
    // Save current step result
    const stepResult: UserAnswerHistory = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOption: selectedOption,
      isCorrect: isCorrect
    };
    
    const updatedHistory = [...history, stepResult];

    if (isCorrect) {
      setScore(currentScore);
    }
    setHistory(updatedHistory);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Pass history to result page
      onFinish(currentScore, totalQuestions, updatedHistory);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white pt-[40px] pb-12 font-['Inter'] flex flex-col items-center">
      <div className="w-full max-w-[1280px] px-[32px] flex flex-col items-start gap-[40px]">
        
        {/* Progress Bar Header */}
        <div className="flex w-full max-w-[1002px] gap-[21px] h-[33px] items-start"> 
          <div className={`flex border-[1.5px] ${activeTopic.borderColor} ${activeTopic.badgeBg} rounded-[100px] h-full w-[277px] shrink-0 transition-colors duration-300 overflow-hidden`}>
            <div className="bg-[#FFFFFF] text-[#1D4ED8] pl-[14px] pr-[17px] flex items-center justify-start font-[600] text-[14px] w-[204px] rounded-r-[100px] h-full">
              {activeTopic.name}
            </div>
            <div className="text-[#FFFFFF] flex items-center justify-center font-[500] text-[14px] flex-1">
              {activeTopic.difficulty}
            </div>
          </div>

          <div className="flex flex-col justify-between h-full w-full flex-1">
            <span className="text-[12px] font-[600] text-[#FFFFFF] leading-[15px] font-['Inter']">
              Question {currentStep + 1} of {totalQuestions}
            </span>
            <div className="flex gap-[7px] w-full h-[18px]">
              {[...Array(totalQuestions)].map((_, index) => {
                let segmentColor = 'bg-[#4A4A4A]'; 
                if (index < currentStep) segmentColor = 'bg-[#1D4ED8]'; 
                else if (index === currentStep) segmentColor = 'bg-[#3B82F6]'; 
                return (
                  <div key={index} className={`h-full flex-1 rounded-[100px] transition-all duration-300 ${segmentColor}`}></div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex flex-col items-start gap-[24px] w-full max-w-[1002px]">
          <QuestionCard 
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOption={selectedOption}
            correctAnswer={currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelect={handleSelect}
          />

          <div className="flex justify-between items-center w-full pt-[8px] pl-[24px]">
            {isAnswered ? (
              <span className="text-[14px] text-[#E5E7EB] font-['Inter']">
                View the <span className="text-[#3B82F6] font-[500] hover:underline cursor-pointer transition-colors">API definition.</span>
              </span>
            ) : (
              <div />
            )}

            <button 
              onClick={handleNext}
              disabled={!isAnswered}
              className={`font-[500] text-[16px] py-[10px] px-[32px] rounded-[6px] transition-all font-['Inter']
                ${isAnswered ? 'bg-[#3B82F6] text-white cursor-pointer hover:bg-blue-600' : 'bg-[#374151] text-[#9CA3AF] cursor-not-allowed'}`}
            >
              {currentStep === totalQuestions - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ActiveQuiz;