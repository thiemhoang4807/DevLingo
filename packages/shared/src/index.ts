export interface User {
  id: string;
  username: string;
  fullName: string | null;
  role: 'student' | 'admin';
  xp: number;
  level: number;
}

export interface Term {
  id: number;
  lessonId: number;
  termName: string;
  definition: string;
  slangExplanation?: string;
  example?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}