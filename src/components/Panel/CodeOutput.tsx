import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  CheckCircleIcon,
  CircleIcon,
  XCircleIcon,
  Loader2Icon,
  PlusIcon,
  PlayIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import {
  selectCodeExecutionOutput,
  selectIsError,
  selectIsRunning,
  selectIsSuccess,
} from "@/Container/reducer/slicers/CodingSlicer";

// Types
interface TestCase {
  id: number;
  name: string;
  input: string;
  expected: string;
}

interface CodeOutputProps {
  checkpoint?: string;
  className?: string;
  onRunTestCases?: (testCases: TestCase[]) => void;
}

// Constants
const DEFAULT_TEST_CASE: Omit<TestCase, "id"> = {
  name: "Test Case 1",
  input: "",
  expected: "",
};

const MIN_TEST_CASES = 1;
const MAX_TEST_CASES = 10;

const CodeOutput: React.FC<CodeOutputProps> = ({
  className,
  onRunTestCases,
}) => {
  // Redux selectors
  const hasError = useSelector(selectIsError);
  const isRunning = useSelector(selectIsRunning);
  const isSuccess = useSelector(selectIsSuccess);
  const executionOutput = useSelector(selectCodeExecutionOutput);

  // Refs
  const instructionsScrollRef = useRef<HTMLDivElement>(null);

  // State
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 0,
      ...DEFAULT_TEST_CASE,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<number>(0);
  const [newTestCaseName, setNewTestCaseName] = useState<string>("");

  // Auto-scroll to top when error occurs
  useEffect(() => {
    if (hasError && instructionsScrollRef.current) {
      instructionsScrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [hasError]);

  // Handlers
  const handleAddTestCase = useCallback(() => {
    if (testCases.length >= MAX_TEST_CASES) {
      console.warn(`Maximum of ${MAX_TEST_CASES} test cases allowed`);
      return;
    }

    const trimmedName = newTestCaseName.trim();
    const testCaseName = trimmedName || `Test Case ${testCases.length + 1}`;

    const newTestCase: TestCase = {
      id: Date.now(), // Using timestamp for unique IDs
      name: testCaseName,
      input: "",
      expected: "",
    };

    setTestCases((prevTestCases) => [...prevTestCases, newTestCase]);
    setActiveTabId(newTestCase.id);
    setNewTestCaseName("");
  }, [newTestCaseName, testCases.length]);

  const handleRemoveTestCase = useCallback(
    (testCaseId: number) => {
      if (testCases.length <= MIN_TEST_CASES) {
        console.warn(`Minimum of ${MIN_TEST_CASES} test case required`);
        return;
      }

      setTestCases((prevTestCases) => {
        const filteredTestCases = prevTestCases.filter(
          (tc) => tc.id !== testCaseId
        );

        // Update active tab if the removed tab was active
        if (activeTabId === testCaseId) {
          const newActiveTab = filteredTestCases[filteredTestCases.length - 1];
          setActiveTabId(newActiveTab.id);
        }

        return filteredTestCases;
      });
    },
    [testCases.length, activeTabId]
  );

  const handleUpdateTestCase = useCallback(
    (testCaseId: number, field: keyof Omit<TestCase, "id">, value: string) => {
      setTestCases((prevTestCases) =>
        prevTestCases.map((tc) =>
          tc.id === testCaseId ? { ...tc, [field]: value } : tc
        )
      );
    },
    []
  );

  const handleTabSelect = useCallback((testCaseId: number) => {
    setActiveTabId(testCaseId);
  }, []);

  const handleRunTestCases = useCallback(() => {
    if (onRunTestCases) {
      onRunTestCases(testCases);
    }
  }, [testCases, onRunTestCases]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        handleRunTestCases();
      }
    },
    [handleRunTestCases]
  );

  // Render helpers
  const renderTabHeader = (testCase: TestCase, index: number) => (
    <div
      key={testCase.id}
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 rounded-t-md border-b-2",
        activeTabId === testCase.id
          ? "border-blue-500 text-white bg-white/10"
          : "border-transparent text-white/70 hover:text-white hover:bg-white/5"
      )}
      onClick={() => handleTabSelect(testCase.id)}
      role="tab"
      aria-selected={activeTabId === testCase.id}
      aria-controls={`testcase-panel-${testCase.id}`}
      tabIndex={activeTabId === testCase.id ? 0 : -1}
    >
      <span className="truncate max-w-24">{testCase.name}</span>
      {testCases.length > MIN_TEST_CASES && (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveTestCase(testCase.id);
          }}
          className="p-1 h-auto w-auto hover:bg-red-500/20 rounded-full"
          aria-label={`Remove ${testCase.name}`}
        >
          <X className="h-3 w-3 text-red-300" />
        </Button>
      )}
    </div>
  );

  const renderTestCasePanel = (testCase: TestCase) => (
    <div
      key={testCase.id}
      id={`testcase-panel-${testCase.id}`}
      className={cn("space-y-4", activeTabId !== testCase.id && "hidden")}
      role="tabpanel"
      aria-labelledby={`tab-${testCase.id}`}
    >
      <div className="space-y-2">
        <label
          htmlFor={`input-${testCase.id}`}
          className="block text-sm font-medium text-white"
        >
          Test Input
        </label>
        <textarea
          id={`input-${testCase.id}`}
          value={testCase.input}
          onChange={(e) =>
            handleUpdateTestCase(testCase.id, "input", e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="w-full p-3 text-sm text-white bg-black border border-white/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Example: 10 20 30 40 60"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor={`expected-${testCase.id}`}
          className="block text-sm font-medium text-white"
        >
          Expected Output
        </label>
        <textarea
          id={`expected-${testCase.id}`}
          value={testCase.expected}
          onChange={(e) =>
            handleUpdateTestCase(testCase.id, "expected", e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="w-full p-3 text-sm text-white bg-black border border-white/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter expected output..."
          rows={4}
        />
      </div>
    </div>
  );

  return (
    <div className={cn("flex flex-col h-full bg-black", className)}>
      {/* Test Cases Panel */}
      <div className="flex-1 p-4 space-y-4">
        {/* Tab Navigation */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Test cases"
        >
          {testCases.map(renderTabHeader)}

          {/* <Button
            variant="ghost"
            size="sm"
            onClick={handleAddTestCase}
            disabled={testCases.length >= MAX_TEST_CASES}
            className="flex-shrink-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Add new test case"
          >
            <PlusIcon className="h-4 w-4 text-white" />
          </Button> */}
        </div>

        {/* Test Case Name Input */}

        {/* Tab Content */}
        <div className="flex-1">{testCases.map(renderTestCasePanel)}</div>

        {/* Run Test Cases Button */}
      </div>
    </div>
  );
};

export default CodeOutput;
