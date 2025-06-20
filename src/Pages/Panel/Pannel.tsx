import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Loader2,
  ArrowUpToLine,
  Book,
  Target,
  Award,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import PanelHeader from "@/components/Panel/PannelHeader";
import Description from "@/components/Panel/Description";
import PanelEditor from "@/components/Panel/Editor";
import { ILessonContent } from "@/types/types";
import CodeOutput from "@/components/Panel/CodeOutput";
import { useSelector } from "react-redux";
import {
  selectCourseLoading,
  selectSelectedCourse,
} from "@/Container/reducer/slicers/coursesSlicer";
import { setHints } from "@/Container/reducer/slicers/CodingSlicer";
import _ApiServices from "@/Services/apiServices";
import { lesson } from "@/data/DataStore";
import TestResults from "@/components/Panel/TestResults";
import { FaPlay } from "react-icons/fa";
import { SubmissionsPanel } from "@/components/Problem/SubmissionPanel";
import { DiscussionPanel } from "@/components/Problem/DiscussPanel";
import ApproachSection from "@/components/Problem/Approach";

// Define layout types
type LayoutType =
  | "vertical-split"
  | "three-panel"
  | "four-panel"
  | "editor-focused"
  | "output-focused";

type SolutionType = {
  language: string;
  solution: string;
};

type TestCaseResult = {
  input: string;
  expected: string;
  output: string;
  passed: boolean;
};

type SubmissionState = {
  isRunning: boolean;
  results: TestCaseResult[];
  executionTime: number;
  memoryUsage: number;
  error?: string;
};
interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: "problem", label: "Problem", icon: Book },
  { id: "approach", label: "Approach", icon: Target },
  { id: "submissions", label: "Submission", icon: Award },
  { id: "discussion", label: "Support", icon: Clock },
];

export default function CodingPanelPage() {
  const isLoading = useSelector(selectCourseLoading);
  const { sectionid, courseid } = useParams<{
    sectionid: string;
    courseid: string;
  }>();
  const currentSection = useSelector(selectSelectedCourse(sectionid as string));
  const [currentCheckpoint, setCurrentCheckpoint] = useState<number>(0);
  const [content, setContent] = useState<any>(lesson);
  const [code, setCode] = useState<SolutionType>({
    language: "python",
    solution: "",
  });
  const [submission, setSubmission] = useState<SubmissionState>({
    isRunning: false,
    results: [],
    executionTime: 0,
    memoryUsage: 0,
  });
  const [activeTab, setActiveTab] = useState<string>("problem");

  const currentCheckpointData = content?.checkPoints?.[currentCheckpoint];
  const [showDoubtPanel, setShowDoubtPanel] = useState(false);

  useEffect(() => {
    if (currentCheckpointData) {
      setHints({ hints: currentCheckpointData.hints || [] });
    }
  }, [currentCheckpointData]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const runCode = async () => {
    setSubmission({
      isRunning: true,
      results: [],
      executionTime: 0,
      memoryUsage: 0,
    });
    setActiveTab("submissions");

    // Simulate running code and getting test case results
    setTimeout(() => {
      const testCases = [
        {
          input: "[1,2,3,4,5]",
          expected: "15",
          output: "15",
          passed: true,
        },
        {
          input: "[10,20,30]",
          expected: "60",
          output: "60",
          passed: true,
        },
        {
          input: "[-1,0,1]",
          expected: "0",
          output: "0",
          passed: true,
        },
        {
          input: "[]",
          expected: "0",
          output: "0",
          passed: true,
        },
      ];

      setSubmission({
        isRunning: false,
        results: testCases,
        executionTime: 45, // ms
        memoryUsage: 12.4, // MB
      });
    }, 1500);
  };

  useEffect(() => {
    if (content) {
      setCode({
        language: content.programmingLanguage,
        solution: content.preCode,
      });
    }
  }, [content]);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, [courseid, sectionid]);

  const renderDescriptionPanel = () => {
    if (activeTab === "problem") {
      return (
        <Description
          content={content?.content as ILessonContent}
          // duration={content?.duration ?? 0}
        ></Description>
      );
    }
    //  else if (activeTab === "approach") {
    //   return (
    //     <div className="h-full overflow-auto p-4 bg-black text-gray-100">
    //       {submission.isRunning ? (
    //         <div className="flex flex-col items-center justify-center h-full">
    //           <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
    //           <p className="text-lg font-medium">Running your code...</p>
    //           <p className="text-sm text-gray-400 mt-2">
    //             This may take a few seconds
    //           </p>
    //         </div>
    //       ) : (
    //         <TestResults />
    //       )}
    //     </div>
    //   );
    // }
    else if (activeTab === "approach") {
      return <ApproachSection />;
    } else if (activeTab === "submissions") {
      return <SubmissionsPanel />;
    } else if (activeTab === "discussion") {
      return <DiscussionPanel />;
    } else {
      // Fallback for unknown tabs
      return (
        <div className="h-full flex items-center justify-center p-4 bg-gray-50 text-gray-500">
          <p>Tab content not found</p>
        </div>
      );
    }
  };

  const renderMainContent = () => {
    return (
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Panel - Description/Submissions */}
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          className="border-r border-gray-700"
        >
          <div className="flex flex-col h-full">
            <header className="sticky top-0 z-20 backdrop-blur-xl bg-black px-4 border-b border-gray-800">
              <div className="flex h-10 items-center">
                <nav className="flex items-center space-x-1" role="tablist">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => handleTabClick(tab.id)}
                        className={`
                          group flex items-center px-4 py-[8px] text-sm font-medium
                          transition-all duration-200 ease-in-out text-gray-400 hover:text-white hover:bg-gray-800/60
                          relative
                          ${isActive ? "text-white" : ""}
                        `}
                      >
                        {isActive && (
                          <div className="w-full h-[0.5px] bg-yellow-400 absolute bottom-0 left-0"></div>
                        )}
                        {Icon && (
                          <Icon
                            className={`w-4 h-4 mr-2 transition-transform duration-200 ${
                              isActive ? "scale-110" : "group-hover:scale-105"
                            }`}
                          />
                        )}
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </header>
            <div className="flex-1 overflow-hidden">
              {renderDescriptionPanel()}
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        {/* Right Panel - Editor and Output */}
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            {/* Editor Panel */}
            <ResizablePanel defaultSize={91} minSize={40}>
              <PanelEditor
                content={{ type: "problem" }}
                language="javascript"
                run={runCode}
                code={code}
                onCodeChange={setCode}
              />
            </ResizablePanel>
            <ResizableHandle />
            {/* Output Panel */}
            <ResizablePanel defaultSize={9} minSize={8}>
              <CodeOutput
                checkpoint={currentCheckpointData?.instruction}
                className="h-full"
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };

  // Main component return
  if (isLoading) return <h1>Loading...</h1>;
  if (currentSection?.isLocked)
    return <p>This content is for paid users only</p>;

  return (
    <div className="h-screen bg-black flex flex-col">
      <PanelHeader>
        <div className="flex items-center space-x-0">
          <button
            onClick={() => setShowDoubtPanel(true)}
            className="flex items-center px-4 h-9 bg-[#212121] mx-[1px] text-sm font-medium text-yellow-100 transition-all shadow-sm hover:bg-[#313131]"
          >
            <FaPlay color="rgba(255, 255, 255, 0.8)" size={14} />
          </button>
          <button
            onClick={() => setShowDoubtPanel(true)}
            className="flex items-center px-4 h-9 bg-[#212121] rounded-r-md text-sm font-medium text-green-400 transition-all shadow-sm hover:bg-[#313131]"
          >
            <ArrowUpToLine className="text-green-400 mr-1" size={14} />
            <span>Submit</span>
          </button>
        </div>
      </PanelHeader>
      <div className="flex-1 overflow-hidden">{renderMainContent()}</div>
    </div>
  );
}
