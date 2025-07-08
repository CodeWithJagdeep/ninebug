import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Code,
  TestTube,
  Target,
  Clock,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import hljs from "highlight.js";

export interface IApproach {
  approach: { type: string; description: string }[];
}

const ApproachSection = ({ approach }: IApproach) => {
  console.log(approach);
  const [expandedSteps, setExpandedSteps] = useState(0); // First step expanded by default
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Memoize sanitized content to prevent unnecessary re-renders
  const cleanContent = useMemo(() => {
    if (!approach[expandedSteps]) return "";
    return DOMPurify.sanitize(approach[expandedSteps].description);
  }, [expandedSteps]);

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
        element.classList.add(`language-javascript`);
        try {
          hljs.highlightElement(element);
        } catch (error) {
          console.warn("Code highlighting failed:", error);
        }
      });
    };
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(highlightCodeBlocks);
  }, [cleanContent]);

  return (
    <div className="h-full bg-black text-white overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-800 pb-4">
          <h2 className="text-xl font-semibold text-white mb-2">
            Problem Solving Approach
          </h2>
          <p className="text-gray-400 text-sm">
            Follow this systematic approach to solve coding problems efficiently
          </p>
          <div className="flex items-center mt-3 text-xs text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Total estimated time: 30-45 minutes</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {approach.map((step, index) => (
            <div
              key={index}
              onClick={() => setExpandedSteps(index)}
              className={`
                relative p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${
                  expandedSteps === index
                    ? "border-orange-500 bg-gradient-to-br from-orange-900/20 to-orange-800/10 shadow-lg"
                    : "border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`
                    p-2 rounded-lg ${
                      expandedSteps === index
                        ? "bg-orange-500/20"
                        : "bg-gray-700/50"
                    }
                  `}
                  >
                    {/* {getStepIcon(index)} */}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">
                      {step.type}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div
                        className={`
                        w-2 h-2 rounded-full mr-2 ${
                          expandedSteps === index
                            ? "bg-orange-500"
                            : "bg-gray-600"
                        }
                      `}
                      />
                      <span className="text-xs text-gray-400">
                        {expandedSteps === index ? "Active" : "Click to expand"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // toggleStepCompletion(index);
                    }}
                    className={`
                      p-1 rounded-full transition-colors duration-200
                      ${
                        completedSteps?.includes(index)
                          ? "text-orange-500 bg-orange-500/20"
                          : "text-gray-500 hover:text-orange-400"
                      }
                    `}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  {expandedSteps === index ? (
                    <ChevronDown className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lesson_content prose-custom">
          {" "}
          {parse(cleanContent)}
        </div>
        {/* Tips Section */}
        <div className="border border-gray-800 rounded-lg bg-gradient-to-br from-yellow-900/20 to-orange-900/20 p-4">
          <h3 className="font-medium text-yellow-400 mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2" />
            Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Start with the simplest approach that works, then optimize
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Draw diagrams or trace through examples on paper
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Consider edge cases early in your planning process
            </li>
            <li className="flex items-start">
              <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Practice explaining your approach out loud
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApproachSection;
