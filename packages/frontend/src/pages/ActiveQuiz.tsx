import React, { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import axiosClient from '../api/axiosClient';
import type { TopicData, Question, UserAnswerHistory } from '../types/quiz';

interface ActiveQuizProps
{
    onBack: () => void;
    topic?: TopicData | null;
    onFinish: (score: number, total: number, history: UserAnswerHistory[]) => void;
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({ onBack, topic, onFinish }) =>
{
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState<UserAnswerHistory[]>([]);
    
    const [quizData, setQuizData] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        const fetchQuestions = async () =>
        {
            try
            {
                const response: any = await axiosClient.get('/api/questions', { params: { lessonId: topic?.id } });
                const data = response.data?.data || response.data || response;
                
                const formattedQuestions = data.map((q: any) =>
                {
                    const options = [q.optionA, q.optionB, q.optionC, q.optionD];
                    let correctAnswerIndex = 0;
                    if (q.correctOption === 'B')
                    {
                        correctAnswerIndex = 1;
                    }
                    if (q.correctOption === 'C')
                    {
                        correctAnswerIndex = 2;
                    }
                    if (q.correctOption === 'D')
                    {
                        correctAnswerIndex = 3;
                    }

                    return {
                        id: q.id,
                        question: q.questionText,
                        options: options,
                        correctAnswer: correctAnswerIndex
                    };
                });

                setQuizData(formattedQuestions);
            }
            catch (error)
            {
                console.error(error);
            }
            finally
            {
                setIsLoading(false);
            }
        };

        if (topic)
        {
            fetchQuestions();
        }
    }, [topic]);

    const activeTopic = topic || {
        id: 1, name: 'Topic 1', difficulty: 'Easy', borderColor: 'border-[#0ABD5A]', badgeBg: 'bg-[#0ABD5A]'
    };

    if (isLoading)
    {
        return (
            <div className="min-h-screen bg-[#212121] text-white flex items-center justify-center font-['Inter']">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#3B82F6] font-semibold text-lg">Đang tải câu hỏi...</p>
                </div>
            </div>
        );
    }

    if (quizData.length === 0)
    {
        return (
            <div className="min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center gap-6 font-['Inter']">
                <p className="text-xl text-gray-400">Chủ đề này chưa có câu hỏi nào!</p>
                <button 
                    onClick={onBack} 
                    className="bg-[#3B82F6] hover:bg-blue-600 px-6 py-2 rounded-md font-semibold transition-colors"
                >
                    Quay lại
                </button>
            </div>
        );
    }

    const currentQuestion = quizData[currentStep];
    const totalQuestions = quizData.length;

    const handleSelect = (index: number) =>
    {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);
    };

    const handleNext = async () =>
    {
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        const currentScore = isCorrect ? score + 1 : score;
        
        const stepResult: UserAnswerHistory = {
            questionId: currentQuestion.id,
            questionText: currentQuestion.question,
            selectedOption: selectedOption,
            isCorrect: isCorrect
        };
        
        const updatedHistory = [...history, stepResult];

        if (isCorrect)
        {
            setScore(currentScore);
        }
        setHistory(updatedHistory);

        if (currentStep < totalQuestions - 1)
        {
            setCurrentStep(currentStep + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        }
        else
        {
            try
            {
                await axiosClient.post('/api/progress/quiz', {
                    lessonId: topic?.id,
                    score: currentScore,
                    totalQuestions: totalQuestions
                });
            }
            catch (error)
            {
                console.error(error);
            }
            onFinish(currentScore, totalQuestions, updatedHistory);
        }
    };

    return (
        <div className="min-h-screen bg-[#212121] text-white pt-[40px] pb-12 font-['Inter'] flex flex-col items-center">
            <div className="w-full max-w-[1280px] px-[32px] flex flex-col items-start gap-[40px]">
                
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
                            {[...Array(totalQuestions)].map((_, index) =>
                            {
                                let segmentColor = 'bg-[#4A4A4A]'; 
                                if (index < currentStep)
                                {
                                    segmentColor = 'bg-[#1D4ED8]'; 
                                }
                                else if (index === currentStep)
                                {
                                    segmentColor = 'bg-[#3B82F6]'; 
                                }
                                return (
                                    <div key={index} className={`h-full flex-1 rounded-[100px] transition-all duration-300 ${segmentColor}`}></div>
                                );
                            })}
                        </div>
                    </div>
                </div>

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