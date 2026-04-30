import { useState, useEffect } from 'react';
import TopicCard from '../components/TopicCard';
import QuestionCard from '../components/QuestionCard';
import axiosClient from '../api/axiosClient';
import { useTheme } from "../context/ThemeContext";

interface QuizPageProps
{
    onStart: (topic: any) => void;
}

export default function QuizPage({ onStart }: QuizPageProps)
{
    const { theme } = useTheme();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState<boolean>(false);
    const [topics, setTopics] = useState<any[]>([]);

    useEffect(() =>
    {
        const fetchTopics = async () =>
        {
            try
            {
                const response: any = await axiosClient.get('/api/lessons');
                const data = response.data?.data || response.data || response;

                let filtered = data.filter((lesson: any) =>
                {
                    if (!lesson.title)
                    {
                        return false;
                    }
                    return ['Internet', 'Hardware', 'Software'].some(keyword =>
                        lesson.title.toLowerCase().includes(keyword.toLowerCase())
                    );
                });

                const orderMap: any = { 'internet': 1, 'hardware': 2, 'software': 3 };
                const diffMap: any = { 'easy': 1, 'medium': 2, 'hard': 3, 'extreme': 4 };

                filtered.sort((a: any, b: any) =>
                {
                    const aName = a.title.toLowerCase().replace(' term', '');
                    const bName = b.title.toLowerCase().replace(' term', '');
                    const aDiff = a.difficulty?.toLowerCase() || 'easy';
                    const bDiff = b.difficulty?.toLowerCase() || 'easy';

                    if (orderMap[aName] !== orderMap[bName])
                    {
                        return orderMap[aName] - orderMap[bName];
                    }
                    return diffMap[aDiff] - diffMap[bDiff];
                });

                setTopics(filtered);
            }
            catch (error)
            {
                console.error(error);
            }
        };
        fetchTopics();
    }, []);

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

    const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : 'Easy';

    return (
        <div className={`min-h-screen pt-10 pb-20 flex flex-col items-center font-['Inter'] transition-colors duration-300 ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-gray-50 text-black'}`}>
            <div className="w-full max-w-5xl px-8 flex flex-col items-start">

                <section className="w-full mb-12 flex flex-col gap-6">
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                        Random Quiz Question
                    </h2>
                    <QuestionCard
                        question={randomQuestion.question}
                        options={randomQuestion.options}
                        selectedOption={selectedOption}
                        correctAnswer={randomQuestion.correctAnswer}
                        isAnswered={isAnswered}
                        onSelect={(idx: number) =>
                        {
                            if (!isAnswered)
                            {
                                setSelectedOption(idx);
                                setIsAnswered(true);
                            }
                        }}
                    />
                </section>

                <section className="w-full">
                    <div className="mb-6">
                        <h2 className={`text-[32px] font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            More Quizzes
                        </h2>
                        <p className={`${theme === 'dark' ? 'text-[#A0AEC0]' : 'text-gray-600'} text-[16px]`}>
                            Test your knowledge with these 10-question computer technology quizzes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {topics.map((topic: any) =>
                        (
                            <div
                                key={topic.id}
                                onClick={() => onStart(topic)}
                                className="cursor-pointer"
                            >
                                <TopicCard
                                    name={topic.title}
                                    difficulty={capitalize(topic.difficulty)}
                                    description={topic.description || 'Test your knowledge with these specialized questions.'}
                                />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}