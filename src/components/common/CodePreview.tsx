import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Sparkles,
  Lightbulb,
  Zap,
  Terminal,
  RotateCw,
  LayoutTemplate,
  Trophy,
  Braces,
  Timer,
  Target,
  Binary,
  BarChart2,
  ArrowRight,
  Bolt,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Star,
  ChevronsUpDown,
  Hash,
  ListTree,
  Sigma,
  PlayCircle,
  ArrowUpDown,
  DollarSign,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import Header from "@/components/common/Header";

const CodingProblem = () => {
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const editorRef = useRef(null);

  // Problem data
  const questions = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
      `,
      initialCode: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
      testCases: [
        {
          input: "nums = [2,7,11,15], target = 9",
          expected: "[0,1]",
          received: "[0,1]",
          passed: true,
        },
        {
          input: "nums = [3,2,4], target = 6",
          expected: "[1,2]",
          received: "[0,2]",
          passed: false,
        },
        {
          input: "nums = [3,3], target = 6",
          expected: "[0,1]",
          received: "[0,1]",
          passed: true,
        },
      ],
      solution: `// Optimal O(n) solution using hash map
function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}`,
    },
  ];

  // Auto-typing effect when focusing on editor
  useEffect(() => {
    if (isFocused && !code) {
      setIsTyping(true);
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i <= questions[activeQuestion].initialCode.length) {
          setCode(questions[activeQuestion].initialCode.substring(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          // Auto-run after typing completes
          setTimeout(runCode, 500);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [isFocused, code, activeQuestion]);

  const runCode = () => {
    setIsRunning(true);
    setTestCases([]);
    setShowAIFeedback(false);

    // Simulate test execution with delays
    questions[activeQuestion].testCases.forEach((testCase, index) => {
      setTimeout(() => {
        setTestCases((prev) => [...prev, testCase]);
        if (
          !testCase.passed &&
          index === questions[activeQuestion].testCases.length - 1
        ) {
          setTimeout(() => setShowAIFeedback(true), 800);
        }
      }, index * 800);
    });

    setTimeout(
      () => setIsRunning(false),
      questions[activeQuestion].testCases.length * 800
    );
  };

  const handleEditorDidMount = (editor:any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleQuestionChange = (index: number) => {
    setActiveQuestion(index);
    setCode("");
    setTestCases([]);
    setShowAIFeedback(false);
    setActiveTab("description");
    setIsTyping(true);
    setIsFocused(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Problem and Results */}
        <div className="w-1/2 p-6 overflow-y-auto bg-gray-800 border-r border-gray-700">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {questions[activeQuestion].title}
            </h1>
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                questions[activeQuestion].difficulty === "Easy"
                  ? "bg-green-500/20 text-green-500"
                  : "bg-yellow-500/20 text-yellow-500"
              }`}
            >
              {questions[activeQuestion].difficulty}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-2 ${
                activeTab === "description"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-4 py-2 ${
                activeTab === "solution"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Solution
            </button>
          </div>

          {/* Content */}
          {activeTab === "description" ? (
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-300">
                {questions[activeQuestion].description}
              </pre>

              {/* Test Results */}
              {testCases.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-3 flex items-center">
                    {testCases.every((t) => t.passed) ? (
                      <CheckCircle className="text-green-500 mr-2" />
                    ) : (
                      <XCircle className="text-red-500 mr-2" />
                    )}
                    {testCases.every((t) => t.passed)
                      ? "All test cases passed!"
                      : `${
                          testCases.filter((t) => !t.passed).length
                        } test case(s) failed`}
                  </h2>

                  <div className="space-y-3">
                    {testCases.map((testCase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded border ${
                          testCase.passed
                            ? "bg-green-900/30 border-green-700"
                            : "bg-red-900/30 border-red-700"
                        }`}
                      >
                        <div className="font-medium">
                          Test Case {index + 1}:
                        </div>
                        <div className="text-sm text-gray-300">
                          Input: {testCase.input}
                        </div>
                        <div className="text-sm text-gray-300">
                          Expected: {testCase.expected}
                        </div>
                        {!testCase.passed && (
                          <div className="text-sm text-red-400">
                            Received: {testCase.received}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Feedback */}
              <AnimatePresence>
                {showAIFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg"
                  >
                    <div className="flex items-start">
                      <Sparkles className="text-blue-400 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-blue-400 mb-2">
                          AI Suggestions
                        </h3>
                        <div className="text-sm text-gray-300 space-y-2">
                          <p>
                            Your solution has O(n²) time complexity. Consider
                            optimizing to O(n):
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Use a hash map (object) to store values we've seen
                            </li>
                            <li>
                              Calculate the complement (target - current number)
                            </li>
                            <li>Check if complement exists in the map</li>
                            <li>Return indices immediately when found</li>
                          </ul>
                          <div className="pt-2">
                            <p className="font-medium mb-1">
                              Optimized solution:
                            </p>
                            <pre className="bg-gray-700 p-2 rounded text-xs mt-1 overflow-x-auto">
                              {questions[activeQuestion].solution}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <h3 className="flex items-center text-lg font-semibold mb-4">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                Approach
              </h3>
              <p className="mb-4">
                The optimal solution uses a hash map to store the complement of
                each element as we iterate through the array.
              </p>

              <h3 className="flex items-center text-lg font-semibold mb-4">
                <Zap className="w-5 h-5 mr-2 text-blue-500" />
                Complexity
              </h3>
              <p className="mb-4">
                <strong>Time complexity:</strong> O(n) - Single pass through the
                array
              </p>
              <p className="mb-6">
                <strong>Space complexity:</strong> O(n) - Hash map storage
              </p>

              <h3 className="flex items-center text-lg font-semibold mb-4">
                <Terminal className="w-5 h-5 mr-2 text-green-500" />
                Solution Code
              </h3>
              <pre className="p-4 rounded-md bg-gray-700 overflow-x-auto">
                <code>{questions[activeQuestion].solution}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Right Panel - Editor */}
        <motion.div
          className="w-1/2 flex flex-col bg-gray-900"
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center"
            onClick={() => setIsFocused(true)}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-300 ml-2">twoSum.js</span>
            </div>
            <button
              onClick={runCode}
              disabled={isRunning || isTyping}
              className={`px-4 py-2 rounded flex items-center ${
                isRunning || isTyping
                  ? "bg-gray-600 text-gray-400"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {(isRunning || isTyping) && (
                <RotateCw className="w-4 h-4 mr-2 animate-spin" />
              )}
              {isTyping
                ? "Auto-completing..."
                : isRunning
                ? "Running..."
                : "Run Code"}
            </button>
          </div>

          <div className="flex-1" onClick={() => setIsFocused(true)}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                readOnly: isTyping,
              }}
              loading={
                <div className="flex items-center justify-center h-full bg-gray-900">
                  <div className="animate-pulse text-gray-500">
                    Loading editor...
                  </div>
                </div>
              }
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodingProblem;

interface TestCase {
  input: string;
  expected: string;
  received: string;
  passed: boolean;
}
