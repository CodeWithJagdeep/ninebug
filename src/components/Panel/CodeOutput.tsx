import {
  CheckCircleIcon,
  CircleIcon,
  XCircleIcon,
  Loader2Icon,
  PlusIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import {
  selectCodeExecutionOutput,
  selectIsError,
  selectIsRunning,
  selectIsSuccess,
} from "@/Container/reducer/slicers/CodingSlicer";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeOutputProps {
  checkpoint?: string;
  className?: string;
  onRunTestCases?: (testCases: TestCase[]) => void;
}

interface TestCase {
  id: string;
  name: string;
  input: string;
  expected: string;
}

const CodeOutput = ({
  checkpoint,
  className,
  onRunTestCases,
}: CodeOutputProps) => {
  const isRunning = useSelector(selectIsRunning);
  const hasError = useSelector(selectIsError);
  const output = useSelector(selectCodeExecutionOutput);
  const hasSuccess = useSelector(selectIsSuccess);
  const instructionsScrollRef = useRef(null);

  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: "1",
      name: "Test Case 1",
      input: "Sample input 1",
      expected: "Expected output 1",
    },
    {
      id: "2",
      name: "Test Case 2",
      input: "Sample input 2",
      expected: "Expected output 2",
    },
  ]);
  const [activeTab, setActiveTab] = useState("1");
  const [newTestCaseName, setNewTestCaseName] = useState("");

  // Auto-scroll to top of instructions when error occurs
  useEffect(() => {
    if (hasError && instructionsScrollRef.current) {
      instructionsScrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [hasError]);

  const parseOutput = (output: string) => {
    if (!output) return null;
    return output.split("\n").map((line, i) => {
      const isErrorLine = line.startsWith("Error") || line.startsWith("error");
      return (
        <p
          key={i}
          className={cn(
            "text-sm",
            isErrorLine ? "text-red-500" : "text-foreground"
          )}
        >
          {line}
        </p>
      );
    });
  };

  const addTestCase = () => {
    if (newTestCaseName.trim()) {
      const newId = Date.now().toString();
      const newTestCase = {
        id: newId,
        name: newTestCaseName,
        input: "",
        expected: "",
      };
      setTestCases([...testCases, newTestCase]);
      setActiveTab(newId);
      setNewTestCaseName("");
    }
  };

  const removeTestCase = (id: string) => {
    const newTestCases = testCases.filter((testCase) => testCase.id !== id);
    setTestCases(newTestCases);
    if (activeTab === id && newTestCases.length > 0) {
      setActiveTab(newTestCases[0].id);
    } else if (newTestCases.length === 0) {
      setActiveTab("");
    }
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setTestCases(
      testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc))
    );
  };

  const runTestCases = () => {
    if (onRunTestCases) {
      onRunTestCases(testCases);
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Test Cases Panel */}
      <div className="border-b p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Test Cases</h3>
          <div className="flex gap-2">
            <Input
              value={newTestCaseName}
              onChange={(e) => setNewTestCaseName(e.target.value)}
              placeholder="New test case name"
              className="w-40"
            />
            <Button variant="outline" onClick={addTestCase}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Test
            </Button>
            <Button
              onClick={runTestCases}
              disabled={isRunning || testCases.length === 0}
            >
              <PlayIcon className="h-4 w-4 mr-2" />
              Run All Tests
            </Button>
          </div>
        </div>

        {testCases.length > 0 ? (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              {testCases.map((testCase) => (
                <TabsTrigger
                  key={testCase.id}
                  value={testCase.id}
                  className="flex items-center gap-2"
                >
                  {testCase.name}
                  <Button
                    variant="ghost"
                    size="iconSm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTestCase(testCase.id);
                    }}
                    className="h-4 w-4 rounded-full hover:bg-red-100"
                  >
                    <Trash2Icon className="h-3 w-3 text-red-500" />
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>
            {testCases.map((testCase) => (
              <TabsContent
                key={testCase.id}
                value={testCase.id}
                className="pt-4"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Input
                    </label>
                    <Input
                      value={testCase.input}
                      onChange={(e) =>
                        updateTestCase(testCase.id, "input", e.target.value)
                      }
                      placeholder="Enter test input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expected Output
                    </label>
                    <Input
                      value={testCase.expected}
                      onChange={(e) =>
                        updateTestCase(testCase.id, "expected", e.target.value)
                      }
                      placeholder="Enter expected output"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => onRunTestCases?.([testCase])}
                      disabled={isRunning}
                      size="sm"
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Run This Test
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No test cases added yet</p>
            <p className="text-sm">Add a test case to get started</p>
          </div>
        )}
      </div>

      {/* Output Panel */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="border-b p-2 px-4 flex justify-between items-center">
            <h3 className="font-semibold">Code Output</h3>
            {isRunning && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                Executing...
              </div>
            )}
          </div>
          <ScrollArea className="flex-1 p-4">
            {isRunning ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2Icon className="h-8 w-8 mr-2 animate-spin" />
                Running your code...
              </div>
            ) : output ? (
              <div className="space-y-1">{parseOutput(output)}</div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <div className="mb-2">
                  <CircleIcon className="h-12 w-12" />
                </div>
                <p className="font-medium">No output yet</p>
                <p className="text-sm">Run your code to see the results here</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Instructions Panel */}
      <div className="border-t flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="border-b p-2 px-4">
            <h3 className="font-semibold">Challenge Instructions</h3>
          </div>
          <ScrollArea ref={instructionsScrollRef} className="flex-1 p-4">
            {checkpoint ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {isRunning ? (
                    <Loader2Icon className="h-5 w-5 mt-0.5 animate-spin text-yellow-500" />
                  ) : hasError ? (
                    <XCircleIcon className="h-5 w-5 mt-0.5 text-red-500" />
                  ) : hasSuccess ? (
                    <CheckCircleIcon className="h-5 w-5 mt-0.5 text-green-500" />
                  ) : (
                    <CircleIcon className="h-5 w-5 mt-0.5 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium">{checkpoint}</p>
                    <p className="text-sm text-muted-foreground">
                      {isRunning
                        ? "Executing..."
                        : hasError
                        ? "Failed to complete"
                        : hasSuccess
                        ? "Successfully completed"
                        : "Ready to execute"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No active challenge selected
              </p>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t p-2 px-4 flex justify-between items-center text-sm">
        <div className="flex items-center">
          {hasError ? (
            <>
              <XCircleIcon className="h-4 w-4 mr-2 text-red-500" />
              Challenge incomplete
            </>
          ) : hasSuccess ? (
            <>
              <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
              Challenge completed!
            </>
          ) : (
            <>
              <CircleIcon className="h-4 w-4 mr-2 text-gray-500" />
              Ready for code execution
            </>
          )}
        </div>
        {isRunning && (
          <div className="flex items-center text-muted-foreground">
            <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
            Processing
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeOutput;
