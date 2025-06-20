import React, { useState } from "react";
import {
  Check,
  X,
  Clock,
  Zap,
  Crown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle,
  BarChart2,
  Cpu,
  HardDrive,
  Code,
  ChevronRight,
  Info,
  Gauge,
  Flame,
  Shield,
  Terminal,
  GitPullRequest,
  BookOpen,
} from "lucide-react";

interface TestCase {
  passed: boolean;
  input: string;
  expected: string;
  output: string;
  runtime?: number;
  memory?: number;
  description?: string;
}

interface SubmissionData {
  results: TestCase[];
  executionTime: number;
  memoryUsage: number;
  timeComplexity: string;
  spaceComplexity: string;
  optimizationScore: number;
  benchmarks: {
    metric: string;
    score: number;
    description: string;
  }[];
  language: string;
  submissionDate: string;
}

const TestResults = () => {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [expandedTestCases, setExpandedTestCases] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "passed" | "failed">("all");
  const [activeTab, setActiveTab] = useState<
    "results" | "analysis" | "details"
  >("results");

  // Sample data - in a real app this would come from props
  const passedSubmission: SubmissionData = {
    results: [
      {
        passed: true,
        input: "[2,7,11,15], target = 9",
        expected: "[0,1]",
        output: "[0,1]",
        runtime: 4,
        memory: 42.1,
        description: "Basic case with obvious solution",
      },
      {
        passed: true,
        input: "[3,2,4], target = 6",
        expected: "[1,2]",
        output: "[1,2]",
        runtime: 3,
        memory: 41.8,
        description: "Non-adjacent elements solution",
      },
      {
        passed: true,
        input: "[3,3], target = 6",
        expected: "[0,1]",
        output: "[0,1]",
        runtime: 2,
        memory: 40.2,
        description: "Duplicate elements case",
      },
      {
        passed: true,
        input: "[1,2,3,4,5], target = 9",
        expected: "[3,4]",
        output: "[3,4]",
        runtime: 5,
        memory: 42.5,
        description: "Longer array with multiple possibilities",
      },
    ],
    executionTime: 4,
    memoryUsage: 42.1,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    optimizationScore: 85,
    benchmarks: [
      {
        metric: "Time Complexity",
        score: 90,
        description:
          "Your solution performs better than 90% of submissions for this problem",
      },
      {
        metric: "Space Efficiency",
        score: 85,
        description: "Memory usage is better than 85% of solutions",
      },
      {
        metric: "Code Quality",
        score: 80,
        description: "Readability and structure could be slightly improved",
      },
    ],
    language: "TypeScript",
    submissionDate: "2023-06-15T14:32:45Z",
  };

  const failedSubmission: SubmissionData = {
    results: [
      {
        passed: true,
        input: "[2,7,11,15], target = 9",
        expected: "[0,1]",
        output: "[0,1]",
        runtime: 4,
        memory: 42.1,
        description: "Basic case works correctly",
      },
      {
        passed: false,
        input: "[3,2,4], target = 6",
        expected: "[1,2]",
        output: "[2,1]",
        runtime: 8,
        memory: 38.5,
        description: "Incorrect order of indices returned",
      },
      {
        passed: false,
        input: "[3,3], target = 6",
        expected: "[0,1]",
        output: "[1,0]",
        runtime: 7,
        memory: 39.2,
        description: "Order matters for this problem's requirements",
      },
    ],
    executionTime: 8,
    memoryUsage: 38.5,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    optimizationScore: 62,
    benchmarks: [
      {
        metric: "Time Complexity",
        score: 60,
        description: "Your solution is slower than 60% of submissions",
      },
      {
        metric: "Space Efficiency",
        score: 70,
        description: "Memory usage is better than average",
      },
      {
        metric: "Code Quality",
        score: 55,
        description: "Consider refactoring for better readability",
      },
    ],
    language: "TypeScript",
    submissionDate: "2023-06-15T14:28:12Z",
  };

  // Toggle between passed and failed for demo
  const [isAllPassed, setIsAllPassed] = useState(true);
  const submission = isAllPassed ? passedSubmission : failedSubmission;

  // Filter results based on view mode
  const filteredResults = submission.results.filter((result) => {
    if (viewMode === "all") return true;
    if (viewMode === "passed") return result.passed;
    return !result.passed;
  });

  const passedCount = submission.results.filter((r) => r.passed).length;
  const totalCount = submission.results.length;
  const passRate = (passedCount / totalCount) * 100;
  const allPassed = passedCount === totalCount;

  const toggleTestCase = (index: number) => {
    setExpandedTestCases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-black text-gray-900 font-sans">
      {/* Header with metadata */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Submission Analysis</h1>
          <p className="text-white/90">
            Detailed performance metrics and optimization insights
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsAllPassed(!isAllPassed)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors shadow-sm flex items-center justify-center"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isAllPassed ? "Show Failed Case" : "Show Passed Case"}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "results"
              ? "text-yellow-400"
              : "text-yellow-400 hover:text-yellow-700"
          }`}
        >
          Test Results
          {activeTab === "results" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("analysis")}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "analysis"
              ? "text-yellow-400"
              : "text-yellow-400 hover:text-yellow-700"
          }`}
        >
          Performance Analysis
          {activeTab === "analysis" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-t"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === "details"
              ? "text-yellow-400"
              : "text-yellow-400 hover:text-yellow-700"
          }`}
        >
          Submission Details
          {activeTab === "details" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t"></div>
          )}
        </button>
      </div>

      {/* Results Tab */}
      {activeTab === "results" && (
        <>
          {/* Summary Card */}
          <div
            className={`rounded-xl p-6 mb-8 transition-all ${
              allPassed
                ? "bg-gradient-to-r from-green-50 to-green-100 border border-green-200"
                : "bg-gradient-to-r from-red-50 to-red-100 border border-red-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div
                  className={`p-3 rounded-lg ${
                    allPassed
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {allPassed ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <X className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {allPassed ? "All Tests Passed" : "Tests Failed"}
                  </h2>
                  <p className="text-gray-600">
                    {allPassed
                      ? "Your solution meets all requirements"
                      : `${passedCount} of ${totalCount} test cases passed`}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/80 p-3 rounded-lg text-center border border-gray-200 shadow-xs">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    RUNTIME
                  </p>
                  <p className="font-mono font-bold text-gray-800">
                    {submission.executionTime} ms
                    <span className="text-xs font-normal text-gray-500 ml-1">
                      (avg)
                    </span>
                  </p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg text-center border border-gray-200 shadow-xs">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    MEMORY
                  </p>
                  <p className="font-mono font-bold text-gray-800">
                    {submission.memoryUsage} MB
                    <span className="text-xs font-normal text-gray-500 ml-1">
                      (avg)
                    </span>
                  </p>
                </div>
                <div className="bg-white/80 p-3 rounded-lg text-center border border-gray-200 shadow-xs">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    SCORE
                  </p>
                  <p className="font-mono font-bold text-gray-800">
                    {submission.optimizationScore}/100
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">
                  {Math.round(passRate)}% passed
                </span>
                <span className="text-gray-500">
                  {passedCount}/{totalCount} test cases
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    allPassed ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${passRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Test Case Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setViewMode("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "all"
                  ? "bg-gray-800 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setViewMode("passed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "passed"
                  ? "bg-green-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Passed ({passedCount})
            </button>
            <button
              onClick={() => setViewMode("failed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "failed"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              Failed ({totalCount - passedCount})
            </button>
          </div>

          {/* Test Cases List */}
          <div className="space-y-3 mb-8">
            {filteredResults.map((result, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-xs overflow-hidden transition-all ${
                  result.passed
                    ? "border border-green-100 hover:border-green-200"
                    : "border border-red-100 hover:border-red-200"
                }`}
              >
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                    result.passed ? "hover:bg-green-50" : "hover:bg-red-50"
                  }`}
                  onClick={() => toggleTestCase(index)}
                >
                  <div className="flex items-center">
                    {result.passed ? (
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-3" />
                    )}
                    <div>
                      <span className="font-medium">Test Case {index + 1}</span>
                      <span
                        className={`ml-2 text-sm ${
                          result.passed ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {result.passed ? "Passed" : "Failed"}
                      </span>
                      {result.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {result.runtime} ms
                    </span>
                    <span className="flex items-center text-gray-500">
                      <div className="h-3 w-3 rounded bg-purple-400 mr-1" />
                      {result.memory} MB
                    </span>
                    {expandedTestCases.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedTestCases.includes(index) && (
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                          Input
                        </p>
                        <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                          {result.input}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                          Expected
                        </p>
                        <div className="bg-green-50 p-3 rounded-lg font-mono text-sm text-green-700 border border-green-100">
                          {result.expected}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
                          Output
                        </p>
                        <div
                          className={`p-3 rounded-lg font-mono text-sm border ${
                            result.passed
                              ? "bg-green-50 text-green-700 border-green-100"
                              : "bg-red-50 text-red-700 border-red-100"
                          }`}
                        >
                          {result.output}
                        </div>
                      </div>
                    </div>
                    {!result.passed && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-start">
                          <Info className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-red-700">
                              Failure Analysis
                            </p>
                            <p className="text-sm text-red-600">
                              The output indices are correct but in reverse
                              order. The problem expects the indices in
                              ascending order.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Analysis Tab */}
      {activeTab === "analysis" && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-200">
              <div className="flex items-center mb-4">
                <Cpu className="h-5 w-5 mr-2 text-blue-500" />
                <h3 className="text-lg font-semibold">Time Complexity</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold font-mono">
                    {submission.timeComplexity}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Algorithm efficiency
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    SCORE
                  </div>
                  <p className="text-xl font-bold text-blue-600">
                    {
                      submission.benchmarks.find(
                        (b) => b.metric === "Time Complexity"
                      )?.score
                    }
                    /100
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                {
                  submission.benchmarks.find(
                    (b) => b.metric === "Time Complexity"
                  )?.description
                }
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-200">
              <div className="flex items-center mb-4">
                <HardDrive className="h-5 w-5 mr-2 text-purple-500" />
                <h3 className="text-lg font-semibold">Space Complexity</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold font-mono">
                    {submission.spaceComplexity}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Memory usage</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    SCORE
                  </div>
                  <p className="text-xl font-bold text-purple-600">
                    {
                      submission.benchmarks.find(
                        (b) => b.metric === "Space Efficiency"
                      )?.score
                    }
                    /100
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-purple-700">
                {
                  submission.benchmarks.find(
                    (b) => b.metric === "Space Efficiency"
                  )?.description
                }
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-xs border border-gray-200">
              <div className="flex items-center mb-4">
                <Code className="h-5 w-5 mr-2 text-green-500" />
                <h3 className="text-lg font-semibold">Code Quality</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {submission.optimizationScore}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Optimization score
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    SCORE
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    {
                      submission.benchmarks.find(
                        (b) => b.metric === "Code Quality"
                      )?.score
                    }
                    /100
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-700">
                {
                  submission.benchmarks.find((b) => b.metric === "Code Quality")
                    ?.description
                }
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
              <h3 className="text-xl font-bold">
                Detailed Performance Analysis
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Flame className="h-4 w-4 mr-2 text-orange-500" />
                  Runtime Distribution
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="h-40 flex items-end space-x-1">
                    <div className="flex-1 bg-blue-100 h-1/4 rounded-t-sm"></div>
                    <div className="flex-1 bg-blue-200 h-1/2 rounded-t-sm"></div>
                    <div className="flex-1 bg-blue-300 h-3/4 rounded-t-sm"></div>
                    <div className="flex-1 bg-blue-400 h-full rounded-t-sm"></div>
                    <div className="flex-1 bg-blue-500 h-2/3 rounded-t-sm relative">
                      <div className="absolute -top-5 left-0 right-0 text-center text-xs font-medium">
                        Your solution
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Faster submissions → Slower submissions
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Your solution is faster than{" "}
                  {
                    submission.benchmarks.find(
                      (b) => b.metric === "Time Complexity"
                    )?.score
                  }
                  % of submissions.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-purple-500" />
                  Memory Usage
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="h-40 flex items-end space-x-1">
                    <div className="flex-1 bg-purple-500 h-3/5 rounded-t-sm relative">
                      <div className="absolute -top-5 left-0 right-0 text-center text-xs font-medium">
                        Your solution
                      </div>
                    </div>
                    <div className="flex-1 bg-purple-400 h-full rounded-t-sm"></div>
                    <div className="flex-1 bg-purple-300 h-3/4 rounded-t-sm"></div>
                    <div className="flex-1 bg-purple-200 h-1/2 rounded-t-sm"></div>
                    <div className="flex-1 bg-purple-100 h-1/4 rounded-t-sm"></div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    More efficient → Less efficient
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Your solution uses less memory than{" "}
                  {
                    submission.benchmarks.find(
                      (b) => b.metric === "Space Efficiency"
                    )?.score
                  }
                  % of submissions.
                </p>
              </div>
            </div>

            {!allPassed && (
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  <h3 className="text-xl font-bold">
                    Optimization Recommendations
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex">
                      <GitPullRequest className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 mb-1">
                          Use a Hash Map for O(n) Time Complexity
                        </p>
                        <p className="text-gray-700 text-sm">
                          Your current O(n²) solution can be optimized to O(n)
                          by using a hash map to store previously seen numbers,
                          allowing for constant time lookups.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex">
                      <BookOpen className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 mb-1">
                          Edge Case Handling
                        </p>
                        <p className="text-gray-700 text-sm">
                          Add explicit checks for edge cases like empty input
                          arrays or cases where no solution exists to make your
                          code more robust.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowUpgrade(true)}
                  className="mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors flex items-center"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Show Advanced Optimization Strategies
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="text-xl font-bold">Submission Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Execution Environment</h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">{submission.language}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Submission Time</span>
                  <span className="font-medium">
                    {formatDate(submission.submissionDate)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Test Cases</span>
                  <span className="font-medium">
                    {submission.results.length} total
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Average Runtime</span>
                  <span className="font-medium">
                    {submission.executionTime} ms
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Average Memory</span>
                  <span className="font-medium">
                    {submission.memoryUsage} MB
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Optimization Score</span>
                  <span className="font-medium">
                    {submission.optimizationScore}/100
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-3">Complexity Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <Gauge className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="font-medium">Time Complexity</span>
                </div>
                <div className="font-mono font-bold text-lg">
                  {submission.timeComplexity}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {submission.timeComplexity === "O(n)"
                    ? "Linear time complexity indicates efficient algorithm"
                    : "Quadratic time complexity suggests potential for optimization"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <HardDrive className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="font-medium">Space Complexity</span>
                </div>
                <div className="font-mono font-bold text-lg">
                  {submission.spaceComplexity}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {submission.spaceComplexity === "O(n)"
                    ? "Linear space usage is typical for this problem type"
                    : "Constant space usage is memory efficient"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Insights */}

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Unlock Advanced Analysis
                  </h3>
                  <p className="text-gray-600">
                    Get detailed optimization insights and recommendations
                  </p>
                </div>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-3">
                    <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-semibold">Premium Features</span>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Step-by-step optimization guidance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Multiple solution approaches with benchmarks</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Time and space complexity breakdown</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Personalized code recommendations</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-medium">Premium Membership</p>
                      <p className="text-sm text-gray-500">Cancel anytime</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$9.99/month</p>
                      <p className="text-xs text-gray-500">billed monthly</p>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-lg text-white font-medium transition-all shadow-sm">
                    Start 7-Day Free Trial
                  </button>
                </div>

                <p className="text-xs text-center text-gray-400">
                  No credit card required for trial period
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResults;
