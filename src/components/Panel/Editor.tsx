import { useEffect, useState } from "react";
import { TbReload } from "react-icons/tb";
import Editor from "@monaco-editor/react";
import { IoDocumentText } from "react-icons/io5";
import { FiCode, FiEye } from "react-icons/fi";
import { Play, SparklesIcon } from "lucide-react";
import { useSelector } from "react-redux";
import {
  selectHints,
  selectIsRunning,
} from "@/Container/reducer/slicers/CodingSlicer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type SolutionType = {
  language: string;
  solution: string;
};

type ContentType = {
  type?: string;
  solutions?: SolutionType[];
};

interface PanelEditorProps {
  content: ContentType;
  language: string;
  run: () => void;
  code: SolutionType;
  onCodeChange: (code: SolutionType) => void;
}

function PanelEditor({
  content,
  language,
  run,
  code,
  onCodeChange,
}: PanelEditorProps) {
  const [customCode, setCustomCode] = useState<SolutionType[]>([]);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const isRunning = useSelector(selectIsRunning);
  const hints = useSelector(selectHints);
  const _handleEditorChanges = (value: string = "") => {
    setCustomCode((prevCode) => {
      const updatedCode = prevCode.map((item) =>
        item.language === language ? { ...item, solution: value } : item
      );

      if (!prevCode.some((item) => item.language === language)) {
        updatedCode.push({ language, solution: value });
      }

      return updatedCode;
    });
  };

  const [hintIndex, setHintIndex] = useState(0);

  const handleNext = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (hintIndex > 0) {
      setHintIndex((prev) => prev - 1);
    }
  };

  const resetEditor = () => {
    onCodeChange({ language, solution: "" });
    _handleEditorChanges("");
  };

  useEffect(() => {
    if (showSolution) {
      const currentSolution = content?.solutions?.find(
        (state: SolutionType) =>
          state.language?.toLowerCase() === language.toLowerCase()
      );
      onCodeChange(currentSolution || { language, solution: "" });
    } else {
      const currentSolution = customCode.find(
        (state: SolutionType) =>
          state.language?.toLowerCase() === language.toLowerCase()
      );
      onCodeChange(currentSolution || { language, solution: "" });
    }
  }, [showSolution, language, content?.solutions, customCode]);

  return (
    <div className="w-full h-full flex flex-col bg-black">
      {/* Header Bar */}
      <div className="flex items-center justify-between h-12 px-4 border-b border-gray-800 bg-black">
        <div className="flex items-center space-x-6">
          {content?.type == "lecture" ? (
            <button className="flex items-center h-full px-2 text-gray-300 hover:text-white transition-colors">
              <IoDocumentText className="mr-2 text-blue-400" size={18} />
              <span className="text-sm font-medium">Video Explanation</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowSolution(false)}
                className={`flex items-center h-full px-3 transition-colors ${
                  !showSolution
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FiCode className="mr-2" size={16} />
                <span className="text-sm font-medium">Code Editor</span>
              </button>

              {content?.type === "lecture" && (
                <button
                  onClick={() => setShowSolution(true)}
                  className={`flex items-center h-full px-3 transition-colors ${
                    showSolution
                      ? "text-white border-b-2 border-yellow-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FiEye className="mr-2" size={16} />
                  <span className="text-sm font-medium">Solution</span>
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={resetEditor}
            className="p-2 text-gray-400 hover:text-yellow-400 rounded-md hover:bg-gray-800 transition-colors"
            title="Reset Editor"
          >
            <TbReload size={18} />
          </button>

          {isRunning ? (
            <button
              className="py-2 px-3 text-xs text-white bg-blue-600 flex items-center hover:text-yellow-400 rounded hover:bg-gray-800 transition-colors"
              title="Reset Editor"
            >
              <span className="ml-1">Running...</span>{" "}
            </button>
          ) : (
            <button
              onClick={run}
              className="py-2 px-3 text-xs text-white bg-blue-600 flex items-center hover:text-yellow-400 rounded hover:bg-gray-800 transition-colors"
              title="Reset Editor"
            >
              <Play size={18} /> <span className="ml-1">Run</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden bg-gray-900">
        {!content.solutions && (
          <Editor
            height="100%"
            language={code.language}
            onChange={_handleEditorChanges}
            value={code.solution}
            theme="vs-dark"
            options={{
              automaticLayout: true,
              fontSize: 14,
              fontFamily: "Fira Code, Menlo, Monaco, Consolas, monospace",
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
        )}
      </div>
    </div>
  );
}

export default PanelEditor;
