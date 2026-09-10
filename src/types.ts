export type GameAgeMode = 'toddler' | 'older'; // 'toddler' = 3 a 4 anos, 'older' = 5 a 7 anos

export interface PhaseInfo {
  id: number;
  numberLabel: string;
  title: string;
  subtitle?: string;
  biblicalRef?: string;
  narratorLines: string[];
}

export interface FinalQuizItem {
  id: number;
  prompt: string;
  blank: string;
  options: string[];
  answer: string;
}

export interface ReviewQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}
