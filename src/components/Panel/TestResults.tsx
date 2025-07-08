import React, { useEffect, useState } from "react";
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
  CheckCircle,
  XCircle,
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import { selectCodingState } from "@/Container/reducer/slicers/CodingSlicer";
import { userInfo } from "os";
import { selectCurrentUser } from "@/Container/reducer/slicers/userSlicer";

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
  const { currentUser } = useSelector(selectCurrentUser);
  const { result, aihint, executionTime } = useSelector(selectCodingState);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [currentFailer, setCurrentFailer] = useState<any>({});
  const [expandedTestCases, setExpandedTestCases] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "passed" | "failed">("all");
  const [aiMessage, setAiMessage] = useState("");
  const [showAiInsights, setShowAiInsights] = useState(false);
  // Sample data for demonstration
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedTests, setExpandedTests] = useState(new Set());
  const [aiTyping, setAiTyping] = useState(false);

  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "results" | "analysis" | "details"
  >("results");

  const toggleTestExpansion = (index: any) => {
    const newExpanded = new Set(expandedTests);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTests(newExpanded);
  };
  const hasSubscription = true;
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

  const passedCount = result.filter((r) => r.passed).length;
  const totalCount = result.length;
  const passRate = (passedCount / totalCount) * 100;
  const allPassed = passedCount === totalCount;

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

  // AI Analysis Effect
  useEffect(() => {
    if (result) {
      setAiAnalyzing(true);
      const timer = setTimeout(() => {
        setAiAnalyzing(false);
        setAiTyping(true);
        const message = aihint;

        // Simulate typing effect
        let index = 0;
        const typingInterval = setInterval(() => {
          if (index < message.length) {
            setAiMessage(message.slice(0, index + 1));
            index++;
          } else {
            clearInterval(typingInterval);
            setAiTyping(false);
            setShowAiInsights(true);
          }
        }, 30);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [result, aihint]);

  return (
    <div className="bg-black text-gray-900 font-sans py-2 px-2">
      {/* Header with metadata */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4"></div>
      {/* Detailed Analysis */}
      <div className="bg-black pb-6">
        <div className="mt-">
          <div className="flex items-center mb-2">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">
              Jennie ( Personal assistant )
            </h3>
          </div>
          <p className="text-sm text-slate-300 mx-2">
            {aiAnalyzing
              ? "Analyzing your solution..."
              : aiTyping
              ? "Typing..."
              : "Ready to help optimize your code"}
          </p>

          {hasSubscription || (currentUser?.trial?.answersLeft ?? 0) > 0 ? (
            <div className="bg-black rounded-lg mt-2">
              <div className="bg-black p-3 rounded-xl border border-white/20">
                <p className="text-base text-white leading-relaxed">
                  <Markdown remarkPlugins={[remarkGfm]}>{aiMessage}</Markdown>
                  {/* {aiMessage} */}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg border h-32 border-gray-700 overflow-hidden relative">
              <div className="p-4">
                <p className="text-gray-100">
                  Great thinking, Jagdeep. The issue with your current solution
                  is that the result isn't being stored.
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm flex items-center p-4">
                <div className="flex items-start">
                  <div className="bg-yellow-500/10 p-2 rounded-lg mr-3 flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-3 text-sm">
                      Upgrade to unlock AI-powered optimization recommendations
                      and in-depth code analysis.
                    </p>
                    <button
                      onClick={() => setShowUpgrade(true)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-md text-white text-sm font-medium transition-all hover:shadow-lg"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>{}</div>
      <>
        {/* Summary Card */}
        {/* <div
          className={`rounded-xl py-6 mb-8 px-6 transition-all ${
            allPassed ? "bg-black" : "bg-black border border-red-200"
          }`}
        > */}
        {/* <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="border border-white/20 px-3 py-4 rounded-lg text-center shadow-xs">
                <p className="text-xs font-medium text-white mb-1">RUNTIME</p>
                <p className="font-mono font-bold text-white">
                  {result.executionTime} ms
                  <span className="text-xs font-normal text-white/80 ml-1">
                    (avg)
                  </span>
                </p>
              </div>
              <div className="border border-white/20 px-3 py-4 rounded-lg text-center shadow-xs">
                <p className="text-xs font-medium text-white mb-1">MEMORY</p>
                <p className="font-mono font-bold text-white">
                  {submission.memoryUsage} MB
                  <span className="text-xs font-normal text-white/80 ml-1">
                    (avg)
                  </span>
                </p>
              </div>
              <div className="border border-white/20 px-3 py-4 rounded-lg text-center shadow-xs">
                <p className="text-xs font-medium text-white mb-1">SCORE</p>
                <p className="font-mono font-bold text-white">
                  {submission.optimizationScore}/100
                </p>
              </div>
            </div> */}

        {/* Progress bar */}
        <div className="my-6 px-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-white">
              {Math.round(passRate)}% passed
            </span>
            <span className="text-white">
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

        <div className="mb-6 px-3">
          <h2 className="text-xl text-white font-semibold">
            {allPassed ? "All Tests Passed" : "Tests Failed"}
          </h2>
          <p className="text-white/70 text-sm">
            {allPassed
              ? "Your solution meets all requirements"
              : `${passedCount} of ${totalCount} test cases passed`}
          </p>
        </div>
        <div className="space-y-3 px-3">
          {result.map((testCase, index) => (
            <div
              key={index}
              onClick={() => toggleTestExpansion(index)}
              className="py-3 px-5 bg-white/5 border-white/30 border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {testCase.passed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <h4 className="text-lg font-medium text-white">
                      Test Case {index + 1}
                    </h4>
                    <p
                      className={`text-base ${
                        testCase.passed ? "text-emerald-600" : "text-red-300"
                      }`}
                    >
                      {testCase.passed ? "Passed" : "Failed"}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors">
                  {expandedTests.has(index) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {expandedTests.has(index) && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Input
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <pre className="text-sm text-black font-mono overflow-x-auto">
                          {JSON.stringify(testCase.input, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Expected Output
                      </label>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <pre className="text-sm text-emerald-900 font-mono overflow-x-auto">
                          {JSON.stringify(testCase.expected, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {!testCase.passed && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Actual Output
                      </label>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="text-sm text-red-900 font-mono overflow">
                          {JSON.stringify(testCase.actual, null, 2)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-black p-5 rounded-xl shadow-xs border border-white/20 text-white">
            {/* <div className="flex items-center mb-4">
              <Cpu className="h-5 w-5 mr-2 text-blue-500" />
              <h3 className="text-lg font-semibold">Time Complexity</h3>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold font-mono">
                  {submission.timeComplexity}
                </p>
                <p className="text-sm text-white/70 mt-1">
                  Algorithm efficiency
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-white mb-1">SCORE</div>
                <p className="text-xl font-bold text-blue-600">
                  {
                    submission.benchmarks.find(
                      (b) => b.metric === "Time Complexity"
                    )?.score
                  }
                  /100
                </p>
              </div>
            </div> */}
            {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
              {
                submission.benchmarks.find(
                  (b) => b.metric === "Time Complexity"
                )?.description
              }
            </div> */}
          </div>

          <div className="bg-black p-5 rounded-xl shadow-xs border border-white/20">
            {/* <div className="flex items-center mb-4">
              <HardDrive className="h-5 w-5 mr-2 text-purple-500" />
              <h3 className="text-lg font-semibold">Space Complexity</h3>
            </div> */}
            {/* <div className="flex items-end justify-between">
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
            </div> */}
          </div>
        </div>
      </>

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
