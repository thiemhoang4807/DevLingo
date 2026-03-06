import React, { useState } from 'react';

export interface TopicData {
  id?: number;
  name: string;
  difficulty: string;
  borderColor: string;
  badgeBg: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

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
  onFinish: (score: number, total: number) => void;
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({ onBack, topic, onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

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
    let currentScore = score;
    if (selectedOption === currentQuestion.correctAnswer) {
      currentScore += 1;
      setScore(currentScore);
    }

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onFinish(currentScore, totalQuestions);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white pt-[40px] pb-12 font-['Inter'] flex flex-col items-center">
      <div className="w-full max-w-[1280px] px-[32px] flex flex-col items-start gap-[40px]">
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

        <div className="flex flex-col items-start gap-[24px] w-full max-w-[1002px] p-[24px]">
          <h3 className="text-[18px] font-[500] leading-[28px] text-[#E5E7EB] text-left w-full font-['Inter']">
            {currentQuestion.question}
          </h3>
          
          <div className="flex flex-col gap-[16px] w-full">
            {currentQuestion.options.map((opt, i) => {
              let boxStyle = "border-[#4B5563] bg-transparent hover:border-[#3B82F6]";
              let letterBg = "bg-[#1E3A8A]";
              let letterColor = "text-[#3B82F6]";

              if (isAnswered) {
                if (i === currentQuestion.correctAnswer) {
                  boxStyle = "border-[#0ABD5A] bg-[#0ABD5A]/10";
                  letterBg = "bg-[#0ABD5A]";
                  letterColor = "text-white";
                } else if (i === selectedOption) {
                  boxStyle = "border-[#9B0000] bg-[#3F0500]"; 
                  letterBg = "bg-[#8D0000]";
                  letterColor = "text-white";
                } else {
                  boxStyle = "border-[#374151] opacity-50";
                }
              }

              return (
                <button 
                  key={i} 
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  className={`flex items-center p-[16px] gap-[24px] border-[1.5px] rounded-[8px] transition-all w-full text-left cursor-pointer font-['Inter'] ${boxStyle}`}
                >
                  <div className={`w-[32px] h-[32px] shrink-0 rounded-[6px] flex items-center justify-center font-[600] text-[14px] leading-[20px] transition-colors ${letterBg} ${letterColor}`}>
                    A
                  </div>
                  <span className="text-[#E5E7EB] text-[14px] font-[500] leading-[20px]">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center w-full pt-[8px]">
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