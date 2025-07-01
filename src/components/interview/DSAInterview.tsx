import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Send, Clock, Code, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInterviewTimer } from "../../Context/InterviewTimerContext";
import InterviewHeader from "./interviewHeader";

// Check if browser is Firefox
const isFirefox =
  typeof window !== "undefined" &&
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

// Memoized demo questions
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
  const currentQuestion = useMemo(() => {
    return DEMO_QUESTIONS[Math.floor(Math.random() * DEMO_QUESTIONS.length)];
  }, []);
  const { timeLeft, setRunCodeCallback } = useInterviewTimer();

  const [userApproach, setUserApproach] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "geeta",
      content: `Hi, I'm Geeta, your instructor. Your question is: ${currentQuestion.title}\n\n${currentQuestion.description}\n\nDifficulty: ${currentQuestion.difficulty}\n\nPlease describe your approach to solve this problem.`,
      timestamp: new Date(),
    },
  ]);
  const [editorUnlocked, setEditorUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [listening, setListening] = useState(false);
  const [browserSupport, setBrowserSupport] = useState({
    speechRecognition: false,
    microphone: false,
  });

  // Initialize speech recognition
  useEffect(() => {
    const checkSupport = async () => {
      try {
        // Check for microphone access
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        // Check for speech recognition support
        const speechSupport =
          "webkitSpeechRecognition" in window || "SpeechRecognition" in window;

        setBrowserSupport({
          speechRecognition: speechSupport,
          microphone: true,
        });
      } catch (err) {
        console.error("Microphone access denied:", err);
        setBrowserSupport((prev) => ({ ...prev, microphone: false }));
      }
    };

    checkSupport();
  }, []);

  // Speech recognition implementation
  useEffect(() => {
    if (!listening || !browserSupport.speechRecognition) return;

    let recognition: any;
    if ("webkitSpeechRecognition" in window) {
      recognition = new (window as any).webkitSpeechRecognition();
    } else if ("SpeechRecognition" in window) {
      recognition = new (window as any).SpeechRecognition();
    } else {
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setUserApproach((prev) => prev + finalTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    recognition.start();

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [listening, browserSupport.speechRecognition]);

  const toggleListening = useCallback(() => {
    if (!browserSupport.speechRecognition || !browserSupport.microphone) {
      alert(
        browserSupport.microphone
          ? "Speech recognition is not supported in your browser. Try Chrome or Edge."
          : "Microphone access is required for voice input. Please enable microphone permissions."
      );
      return;
    }
    setListening((prev) => !prev);
  }, [browserSupport]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, []);

const getDifficultyColor = useCallback((difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-800 text-green-100";
    case "medium":
      return "bg-yellow-800 text-yellow-100";
    case "hard":
      return "bg-red-800 text-red-100";
    default:
      return "bg-gray-700 text-gray-100";
  }
}, []);


  useEffect(() => {
    const autoSubmit = () => {
      if (!editorUnlocked || isSubmitted) return;
      setIsSubmitted(true);
      alert("Time's up! Code submitted automatically.");
    };
    setRunCodeCallback(() => autoSubmit);
  }, [editorUnlocked, isSubmitted, setRunCodeCallback]);

  const analyzeApproach = useCallback(
    (approach: string) => {
      const lowerApproach = approach.toLowerCase();
      const questionTitle = currentQuestion.title.toLowerCase();

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

  const handleSubmitApproach = useCallback(() => {
    if (!userApproach.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: userApproach,
      timestamp: new Date(),
    };

    const analysis = analyzeApproach(userApproach);

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
    setListening(false);
  }, [userApproach, analyzeApproach]);

  return (
    <>
      <InterviewHeader />
      <div className="h-[calc(100vh-64px)] bg-black text-white">
        <div className="h-full mx-auto p-4 ">
          <div className="h-full grid lg:grid-cols-2 gap-6">
            {/* Left Side - AI Assistant Chat */}
            <div className="h-full flex flex-col">
              <Card className="flex-1 flex flex-col bg-zinc-900 text-white border-zinc-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    Geeta - AI Instructor
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
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
                              ? "bg-blue-800 text-white"
                              : "bg-gray-800 text-gray-100"
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
                            {message.sender === "geeta" &&
                              message.id === "1" && (
                                <Badge
                                  className={cn(
                                    "ml-2",
                                    getDifficultyColor(
                                      currentQuestion.difficulty
                                    )
                                  )}
                                >
                                  {currentQuestion.difficulty}
                                </Badge>
                              )}
                          </div>
                          <p className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Input Area */}
            <div className="h-full flex flex-col">
              {!editorUnlocked ? (
                // Approach Input
                <Card className="flex-1 flex flex-col bg-zinc-900 text-white border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Your Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <Textarea
                      placeholder="Describe your approach to solve this problem..."
                      value={userApproach}
                      onChange={(e) => setUserApproach(e.target.value)}
                      className="flex-1 min-h-[120px] resize-none bg-zinc-900 text-white border-zinc-700"
                    />
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant={listening ? "destructive" : "secondary"}
                        size="sm"
                        onClick={toggleListening}
                        disabled={
                          !browserSupport.speechRecognition ||
                          !browserSupport.microphone
                        }
                      >
                        {listening ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                        {listening ? "Stop" : "Voice"}
                        {isFirefox && (
                          <span className="ml-1 text-xs">
                            (Chrome recommended)
                          </span>
                        )}
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
                    {(!browserSupport.speechRecognition ||
                      !browserSupport.microphone) && (
                      <div className="mt-2 text-sm text-red-400">
                        {!browserSupport.microphone
                          ? "Microphone access is required for voice input. Please enable microphone permissions."
                          : "Speech recognition is not fully supported in your browser. For best results, use Chrome or Edge."}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                // Code Editor
                <Card className="flex-1 flex flex-col bg-zinc-900 text-white border-zinc-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Code Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <Textarea
                      placeholder="// Write your code here..."
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="flex-1 min-h-[300px] font-mono text-sm resize-none bg-gray-900 text-green-400 border-gray-700"
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(timeLeft)} remaining</span>
                      </div>
                      <Button
                        onClick={() => {
                          setIsSubmitted(true);
                          alert(
                            "Code submitted!\nResult will be evaluated by Geeta."
                          );
                        }}
                        disabled={isSubmitted || !code.trim()}
                      >
                        {isSubmitted ? "Submitted ✅" : "Run Code"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
