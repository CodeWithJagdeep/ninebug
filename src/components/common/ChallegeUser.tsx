import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Cpu,
  Database,
  Binary,
  ArrowRight,
  List,
  Layers,
  Bookmark,
  Eye,
  Terminal,
  Building2,
  Briefcase,
  Check,
  Clock,
  X,
} from "lucide-react";

const ChallengeSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const categories = [
    {
      id: "all",
      name: "All Challenges",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "array",
      name: "Array",
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "linked-list",
      name: "Linked List",
      icon: List,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "algorithms",
      name: "Algorithms",
      icon: Binary,
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: "data-structures",
      name: "Data Structures",
      icon: Database,
      color: "from-orange-500 to-red-500",
    },
  ];

  const questions = [
    // Array - Easy
    {
      id: 1,
      title: "Two Sum",
      description:
        "Given an array of integers, return indices of the two numbers that add up to a specific target.",
      difficulty: "Easy",
      category: "array",
      time: "15 mins",
      companies: ["Google", "Amazon", "Facebook"],
      tags: ["hash map", "brute force"],
    },
    {
      id: 2,
      title: "Remove Duplicates",
      description:
        "Remove duplicates from a sorted array in-place and return the new length.",
      difficulty: "Easy",
      category: "array",
      time: "10 mins",
      companies: ["Microsoft", "Adobe"],
      tags: ["two pointers"],
    },
    {
      id: 3,
      title: "Best Time to Buy/Sell",
      description:
        "Find the maximum profit from buying and selling a stock once (one transaction).",
      difficulty: "Easy",
      category: "array",
      time: "15 mins",
      companies: ["Goldman Sachs", "Bloomberg"],
      tags: ["greedy"],
    },

    // Linked List - Easy
    {
      id: 4,
      title: "Reverse Linked List",
      description: "Reverse a singly linked list iteratively and recursively.",
      difficulty: "Easy",
      category: "linked-list",
      time: "20 mins",
      companies: ["Apple", "Uber"],
      tags: ["pointers", "recursion"],
    },
    {
      id: 5,
      title: "Detect Cycle",
      description:
        "Determine if a linked list has a cycle in it using O(1) space.",
      difficulty: "Easy",
      category: "linked-list",
      time: "15 mins",
      companies: ["Amazon", "Microsoft"],
      tags: ["two pointers"],
    },
    {
      id: 6,
      title: "Merge Two Lists",
      description:
        "Merge two sorted linked lists and return as a new sorted list.",
      difficulty: "Easy",
      category: "linked-list",
      time: "20 mins",
      companies: ["Facebook", "Google"],
      tags: ["recursion", "iteration"],
    },

    // Algorithms - Easy
    {
      id: 7,
      title: "FizzBuzz",
      description:
        "Write a program that outputs the string representation of numbers from 1 to n with multiples of 3, 5 replaced.",
      difficulty: "Easy",
      category: "algorithms",
      time: "10 mins",
      companies: ["Meta", "Apple"],
      tags: ["modulo"],
    },
    {
      id: 8,
      title: "Palindrome Check",
      description:
        "Determine if a given string is a palindrome (reads the same backward as forward).",
      difficulty: "Easy",
      category: "algorithms",
      time: "15 mins",
      companies: ["Bloomberg", "Adobe"],
      tags: ["two pointers"],
    },

    // Data Structures - Easy
    {
      id: 9,
      title: "Valid Parentheses",
      description:
        "Determine if the input string of parentheses is valid (properly opened and closed).",
      difficulty: "Easy",
      category: "data-structures",
      time: "15 mins",
      companies: ["Google", "Amazon"],
      tags: ["stack"],
    },
    {
      id: 10,
      title: "Queue Using Stacks",
      description:
        "Implement a queue using two stacks with efficient enqueue and dequeue operations.",
      difficulty: "Easy",
      category: "data-structures",
      time: "20 mins",
      companies: ["Microsoft", "Uber"],
      tags: ["stack", "queue"],
    },
  ];

  const filteredQuestions =
    activeCategory === "all"
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300 font-medium">
              Test Your Skills
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight"
          >
            We Challenge You to Solve This
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Tackle real-world problems curated from top tech company interviews.
            Select a category to begin.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-3 rounded-xl flex items-center transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800"
              }`}
            >
              <category.icon className="w-5 h-5 mr-2" />
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Questions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredQuestions.map((question) => (
            <motion.div
              key={question.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedQuestion(question)}
              className="bg-gray-900/50 hover:bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 backdrop-blur-sm"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {question.time}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {question.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                  {question.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800/50 text-xs rounded-md text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {question.companies.slice(0, 3).map((company) => (
                    <span
                      key={company}
                      className="px-2 py-1 bg-gray-800/50 text-xs rounded-md text-gray-300"
                    >
                      {company}
                    </span>
                  ))}
                  {question.companies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800/50 text-xs rounded-md text-gray-300">
                      +{question.companies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center mx-auto">
            View All Challenges
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>

      {/* Question Detail Modal */}
      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedQuestion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuestion.difficulty === "Easy"
                          ? "bg-green-500/10 text-green-400"
                          : selectedQuestion.difficulty === "Medium"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {selectedQuestion.difficulty}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-3">
                      {selectedQuestion.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 mb-6">
                    {selectedQuestion.description}
                  </p>

                  <div className="border border-white/30 rounded-xl p-5 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-blue-400" />
                      Problem Requirements
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <Check className="w-4 h-4 mt-0.5 mr-2 text-green-400 flex-shrink-0" />
                        <span>Optimal time complexity solution</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 mt-0.5 mr-2 text-green-400 flex-shrink-0" />
                        <span>Handle edge cases properly</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-4 h-4 mt-0.5 mr-2 text-green-400 flex-shrink-0" />
                        <span>Include unit tests</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
                      Companies Asking This
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedQuestion.companies.map((company: any) => (
                        <span
                          key={company}
                          className="px-3 py-1.5 bg-gray-800 text-sm rounded-md text-gray-300 flex items-center"
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-8">
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center">
                      Solve Challenge
                      <Terminal className="w-5 h-5 ml-2" />
                    </button>

                    <button className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 font-medium hover:bg-gray-700 transition-all duration-300 flex items-center">
                      Save for Later
                      <Bookmark className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ChallengeSection;
