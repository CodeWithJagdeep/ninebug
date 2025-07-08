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
                className="px-6 h-12 text-black bg-white text-base hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {t("hero.startFreeTrial")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 h-12 bg-[#e46219] text-black text-base hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {t("hero.watchDemo")}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
