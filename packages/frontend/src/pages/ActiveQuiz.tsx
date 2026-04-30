import { useState, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import axiosClient from '../api/axiosClient';

export default function ActiveQuiz({ onBack, topic, onFinish }: any)
{
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState<any[]>([]);
    
    const [quizData, setQuizData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        const fetchQuestions = async () =>
        {
            try
            {
                console.log("Đang gọi API lấy câu hỏi cho lessonId:", topic?.id);
                
                const response: any = await axiosClient.get('/api/questions', { 
                    params: { lessonId: topic?.id } 
                });
                
                console.log("Dữ liệu trả về từ Backend:", response);

                const data = response.data?.data || response.data || response;

                if (!data || data.length === 0)
                {
                    setQuizData([]);
                    return;
                }

                const formattedQuestions = data.map((q: any) =>
                {
                    const options = [q.optionA, q.optionB, q.optionC, q.optionD];
                    let correctAnswerIndex = 0;
                    if (q.correctOption === 'B') correctAnswerIndex = 1;
                    if (q.correctOption === 'C') correctAnswerIndex = 2;
                    if (q.correctOption === 'D') correctAnswerIndex = 3;

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
                console.error("Lỗi API tải câu hỏi:", error);
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

    if (isLoading)
    {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (quizData.length === 0)
    {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center gap-6">
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
        
        const stepResult = {
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
                console.error("Lỗi khi lưu điểm:", error);
            }
            onFinish(currentScore, totalQuestions, updatedHistory);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white pt-[40px] pb-12 flex flex-col items-center font-['Inter']">
            <div className="w-full max-w-[1002px] px-[32px] flex flex-col items-start gap-[40px]">
                
                <div className="flex w-full gap-[21px] h-[33px] items-start"> 
                    <div className={`flex border-[1.5px] border-[#3B82F6] bg-[#3B82F6] rounded-[100px] h-full w-[277px] shrink-0 overflow-hidden`}>
                        <div className="bg-white text-blue-700 pl-5 flex items-center font-bold text-[16px] w-[65%] h-full">
                            {topic?.title || topic?.name}
                        </div>
                        <div className="text-white flex items-center justify-center font-semibold text-[14px] flex-1 uppercase h-full">
                            {topic?.difficulty || 'EASY'}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between h-full w-full flex-1">
                        <span className="text-[12px] font-semibold text-white">
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

                <div className="flex flex-col items-start gap-[24px] w-full">
                    <QuestionCard 
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        selectedOption={selectedOption}
                        correctAnswer={currentQuestion.correctAnswer}
                        isAnswered={isAnswered}
                        onSelect={handleSelect}
                    />

                    <div className="flex justify-end items-center w-full pt-[8px] min-h-[44px]">
                        {isAnswered && (
                            <button 
                                onClick={handleNext}
                                className="bg-[#3B82F6] text-white font-semibold text-[16px] py-[10px] px-[32px] rounded-[6px] transition-all hover:bg-blue-600 shadow-md"
                            >
                                {currentStep === totalQuestions - 1 ? 'Finish' : 'Next'}
                            </button>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
}