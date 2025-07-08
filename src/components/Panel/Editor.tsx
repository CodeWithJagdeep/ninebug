import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
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
  code: string;
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
  children: ReactNode;
}

function PanelEditor({
  content,
  language,
  run,
  code,
  onCodeChange,
  children,
}: PanelEditorProps) {
  const [customCode, setCustomCode] = useState<SolutionType[]>([]);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const isRunning = useSelector(selectIsRunning);

  const _handleEditorChanges = (value: string = "") => {
    setCustomCode((prevCode) => {
      const updatedCode = prevCode.map((item) =>
        item.language.toLowerCase() === language.toLowerCase()
          ? { ...item, code: value }
          : item
      );

      if (!prevCode.some((item) => item.language === language)) {
        updatedCode.push({ language, code: value });
      }

      return updatedCode;
    });
  };

  const resetEditor = () => {
    onCodeChange({ language, code: "" });
    _handleEditorChanges("");
  };

  useEffect(() => {
    if (showSolution) {
      const currentSolution = content?.solutions?.find(
        (state: SolutionType) =>
          state.language?.toLowerCase() === language.toLowerCase()
      );
      onCodeChange(currentSolution || { language, code: "" });
    } else {
      const currentSolution = customCode.find(
        (state: SolutionType) =>
          state.language?.toLowerCase() === language.toLowerCase()
      );
      onCodeChange(currentSolution || { language, code: "" });
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

        <div className="flex items-center space-x-5">
          <button
            onClick={resetEditor}
            className="p-2 text-white hover:text-yellow-400 rounded-md hover:bg-gray-800 transition-colors"
            title="Reset Editor"
          >
            <TbReload size={18} />
          </button>
          {children}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden bg-gray-900">
        {!content.solutions && (
          <Editor
            height="100%"
            language={code.language.toLowerCase()}
            onChange={_handleEditorChanges}
            value={code.code}
            theme="mentorsland-dark"
            beforeMount={(monaco) => {
              // Define enhanced theme with comprehensive token rules
              monaco.editor.defineTheme("mentorsland-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [
                  // Comments
                  {
                    token: "comment",
                    foreground: "6A9955",
                    fontStyle: "italic",
                  },
                  {
                    token: "comment.line",
                    foreground: "6A9955",
                    fontStyle: "italic",
                  },
                  {
                    token: "comment.block",
                    foreground: "6A9955",
                    fontStyle: "italic",
                  },

                  // Keywords
                  { token: "keyword", foreground: "C586C0", fontStyle: "bold" },
                  {
                    token: "keyword.control",
                    foreground: "C586C0",
                    fontStyle: "bold",
                  },
                  { token: "keyword.operator", foreground: "C586C0" },
                  { token: "keyword.other", foreground: "C586C0" },

                  // Strings
                  { token: "string", foreground: "CE9178" },
                  { token: "string.quoted", foreground: "CE9178" },
                  { token: "string.template", foreground: "CE9178" },

                  // Numbers
                  { token: "number", foreground: "B5CEA8" },
                  { token: "number.hex", foreground: "B5CEA8" },
                  { token: "number.float", foreground: "B5CEA8" },
                  { token: "number.binary", foreground: "B5CEA8" },
                  { token: "number.octal", foreground: "B5CEA8" },

                  // Types and Classes
                  { token: "type", foreground: "4EC9B0" },
                  { token: "type.identifier", foreground: "4EC9B0" },
                  { token: "entity.name.type", foreground: "4EC9B0" },
                  { token: "entity.name.class", foreground: "4EC9B0" },
                  { token: "support.class", foreground: "4EC9B0" },

                  // Functions
                  { token: "entity.name.function", foreground: "DCDCAA" },
                  { token: "support.function", foreground: "DCDCAA" },
                  {
                    token: "keyword.other.special-method",
                    foreground: "DCDCAA",
                  },

                  // Variables
                  { token: "variable", foreground: "9CDCFE" },
                  { token: "variable.parameter", foreground: "9CDCFE" },
                  { token: "variable.other", foreground: "9CDCFE" },
                  { token: "meta.definition.variable", foreground: "9CDCFE" },

                  // Constants
                  { token: "constant", foreground: "4FC1FF" },
                  { token: "constant.language", foreground: "569CD6" },
                  { token: "constant.numeric", foreground: "B5CEA8" },
                  { token: "constant.character", foreground: "CE9178" },

                  // Operators
                  {
                    token: "keyword.operator.assignment",
                    foreground: "D4D4D4",
                  },
                  {
                    token: "keyword.operator.comparison",
                    foreground: "D4D4D4",
                  },
                  {
                    token: "keyword.operator.arithmetic",
                    foreground: "D4D4D4",
                  },
                  { token: "keyword.operator.logical", foreground: "D4D4D4" },

                  // Punctuation
                  { token: "punctuation", foreground: "D4D4D4" },
                  { token: "punctuation.definition", foreground: "D4D4D4" },
                  { token: "punctuation.separator", foreground: "D4D4D4" },
                  { token: "punctuation.terminator", foreground: "D4D4D4" },

                  // Brackets
                  {
                    token: "punctuation.section.embedded",
                    foreground: "D7BA7D",
                  },
                  { token: "punctuation.section.group", foreground: "D4D4D4" },
                  {
                    token: "punctuation.section.brackets",
                    foreground: "D4D4D4",
                  },
                  { token: "punctuation.section.parens", foreground: "D4D4D4" },

                  // Attributes/Decorators
                  { token: "entity.name.tag", foreground: "569CD6" },
                  {
                    token: "entity.other.attribute-name",
                    foreground: "92C5F8",
                  },
                  { token: "meta.decorator", foreground: "C586C0" },

                  // Imports/Modules
                  { token: "keyword.control.import", foreground: "C586C0" },
                  { token: "keyword.control.export", foreground: "C586C0" },
                  { token: "keyword.control.from", foreground: "C586C0" },

                  // Invalid/Error
                  {
                    token: "invalid",
                    foreground: "F44747",
                    background: "2D1B1B",
                  },
                  {
                    token: "invalid.illegal",
                    foreground: "F44747",
                    background: "2D1B1B",
                  },

                  // Language-specific tokens
                  // JavaScript/TypeScript
                  { token: "storage.type.js", foreground: "569CD6" },
                  { token: "storage.type.ts", foreground: "569CD6" },
                  { token: "storage.modifier", foreground: "569CD6" },

                  // Python
                  {
                    token: "storage.type.function.python",
                    foreground: "569CD6",
                  },
                  {
                    token: "keyword.control.flow.python",
                    foreground: "C586C0",
                  },

                  // Java
                  { token: "storage.modifier.java", foreground: "569CD6" },
                  { token: "storage.type.java", foreground: "569CD6" },

                  // C/C++
                  { token: "storage.type.c", foreground: "569CD6" },
                  { token: "storage.modifier.c", foreground: "569CD6" },
                ],
                colors: {
                  // Editor colors
                  "editor.background": "#000000",
                  "editor.foreground": "#D4D4D4",
                  "editorLineNumber.foreground": "#858585",
                  "editorLineNumber.activeForeground": "#C6C6C6",
                  "editorCursor.foreground": "#AEAFAD",

                  // Selection colors
                  "editor.selectionBackground": "#264F78",
                  "editor.selectionHighlightBackground": "#ADD6FF26",
                  "editor.inactiveSelectionBackground": "#3A3D41",

                  // Line highlight
                  "editor.lineHighlightBackground": "#2A2D2E",
                  "editor.lineHighlightBorder": "#00000000",

                  // Indent guides
                  "editorIndentGuide.background": "#404040",
                  "editorIndentGuide.activeBackground": "#707070",

                  // Whitespace
                  "editorWhitespace.foreground": "#e3e4e229",

                  // Brackets
                  "editorBracketMatch.background": "#0064001a",
                  "editorBracketMatch.border": "#888888",

                  // Scrollbar
                  "scrollbarSlider.background": "#79797966",
                  "scrollbarSlider.hoverBackground": "#646464b3",
                  "scrollbarSlider.activeBackground": "#bfbfbf66",

                  // Find/Replace
                  "editor.findMatchBackground": "#515c6a",
                  "editor.findMatchHighlightBackground": "#ea5c0055",
                  "editor.findRangeHighlightBackground": "#3a3d4166",

                  // Hover
                  "editor.hoverHighlightBackground": "#264f7840",

                  // Word highlight
                  "editor.wordHighlightBackground": "#575757b8",
                  "editor.wordHighlightStrongBackground": "#004972b8",

                  // Range highlight
                  "editor.rangeHighlightBackground": "#ffffff0b",

                  // Symbol highlight
                  "editor.symbolHighlightBackground": "#ea5c0055",

                  // Error/Warning squiggles
                  "editorError.foreground": "#F44747",
                  "editorWarning.foreground": "#FF8C00",
                  "editorInfo.foreground": "#3794FF",
                  "editorHint.foreground": "#eeeeee",

                  // Gutter
                  "editorGutter.background": "#000000",
                  "editorGutter.modifiedBackground": "#1B81A8",
                  "editorGutter.addedBackground": "#487E02",
                  "editorGutter.deletedBackground": "#F44747",

                  // Overview ruler
                  "editorOverviewRuler.border": "#7f7f7f4d",
                  "editorOverviewRuler.findMatchForeground": "#d186167e",
                  "editorOverviewRuler.rangeHighlightForeground": "#007acc99",
                  "editorOverviewRuler.selectionHighlightForeground":
                    "#A0A0A0CC",
                  "editorOverviewRuler.wordHighlightForeground": "#A0A0A0CC",
                  "editorOverviewRuler.wordHighlightStrongForeground":
                    "#C0A0C0CC",
                  "editorOverviewRuler.modifiedForeground": "#1B81A8",
                  "editorOverviewRuler.addedForeground": "#487E02",
                  "editorOverviewRuler.deletedForeground": "#F44747",
                  "editorOverviewRuler.errorForeground": "#F44747",
                  "editorOverviewRuler.warningForeground": "#FF8C00",
                  "editorOverviewRuler.infoForeground": "#3794FF",
                },
              });
            }}
            onMount={(_, monaco) => {
              monaco.editor.setTheme("mentorsland-dark");
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: "on",
              bracketPairColorization: { enabled: true },
              suggest: {
                showKeywords: true,
                showSnippets: true,
                showColors: true,
                showFiles: true,
                showReferences: true,
                showFolders: true,
                showTypeParameters: true,
                showIssues: true,
                showUsers: true,
                showValues: true,
                showMethods: true,
                showFunctions: true,
                showConstructors: true,
                showFields: true,
                showVariables: true,
                showClasses: true,
                showStructs: true,
                showInterfaces: true,
                showModules: true,
                showProperties: true,
                showEvents: true,
                showOperators: true,
                showUnits: true,
                showConstants: true,
                showEnums: true,
                showEnumMembers: true,
              },
              quickSuggestions: {
                other: true,
                comments: true,
                strings: true,
              },
              parameterHints: { enabled: true },
              formatOnType: true,
              formatOnPaste: true,
              autoIndent: "full",
              smoothScrolling: true,
              cursorBlinking: "blink",
              cursorSmoothCaretAnimation: "on",
              renderWhitespace: "selection",
              renderControlCharacters: true,
              fontLigatures: true,
              matchBrackets: "always",
              showFoldingControls: "always",
              foldingStrategy: "indentation",
              showUnused: true,
              occurrencesHighlight: "singleFile",
              selectionHighlight: true,
              codeLens: true,
              folding: true,
              foldingHighlight: true,
              unfoldOnClickAfterEndOfLine: true,
              renderLineHighlight: "all",
              renderLineHighlightOnlyWhenFocus: false,
              hideCursorInOverviewRuler: false,
              scrollbar: {
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                vertical: "visible",
                horizontal: "visible",
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default PanelEditor;
