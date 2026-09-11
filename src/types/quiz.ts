export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'node' | 'pointer' | 'operations' | 'complexity' | 'real-world';
}
