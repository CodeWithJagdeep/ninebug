import {
  Award,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Clock,
  Crown,
  List,
  Star,
  Target,
  TrendingUp,
  Zap,
  Flame,
  Code,
  BookOpen,
  Trophy,
  Rocket,
  CheckCircle,
  XCircle,
  MinusCircle,
  Users,
  Calendar,
  BarChart3,
  Filter,
  Search,
  ArrowUpDown,
  Shuffle,
  Building2,
  Hash,
  Tags,
  Play,
  RotateCcw,
  Lock,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";

type ProblemDifficulty = "Easy" | "Medium" | "Hard";
type ProblemStatus = "solved" | "attempted" | "unsolved";

interface Problem {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  acceptance: number;
  status: ProblemStatus;
  companies: string[];
  collections: string[];
  frequency: number;
  premium: boolean;
  category?: string;
  topics: string[];
  likes: number;
  dislikes: number;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface ProblemsetProps {
  isAuthenticated?: boolean;
}

interface GroupedProblems {
  [key: string]: Problem[];
}

interface ProblemStats {
  solved: number;
  attempted: number;
  total: number;
}

const tabs: TabConfig[] = [
  {
    id: "algorithms",
    label: "Algorithms",
    icon: <Code className="w-4 h-4" />,
    description: "Data structures and algorithms problems",
  },
  {
    id: "company",
    label: "Company",
    icon: <Building2 className="w-4 h-4" />,
    description: "Problems grouped by companies",
  },
  {
    id: "category",
    label: "Category",
    icon: <Tags className="w-4 h-4" />,
    description: "Problems organized by topics",
  },
  {
    id: "shuffle",
    label: "Shuffle",
    icon: <Shuffle className="w-4 h-4" />,
    description: "Random problem selection",
  },
];

// Enhanced problems data with topics
const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: 55.7,
    status: "solved",
    companies: ["Google", "Amazon", "Apple", "Microsoft"],
    collections: ["Top Interview 150", "LeetCode 75"],
    frequency: 4.8,
    premium: false,
    category: "Array",
    topics: ["Array", "Hash Table"],
    likes: 45234,
    dislikes: 1456,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    acceptance: 46.2,
    status: "attempted",
    companies: ["Amazon", "Microsoft", "Adobe"],
    collections: ["Top Interview 150"],
    frequency: 3.2,
    premium: false,
    category: "Linked List",
    topics: ["Linked List", "Math", "Recursion"],
    likes: 28456,
    dislikes: 5234,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: 36.9,
    status: "unsolved",
    companies: ["Amazon", "Bloomberg", "Adobe"],
    collections: ["Top Interview 150", "Grind 75"],
    frequency: 3.9,
    premium: false,
    category: "String",
    topics: ["Hash Table", "String", "Sliding Window"],
    likes: 34567,
    dislikes: 1234,
  },
  {
    id: 15,
    title: "3Sum",
    difficulty: "Medium",
    acceptance: 33.1,
    status: "solved",
    companies: ["Amazon", "Microsoft", "Facebook"],
    collections: ["LeetCode 75"],
    frequency: 4.2,
    premium: false,
    category: "Array",
    topics: ["Array", "Two Pointers", "Sorting"],
    likes: 23456,
    dislikes: 2345,
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    acceptance: 54.7,
    status: "solved",
    companies: ["Amazon", "Bloomberg", "Facebook"],
    collections: ["Grind 75", "Dynamic Programming"],
    frequency: 4.5,
    premium: false,
    category: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming"],
    likes: 29876,
    dislikes: 987,
  },
  {
    id: 42,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    acceptance: 53.2,
    status: "unsolved",
    companies: ["Amazon", "Google", "Microsoft"],
    collections: ["Array"],
    frequency: 4.8,
    premium: false,
    category: "Array",
    topics: [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack",
      "Monotonic Stack",
    ],
    likes: 18765,
    dislikes: 234,
  },
  {
    id: 295,
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    acceptance: 51.4,
    status: "attempted",
    companies: ["Google", "Amazon"],
    collections: ["Heap"],
    frequency: 3.1,
    premium: false,
    category: "Heap",
    topics: [
      "Two Pointers",
      "Design",
      "Sorting",
      "Heap (Priority Queue)",
      "Data Stream",
    ],
    likes: 12345,
    dislikes: 456,
  },
  {
    id: 198,
    title: "House Robber",
    difficulty: "Medium",
    acceptance: 49.9,
    status: "solved",
    companies: ["Amazon", "Adobe"],
    collections: ["Dynamic Programming"],
    frequency: 3.8,
    premium: false,
    category: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming"],
    likes: 19876,
    dislikes: 345,
  },
  {
    id: 322,
    title: "Coin Change",
    difficulty: "Medium",
    acceptance: 41.4,
    status: "unsolved",
    companies: ["Amazon", "Google"],
    collections: ["Dynamic Programming"],
    frequency: 4.1,
    premium: false,
    category: "Dynamic Programming",
    topics: ["Array", "Dynamic Programming", "Breadth-First Search"],
    likes: 17654,
    dislikes: 456,
  },
  {
    id: 300,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    acceptance: 54.2,
    status: "attempted",
    companies: ["Microsoft", "Amazon"],
    collections: ["Dynamic Programming"],
    frequency: 3.7,
    premium: false,
    category: "Dynamic Programming",
    topics: ["Array", "Binary Search", "Dynamic Programming"],
    likes: 15432,
    dislikes: 234,
  },
];

const Problemset: React.FC<ProblemsetProps> = ({ isAuthenticated = false }) => {
  const [activeTab, setActiveTab] = useState<string>("algorithms");
  const [sortBy, setSortBy] = useState<keyof Problem>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  // Get unique values for filters
  const companies = useMemo(
    () => [...new Set(problems.flatMap((p) => p.companies))].sort(),
    []
  );
  const topics = useMemo(
    () => [...new Set(problems.flatMap((p) => p.topics))].sort(),
    []
  );
  const categories = useMemo(
    () =>
      [
        ...new Set(problems.map((p) => p.category).filter(Boolean)),
      ].sort() as string[],
    []
  );

  // Filter and sort problems
  const filteredAndSortedProblems = useMemo(() => {
    let filtered = problems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || problem.difficulty === difficultyFilter;
      const matchesStatus =
        statusFilter === "all" || problem.status === statusFilter;
      const matchesCompany =
        companyFilter === "all" || problem.companies.includes(companyFilter);
      const matchesTopic =
        topicFilter === "all" || problem.topics.includes(topicFilter);

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesStatus &&
        matchesCompany &&
        matchesTopic
      );
    });

    if (activeTab === "shuffle") {
      // Shuffle the array
      return [...filtered].sort(() => Math.random() - 0.5);
    }

    // Sort normally
    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [
    problems,
    searchTerm,
    difficultyFilter,
    statusFilter,
    companyFilter,
    topicFilter,
    sortBy,
    sortOrder,
    activeTab,
  ]);

  // Group problems based on active tab
  const groupedProblems = useMemo(() => {
    const groups: GroupedProblems = {};

    filteredAndSortedProblems.forEach((problem) => {
      if (activeTab === "company") {
        // Group by companies (each problem can appear in multiple groups)
        problem.companies.forEach((company) => {
          if (!groups[company]) groups[company] = [];
          groups[company].push(problem);
        });
        return;
      }

      const groupKey =
        activeTab === "category" ? problem.category || "Other" : "All Problems";

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(problem);
    });

    // Initialize expanded state for new groups
    setExpandedGroups((prev) => {
      const newExpanded = { ...prev };
      Object.keys(groups).forEach((group) => {
        if (newExpanded[group] === undefined) {
          newExpanded[group] = true;
        }
      });
      return newExpanded;
    });

    return groups;
  }, [filteredAndSortedProblems, activeTab]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const handleSort = (field: keyof Problem) => {
    if (activeTab === "shuffle") return; // No sorting in shuffle mode

    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: keyof Problem) => {
    if (activeTab === "shuffle") return null;
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4 text-blue-400" />
    ) : (
      <ChevronDown className="w-4 h-4 text-blue-400" />
    );
  };

  const getStatusIcon = (status: ProblemStatus) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "attempted":
        return <MinusCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: ProblemDifficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
    }
  };

  const getStats = (): ProblemStats => {
    return {
      solved: problems.filter((p) => p.status === "solved").length,
      attempted: problems.filter((p) => p.status === "attempted").length,
      total: problems.length,
    };
  };

  const stats = getStats();

  return (
    <div className="bg-black text-gray-100 relative">
      {/* Overlay for non-authenticated users */}
      {!isAuthenticated && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-black backdrop-blur-md p-8 rounded-xl border border-white/30 max-w-md w-full">
            <div className="flex flex-col items-center text-center space-y-6">
              <Lock className="w-12 h-12 text-[#fc3830]" />
              <h2 className="text-2xl font-bold text-white">
                Sign In Required
              </h2>
              <p className="text-gray-300">
                Please sign in to access the problemset and start practicing
                coding interview questions.
              </p>
              <div className="flex space-x-4 w-full">
                <div className="py-3 px-7 cursor-pointer border border-white/70 w-full rounded-lg flex items-center justify-between text-white/80">
                  <FcGoogle size={23} />
                  <span className="ml-3 text-base">Continue with Google</span>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`mx-auto px-4 py-8 ${
          !isAuthenticated ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Problems Table */}
        <div className="bg-black/50 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800/50">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16">
                    Status
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-20 ${
                      activeTab !== "shuffle"
                        ? "cursor-pointer hover:bg-gray-700/50 transition-colors"
                        : ""
                    }`}
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>#</span>
                      {getSortIcon("id")}
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ${
                      activeTab !== "shuffle"
                        ? "cursor-pointer hover:bg-gray-700/50 transition-colors"
                        : ""
                    }`}
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Title</span>
                      {getSortIcon("title")}
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-28 ${
                      activeTab !== "shuffle"
                        ? "cursor-pointer hover:bg-gray-700/50 transition-colors"
                        : ""
                    }`}
                    onClick={() => handleSort("difficulty")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Difficulty</span>
                      {getSortIcon("difficulty")}
                    </div>
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-24 ${
                      activeTab !== "shuffle"
                        ? "cursor-pointer hover:bg-gray-700/50 transition-colors"
                        : ""
                    }`}
                    onClick={() => handleSort("acceptance")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Acceptance</span>
                      {getSortIcon("acceptance")}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Topics
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedProblems).map(
                  ([groupName, groupProblems]) => (
                    <React.Fragment key={groupName}>
                      {activeTab === "category" && (
                        <>
                          {/* Group Header */}
                          <tr className="bg-black">
                            <td
                              colSpan={6}
                              className="px-6 py-3 cursor-pointer hover:bg-gray-700/30"
                              onClick={() => toggleGroup(groupName)}
                            >
                              <div className="flex items-center -mx-2 px-2 py-1 rounded transition-colors">
                                {/* Expand/Collapse Icon */}
                                <div className="flex-shrink-0 mr-2">
                                  {expandedGroups[groupName] ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>

                                <span className="font-semibold text-white text-sm">
                                  {groupName}
                                </span>
                                <span className="ml-3 text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                                  {groupProblems.length} problems
                                </span>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}

                      {/* Problems in this group - Only show if expanded */}
                      {(activeTab !== "category" ||
                        expandedGroups[groupName]) &&
                        groupProblems.slice(0, 5).map((problem) => (
                          <tr
                            key={`${groupName}-${problem.id}`}
                            className="hover:bg-gray-800/30 cursor-pointer transition-colors"
                            onClick={() => setSelectedProblem(problem)}
                          >
                            <td className="px-6 py-4">
                              <button
                                className="hover:bg-gray-700/50 p-1 rounded transition-colors"
                                aria-label={`Problem status: ${problem.status}`}
                              >
                                {getStatusIcon(problem.status)}
                              </button>
                            </td>
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">
                              {problem.id}
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <a
                                    href="#"
                                    className="hover:text-blue-400 transition-colors font-medium text-white"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {problem.title}
                                  </a>
                                  {problem.premium && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                      <Crown className="w-3 h-3 mr-1" />
                                      Premium
                                    </span>
                                  )}
                                </div>
                                {problem.collections.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {problem.collections
                                      .slice(0, 2)
                                      .map((collection) => (
                                        <span
                                          key={collection}
                                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        >
                                          {collection}
                                        </span>
                                      ))}
                                    {problem.collections.length > 2 && (
                                      <span className="text-xs text-gray-500">
                                        +{problem.collections.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                                  problem.difficulty
                                )}`}
                              >
                                {problem.difficulty}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400 font-mono">
                              {problem.acceptance}%
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {problem.topics.slice(0, 3).map((topic) => (
                                  <span
                                    key={topic}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
                                  >
                                    {topic}
                                  </span>
                                ))}
                                {problem.topics.length > 3 && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700/50 text-gray-400">
                                    +{problem.topics.length - 3}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredAndSortedProblems.length} of {problems.length}{" "}
          problems
          {activeTab === "shuffle" && (
            <span className="ml-2 text-blue-400">• Shuffled randomly</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problemset;
