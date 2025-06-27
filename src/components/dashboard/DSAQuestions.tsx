import React, { useState, useMemo, useCallback } from "react";
import {
  CheckCircle,
  Circle,
  Star,
  Clock,
  BookOpen,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  BarChart2,
  Award,
  Layers,
  Zap,
} from "lucide-react";

const DSAQuestionsDashboard = () => {
  const [activeTab, setActiveTab] = useState("blitz75");
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [expandedTopics, setExpandedTopics] = useState(new Set(["Array"]));

  // Memoized data to prevent unnecessary recalculations
  const { blitz75Questions, aToZSheetData, top175Questions } = useMemo(
    () => ({
      blitz75Questions: [
        {
          id: "b1",
          title: "Two Sum",
          difficulty: "Easy",
          category: "Array",
          time: "15 min",
        },
        {
          id: "b2",
          title: "Best Time to Buy and Sell Stock",
          difficulty: "Easy",
          category: "Array",
          time: "20 min",
        },
        {
          id: "b3",
          title: "Contains Duplicate",
          difficulty: "Easy",
          category: "Array",
          time: "15 min",
        },
        {
          id: "b4",
          title: "Product of Array Except Self",
          difficulty: "Medium",
          category: "Array",
          time: "30 min",
        },
        {
          id: "b5",
          title: "Maximum Subarray",
          difficulty: "Medium",
          category: "Array",
          time: "25 min",
        },
        {
          id: "b6",
          title: "Maximum Product Subarray",
          difficulty: "Medium",
          category: "Array",
          time: "30 min",
        },
        {
          id: "b7",
          title: "Find Minimum in Rotated Sorted Array",
          difficulty: "Medium",
          category: "Array",
          time: "25 min",
        },
        {
          id: "b8",
          title: "Search in Rotated Sorted Array",
          difficulty: "Medium",
          category: "Array",
          time: "30 min",
        },
        {
          id: "b9",
          title: "3Sum",
          difficulty: "Medium",
          category: "Array",
          time: "35 min",
        },
        {
          id: "b10",
          title: "Container With Most Water",
          difficulty: "Medium",
          category: "Array",
          time: "25 min",
        },
        {
          id: "b11",
          title: "Valid Parentheses",
          difficulty: "Easy",
          category: "String",
          time: "15 min",
        },
        {
          id: "b12",
          title: "Valid Anagram",
          difficulty: "Easy",
          category: "String",
          time: "15 min",
        },
        {
          id: "b13",
          title: "Valid Palindrome",
          difficulty: "Easy",
          category: "String",
          time: "15 min",
        },
        {
          id: "b14",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          category: "String",
          time: "30 min",
        },
        {
          id: "b15",
          title: "Longest Repeating Character Replacement",
          difficulty: "Medium",
          category: "String",
          time: "35 min",
        },
      ],
      aToZSheetData: {
        Array: [
          {
            id: "a1",
            title: "Reverse an Array",
            difficulty: "Easy",
            subtopic: "Basic Operations",
          },
          {
            id: "a2",
            title: "Find the Maximum and Minimum Element",
            difficulty: "Easy",
            subtopic: "Basic Operations",
          },
          {
            id: "a3",
            title: "Kth Smallest Element",
            difficulty: "Medium",
            subtopic: "Searching",
          },
          {
            id: "a4",
            title: "Sort an Array of 0s, 1s and 2s",
            difficulty: "Easy",
            subtopic: "Sorting",
          },
          {
            id: "a5",
            title: "Move Negative Numbers to Beginning",
            difficulty: "Easy",
            subtopic: "Rearrangement",
          },
          {
            id: "a6",
            title: "Union of Two Arrays",
            difficulty: "Easy",
            subtopic: "Set Operations",
          },
          {
            id: "a7",
            title: "Cyclically Rotate Array by One",
            difficulty: "Easy",
            subtopic: "Rotation",
          },
          {
            id: "a8",
            title: "Kadane's Algorithm",
            difficulty: "Medium",
            subtopic: "Dynamic Programming",
          },
          {
            id: "a9",
            title: "Minimize the Heights II",
            difficulty: "Medium",
            subtopic: "Greedy",
          },
          {
            id: "a10",
            title: "Minimum Jumps to Reach End",
            difficulty: "Medium",
            subtopic: "Dynamic Programming",
          },
          {
            id: "a11",
            title: "Find Duplicate in Array",
            difficulty: "Medium",
            subtopic: "Searching",
          },
          {
            id: "a12",
            title: "Merge Two Sorted Arrays",
            difficulty: "Easy",
            subtopic: "Merging",
          },
        ],
        String: [
          {
            id: "s1",
            title: "Reverse a String",
            difficulty: "Easy",
            subtopic: "Basic Operations",
          },
          {
            id: "s2",
            title: "Check if String is Palindrome",
            difficulty: "Easy",
            subtopic: "Pattern Matching",
          },
          {
            id: "s3",
            title: "Find Duplicate Characters",
            difficulty: "Easy",
            subtopic: "Frequency Count",
          },
          {
            id: "s4",
            title: "Longest Common Subsequence",
            difficulty: "Medium",
            subtopic: "Dynamic Programming",
          },
          {
            id: "s5",
            title: "Edit Distance",
            difficulty: "Hard",
            subtopic: "Dynamic Programming",
          },
          {
            id: "s6",
            title: "Anagram Check",
            difficulty: "Easy",
            subtopic: "Sorting",
          },
          {
            id: "s7",
            title: "Longest Palindromic Substring",
            difficulty: "Medium",
            subtopic: "Pattern Matching",
          },
          {
            id: "s8",
            title: "String Rotation",
            difficulty: "Medium",
            subtopic: "Pattern Matching",
          },
        ],
        "Linked List": [
          {
            id: "l1",
            title: "Reverse a Linked List",
            difficulty: "Easy",
            subtopic: "Basic Operations",
          },
          {
            id: "l2",
            title: "Detect Loop in Linked List",
            difficulty: "Easy",
            subtopic: "Cycle Detection",
          },
          {
            id: "l3",
            title: "Find Middle of Linked List",
            difficulty: "Easy",
            subtopic: "Two Pointers",
          },
          {
            id: "l4",
            title: "Merge Two Sorted Lists",
            difficulty: "Easy",
            subtopic: "Merging",
          },
          {
            id: "l5",
            title: "Remove Nth Node From End",
            difficulty: "Medium",
            subtopic: "Two Pointers",
          },
          {
            id: "l6",
            title: "Add Two Numbers",
            difficulty: "Medium",
            subtopic: "Arithmetic",
          },
          {
            id: "l7",
            title: "Flatten Linked List",
            difficulty: "Medium",
            subtopic: "Recursion",
          },
        ],
        "Stack & Queue": [
          {
            id: "sq1",
            title: "Implement Stack using Arrays",
            difficulty: "Easy",
            subtopic: "Implementation",
          },
          {
            id: "sq2",
            title: "Implement Queue using Arrays",
            difficulty: "Easy",
            subtopic: "Implementation",
          },
          {
            id: "sq3",
            title: "Valid Parentheses",
            difficulty: "Easy",
            subtopic: "Pattern Matching",
          },
          {
            id: "sq4",
            title: "Next Greater Element",
            difficulty: "Medium",
            subtopic: "Monotonic Stack",
          },
          {
            id: "sq5",
            title: "Largest Rectangle in Histogram",
            difficulty: "Hard",
            subtopic: "Monotonic Stack",
          },
          {
            id: "sq6",
            title: "Sliding Window Maximum",
            difficulty: "Hard",
            subtopic: "Deque",
          },
        ],
        "Binary Tree": [
          {
            id: "bt1",
            title: "Binary Tree Traversal (Inorder)",
            difficulty: "Easy",
            subtopic: "Traversal",
          },
          {
            id: "bt2",
            title: "Binary Tree Traversal (Preorder)",
            difficulty: "Easy",
            subtopic: "Traversal",
          },
          {
            id: "bt3",
            title: "Binary Tree Traversal (Postorder)",
            difficulty: "Easy",
            subtopic: "Traversal",
          },
          {
            id: "bt4",
            title: "Level Order Traversal",
            difficulty: "Medium",
            subtopic: "BFS",
          },
          {
            id: "bt5",
            title: "Height of Binary Tree",
            difficulty: "Easy",
            subtopic: "Recursion",
          },
          {
            id: "bt6",
            title: "Diameter of Binary Tree",
            difficulty: "Easy",
            subtopic: "Recursion",
          },
          {
            id: "bt7",
            title: "Check if Binary Tree is Balanced",
            difficulty: "Easy",
            subtopic: "Recursion",
          },
          {
            id: "bt8",
            title: "Lowest Common Ancestor",
            difficulty: "Medium",
            subtopic: "Recursion",
          },
        ],
        "Binary Search Tree": [
          {
            id: "bst1",
            title: "Search in BST",
            difficulty: "Easy",
            subtopic: "Basic Operations",
          },
          {
            id: "bst2",
            title: "Insert into BST",
            difficulty: "Medium",
            subtopic: "Basic Operations",
          },
          {
            id: "bst3",
            title: "Delete Node in BST",
            difficulty: "Medium",
            subtopic: "Basic Operations",
          },
          {
            id: "bst4",
            title: "Validate BST",
            difficulty: "Medium",
            subtopic: "Validation",
          },
          {
            id: "bst5",
            title: "Kth Smallest Element in BST",
            difficulty: "Medium",
            subtopic: "Traversal",
          },
          {
            id: "bst6",
            title: "Convert BST to Greater Tree",
            difficulty: "Medium",
            subtopic: "Modification",
          },
        ],
        Heap: [
          {
            id: "h1",
            title: "Implement Min Heap",
            difficulty: "Medium",
            subtopic: "Implementation",
          },
          {
            id: "h2",
            title: "Implement Max Heap",
            difficulty: "Medium",
            subtopic: "Implementation",
          },
          {
            id: "h3",
            title: "Kth Largest Element",
            difficulty: "Medium",
            subtopic: "Selection",
          },
          {
            id: "h4",
            title: "Merge K Sorted Lists",
            difficulty: "Hard",
            subtopic: "Merging",
          },
          {
            id: "h5",
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            subtopic: "Frequency",
          },
        ],
        Graph: [
          {
            id: "g1",
            title: "DFS Traversal",
            difficulty: "Medium",
            subtopic: "Traversal",
          },
          {
            id: "g2",
            title: "BFS Traversal",
            difficulty: "Medium",
            subtopic: "Traversal",
          },
          {
            id: "g3",
            title: "Detect Cycle in Undirected Graph",
            difficulty: "Medium",
            subtopic: "Cycle Detection",
          },
          {
            id: "g4",
            title: "Detect Cycle in Directed Graph",
            difficulty: "Medium",
            subtopic: "Cycle Detection",
          },
          {
            id: "g5",
            title: "Topological Sort",
            difficulty: "Medium",
            subtopic: "Sorting",
          },
          {
            id: "g6",
            title: "Shortest Path (Dijkstra)",
            difficulty: "Hard",
            subtopic: "Shortest Path",
          },
          {
            id: "g7",
            title: "Minimum Spanning Tree",
            difficulty: "Hard",
            subtopic: "MST",
          },
        ],
        "Dynamic Programming": [
          {
            id: "dp1",
            title: "Fibonacci Number",
            difficulty: "Easy",
            subtopic: "Basic DP",
          },
          {
            id: "dp2",
            title: "Climbing Stairs",
            difficulty: "Easy",
            subtopic: "Basic DP",
          },
          {
            id: "dp3",
            title: "0/1 Knapsack",
            difficulty: "Medium",
            subtopic: "Knapsack",
          },
          {
            id: "dp4",
            title: "Longest Increasing Subsequence",
            difficulty: "Medium",
            subtopic: "Subsequence",
          },
          {
            id: "dp5",
            title: "Coin Change",
            difficulty: "Medium",
            subtopic: "Counting",
          },
          {
            id: "dp6",
            title: "Edit Distance",
            difficulty: "Hard",
            subtopic: "String DP",
          },
          {
            id: "dp7",
            title: "Maximum Subarray Sum",
            difficulty: "Easy",
            subtopic: "Kadane's Algorithm",
          },
        ],
      },
      top175Questions: [
        {
          id: "t1",
          title: "Two Sum",
          difficulty: "Easy",
          category: "Array",
          company: "Google",
          frequency: "Very High",
        },
        {
          id: "t2",
          title: "Add Two Numbers",
          difficulty: "Medium",
          category: "Linked List",
          company: "Amazon",
          frequency: "High",
        },
        {
          id: "t3",
          title: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          category: "String",
          company: "Facebook",
          frequency: "Very High",
        },
        {
          id: "t4",
          title: "Median of Two Sorted Arrays",
          difficulty: "Hard",
          category: "Array",
          company: "Microsoft",
          frequency: "Medium",
        },
        {
          id: "t5",
          title: "Longest Palindromic Substring",
          difficulty: "Medium",
          category: "String",
          company: "Apple",
          frequency: "High",
        },
        {
          id: "t6",
          title: "ZigZag Conversion",
          difficulty: "Medium",
          category: "String",
          company: "Netflix",
          frequency: "Low",
        },
        {
          id: "t7",
          title: "Reverse Integer",
          difficulty: "Medium",
          category: "Math",
          company: "Google",
          frequency: "Medium",
        },
        {
          id: "t8",
          title: "String to Integer (atoi)",
          difficulty: "Medium",
          category: "String",
          company: "Amazon",
          frequency: "High",
        },
        {
          id: "t9",
          title: "Palindrome Number",
          difficulty: "Easy",
          category: "Math",
          company: "Facebook",
          frequency: "Medium",
        },
        {
          id: "t10",
          title: "Regular Expression Matching",
          difficulty: "Hard",
          category: "String",
          company: "Microsoft",
          frequency: "Low",
        },
        {
          id: "t11",
          title: "Container With Most Water",
          difficulty: "Medium",
          category: "Array",
          company: "Apple",
          frequency: "Very High",
        },
        {
          id: "t12",
          title: "Integer to Roman",
          difficulty: "Medium",
          category: "String",
          company: "Google",
          frequency: "Low",
        },
        {
          id: "t13",
          title: "Roman to Integer",
          difficulty: "Easy",
          category: "String",
          company: "Amazon",
          frequency: "Medium",
        },
        {
          id: "t14",
          title: "Longest Common Prefix",
          difficulty: "Easy",
          category: "String",
          company: "Facebook",
          frequency: "Medium",
        },
        {
          id: "t15",
          title: "3Sum",
          difficulty: "Medium",
          category: "Array",
          company: "Microsoft",
          frequency: "Very High",
        },
      ],
    }),
    []
  );

  const tabs = useMemo(
    () => [
      {
        id: "blitz75",
        label: "Blitz 75",
        icon: <Zap className="w-4 h-4" />,
        color: "border-yellow-500 text-white",
      },
      {
        id: "atozshet",
        label: "A to Z Sheet",
        icon: <Layers className="w-4 h-4" />,
        color: "border-blue-500 text-blue-600",
      },
      {
        id: "top175",
        label: "Top 175",
        icon: <Award className="w-4 h-4" />,
        color: "border-purple-500 text-purple-600",
      },
    ],
    []
  );

  const toggleTopicExpansion = useCallback((topic: string) => {
    setExpandedTopics((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(topic)) {
        newExpanded.delete(topic);
      } else {
        newExpanded.add(topic);
      }
      return newExpanded;
    });
  }, []);

  const toggleCompletion = useCallback((questionId: string) => {
    setCompletedQuestions((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(questionId)) {
        newCompleted.delete(questionId);
      } else {
        newCompleted.add(questionId);
      }
      return newCompleted;
    });
  }, []);

  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }, []);

  const getFrequencyColor = useCallback((frequency: string) => {
    switch (frequency) {
      case "Very High":
        return "text-red-600 bg-red-100";
      case "High":
        return "text-orange-600 bg-orange-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }, []);

  // Reusable StatCard component
  const StatCard = ({ value, label, color, icon, progress }: any) => {
    const colorVariants: { [key: string]: string } = {
      green: "text-green-500 bg-green-500/10",
      yellow: "text-yellow-500 bg-yellow-500/10",
      red: "text-red-500 bg-red-500/10",
      blue: "text-blue-500 bg-blue-500/10",
      purple: "text-purple-500 bg-purple-500/10",
    };

    return (
      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`rounded-lg p-2 ${colorVariants[color]}`}>
              {icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-white/80">{label}</div>
            </div>
          </div>
        </div>

        {progress !== undefined && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-white/80">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${colorVariants[color]}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderQuestionCard = useCallback(
    (question: any, isBlitz = false, isTop175 = false, isAtoZ = false) => {
      const isCompleted = completedQuestions.has(question.id);

      return (
        <div
          key={question.id}
          className={`p-4 border-b border-b-white/20 transition-all duration-200 hover:shadow-md ${
            isCompleted
              ? "bg-black border-green-200"
              : "bg-black border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={() => toggleCompletion(question.id)}
                className="mt-1 text-gray-400 hover:text-green-500 transition-colors"
                aria-label={
                  isCompleted ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium text-white truncate ${
                    isCompleted ? "line-through text-gray-500" : ""
                  }`}
                >
                  {question.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      question.difficulty
                    )}`}
                  >
                    {question.difficulty}
                  </span>

                  {!isAtoZ && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium truncate">
                      {question.category}
                    </span>
                  )}

                  {isBlitz && question.time && (
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                      {question.time}
                    </span>
                  )}

                  {isAtoZ && question.subtopic && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium truncate">
                      {question.subtopic}
                    </span>
                  )}

                  {isTop175 && question.company && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium truncate">
                      {question.company}
                    </span>
                  )}

                  {isTop175 && question.frequency && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(
                        question.frequency
                      )}`}
                    >
                      {question.frequency}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [
      completedQuestions,
      getDifficultyColor,
      getFrequencyColor,
      toggleCompletion,
    ]
  );

  const getProgress = useCallback(
    (questions: any[]) => {
      const completed = questions.filter((q) =>
        completedQuestions.has(q.id)
      ).length;
      return Math.round((completed / questions.length) * 100);
    },
    [completedQuestions]
  );

  const getCurrentQuestions = useCallback(() => {
    switch (activeTab) {
      case "blitz75":
        return blitz75Questions;
      case "atozshet":
        return Object.values(aToZSheetData).flat();
      case "top175":
        return top175Questions;
      default:
        return blitz75Questions;
    }
  }, [activeTab, aToZSheetData, blitz75Questions, top175Questions]);

  const getCurrentTitle = useCallback(() => {
    switch (activeTab) {
      case "blitz75":
        return "Blitz 75 - Essential Interview Questions";
      case "atozshet":
        return "A to Z DSA Sheet - Complete Practice";
      case "top175":
        return "Top 175 - Most Asked Questions";
      default:
        return "DSA Questions";
    }
  }, [activeTab]);

  const getCurrentDescription = useCallback(() => {
    switch (activeTab) {
      case "blitz75":
        return "Master the most important 75 questions that cover all major patterns and concepts for technical interviews.";
      case "atozshet":
        return "Comprehensive collection of DSA problems organized by topics, perfect for systematic learning.";
      case "top175":
        return "Most frequently asked questions in top tech companies with difficulty and frequency indicators.";
      default:
        return "";
    }
  }, [activeTab]);

  const renderAtoZContent = useCallback(() => {
    return (
      <div className="space-y-4">
        {Object.entries(aToZSheetData).map(([topic, questions]) => {
          const isExpanded = expandedTopics.has(topic);
          const completedCount = questions.filter((q) =>
            completedQuestions.has(q.id)
          ).length;
          const totalCount = questions.length;
          const progress = Math.round((completedCount / totalCount) * 100);

          return (
            <div
              key={topic}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleTopicExpansion(topic)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors duration-200"
                aria-expanded={isExpanded}
                aria-controls={`topic-${topic}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {topic}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {totalCount} problems
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {completedCount}/{totalCount}
                    </div>
                    <div className="text-xs text-gray-500">
                      {progress}% complete
                    </div>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div
                  id={`topic-${topic}`}
                  className="border-t border-gray-200 bg-white"
                >
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {questions.map((question) =>
                      renderQuestionCard(question, false, false, true)
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [
    aToZSheetData,
    completedQuestions,
    expandedTopics,
    renderQuestionCard,
    toggleTopicExpansion,
  ]);

  const currentQuestions = useMemo(
    () => getCurrentQuestions(),
    [getCurrentQuestions]
  );
  const progress = useMemo(
    () => getProgress(currentQuestions),
    [currentQuestions, getProgress]
  );

  const stats = useMemo(() => {
    const easyCount = currentQuestions.filter(
      (q) => q.difficulty === "Easy"
    ).length;
    const mediumCount = currentQuestions.filter(
      (q) => q.difficulty === "Medium"
    ).length;
    const hardCount = currentQuestions.filter(
      (q) => q.difficulty === "Hard"
    ).length;
    const categoryCount =
      activeTab === "atozshet"
        ? Object.keys(aToZSheetData).length
        : [...new Set(currentQuestions.map((q: any) => q.category))].length;

    return {
      easyCount,
      easySolved: 9,
      mediumSolved: 9,
      hardSolved: 10,
      mediumCount,
      hardCount,
      categoryCount,
    };
  }, [activeTab, aToZSheetData, currentQuestions]);

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-white mb-2">
            Practise DSA Questions
          </h1>
          <p className="text-gray-400 max-w-3xl">
            Make progress in career through essential data structures and
            algorithms problems with proper categorization and difficulty
            levels. Track your progress and focus on the most important
            questions that matter for interviews.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <div className="flex space-x-1 bg-black p-1 rounded-lg border shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? `${tab.color} bg-[#fa6600] text-white`
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="rounded-lg shadow-sm overflow-hidden">
          {/* Section Header */}
          <div className="p-0 border-b border-b-white/20">
            <div className="py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Easy Problems Card */}
                <StatCard
                  value={stats.easyCount}
                  label="Easy Problems"
                  color="green"
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  }
                  progress={
                    Math.round((stats.easySolved / stats.easyCount) * 100) || 0
                  }
                />

                {/* Medium Problems Card */}
                <StatCard
                  value={stats.mediumCount}
                  label="Medium Problems"
                  color="yellow"
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  }
                  progress={
                    Math.round(
                      (stats.mediumSolved / stats.mediumCount) * 100
                    ) || 0
                  }
                />

                {/* Hard Problems Card */}
                <StatCard
                  value={stats.hardCount}
                  label="Hard Problems"
                  color="red"
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  }
                  progress={
                    Math.round(
                      ((stats?.hardSolved as number) / stats.hardCount) * 100
                    ) || 0
                  }
                />

                {/* Completion Card */}
                <StatCard
                  value={`${"60"}%`}
                  label="Completed"
                  color="purple"
                  icon={
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  progress={60}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="py-2">
            {activeTab === "atozshet" ? (
              renderAtoZContent()
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {currentQuestions.map((question) =>
                  renderQuestionCard(
                    question,
                    activeTab === "blitz75",
                    activeTab === "top175"
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAQuestionsDashboard;
