import { useEffect, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, XCircle } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import SampleQuestion from "@/components/common/SampleQuestion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";

type Category = {
  name: string;
  count: number;
  icon: JSX.Element;
  topics: {
    name: string;
    icon: JSX.Element;
  }[];
};

type Testimonial = {
  name: string;
  role: string;
  initials: string;
  quote: string;
  before: string;
  after: string;
  gradient: string;
};

type TestCase = {
  input: string;
  output: string;
  passed: boolean;
  expected: string;
};

function HeroSection() {
  const [code, setCode] = useState("");
  const { t } = useTranslation();
  const [isTyping, setIsTyping] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  // Initial code with typing animation
  useEffect(() => {
    const initialCode = `// Two Sum Problem
  function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
    return [];
  }`;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= initialCode.length) {
        setCode(initialCode.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Auto-run after typing completes
        setTimeout(animateCodeExecution, 1000);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  const questions = [
    {
      title: "Two Sum (Sorted)",
      description:
        "Given a sorted array, find two numbers that add up to a target",
      difficulty: "Easy",
      pattern: "Two Pointers",
      initialCode: `# Pattern: Two Pointers\n# Time: O(n) | Space: O(1)\ndef two_sum_sorted(arr, target):\n    left, right = 0, len(arr) - 1\n    while left < right:\n        current_sum = arr[left] + arr[right]\n        if current_sum == target:\n            return [left, right]\n        elif current_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []`,
    },
    {
      title: "Valid Palindrome",
      description: "Check if a string reads the same forwards and backwards",
      difficulty: "Easy",
      pattern: "Two Pointers",
      initialCode: `# Pattern: Two Pointers\ndef is_palindrome(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        if s[left] != s[right]:\n            return False\n        left += 1\n        right -= 1\n    return True`,
    },
  ];

  const animateCodeExecution = () => {
    setIsRunning(true);
    setTestCases([]);
    setShowAIFeedback(false);

    const demoTestCases = [
      { input: "[2,7,11,15]", expected: 9, output: "[0, 1]", passed: true },
      { input: "[3,2,4]", expected: 6, output: "[1, 2]", passed: false },
      { input: "[3,3]", expected: 6, output: "[0, 1]", passed: true },
    ];

    demoTestCases.forEach((testCase, index) => {
      setTimeout(() => {
        setTestCases((prev: any) => [...prev, testCase]);
        if (!testCase.passed) {
          setTimeout(() => setShowAIFeedback(true), 1500);
        }
      }, index * 1500);
    });

    setTimeout(() => setIsRunning(false), demoTestCases.length * 1500 + 500);
  };

  return (
    <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-[80px] text-white/90 mb-6 text-center leading-21">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-center text-white/80 font-normal mb-10 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center w-full max-w-md sm:max-w-none">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 h-12 text-black bg-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {t("hero.startFreeTrial")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 h-12 bg-[#e46219] text-black text-base font-semibold hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {t("hero.watchDemo")}
              </motion.button>
            </div>
          </motion.div>

          {/* Animated Code Preview */}
          {/* <div className="max-w-8xl flex items-center px-20 mt-10">
            <div className="lg:col-span-1  border bg-[#6d53d0] p-6 border-gray-700 rounded overflow-hidden h-[650px] bg-white/5 p-6 h-full w-1/2 overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                {showAIFeedback ? (
                  <motion.div
                    key="ai-feedback"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                        <XCircle className="mr-2" />
                        {testCases.filter((t) => !t.passed).length}
                        {t("feedback.testCasesFailed")}
                      </h3>

                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {testCases
                          .filter((t) => !t.passed)
                          .map((test, index) => (
                            <motion.div
                              key={`failed-${index}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="font-semibold border border-white rounded-lg p-4"
                            >
                              <div className="grid grid-cols-2 gap-2 text-base">
                                <div>
                                  <span className="text-white/70">
                                    {t("feedback.input")}:
                                  </span>
                                  <div className="font-mono mt-1 text-gray-200">
                                    {test.input}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-white/70">
                                    {t("feedback.expected")}
                                  </span>
                                  <div className="font-mono mt-1 text-green-400">
                                    {test.expected}:
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-white/70">
                                    {t("feedback.received")}: 9
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col border-t border-gray-700 pt-4">
                      <div className="flex items-start mb-4">
                        <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-400 mb-1">
                            {t("feedback.aiAssistant")}
                          </h4>
                          <p className="text-sm text-gray-300 mb-3">
                            {t("feedback.aiIntro")}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 text-white rounded-lg overflow-auto">
                        <div className="text-lg">
                          <Markdown remarkPlugins={[remarkGfm]}>
                            {t("feedback.aisuggestion")}
                          </Markdown>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <SampleQuestion />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-2 space-y-6 w-1/2 h-[650px] relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 border-l border-white/40 overflow-hidden relative h-full"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-b-white/60">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400 ml-2">
                      {questions[activeQuestion].title
                        .toLowerCase()
                        .replace(/\s+/g, "_")}
                      .py
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
    
                    disabled={isRunning || isTyping}
                  >
                    {isRunning
                      ? "Running..."
                      : isTyping
                      ? "Typing..."
                      : "Run Code"}
                  </motion.button>
                </div>

                <div className="font-mono text-sm relative h-[100%]">
                  <AnimatePresence>
                    {(isRunning || isTyping) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-500/30 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                      scrollBeyondLastLine: false,
                      mouseWheelZoom: false,
                      scrollbar: {
                        vertical: "auto",
                        horizontal: "auto",
                        alwaysConsumeMouseWheel: false,
                      },
                      minimap: { enabled: false },
                      fontSize: 14,
                      readOnly: isTyping,
                      lineNumbers: "on",
                      roundedSelection: true,
                      automaticLayout: true,
                    }}
                    onMount={(editor) => {
                      // Additional editor instance configuration
                      editor.updateOptions({ cursorStyle: "block" });
                    }}
                    theme="vs-dark"
                    loading={
                      <div className="flex items-center justify-center h-full bg-gray-800">
                        <div className="animate-pulse text-gray-500">
                          Loading editor...
                        </div>
                      </div>
                    }
                  />
                </div>

                <div className="border-t border-gray-700 h-[40%] overflow-hidden">
                  <div className="px-4 py-3 bg-gray-800 flex items-center justify-between">
                    <span className="text-sm font-medium">Test Cases</span>
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          testCases.some((t) => !t.passed)
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {testCases.filter((t) => t.passed).length}/
                        {testCases.length} Passed
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="absolute bottom-4 right-4 space-y-2 z-10"></div>
            </div>
          </div>
        </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
