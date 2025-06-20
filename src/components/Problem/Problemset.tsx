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
} from "lucide-react";
import React, { useMemo, useState, type JSX } from "react";

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
  topics: string[];
  likes: number;
  dislikes: number;
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

interface TabConfig {
  id: string;
  label: string;
  icon: JSX.Element;
  description: string;
}

function Problemset() {
  const [activeTab, setActiveTab] = useState("algorithms");
  const [sortBy, setSortBy] = useState<keyof Problem>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  // Group problems based on active tab
  // Filtering and sorting logic
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
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    } else {
      // Sort normally
      filtered = filtered.sort((a: any, b: any) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
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
  const groupedProblems = useMemo(() => {
    const groups: Record<string, Problem[]> = {};

    filteredAndSortedProblems.forEach((problem) => {
      let groupKey = "Other";

      switch (activeTab) {
        case "company":
          // Group by companies (each problem can appear in multiple groups)
          problem.companies.forEach((company) => {
            if (!groups[company]) groups[company] = [];
            groups[company].push(problem);
          });
          return;
        case "category":
          groupKey = problem.category || "Other";
          break;
        case "algorithms":
        default:
          groupKey = problem.category || "Other";
          break;
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(problem);
    });

    return groups;
  }, [filteredAndSortedProblems, activeTab]);
  const [expandedGroups, setExpandedGroups] = useState<any>(
    // Initialize all groups as expanded by default
    Object.keys(groupedProblems).reduce((acc: any, groupName) => {
      acc[groupName] = true;
      return acc;
    }, {})
  );

  const toggleGroup = (groupName: any) => {
    setExpandedGroups((prev: any) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  // Get unique values for filters
  const companies = [...new Set(problems.flatMap((p) => p.companies))].sort();
  const topics = [...new Set(problems.flatMap((p) => p.topics))].sort();
  const categories = [
    ...new Set(problems.map((p) => p.category).filter(Boolean)),
  ].sort();

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "attempted":
        return <MinusCircle className="w-5 h-5 text-orange-400" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "Hard":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getStatsColor = () => {
    const solved = problems.filter((p) => p.status === "solved").length;
    const attempted = problems.filter((p) => p.status === "attempted").length;
    const total = problems.length;

    return { solved, attempted, total };
  };

  const stats = getStatsColor();

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Problems</h1>
              <p className="text-gray-400">
                Practice coding interview questions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-medium">
                    {stats.solved}
                  </span>
                  <span className="text-gray-500">Solved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MinusCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 font-medium">
                    {stats.attempted}
                  </span>
                  <span className="text-gray-500">Attempted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{stats.total}</span>
                  <span className="text-gray-500">Total</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(stats.solved / stats.total) * 100}%` }}
            ></div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-black mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>

            {/* Company Filter - Show only when not in company tab */}
            {activeTab !== "company" && (
              <div>
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Companies</option>
                  {companies.map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Topic Filter */}
            <div>
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Topics</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-black backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white/5">
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
              <tbody className="divide-y divide-gray-800/50">
                {Object.entries(groupedProblems).map(
                  ([groupName, groupProblems]) => (
                    <React.Fragment key={groupName}>
                      {activeTab === "category" && (
                        <>
                          {/* Group Header - Only show if there are multiple groups */}
                          {Object.keys(groupedProblems).length > 1 && (
                            <tr className="bg-black">
                              <td
                                colSpan={6}
                                className="px-6 py-3 cursor-pointer hover:bg-gray-700/30"
                              >
                                <div
                                  className="flex items-center -mx-2 px-2 py-1 rounded transition-colors"
                                  onClick={() => toggleGroup(groupName)}
                                >
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
                          )}
                        </>
                      )}

                      {/* Problems in this group - Only show if expanded */}
                      {(Object.keys(groupedProblems).length === 1 ||
                        expandedGroups[groupName]) &&
                        groupProblems.map((problem) => (
                          <tr
                            key={`${groupName}-${problem.id}`}
                            className="hover:bg-gray-800/30 cursor-pointer transition-colors"
                            onClick={() => setSelectedProblem(problem)}
                          >
                            <td className="px-6 py-4">
                              <button className="hover:bg-gray-700/50 p-1 rounded transition-colors">
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
}

export default Problemset;
