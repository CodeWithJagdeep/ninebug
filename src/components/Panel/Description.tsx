import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Book, Clock, Target, Award, Building2, Lightbulb } from "lucide-react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { selectCourseLoading } from "@/Container/reducer/slicers/coursesSlicer";
import { CourseLoader } from "@/components/common/CourseLoader";
import { Company } from "@/Container/reducer/slicers/CodingSlicer";

interface DescriptionProps {
  content: string;
  language?: string;
  activeTab?: string;
  companies?: Company[]; // Array of company names
  title: string;
  hints?: string[]; // Array of hints
}

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20",
  Hint: "bg-blue-500/10 text-blue-400 border-blue-500/20",
} as const;

function Description({
  title,
  content,
  language = "rust",
  companies = [],
  hints = [
    "Think about using a hash map to store numbers you've seen",
    "For each number, check if its complement exists in the hash map",
    "The complement is target - current number",
    "Remember to store the index along with the value",
  ],
}: DescriptionProps) {
  const loading = useSelector(selectCourseLoading);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Memoize sanitized content to prevent unnecessary re-renders
  const cleanContent = useMemo(() => {
    if (!content) return "";
    return DOMPurify.sanitize(content);
  }, [content]);

  useEffect(() => {
    // Enhanced code highlighting with error handling
    const highlightCodeBlocks = () => {
      document.querySelectorAll("pre code").forEach((block) => {
        const element = block as HTMLElement;
        // Clean existing classes
        element.className = element.className
          .split(" ")
          .filter((cls) => !cls.startsWith("language-"))
          .join(" ");
        // Add language class
        element.classList.add(`language-markdown`);
        try {
          hljs.highlightElement(element);
        } catch (error) {
          console.warn("Code highlighting failed:", error);
        }
      });
    };
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(highlightCodeBlocks);
  }, [cleanContent, language]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".companies-popover") &&
        !target.closest(".companies-trigger")
      ) {
        setShowCompanies(false);
      }
      if (
        !target.closest(".hints-popover") &&
        !target.closest(".hints-trigger")
      ) {
        setShowHints(false);
      }
    };

    if (showCompanies || showHints) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCompanies, showHints]);

  if (!content) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <Book className="w-12 h-12 text-gray-500 mx-auto" />
          <p className="text-gray-400 text-lg">No content available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Modern Header with Glass Effect */}
      {/* */}
      {/* Content Area */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <CourseLoader />
        </div>
      ) : (
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-2">
            {/* Problem Header */}
            <header className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl text-white leading-tight">{title}</h1>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3">
                {["Easy"].map((tag) => (
                  <span
                    key={tag}
                    className={`
                      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      border backdrop-blur-sm transition-all duration-200
                      ${
                        DIFFICULTY_STYLES[
                          tag as keyof typeof DIFFICULTY_STYLES
                        ] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }
                    `}
                  >
                    {tag}
                  </span>
                ))}

                {/* Hints Tag with Popover */}
                <div className="relative">
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="hints-trigger cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                             bg-blue-500/10 text-blue-400 border border-blue-500/20
                             backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/20"
                  >
                    <Lightbulb className="w-3 h-3" />
                    Hints
                  </button>

                  {/* Hints Popover */}
                  {showHints && (
                    <div
                      className="hints-popover absolute top-full left-0 mt-2 w-80 bg-black/95
                               backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl
                               z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                    >
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-400" />
                          Hints
                        </h3>
                        <div className="space-y-3">
                          {hints.map((hint, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-md bg-gray-800/30 
                                       border border-gray-700/30 hover:bg-gray-800/50 
                                       hover:border-gray-600/50 transition-all duration-150"
                            >
                              <div
                                className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 
                                            rounded-full flex items-center justify-center text-white 
                                            text-xs font-semibold mt-0.5 flex-shrink-0"
                              >
                                {index + 1}
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {hint}
                              </p>
                            </div>
                          ))}
                        </div>
                        {hints.length === 0 && (
                          <p className="text-gray-500 text-sm text-center py-4">
                            No hints available
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Companies Tag with Popover */}
                <div className="relative">
                  <button
                    onClick={() => setShowCompanies(!showCompanies)}
                    className="companies-trigger cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                             bg-[#f3891c]/10 text-[#f3891c] border border-[#f3891c]
                             backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/20"
                  >
                    <Building2 className="w-3 h-3" />
                    Companies
                  </button>
                  {/* Popover */}
                  {showCompanies && (
                    <div
                      className="companies-popover absolute top-full left-0 mt-2 w-64 bg-black/95
                               backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl
                               z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                    >
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#f3891c]" />
                          Companies
                        </h3>
                        <div className="space-y-2">
                          {companies.map((company, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-800/50
                                       transition-colors duration-150 cursor-pointer group"
                            >
                              <img
                                className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500
                                         rounded-full flex items-center justify-center text-white
                                         text-xs font-semibold"
                                src={company.logoUrl || ""}
                                alt={company.name}
                              />
                              <span
                                className="text-gray-300 text-sm group-hover:text-white
                                         transition-colors duration-150"
                              >
                                {company.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        {companies.length === 0 && (
                          <p className="text-gray-500 text-sm text-center py-4">
                            No companies available
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>
            {/* Main Content */}
            <div className="lesson_content prose-custom">
              {parse(cleanContent)}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default Description;
