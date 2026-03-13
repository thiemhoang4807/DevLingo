import React, { useState } from 'react';
import TopicCard from '../components/TopicCard';
import QuestionCard from '../components/QuestionCard';
import type { TopicData } from '../types/quiz';

interface QuizPageProps {
  onStart: (topic: TopicData) => void;
}

const topics: TopicData[] = [
  { id: 1, name: 'Topic 1', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]' },
  { id: 2, name: 'Topic 2', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]' },
  { id: 3, name: 'Topic 3', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]' },
  { id: 4, name: 'Topic 4', difficulty: 'Medium', borderColor: 'border-[#DFA700]', badgeBg: 'bg-[#DFA700]' },
  { id: 5, name: 'Topic 5', difficulty: 'Medium', borderColor: 'border-[#DFA700]', badgeBg: 'bg-[#DFA700]' },
  { id: 6, name: 'Topic 6', difficulty: 'Medium', borderColor: 'border-[#DFA700]', badgeBg: 'bg-[#DFA700]' },
  { id: 7, name: 'Topic 7', difficulty: 'Hard', borderColor: 'border-[#BD160A]', badgeBg: 'bg-[#BD160A]' },
  { id: 8, name: 'Topic 8', difficulty: 'Hard', borderColor: 'border-[#BD160A]', badgeBg: 'bg-[#BD160A]' },
  { id: 9, name: 'Topic 9', difficulty: 'Hard', borderColor: 'border-[#BD160A]', badgeBg: 'bg-[#BD160A]' },
  { id: 10, name: 'Topic 10', difficulty: 'Extreme', borderColor: 'border-[#780ABD]', badgeBg: 'bg-[#780ABD]' },
  { id: 11, name: 'Topic 11', difficulty: 'Extreme', borderColor: 'border-[#780ABD]', badgeBg: 'bg-[#780ABD]' },
  { id: 12, name: 'Topic 12', difficulty: 'Extreme', borderColor: 'border-[#780ABD]', badgeBg: 'bg-[#780ABD]' },
];

const QuizPage: React.FC<QuizPageProps> = ({ onStart }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const randomQuestion = {
    id: 99,
    question: "What does the acronym 'API' stand for in software development?",
    options: [
      'Application Programming Interface', 
      'Advanced Program Integration', 
      'Automated Protocol Interface', 
      'App Processing Information'
    ],
    correctAnswer: 0
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white pt-[40px] pb-[100px] font-['Inter'] flex flex-col items-center">
      <div className="w-full max-w-[1002px] px-[32px] flex flex-col items-start text-left">
        
        {/* --- SECTION 1: RANDOM QUESTION --- */}
        <section className="w-full mb-[48px] flex flex-col gap-[24px]">
          <h2 className="text-[24px] font-[700] leading-[32px] text-[#E5E7EB] font-['Inter']">
            Random Quiz Question
          </h2>
          
          <QuestionCard 
            question={randomQuestion.question}
            options={randomQuestion.options}
            selectedOption={selectedOption}
            correctAnswer={randomQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelect={handleSelect}
          />

          <div className="flex justify-start items-center w-full pt-[8px] pl-[24px] min-h-[24px]">
            {isAnswered && (
              <span className="text-[14px] text-[#E5E7EB] font-['Inter']">
                View the <span className="text-[#3B82F6] font-[500] hover:underline cursor-pointer transition-colors">API definition.</span>
              </span>
            )}
          </div>
        </section>

        {/* --- SECTION 2: CATEGORIES --- */}
        <section className="w-full">
          <h2 className="text-[24px] font-[700] leading-[32px] text-[#E5E7EB] mb-[21px] font-['Inter']">
            Quiz Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
            {topics.map((topic) => (
              <div 
                key={topic.id} 
                onClick={() => onStart(topic)} 
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <TopicCard 
                  name={topic.name}
                  difficulty={topic.difficulty}
                  borderColor={topic.borderColor}
                  badgeBg={topic.badgeBg}
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default QuizPage;