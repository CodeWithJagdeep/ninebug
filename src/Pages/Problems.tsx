import { useState, useMemo, type JSX } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  Building2,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Circle,
  AlertCircle,
  Flame,
  Award,
  Clock,
  List,
  ChevronRight,
  Lightbulb,
  BarChart2,
  Calendar,
  Map,
  X,
  Crown,
  Trophy,
  HardHat,
  Bookmark,
} from "lucide-react";
import Header from "@/components/common/Header";
import Problemset from "@/components/Problem/Problemset";
import StudyPlan from "@/components/Problem/StudyPlan";

interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: number;
  status: "solved" | "attempted" | "unsolved";
  companies: string[];
  collections: string[];
  frequency: number;
  premium: boolean;
  category?: string; // Added category field
}

interface Collection {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  textColor: string;
  count: number;
  difficulty: string;
}

interface Company {
  name: string;
  logo: string;
  count: number;
  color: string;
}

interface TopProblem {
  title: string;
  icon: JSX.Element;
  count: number;
  color: string;
}

interface Roadmap {
  name: string;
  steps: string[];
  duration: string;
}

export default function LeetCodeProblems() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <Header />
      <div className="bg-black px-28 ">
        <StudyPlan />
        <Problemset />
      </div>
    </div>
  );
}
