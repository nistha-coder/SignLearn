export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export type LearningReason = 'fun' | 'business' | 'communication' | 'other';

export type GoalTimeMinutes = 5 | 10 | 15 | 20 | 30;

export type Category = 'alphabets' | 'communication' | 'words';

export type LearningMode = 'learn' | 'quiz' | 'practice';

export interface UserPreferences {
  reason: LearningReason;
  goalTime: GoalTimeMinutes;
  selectedCategory: Category;
  selectedMode?: LearningMode;
}

export interface AlphabetSign {
  letter: string;
  name: string;
  gifUrl: string;
}

export interface WordSign {
  word: string;
  meaning?: string;
  gifUrl: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  imageUrl: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
}

export interface MLPrediction {
  className: string;
  probability: number;
}