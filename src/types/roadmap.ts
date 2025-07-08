export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum Frequency {
  VERY_HIGH = "very-high",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  RARE = "rare",
}

export interface modules {
  _id: string;
  title: string;
  description: string;
  topics: {
    title: string;
    companies: string[];
    topic: string;
    difficulty: Difficulty;
    frequency: Frequency;
    slug: string;
  }[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Roadmap {
  _id: string;
  title: string;
  description: string;
  modules: modules[];
}

export interface Module {
  id: string;
  title: string;
  roadmapId: string;
  order: number;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  status?: "unattempted" | "attempted" | "solved";
}

export interface Feedback {
  summary: string;
  hints: string[];
  score: number;
  updatedAt: string;
}

export interface QuestionStatus {
  status: "attempted" | "solved";
  timestamp: string;
}
