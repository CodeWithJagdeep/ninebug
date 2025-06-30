import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, Clock, Code, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SpeechRecognition } from "@/types/speech";

// Memoized demo questions to prevent recreation on re-renders
const DEMO_QUESTIONS = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Medium",
  },
  {
    id: 5,
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
  },
] as const;

interface Message {
  id: string;
  sender: "user" | "geeta";
  content: string;
  timestamp: Date;
}

export default function DSAInterviewPlatform() {
  // Memoized random question selection
  const currentQuestion = useMemo(() => {
    return DEMO_QUESTIONS[Math.floor(Math.random() * DEMO_QUESTIONS.length)];
  }, []);

  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [userApproach, setUserApproach] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "geeta",
      content:
        "Hi, I'm Geeta, your instructor. Please type or speak your approach to solve the DSA question above.",
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [editorUnlocked, setEditorUnlocked] = useState(false);
  const [code, setCode] = useState("");

  // Memoized time formatter
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

  // Memoized difficulty color getter
  const getDifficultyColor = useCallback((difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) return;

      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      const handleResult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setUserApproach((prev) => prev + finalTranscript + " ");
        }
      };

      const handleError = () => setIsListening(false);
      const handleEnd = () => setIsListening(false);

      recognitionInstance.onresult = handleResult;
      recognitionInstance.onerror = handleError;
      recognitionInstance.onend = handleEnd;

      setRecognition(recognitionInstance);

      return () => {
        recognitionInstance.stop();
        recognitionInstance.onresult = () => {};
        recognitionInstance.onerror = () => {};
        recognitionInstance.onend = () => {};
      };
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setEditorUnlocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Memoized approach analyzer
  const analyzeApproach = useCallback(
    (approach: string) => {
      const lowerApproach = approach.toLowerCase();
      const questionTitle = currentQuestion.title.toLowerCase();

      // Simple analysis based on keywords
      if (questionTitle.includes("two sum")) {
        if (lowerApproach.includes("hash") || lowerApproach.includes("map")) {
          return {
            correct: true,
            response:
              "Excellent! Using a hash map is the optimal approach for Two Sum. You're thinking about O(n) time complexity. Let's move to coding!",
          };
        } else if (
          lowerApproach.includes("loop") ||
          lowerApproach.includes("iterate")
        ) {
          return {
            correct: false,
            response:
              "Good start! You're thinking about iteration. Can you optimize this? Think about what data structure could help you avoid nested loops and achieve O(n) time complexity.",
          };
        }
      } else if (questionTitle.includes("valid parentheses")) {
        if (lowerApproach.includes("stack")) {
          return {
            correct: true,
            response:
              "Perfect! Stack is indeed the right data structure for this problem. You understand the LIFO principle. Ready to code!",
          };
        }
      } else if (
        lowerApproach.includes("sort") ||
        lowerApproach.includes("merge")
      ) {
        return {
          correct: true,
          response:
            "Great thinking! Your approach shows good understanding of the problem. Let's implement it!",
        };
      }

      // Default responses
      if (approach.length < 20) {
        return {
          correct: false,
          response:
            "I need more details about your approach. Can you explain your strategy step by step? What data structures or algorithms are you considering?",
        };
      }

      return {
        correct: true,
        response:
          "Interesting approach! I can see you've thought about this. Let's see how you implement it in code.",
      };
    },
    [currentQuestion.title]
  );

  const toggleListening = useCallback(() => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmitApproach = useCallback(() => {
    if (!userApproach.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: userApproach,
      timestamp: new Date(),
    };

    const analysis = analyzeApproach(userApproach);

    // Add Geeta's response
    const geetaMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "geeta",
      content: analysis.response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, geetaMessage]);

    if (analysis.correct) {
      setEditorUnlocked(true);
    }

    setUserApproach("");
  }, [userApproach, analyzeApproach]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Question and AI Assistant */}
          <div className="space-y-4">
            {/* Question Display */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {currentQuestion.title}
                  </CardTitle>
                  <Badge
                    className={getDifficultyColor(currentQuestion.difficulty)}
                  >
                    {currentQuestion.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {currentQuestion.description}
                </p>
              </CardContent>
            </Card>

            {/* AI Assistant Chat */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Geeta - AI Instructor
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3",
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] p-3 rounded-lg",
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-900"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            {message.sender === "user" ? "You" : "Geeta"}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Timer, Input, and Code Editor */}
          <div className="space-y-4">
            {/* Timer */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6 text-red-600" />
                  <span className="text-3xl font-mono font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Time remaining
                </p>
              </CardContent>
            </Card>

            {/* Approach Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Approach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe your approach to solve this problem..."
                  value={userApproach}
                  onChange={(e) => setUserApproach(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleListening}
                    disabled={!recognition}
                  >
                    {isListening ? (
                      <MicOff className="w-4 h-4" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                    {isListening ? "Stop" : "Voice"}
                  </Button>
                  <Button
                    onClick={handleSubmitApproach}
                    disabled={!userApproach.trim()}
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Approach
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className={cn("flex-1", !editorUnlocked && "opacity-50")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code Editor
                  {!editorUnlocked && <Badge variant="secondary">Locked</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editorUnlocked ? (
                  <>
                    <Textarea
                      placeholder="// Write your code here..."
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[300px] font-mono text-sm resize-none bg-gray-900 text-green-400 border-gray-700"
                    />
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={() => {
                          setIsSubmitted(true);
                          // Simulate code execution (replace with actual API call)
                          alert(
                            "Code submitted!\nResult will be evaluated by Geeta."
                          );
                        }}
                        disabled={isSubmitted || !code.trim()}
                      >
                        {isSubmitted ? "Submitted ✅" : "Run Code"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="min-h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">Code Editor Locked</p>
                      <p className="text-sm">
                        Submit your approach or wait for timer to unlock
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
