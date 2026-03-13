import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import type { TopicData, Question, UserAnswerHistory } from '../types/quiz';

// Bơm đủ 10 câu hỏi
const quizData: Question[] = [
  { id: 1, question: "What does the acronym 'API' stand for in software development?", options: ['Application Programming Interface', 'Advanced Program Integration', 'Automated Protocol Interface', 'App Processing Information'], correctAnswer: 0 },
  { id: 2, question: "Which hook is used to manage state in a React functional component?", options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 1 },
  { id: 3, question: "What does SQL stand for?", options: ['Strong Question Language', 'Structured Query Language', 'Simple Quick Log', 'Stylish Query List'], correctAnswer: 1 },
  { id: 4, question: "What does HTML stand for?", options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Markup Language'], correctAnswer: 0 },
  { id: 5, question: "Choose the correct HTML element for the largest heading:", options: ['<heading>', '<h6>', '<head>', '<h1>'], correctAnswer: 3 },
  { id: 6, question: "What is the correct CSS syntax to change the text color of all p elements?", options: ['p {text-color: red;}', 'p {color: red;}', 'all.p {color: red;}', 'p.all {color: red;}'], correctAnswer: 1 },
  { id: 7, question: "Inside which HTML element do we put the JavaScript?", options: ['<scripting>', '<script>', '<js>', '<javascript>'], correctAnswer: 1 },
  { id: 8, question: "How do you write 'Hello World' in an alert box?", options: ['alertBox("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");', 'msg("Hello World");'], correctAnswer: 2 },
  { id: 9, question: "How do you create a function in JavaScript?", options: ['function myFunction()', 'function = myFunction()', 'function:myFunction()', 'create myFunction()'], correctAnswer: 0 },
  { id: 10, question: "How to write an IF statement in JavaScript?", options: ['if i = 5 then', 'if i == 5 then', 'if (i == 5)', 'if i = 5'], correctAnswer: 2 }
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
    
    const stepResult: UserAnswerHistory = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOption: selectedOption,
      isCorrect: isCorrect
    };
    
    const updatedHistory = [...history, stepResult];

    if (isCorrect) setScore(currentScore);
    setHistory(updatedHistory);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(currentScore, totalQuestions, updatedHistory);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white pt-[40px] pb-12 font-['Inter'] flex flex-col items-center">
      <div className="w-full max-w-[1280px] px-[32px] flex flex-col items-start gap-[40px]">
        
        {/* Progress Bar Header */}
        <div className="flex w-full max-w-[1002px] gap-[21px] h-[33px] items-start"> 
          <div className={`flex border-[1.5px] ${activeTopic.borderColor} ${activeTopic.badgeBg} rounded-[100px] h-full w-[277px] shrink-0 transition-colors duration-300 overflow-hidden`}>
            <div className="bg-[#FFFFFF] text-[#1D4ED8] pl-[20px] flex items-center justify-start font-[700] text-[16px] w-[65%] h-full">
              {activeTopic.name}
            </div>
            <div className="text-[#FFFFFF] flex items-center justify-center font-[600] text-[14px] flex-1 uppercase tracking-wide h-full">
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

          <div className="flex justify-between items-center w-full pt-[8px] pl-[24px] min-h-[44px]">
            {isAnswered && (
              <>
                <span className="text-[14px] text-[#E5E7EB] font-['Inter']">
                  View the <span className="text-[#3B82F6] font-[500] hover:underline cursor-pointer transition-colors">API definition.</span>
                </span>
                <button 
                  onClick={handleNext}
                  className="bg-[#3B82F6] text-white font-[600] text-[16px] py-[10px] px-[32px] rounded-[6px] transition-all font-['Inter'] cursor-pointer hover:bg-blue-600 shadow-md"
                >
                  {currentStep === totalQuestions - 1 ? 'Finish' : 'Next'}
                </button>
              </>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ActiveQuiz;