// Shared interfaces for the Quiz feature

export interface TopicData {
  id?: number;
  name: string;
  difficulty: string;
  borderColor: string;
  badgeBg: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// Interface to track the user's answer history for the result page
export interface UserAnswerHistory {
  questionId: number;
  questionText: string;
  selectedOption: number | null;
  isCorrect: boolean;
}