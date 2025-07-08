import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book, Target, Award, Clock, Play } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Description from "@/components/Panel/Description";
import PanelEditor from "@/components/Panel/Editor";
import CodeOutput from "@/components/Panel/CodeOutput";
import { useDispatch, useSelector } from "react-redux";
import { selectCourseLoading } from "@/Container/reducer/slicers/coursesSlicer";
import {
  executionSucceeded,
  fetchCurrentQuestion,
  selectCodingState,
  selectCurrentQuestion,
  selectIsRunning,
  updateNewSubmission,
} from "@/Container/reducer/slicers/CodingSlicer";
import _ApiServices from "@/Services/apiServices";
import { SubmissionsPanel } from "@/components/Problem/SubmissionPanel";
import { DiscussionPanel } from "@/components/Problem/DiscussPanel";
import ApproachSection, { IApproach } from "@/components/Problem/Approach";
import PanelHeader from "@/components/dashboard/Pannelheader";
import { AppDispatch } from "@/Container/reducer/store";

type TabItem = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type SolutionType = {
  language: string;
  code: string;
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

const TABS: TabItem[] = [
  { id: "problem", label: "Problem", icon: Book },
  { id: "approach", label: "Approach", icon: Target },
  { id: "submissions", label: "Submission", icon: Award },
  { id: "discussion", label: "Support", icon: Clock },
];

const languages = ["javascript", "java", "cpp", "c", "python"];

export default function CodingPanelPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const dispatch = useDispatch<AppDispatch>();
  const [running, setRunning] = useState<boolean>(false);
  const isLoading = useSelector(selectCourseLoading);
  const [submited, setSubmited] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { currentQuestion } = useSelector(selectCodingState);
  const [sampleCase, setSampleCase] = useState();

  useEffect(() => {
    dispatch(fetchCurrentQuestion(slug as string));
  }, [slug]);

  const [code, setCode] = useState<SolutionType>({
    language: "python",
    code: "",
  });

  const [activeTab, setActiveTab] = useState<string>("problem");
  const [hasOutput, setHasOutput] = useState(false);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSubmited(false);
  };

  useEffect(() => {
    if (currentQuestion) {
      const currentCode = currentQuestion.starterCode.find(
        (state) =>
          state.language.toLowerCase() == selectedLanguage.toLowerCase()
      );
      if (currentCode) {
        setCode(currentCode);
      } else {
        setCode({
          language: "python",
          code: "",
        });
      }
    }
  }, [currentQuestion, selectedLanguage]);

  const _runCode = async () => {
    if (!currentQuestion || !code?.language || !code?.code) {
      console.error("Missing required data: question, language, or code.");
      return;
    }

    const getPreCode = currentQuestion.preCode.find(
      (state) => state.language.toLowerCase() === code.language.toLowerCase()
    );

    if (!getPreCode?.code) {
      console.error(`Pre-code not found for language: ${code.language}`);
      return;
    }

    const finalProgram = `${code.code}\n${getPreCode.code}`;

    const data = {
      slug: currentQuestion.slug,
      program: finalProgram,
      sampleCase: [],
      userCode: code.code,
      language: code.language.toLowerCase(),
    };
    setRunning(true);

    try {
      const response: any = await new _ApiServices(
        "/code/execute",
        data
      )._handlePostRequest();
      setActiveTab("submissions");
      setSubmited(true);
      dispatch(updateNewSubmission(response.submited));
      dispatch(
        executionSucceeded({
          results: response.result.results,
          aihint: response.aiFeedback,
        })
      );
    } catch (err) {
      console.error("Code execution failed:", err);
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, [slug]);

  const renderDescriptionPanel = () => {
    switch (activeTab) {
      case "problem":
        return (
          <Description
            title={currentQuestion?.title as string}
            hints={currentQuestion?.hints}
            companies={currentQuestion?.companies}
            content={currentQuestion?.problemStatement as string}
          />
        );
      case "approach":
        return <ApproachSection approach={currentQuestion?.approach as any} />;
      case "submissions":
        return <SubmissionsPanel submited={submited} />;
      case "discussion":
        return <DiscussionPanel />;
      default:
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
          maxSize={70}
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

        <ResizableHandle className="bg-white/20" />

        {/* Right Panel - Editor and Output */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            {/* Editor Panel */}
            <ResizablePanel
              defaultSize={hasOutput ? 40 : 85}
              minSize={35}
              maxSize={hasOutput ? 90 : 92}
            >
              <PanelEditor
                content={{ type: "problem" }}
                language="javascript"
                run={_runCode}
                code={code}
                onCodeChange={(newCode) =>
                  setCode({ ...code, code: newCode.code })
                }
              >
                <div className="flex items-center space-x-4">
                  <select
                    className="bg-black text-xs text-white px-3 py-1.5 rounded-md border border-white/70 focus:outline-none"
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    defaultValue={languages[0]}
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                {running ? (
                  <button
                    className="py-2 px-3 text-xs text-white bg-blue-600 flex items-center hover:text-yellow-400 rounded hover:bg-gray-800 transition-colors"
                    title="Reset Editor"
                  >
                    <span className="ml-1">Running...</span>{" "}
                  </button>
                ) : (
                  <button
                    onClick={_runCode}
                    className="py-2 px-3 text-xs text-white bg-blue-600 flex items-center hover:text-yellow-400 rounded hover:bg-gray-800 transition-colors"
                    title="Reset Editor"
                  >
                    <Play size={18} /> <span className="ml-1">Run</span>
                  </button>
                )}
              </PanelEditor>
            </ResizablePanel>

            <ResizableHandle className="bg-white/20" withHandle />

            {/* Output Panel */}
            <ResizablePanel
              // defaultSize={hasOutput ? 40 : 15}
              minSize={hasOutput ? 15 : 8}
              maxSize={hasOutput ? 90 : 90}
              collapsible={!hasOutput}
              collapsedSize={8}
            >
              <CodeOutput
                className="h-full"
                // output={output}
                // testResults={testResults}
                // error={executionError}
                // onClearOutput={handleClearOutput}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };

  if (isLoading) return <h1>Loading...</h1>;
  // if (currentSection?.isLocked)
  // return <p>This content is for paid users only</p>;

  return (
    <div className="h-screen bg-black flex flex-col">
      <PanelHeader />
      <div className="flex-1 overflow-hidden">{renderMainContent()}</div>
    </div>
  );
}
