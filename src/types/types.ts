// Define a TypeScript interface for Product
export interface IProduct {
  _id?: string;
  name?: string;
  price: number;
  premium?: boolean;
  description?: string;
  feature?: string[];
  features?: string[];
}

export type Experience = {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
};

export type Education = {
  id: number;
  institution: string;
  degree: string;
  year: string;
};

export type Project = {
  _id: number;
  name: string;
  description: string;
  technologies: string[];
  link: string;
};

type Certification = {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
};

export type Achievement = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
};

export type Recommendation = {
  id: number;
  name: string;
  position: string;
  relation: string;
  text: string;
};

export type SocialLinks = {
  linkedin: string;
  github: string;
  twitter: string;
};

interface IUserTrial {
  interviewLeft: number;
  answersLeft: number;
  isTrialOver: boolean;
}

export type UserProfile = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  emailVerified: boolean;
  linkedinprofile: string;
  githubprofile: string;
  profilePicture: string;
  currentBadge: number;
  targetCompany: string;
  isActive: boolean;
  oauthId: string;
  coins: number;
  enrolledCourse: string[];
  trial: IUserTrial;
  // Login tracking fields
  lastLogin: Date;
  loginCount: number;
  ip: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  recentTransactions: [
    {
      id: string;
      amount: string;
      formattedAmount: string;
      date: string;
      status: string;
      planId: string;
    }
  ];
};

// ================ ENUMS ================
export enum LessonStatus {
  DRAFT = "draft",
  UNDER_REVIEW = "under_review",
  PUBLISHED = "published",
  ARCHIVED = "archived",
  FLAGGED = "flagged",
}

export enum LessonDifficulty {
  BEGINNER = 0,
  INTERMEDIATE = 1,
  ADVANCED = 2,
  EXPERT = 3,
}

export enum LessonType {
  THEORY = "theory",
  PRACTICAL = "practical",
  EXERCISE = "exercise",
  QUIZ = "quiz",
  CODING_CHALLENGE = "coding-challenge",
  PROJECT = "project",
}

export enum ComplexityLevel {
  CONSTANT = "O(1)",
  LINEAR = "O(n)",
  LOGARITHMIC = "O(log n)",
  QUADRATIC = "O(n²)",
  EXPONENTIAL = "O(2ⁿ)",
}

// ================ INTERFACES ================
interface ITestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  explanation?: string;
  weight?: number;
}

export interface IMCQ {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
  difficulty?: LessonDifficulty;
}

interface ISolution {
  language: string;
  solution: string;
  explanation?: string;
  complexity: {
    time: ComplexityLevel;
    space: ComplexityLevel;
  };
}

interface IComment {
  user: string | UserProfile;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  replies?: IComment[];
}

interface ICodingChallenge {
  problemStatement: string;
  starterCode: Record<string, string>;
  testCases: ITestCase[];
  constraints: string[];
  timeLimit: number;
  memoryLimit: number;
  solutionTemplate?: string;
}

interface IRating {
  user: string | UserProfile;
  value: number;
  feedback?: string;
  createdAt: Date;
}

interface ICompletion {
  user: string | UserProfile;
  completedAt: Date;
  score?: number;
  timeSpent: number;
}

export interface ICheckPoint {
  instruction: string;
  expected: any;
  hints?: string[];
  starterCode?: Record<string, string>;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
    explanation?: string;
  }>;
  order: number;
  difficulty?: LessonDifficulty;
  validateInput: string[];
}

interface IProgress {
  checkPointsCompleted: Array<{
    checkPointId: string;
    completedAt: Date;
    attempts?: number;
    codeUsed?: string;
    success?: boolean;
  }>;
  lastCheckPointAttempted?: string;
  currentCode?: Record<string, string>;
}

interface ICategory {
  name: string;
  slug: string;
  description?: string;
  parentCategory?: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

export interface ILessonContent {
  text?: string;
  video?: {
    url: string;
    duration: number;
    thumbnail?: string;
    captions?: string[];
  };
  slides?: string[];
  interactiveElements?: any[];
}

export interface ILesson {
  _id: string;
  // Core Metadata
  title: string;
  slug: string;
  version: number;
  type: LessonType;
  status: LessonStatus;
  difficulty: LessonDifficulty;

  // Content
  learningObjectives: string[];
  explanation: string;
  content: ILessonContent;
  extraResources?: string[];
  extraTopic?: string;
  // Assessment
  mcqs?: IMCQ[];
  checkPoints?: ICheckPoint[];
  codingChallenge?: ICodingChallenge;
  solutions: ISolution[];

  // Relationships
  author: string | UserProfile;
  reviewers: string[] | UserProfile[];
  categories: string[] | ICategory[];
  prerequisites: string[] | ILesson[];
  prevLessons: string;
  nextLessons: string;
  duration: number;
  programmingLanguage: string;
  contentLanguage: string;
  preCode: string;
  // Engagement
  ratings: IRating[];
  averageRating: number;
  likes: string[] | UserProfile[];
  comments: IComment[];
  completions: ICompletion[];
  progress?: IProgress;
  viewCount: number;

  // System
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  lastReviewedAt?: Date;
}

export interface ILessonProgress {
  lessonId: string;
  totalMarks: number;
  obtainedMarks: number;
  lastUpdated: Date;
}

export interface ICourseProgress {
  courseId: string;
  language: string;
  progress: ILessonProgress[];
  lastAccessed?: Date; // Added lastAccessed at course level,
  lastLesson?: ILessonProgress;
  completedLessons: ILessonProgress[];
  nextLesson?: {
    lessonId: string;
    title: string;
    moduleTitle: string;
    type: string; // extend as needed
    difficulty: string;
    duration: number; // in minutes
    isFree: boolean;
  };
}

export interface IUserProgress {
  userId: string;
  courses: ICourseProgress[];
  lastAccessed?: Date; // Added lastAccessed at user level
}

import type { JSX } from "react";

// Add these type definitions
export type Company = {
  name: string;
  logo: string;
  url: string;
};

export type ProblemSet = {
  title: string;
  count: number;
  difficulty: string;
  companies: Company[];
};

export interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: number;
  status: "solved" | "attempted" | "unsolved";
  companies: string[];
  collections: string[];
  frequency: number;
  premium: boolean;
  category?: string;
  topics: string[];
  likes: number;
  dislikes: number;
}

export interface TabConfig {
  id: string;
  label: string;
  icon: JSX.Element;
  description: string;
}
