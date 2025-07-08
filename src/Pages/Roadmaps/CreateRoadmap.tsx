"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Settings,
  Building2,
  Rocket,
  Factory,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Code,
  List,
  GitBranch,
  Hash,
  TreePine,
  Network,
  Target,
  User,
  CheckCircle,
  Clock,
  Calendar,
  BarChart2,
  MessageSquare,
  Bot,
} from "lucide-react";

type OnboardingStep =
  | "initial"
  | "ai-questions"
  | "custom-company"
  | "custom-topics"
  | "preview";
type CompanyType = "maang" | "startup" | "mnc";
type Level = "beginner" | "intermediate" | "advanced";
type Topic = "arrays" | "linkedlist" | "trees" | "graphs" | "dp" | "sorting";

interface OnboardingState {
  step: OnboardingStep;
  path: "ai" | "custom" | null;
  isAIProcessing: boolean;
  aiAnswers: {
    targetCompany: CompanyType | null;
    level: Level | null;
    timeframe: string;
  };
  customAnswers: {
    company: CompanyType | null;
    topics: Topic[];
  };
}

const topics = [
  {
    id: "arrays" as Topic,
    name: "Arrays & Strings",
    icon: List,
    color: "bg-orange-500",
  },
  {
    id: "linkedlist" as Topic,
    name: "Linked Lists",
    icon: GitBranch,
    color: "bg-orange-600",
  },
  {
    id: "trees" as Topic,
    name: "Trees & BST",
    icon: TreePine,
    color: "bg-orange-700",
  },
  {
    id: "graphs" as Topic,
    name: "Graphs",
    icon: Network,
    color: "bg-orange-800",
  },
  {
    id: "dp" as Topic,
    name: "Dynamic Programming",
    icon: Hash,
    color: "bg-orange-900",
  },
  {
    id: "sorting" as Topic,
    name: "Sorting & Searching",
    icon: Code,
    color: "bg-orange-950",
  },
];

const companies = [
  {
    id: "maang" as CompanyType,
    name: "MAANG",
    description: "Meta, Apple, Amazon, Netflix, Google",
    icon: Target,
  },
  {
    id: "startup" as CompanyType,
    name: "Startup",
    description: "Fast-paced startup environment",
    icon: Rocket,
  },
  {
    id: "mnc" as CompanyType,
    name: "MNC",
    description: "Multinational corporations",
    icon: Factory,
  },
];

const levels = [
  {
    id: "beginner" as Level,
    name: "Beginner",
    description: "New to DSA concepts",
  },
  {
    id: "intermediate" as Level,
    name: "Intermediate",
    description: "Some DSA experience",
  },
  {
    id: "advanced" as Level,
    name: "Advanced",
    description: "Strong DSA foundation",
  },
];

interface ChatMessage {
  sender: "user" | "jennie";
  content: string;
  isTyping?: boolean;
  options?: {
    text: string;
    action: () => void;
  }[];
}

export default function RoadmapCreation() {
  const [state, setState] = useState<OnboardingState>({
    step: "initial",
    path: null,
    isAIProcessing: false,
    aiAnswers: {
      targetCompany: null,
      level: null,
      timeframe: "",
    },
    customAnswers: {
      company: null,
      topics: [],
    },
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "jennie",
      content:
        "Hey there! 👋 I'm Jennie, your DSA roadmap assistant. Let's create a personalized learning path for you!",
      options: [
        {
          text: "AI-Powered Recommendation",
          action: () => handlePathSelection("ai"),
        },
        {
          text: "Custom Roadmap",
          action: () => handlePathSelection("custom"),
        },
      ],
    },
  ]);

  const addMessage = (message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message]);
  };

  const addJennieMessage = (
    content: string,
    options?: { text: string; action: () => void }[]
  ) => {
    // First add typing indicator
    addMessage({
      sender: "jennie",
      content: "",
      isTyping: true,
    });

    // Then after delay, add the actual message
    setTimeout(() => {
      setChatMessages((prev) => {
        const newMessages = [...prev];
        newMessages.pop(); // Remove typing indicator
        return [...newMessages, { sender: "jennie", content, options }];
      });
    }, 1500);
  };

  const getProgress = () => {
    switch (state.step) {
      case "initial":
        return 0;
      case "ai-questions":
        return 33;
      case "custom-company":
        return 33;
      case "custom-topics":
        return 66;
      case "preview":
        return 100;
      default:
        return 0;
    }
  };

  const handlePathSelection = (path: "ai" | "custom") => {
    setState((prev) => ({
      ...prev,
      path,
      step: path === "ai" ? "ai-questions" : "custom-company",
    }));

    if (path === "ai") {
      addJennieMessage(
        "Great choice! I'll ask you a few questions to generate your personalized roadmap.",
        [
          {
            text: "Let's do it!",
            action: () => {},
          },
        ]
      );

      setTimeout(() => {
        addJennieMessage("First, what type of company are you targeting?");
      }, 2000);
    } else {
      addJennieMessage(
        "You prefer to customize your own path? Awesome! Let's start by selecting your target company type."
      );
    }
  };

  const handleBack = () => {
    switch (state.step) {
      case "ai-questions":
      case "custom-company":
        setState((prev) => ({ ...prev, step: "initial", path: null }));
        break;
      case "custom-topics":
        setState((prev) => ({ ...prev, step: "custom-company" }));
        break;
      case "preview":
        setState((prev) => ({
          ...prev,
          step: state.path === "ai" ? "ai-questions" : "custom-topics",
        }));
        break;
    }
  };

  const handleAINext = () => {
    if (state.aiAnswers.targetCompany && state.aiAnswers.level) {
      setState((prev) => ({ ...prev, isAIProcessing: true }));
      addMessage({
        sender: "user",
        content: `I'm targeting ${state.aiAnswers.targetCompany} companies at ${state.aiAnswers.level} level with ${state.aiAnswers.timeframe} daily practice.`,
      });

      addJennieMessage(
        "Got it! Hold tight while I analyze your target company and skill level..."
      );

      setTimeout(() => {
        addJennieMessage(
          "Just a bit more... I'm optimizing your learning path based on industry trends."
        );
      }, 2000);

      setTimeout(() => {
        addJennieMessage(
          "Almost there! Finalizing your personalized roadmap..."
        );
      }, 3500);

      // Simulate AI processing time
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isAIProcessing: false,
          step: "preview",
        }));
        addJennieMessage(
          "Finally! Your roadmap is ready 🎉 I can help you ace your DSA journey. Would you like to start learning now?",
          [
            {
              text: "Start Learning",
              action: () => {},
            },
            {
              text: "Make Changes",
              action: handleBack,
            },
          ]
        );
      }, 5000);
    }
  };

  const handleCustomCompanyNext = () => {
    if (state.customAnswers.company) {
      setState((prev) => ({ ...prev, step: "custom-topics" }));
      addMessage({
        sender: "user",
        content: `I'm preparing for ${state.customAnswers.company} companies.`,
      });
      addJennieMessage(
        "Nice choice! Now, which DSA topics would you like to focus on?"
      );
    }
  };

  const handleCustomTopicsNext = () => {
    if (state.customAnswers.topics.length > 0) {
      setState((prev) => ({ ...prev, step: "preview" }));
      addMessage({
        sender: "user",
        content: `I want to focus on ${
          state.customAnswers.topics.length
        } topics: ${state.customAnswers.topics.join(", ")}.`,
      });
      addJennieMessage(
        "Great selection! Here's your customized roadmap. Ready to begin your learning journey?",
        [
          {
            text: "Let's Start",
            action: () => {},
          },
          {
            text: "Adjust Topics",
            action: () => handleBack(),
          },
        ]
      );
    }
  };

  const toggleTopic = (topic: Topic) => {
    setState((prev) => ({
      ...prev,
      customAnswers: {
        ...prev.customAnswers,
        topics: prev.customAnswers.topics.includes(topic)
          ? prev.customAnswers.topics.filter((t) => t !== topic)
          : [...prev.customAnswers.topics, topic],
      },
    }));
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">
              Data Structures & Algorithms Roadmap Builder
            </h1>
            <p className="text-gray-300 text-lg">
              Chat with Jennie to create your personalized learning path
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between mb-2 text-sm font-medium text-gray-400">
            <span>Start</span>
            <span>Configuration</span>
            <span>Complete</span>
          </div>
          <Progress
            value={getProgress()}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-orange-500"
          />
        </motion.div>

        {/* Chat Container */}
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden mb-8">
          {/* Chat Header */}
          <div className="bg-gray-900 p-4 border-b border-gray-700 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-300">Jennie</h3>
              <p className="text-xs text-gray-400">DSA Roadmap Assistant</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-[400px] overflow-y-auto">
            {chatMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "jennie" && (
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-900 border border-gray-700 text-gray-300"
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}

                  {message.options && !message.isTyping && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, i) => (
                        <Button
                          key={i}
                          variant={i === 0 ? "default" : "outline"}
                          onClick={option.action}
                          className={`w-full text-left justify-start ${
                            i === 0
                              ? "bg-orange-600 hover:bg-orange-700"
                              : "border-gray-600 text-gray-300 hover:bg-gray-800"
                          }`}
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {state.step === "ai-questions" && (
            <motion.div
              key="ai-questions"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="space-y-8">
                {/* Question 1: Target Company */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center text-orange-300">
                    <Building2 className="w-5 h-5 mr-2 text-orange-400" />
                    What type of company are you targeting?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {companies.map((company) => (
                      <Card
                        key={company.id}
                        className={`cursor-pointer border transition-all duration-300 ${
                          state.aiAnswers.targetCompany === company.id
                            ? "border-orange-500 bg-gray-800 shadow-lg"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                        }`}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            aiAnswers: {
                              ...prev.aiAnswers,
                              targetCompany: company.id,
                            },
                          }))
                        }
                      >
                        <CardContent className="p-4 text-center">
                          <company.icon className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                          <h4 className="font-medium text-orange-300">
                            {company.name}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {company.description}
                          </p>
                          {state.aiAnswers.targetCompany === company.id && (
                            <div className="mt-3">
                              <Badge className="bg-orange-900 text-orange-300">
                                Selected
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Question 2: Level */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center text-orange-300">
                    <BarChart2 className="w-5 h-5 mr-2 text-orange-400" />
                    What's your current DSA skill level?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {levels.map((level) => (
                      <Card
                        key={level.id}
                        className={`cursor-pointer border transition-all duration-300 ${
                          state.aiAnswers.level === level.id
                            ? "border-orange-500 bg-gray-800 shadow-lg"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                        }`}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            aiAnswers: { ...prev.aiAnswers, level: level.id },
                          }))
                        }
                      >
                        <CardContent className="p-4 text-center">
                          <h4 className="font-medium text-orange-300">
                            {level.name}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {level.description}
                          </p>
                          {state.aiAnswers.level === level.id && (
                            <div className="mt-3">
                              <Badge className="bg-orange-900 text-orange-300">
                                Selected
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Question 3: Timeframe */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center text-orange-300">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    How much time can you dedicate daily?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["30 mins", "1 hour", "2 hours", "3+ hours"].map(
                      (time) => (
                        <Button
                          key={time}
                          variant={
                            state.aiAnswers.timeframe === time
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              aiAnswers: { ...prev.aiAnswers, timeframe: time },
                            }))
                          }
                          className={`h-12 ${
                            state.aiAnswers.timeframe === time
                              ? "bg-orange-600 hover:bg-orange-700 text-white"
                              : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          {time}
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleAINext}
                  disabled={
                    !state.aiAnswers.targetCompany || !state.aiAnswers.level
                  }
                  className="bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-700 disabled:text-gray-500"
                >
                  Generate Roadmap
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {state.step === "custom-company" && (
            <motion.div
              key="custom-company"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-orange-300">
                  <Building2 className="w-5 h-5 mr-2 text-orange-400" />
                  Select your target company type
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {companies.map((company) => (
                    <motion.div
                      key={company.id}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer border transition-all duration-300 h-full ${
                          state.customAnswers.company === company.id
                            ? "border-orange-500 bg-gray-800 shadow-lg"
                            : "border-gray-700 bg-gray-800 hover:border-gray-600"
                        }`}
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            customAnswers: {
                              ...prev.customAnswers,
                              company: company.id,
                            },
                          }))
                        }
                      >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                            <company.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-orange-300">
                            {company.name}
                          </h3>
                          <p className="text-gray-400">{company.description}</p>
                          {state.customAnswers.company === company.id && (
                            <div className="mt-4">
                              <Badge className="bg-orange-900 text-orange-300">
                                Selected
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleCustomCompanyNext}
                  disabled={!state.customAnswers.company}
                  className="bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-700 disabled:text-gray-500"
                >
                  Next: Select Topics
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {state.step === "custom-topics" && (
            <motion.div
              key="custom-topics"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-orange-300">
                  <Code className="w-5 h-5 mr-2 text-orange-400" />
                  Select your focus topics
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic) => {
                    const isSelected = state.customAnswers.topics.includes(
                      topic.id
                    );
                    return (
                      <motion.div
                        key={topic.id}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer border transition-all duration-300 ${
                            isSelected
                              ? "border-orange-500 bg-gray-800 shadow-lg"
                              : "border-gray-700 bg-gray-800 hover:border-gray-600"
                          }`}
                          onClick={() => toggleTopic(topic.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 ${topic.color} rounded-lg flex items-center justify-center shadow-sm`}
                              >
                                <topic.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-orange-300">
                                  {topic.name}
                                </h4>
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-orange-400" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleCustomTopicsNext}
                  disabled={state.customAnswers.topics.length === 0}
                  className="bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-700 disabled:text-gray-500"
                >
                  Preview Roadmap
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {state.isAIProcessing && (
            <motion.div
              key="ai-processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center p-4"
            >
              <div className="max-w-4xl w-full space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-orange-400 mb-2">
                    Creating Your Personalized Roadmap
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Analyzing your preferences and optimizing your learning
                    path...
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-12 py-8">
                  {/* Main AI Brain Animation */}
                  <div className="relative">
                    <motion.div
                      className="w-40 h-40 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        scale: {
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        },
                        rotate: {
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        },
                      }}
                    >
                      <Brain className="w-20 h-20 text-white" />
                    </motion.div>

                    {/* Orbiting Elements */}
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <motion.div
                        key={index}
                        className="absolute w-6 h-6 bg-orange-400 rounded-full shadow-lg"
                        style={{
                          top: "50%",
                          left: "50%",
                          transformOrigin: "0 0",
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          rotate: {
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: index * 0.5,
                          },
                          scale: {
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.25,
                          },
                        }}
                        style={{
                          transform: `translate(-50%, -50%) translateX(120px) rotate(${
                            index * 60
                          }deg)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Processing Steps */}
                  <div className="w-full max-w-2xl space-y-4">
                    {[
                      {
                        text: "Analyzing your target company preferences...",
                        delay: 0,
                      },
                      {
                        text: "Evaluating your current skill level...",
                        delay: 800,
                      },
                      {
                        text: "Optimizing learning path structure...",
                        delay: 1600,
                      },
                      {
                        text: "Generating practice problems...",
                        delay: 2400,
                      },
                      {
                        text: "Finalizing your personalized roadmap...",
                        delay: 3200,
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: step.delay / 1000, duration: 0.5 }}
                      >
                        <motion.div
                          className="w-4 h-4 bg-orange-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: step.delay / 1000,
                          }}
                        />
                        <span className="text-gray-300 text-lg">
                          {step.text}
                        </span>
                        <motion.div
                          className="ml-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (step.delay + 600) / 1000 }}
                        >
                          <CheckCircle className="w-6 h-6 text-orange-400" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full max-w-2xl">
                    <div className="flex justify-between text-lg font-medium text-gray-400 mb-3">
                      <span>Processing...</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                      >
                        Complete
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {state.step === "preview" && (
            <motion.div
              key="preview"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="space-y-8 max-w-4xl mx-auto"
            >
              <Card className="p-6 bg-gray-800 border-gray-700 shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-orange-300">
                      Roadmap Summary
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-orange-900 text-orange-300 border-orange-700"
                    >
                      {state.path === "ai" ? "AI Generated" : "Custom Built"}
                    </Badge>
                  </div>

                  {state.path === "ai" ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <Building2 className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                        <p className="font-medium text-orange-300">Target</p>
                        <p className="text-sm text-gray-400 capitalize">
                          {state.aiAnswers.targetCompany}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <User className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                        <p className="font-medium text-orange-300">Level</p>
                        <p className="text-sm text-gray-400 capitalize">
                          {state.aiAnswers.level}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                        <p className="font-medium text-orange-300">
                          Daily Time
                        </p>
                        <p className="text-sm text-gray-400">
                          {state.aiAnswers.timeframe}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Building2 className="w-5 h-5 text-orange-400" />
                        <span className="font-medium text-orange-300">
                          Target Company:
                        </span>
                        <span className="capitalize text-gray-400">
                          {state.customAnswers.company}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Code className="w-5 h-5 text-orange-400" />
                          <span className="font-medium text-orange-300">
                            Selected Topics:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {state.customAnswers.topics.map((topicId) => {
                            const topic = topics.find((t) => t.id === topicId);
                            return (
                              <Badge
                                key={topicId}
                                variant="outline"
                                className="border-gray-600 text-gray-300"
                              >
                                {topic?.name}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="font-medium mb-3 text-orange-300 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-orange-400" />
                      Estimated Timeline
                    </h4>
                    <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4 rounded-lg shadow-sm">
                      <p className="text-lg font-semibold">
                        {state.path === "ai"
                          ? "8-12 weeks"
                          : `${state.customAnswers.topics.length * 2}-${
                              state.customAnswers.topics.length * 3
                            } weeks`}
                      </p>
                      <p className="text-sm opacity-90">
                        Based on your selections and recommended practice
                        schedule
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg">
                  Start Learning
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
