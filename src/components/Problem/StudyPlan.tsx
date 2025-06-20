import {
  Star,
  Target,
  Zap,
  Flame,
  Trophy,
  Rocket,
  Users,
  BarChart3,
} from "lucide-react";
import type { JSX } from "react";

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
  category?: string;
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
  featured?: boolean;
}

function StudyPlan() {
  // Enhanced problems data
  const problems: Problem[] = [
    // Top 175 Problems
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      acceptance: 55.7,
      status: "solved",
      companies: ["Google", "Amazon", "Apple", "Microsoft"],
      collections: ["Top Interview 150", "LeetCode 75", "Top 175"],
      frequency: 4.8,
      premium: false,
      category: "Top 175",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      acceptance: 46.2,
      status: "attempted",
      companies: ["Amazon", "Microsoft", "Adobe"],
      collections: ["Top Interview 150", "Top 175"],
      frequency: 3.2,
      premium: false,
      category: "Top 175",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      acceptance: 36.9,
      status: "unsolved",
      companies: ["Amazon", "Bloomberg", "Adobe"],
      collections: ["Top Interview 150", "Grind 75", "Top 175"],
      frequency: 3.9,
      premium: false,
      category: "Top 175",
    },
    {
      id: 15,
      title: "3Sum",
      difficulty: "Medium",
      acceptance: 33.1,
      status: "solved",
      companies: ["Amazon", "Microsoft", "Facebook"],
      collections: ["Top 175", "LeetCode 75"],
      frequency: 4.2,
      premium: false,
      category: "Top 175",
    },
    {
      id: 121,
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      acceptance: 54.7,
      status: "solved",
      companies: ["Amazon", "Bloomberg", "Facebook"],
      collections: ["Top 175", "Grind 75", "Dynamic Programming"],
      frequency: 4.5,
      premium: false,
      category: "Top 175",
    },

    // Blazing Random Problems
    {
      id: 1432,
      title: "Max Difference You Can Get From Changing an Integer",
      difficulty: "Medium",
      acceptance: 43.8,
      status: "unsolved",
      companies: ["Google", "Meta"],
      collections: ["Blazing Random"],
      frequency: 2.5,
      premium: false,
      category: "Blazing Random",
    },
    {
      id: 42,
      title: "Trapping Rain Water",
      difficulty: "Hard",
      acceptance: 53.2,
      status: "unsolved",
      companies: ["Amazon", "Google", "Microsoft"],
      collections: ["Blazing Random", "Array"],
      frequency: 4.8,
      premium: false,
      category: "Blazing Random",
    },
    {
      id: 295,
      title: "Find Median from Data Stream",
      difficulty: "Hard",
      acceptance: 51.4,
      status: "attempted",
      companies: ["Google", "Amazon"],
      collections: ["Blazing Random", "Heap"],
      frequency: 3.1,
      premium: false,
      category: "Blazing Random",
    },

    // Road to Ace Problems
    {
      id: 198,
      title: "House Robber",
      difficulty: "Medium",
      acceptance: 49.9,
      status: "solved",
      companies: ["Amazon", "Adobe"],
      collections: ["Road to Ace", "Dynamic Programming"],
      frequency: 3.8,
      premium: false,
      category: "Road to Ace",
    },
    {
      id: 322,
      title: "Coin Change",
      difficulty: "Medium",
      acceptance: 41.4,
      status: "unsolved",
      companies: ["Amazon", "Google"],
      collections: ["Road to Ace", "Dynamic Programming"],
      frequency: 4.1,
      premium: false,
      category: "Road to Ace",
    },
    {
      id: 300,
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
      acceptance: 54.2,
      status: "attempted",
      companies: ["Microsoft", "Amazon"],
      collections: ["Road to Ace", "Dynamic Programming"],
      frequency: 3.7,
      premium: false,
      category: "Road to Ace",
    },

    // Grind 75 Problems
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      acceptance: 43.8,
      status: "unsolved",
      companies: ["Google", "Microsoft", "Apple"],
      collections: ["Grind 75", "Binary Search"],
      frequency: 2.1,
      premium: false,
      category: "Grind 75",
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      acceptance: 35.8,
      status: "solved",
      companies: ["Microsoft", "Amazon", "Google"],
      collections: ["Grind 75", "String"],
      frequency: 3.5,
      premium: false,
      category: "Grind 75",
    },
  ];

  // Enhanced collections with new additions
  const collections: Collection[] = [
    {
      id: "top-175",
      title: "Top 175",
      description: "Essential problems for technical interviews",
      icon: <Trophy className="w-5 h-5" />,
      color: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-600",
      textColor: "text-white",
      count: problems.filter((p) => p.collections.includes("Top 175")).length,
      difficulty: "Mixed",
      featured: true,
    },
    {
      id: "blazing-random",
      title: "Blazing Random",
      description: "Challenge yourself with diverse problems",
      icon: <Flame className="w-5 h-5" />,
      color: "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500",
      textColor: "text-white",
      count: problems.filter((p) => p.collections.includes("Blazing Random"))
        .length,
      difficulty: "Mixed",
      featured: true,
    },
    {
      id: "road-to-ace",
      title: "Road to Ace",
      description: "Master advanced algorithmic concepts",
      icon: <Rocket className="w-5 h-5" />,
      color: "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600",
      textColor: "text-white",
      count: problems.filter((p) => p.collections.includes("Road to Ace"))
        .length,
      difficulty: "Advanced",
      featured: true,
    },
    {
      id: "top-interview-150",
      title: "Top Interview 150",
      description: "Must-do problems for interview preparation",
      icon: <Star className="w-5 h-5" />,
      color: "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600",
      textColor: "text-white",
      count: problems.filter((p) => p.collections.includes("Top Interview 150"))
        .length,
      difficulty: "Mixed",
    },
    {
      id: "leetcode-75",
      title: "LeetCode 75",
      description: "Ace coding interviews with 75 questions",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500",
      textColor: "text-white",
      count: problems.filter((p) => p.collections.includes("LeetCode 75"))
        .length,
      difficulty: "Mixed",
    },
    {
      id: "grind-75",
      title: "Grind 75",
      description: "A systematic coding preparation plan",
      icon: <Target className="w-5 h-5" />,
      color: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
      textColor: "text-white",
      count: problems.filter((p) => p.collections.includes("Grind 75")).length,
      difficulty: "Mixed",
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      description: "Master DP patterns and techniques",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500",
      textColor: "text-white",
      count: problems.filter((p) =>
        p.collections.includes("Dynamic Programming")
      ).length,
      difficulty: "Advanced",
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Large-scale system design problems",
      icon: <Users className="w-5 h-5" />,
      color: "bg-gradient-to-br from-slate-600 via-gray-700 to-zinc-700",
      textColor: "text-white",
      count: 25,
      difficulty: "Expert",
    },
  ];
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4">
        Popular Study Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className={`rounded-lg p-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-lg ${collection.color}`}
          >
            <div
              className={`flex items-center justify-between mb-3 ${collection.textColor}`}
            >
              {collection.icon}
              <span className="text-xs font-medium bg-black bg-opacity-20 px-2 py-1 rounded">
                {collection.count} problems
              </span>
            </div>
            <h3 className={`font-bold text-lg mb-2 ${collection.textColor}`}>
              {collection.title}
            </h3>
            <p className={`text-sm opacity-90 ${collection.textColor}`}>
              {collection.description}
            </p>
            <div className="mt-4">
              <span
                className={`text-xs px-2 py-1 rounded-full ${collection.textColor} bg-black bg-opacity-20`}
              >
                {collection.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudyPlan;
