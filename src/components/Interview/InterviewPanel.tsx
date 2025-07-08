import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Jennie from "@/assets/jennie.jpg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/assets/logo4.png";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Send,
  Clock,
  Code,
  User,
  Bot,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PanelHeader from "../dashboard/Pannelheader";
import PanelEditor from "../Panel/Editor";
import { Editor } from "@monaco-editor/react";
import AILoading from "../common/AILoading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";

const isFirefox =
  typeof window !== "undefined" &&
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

type QuestionDifficulty = "Easy" | "Medium" | "Hard";

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: QuestionDifficulty;
  hints?: string[];
}

const DEMO_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    hints: [
      "A brute force solution with O(n²) time complexity is straightforward",
      "Can you use a hash map to reduce the time complexity to O(n)?",
      "Think about how to store values and their indices as you iterate",
    ],
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "Easy",
    hints: [
      "What data structure would help you match opening and closing brackets?",
      "Consider how a stack can help with the Last-In-First-Out principle",
      "Don't forget to handle edge cases like empty strings or single characters",
    ],
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.",
    difficulty: "Easy",
    hints: [
      "Think about how you would merge two sorted arrays first",
      "You can use a dummy node to simplify the merging process",
      "Consider which list node should come next at each step",
    ],
  },
  {
    id: 4,
    title: "Binary Tree Inorder Traversal",
    description:
      "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Medium",
    hints: [
      "Remember the order for inorder traversal: left, root, right",
      "Can you implement this both recursively and iteratively?",
      "For the iterative approach, a stack will be helpful",
    ],
  },
  {
    id: 5,
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    hints: [
      "The sliding window technique would be efficient here",
      "You can use a set or a hash map to track characters in the current window",
      "Think about how to adjust the window when you find a duplicate",
    ],
  },
];

interface Message {
  id: string;
  sender: "user" | "instructor";
  content: string;
  timestamp: Date;
  type?: "question" | "hint" | "feedback" | "instruction";
}

type InterviewPhase = "approach" | "coding" | "review" | "completed";

type SolutionType = {
  language: string;
  solution: string;
};

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

export default function InterviewPanel() {
  const currentQuestion = useMemo(() => {
    return DEMO_QUESTIONS[Math.floor(Math.random() * DEMO_QUESTIONS.length)];
  }, []);
  // Below your component state:
  const [approachText, setApproachText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [phase, setPhase] = useState<InterviewPhase>("approach");
  const [userApproach, setUserApproach] = useState("");
  const [score, setScore] = useState(0);
  const [code, setCode] = useState<SolutionType>({
    language: "python",
    solution: "",
  });
  const [hintUsed, setHintUsed] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [listening, setListening] = useState(false);
  const [browserSupport, setBrowserSupport] = useState({
    speechRecognition: false,
    microphone: false,
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "instructor",
      content: `Let's tackle this problem together:\n\n**${currentQuestion.title}**\n\n${currentQuestion.description}`,
      timestamp: new Date(),
      type: "question",
    },
    {
      id: "2",
      sender: "instructor",
      content: `First, think about how you would approach this problem. What data structures or algorithms come to mind? I'm here to guide you through the process.`,
      timestamp: new Date(),
      type: "instruction",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check browser support
  useEffect(() => {
    const checkSupport = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setBrowserSupport((prev) => ({ ...prev, microphone: true }));
      } catch (err) {
        console.error("Microphone access denied:", err);
        setBrowserSupport((prev) => ({ ...prev, microphone: false }));
      }

      const speechSupport =
        "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
      setBrowserSupport((prev) => ({
        ...prev,
        speechRecognition: speechSupport,
      }));
    };

    checkSupport();
  }, []);

  const toggleListening = () => {};

  const evaluateApproach = (approach: string) => {
    const lowerApproach = approach.toLowerCase();
    let feedback = "";
    let points = 0;
    let unlocksCoding = false;

    // Basic evaluation
    if (approach.length < 20) {
      feedback =
        "I need more details about your approach. Can you elaborate on your strategy?";
      points = 10;
    } else {
      points = 30;
      unlocksCoding = true;
      feedback = "Good start! Let's implement this approach in code.";

      // Problem-specific feedback
      if (currentQuestion.title.includes("Two Sum")) {
        if (lowerApproach.includes("hash") || lowerApproach.includes("map")) {
          points = 50;
          feedback =
            "Excellent! Using a hash map gives us O(n) time complexity. Let's code it!";
        } else if (
          lowerApproach.includes("loop") ||
          lowerApproach.includes("iterate")
        ) {
          points = 30;
          feedback =
            "Good start with iteration. Can we optimize beyond O(n²) time complexity?";
        }
      } else if (currentQuestion.title.includes("Valid Parentheses")) {
        if (lowerApproach.includes("stack")) {
          points = 50;
          feedback =
            "Perfect! A stack is ideal for matching parentheses. Ready to implement?";
        }
      }
    }

    setScore((prev) => prev + points);
    return { feedback, unlocksCoding };
  };

  const handleSubmitApproach = () => {
    if (!userApproach.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: userApproach,
      timestamp: new Date(),
    };

    const { feedback, unlocksCoding } = evaluateApproach(userApproach);
    const instructorMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "instructor",
      content: feedback,
      timestamp: new Date(),
      type: "feedback",
    };

    setMessages((prev) => [...prev, userMessage, instructorMessage]);
    setUserApproach("");

    if (unlocksCoding) {
      setPhase("coding");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: "instructor",
          content: `Now, let's implement your solution. I'll be here if you need guidance.\n\n**Problem:** ${currentQuestion.title}\n**Difficulty:** ${currentQuestion.difficulty}`,
          timestamp: new Date(),
          type: "instruction",
        },
      ]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: QuestionDifficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-100 text-emerald-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Hard":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* <PanelHeader /> */}
      <div className="h-16 border-b border-b-white/20 bg-white flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img src={Logo} alt="" className="h-8" />
          <div className="text-sm ml-4">
            <p className="font-medium text-black/90">Technical Interview</p>
            <p className="text-xs text-black/60">Live Session</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full",
              getDifficultyColor(currentQuestion.difficulty)
            )}
          >
            {currentQuestion.difficulty}
          </Badge>
          <div className="flex items-center gap-2 px-4 py-2 text-sm bg-black/20 rounded-full text-black">
            <Clock className="w-4 h-4 text-green-300" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col md:flex-row gap-1 overflow-hidden">
        {/* Instructor Panel - Left Side */}

        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className="flex flex-col bg-black shadow-lg"
          >
            <div className="flex-1 flex flex-col bg-black shadow-lg overflow-hidden">
              <div className="h-18 border-b border-b-white/20 flex items-center justify-between w-full">
                <div className="flex items-center w-full justify-between px-4 py-3 bg-black/10 rounded-lg  shadow-inner backdrop-blur-sm">
                  {/* Left: Avatar + Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={Jennie}
                        alt="Jennie"
                        className="w-10 h-10 rounded-full border border-white/10 shadow-md object-cover"
                      />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-black" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-white/90">Jennie</p>
                      <p className="text-xs text-white/60 tracking-wide">
                        Interview Instructor
                      </p>
                    </div>
                  </div>

                  {/* Right: Difficulty & Timer */}
                  <div className="flex items-center gap-3">
                    {/* <Badge
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full border-none",
                        getDifficultyColor(currentQuestion.difficulty)
                      )}
                    >
                      {currentQuestion.difficulty}
                    </Badge> */}
                    <div className="flex items-center gap-2 px-5 py-1.5 text-xs text-white">
                      <Clock className="w-4 h-4 text-green-300" />
                      <span>{formatTime(timeElapsed)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-end gap-2",
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    {message.sender === "instructor" && (
                      <img
                        src={Jennie}
                        alt="Instructor"
                        className="w-7 h-7 rounded-full border border-white/20"
                      />
                    )}

                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl p-4 relative",
                        message.sender === "user"
                          ? "bg-indigo-600 text-white"
                          : message.type === "hint"
                          ? "bg-amber-50 border border-amber-100 text-black"
                          : message.type === "feedback"
                          ? "bg-white/5 border border-emerald-100 text-white"
                          : "bg-white/5 border border-white/20 text-white/80"
                      )}
                    >
                      {/* Optional Label */}
                      {message.type === "hint" && (
                        <div className="text-xs text-amber-600 mb-1">Hint</div>
                      )}

                      {/* Message Content */}
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>

                      {/* Timestamp */}
                      <span className="absolute bottom-1 right-3 text-xs text-white/40">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {message.sender === "user" && (
                      <img
                        src="/user-avatar.jpg"
                        alt="You"
                        className="w-7 h-7 rounded-full border border-white/20"
                      />
                    )}
                  </div>
                ))}

                {/* Scroll Anchor */}
                <div ref={bottomRef} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="bg-transparent" />
          {/* Coding Panel - Right Side */}
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            className="flex flex-col bg-black shadow-2xl border-l border-slate-700/50"
          >
            <div className="flex-1 flex flex-col bg-black shadow-2xl overflow-hidden border border-slate-700/50 rounded-xl">
              {editorVisible ? (
                <>
                  <div className="h-18 border-b border-slate-700/50 bg-black">
                    <div className="flex items-center justify-between h-full px-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-300">
                              Language:
                            </label>
                            <select
                              value={code.language}
                              onChange={(e) =>
                                setCode((prev) => ({
                                  ...prev,
                                  language: e.target.value,
                                }))
                              }
                              className="bg-black border border-slate-600 text-white text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="javascript">JavaScript</option>
                              <option value="typescript">TypeScript</option>
                              <option value="python">Python</option>
                              <option value="java">Java</option>
                              <option value="cpp">C++</option>
                              <option value="csharp">C#</option>
                              <option value="go">Go</option>
                              <option value="rust">Rust</option>
                              <option value="php">PHP</option>
                              <option value="ruby">Ruby</option>
                              <option value="swift">Swift</option>
                              <option value="kotlin">Kotlin</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm bg-black border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                          View Approach
                        </div>
                        <div className="flex items-center gap-2 text-sm  text-black bg-[#f58b1d] border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          Submit
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden relative">
                    {isEvaluating && <AILoading />}

                    <Editor
                      height="100%"
                      language={code.language}
                      onChange={() => console.log("hi")}
                      value={`asdfasdfasdfnaksjnvasodv`}
                      theme="vs-dark"
                      options={{
                        automaticLayout: true,
                        fontSize: 14,
                        fontFamily:
                          "Fira Code, Menlo, Monaco, Consolas, monospace",
                        minimap: { enabled: true },
                        scrollBeyondLastLine: false,
                        renderWhitespace: "selection",
                        wordWrap: "on",
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        bracketPairColorization: {
                          enabled: true,
                          independentColorPoolPerBracketType: true,
                        },
                        guides: {
                          bracketPairs: true,
                          bracketPairsHorizontal: true,
                        },
                      }}
                      beforeMount={(monaco) => {
                        monaco.editor.defineTheme("black-theme", {
                          base: "vs-dark",
                          inherit: true,
                          rules: [],
                          colors: {
                            "editor.background": "#000000",
                            "editor.foreground": "#ffffff",
                            "editor.lineHighlightBackground": "#1a1a1a",
                            "editorCursor.foreground": "#ffffff",
                            "editor.selectionBackground": "#333333",
                            "editor.lineNumbers": "#666666",
                            "editorGutter.background": "#000000",
                            "editorIndentGuide.background": "#333333",
                            "editorIndentGuide.activeBackground": "#555555",
                          },
                        });
                      }}
                      onMount={(editor) => {
                        editor.updateOptions({ theme: "black-theme" });
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="bg-black h-full  space-y-0">
                  {/* Header with clear action buttons */}
                  <div className="flex items-center justify-between border-b border-b-white/20 h-18 px-6">
                    <h3 className="text-gray-100 text-base font-medium tracking-tight">
                      Describe Your Problem-Solving Approach
                    </h3>

                    <div className="flex items-center gap-3">
                      {/* Voice Input Toggle */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleListening}
                              className={cn(
                                "rounded-full transition-colors",
                                isListening
                                  ? "bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                  : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                              )}
                              aria-label={
                                isListening
                                  ? "Stop voice input"
                                  : "Start voice input"
                              }
                            >
                              {isListening ? (
                                <MicOff className="h-4 w-4" />
                              ) : (
                                <Mic className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isListening
                              ? "Stop voice input"
                              : "Start voice input"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmitApproach}
                        disabled={!approachText.trim()}
                        className="gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium shadow-lg"
                      >
                        <Send className="h-4 w-4" />
                        Submit Approach
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Markdown Editor */}
                  <div className="relative h-5/6">
                    <textarea
                      value={approachText}
                      onChange={(e) => setApproachText(e.target.value)}
                      placeholder="Write your approach in detail...\n\n• What data structures will you use?\n• What's the time complexity?\n• Any edge cases to consider?"
                      className={cn(
                        "w-full h-full border-none p-3  text-gray-100 outline-none rounded-none",
                        "placeholder:text-gray-400/60 ",
                        "resize-none font-mono text-base transition-all"
                      )}
                      rows={5}
                    />
                    {isListening && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        <span className="text-xs text-gray-400">
                          Listening...
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Formatting Help (optional) */}
                  <div className="flex items-center justify-between text-xs text-gray-500 px-6 border-t border-t-white/20 py-4">
                    <div className="flex items-center gap-2">
                      <span>Supports Markdown</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-3 w-3" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[300px]">
                            <p className="text-xs">
                              Use **bold**, *italic*, `code`, lists, and more.
                              Headers with #, ##. New lines with double space.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span>{approachText.length}/2000 characters</span>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
