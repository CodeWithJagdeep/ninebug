import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Book, Clock, Target, Award } from "lucide-react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import { selectCourseLoading } from "@/Container/reducer/slicers/coursesSlicer";
import { CourseLoader } from "@/components/common/CourseLoader";
import { ILessonContent } from "@/types/types";

interface DescriptionProps {
  content: ILessonContent;
  language?: string;
  activeTab?: string;
}

const DIFFICULTY_STYLES = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-400 border-red-500/20",
  Hint: "bg-blue-500/10 text-blue-400 border-blue-500/20",
} as const;

function Description({ content, language = "javascript" }: DescriptionProps) {
  const loading = useSelector(selectCourseLoading);

  // Memoize sanitized content to prevent unnecessary re-renders
  const cleanContent = useMemo(() => {
    if (!content?.text) return "";

    return DOMPurify.sanitize(`
      <div class="prose prose-invert max-w-none">
        <p class="text-gray-300 leading-relaxed">
          Given an array of integers <code class="bg-gray-800 px-2 py-1 rounded text-blue-400">nums</code> 
          and an integer <code class="bg-gray-800 px-2 py-1 rounded text-blue-400">target</code>, 
          return the indices of the two numbers such that they add up to 
          <code class="bg-gray-800 px-2 py-1 rounded text-blue-400">target</code>.
        </p>
        
        <p class="text-gray-300 leading-relaxed">
          You may assume that each input would have exactly one solution, and you may not use the same element twice.
        </p>
        
        <p class="text-gray-300 leading-relaxed">
          You can return the answer in any order.
        </p>

        <div class="mt-8">
          <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span class="w-1 h-6 bg-blue-500 rounded-full"></span>
            Constraints
          </h2>
          <div class="bg-gray-800/50 rounded-lg p-4 space-y-2">
            <div class="flex items-center gap-2 text-gray-300">
              <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              <code class="text-blue-400">2 ≤ nums.length ≤ 10⁴</code>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              <code class="text-blue-400">-10⁹ ≤ nums[i] ≤ 10⁹</code>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              <code class="text-blue-400">-10⁹ ≤ target ≤ 10⁹</code>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
              Exactly one valid answer exists.
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 class="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span class="w-1 h-5 bg-green-500 rounded-full"></span>
              Input Format
            </h3>
            <div class="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <pre class="text-green-400 text-sm"><code>nums = [2, 7, 11, 15]
target = 9</code></pre>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium text-white mb-3 flex items-center gap-2">
              <span class="w-1 h-5 bg-purple-500 rounded-full"></span>
              Output Format
            </h3>
            <div class="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <pre class="text-purple-400 text-sm"><code>[0, 1]</code></pre>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span class="w-1 h-6 bg-orange-500 rounded-full"></span>
            Expected Complexities
          </h2>
          
          <div class="grid md:grid-cols-2 gap-4 mb-8">
            <div class="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg p-4 border border-green-700/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                <span class="text-green-400 font-medium text-sm uppercase tracking-wide">Time Complexity</span>
              </div>
              <code class="text-green-300 text-lg font-mono">O(n)</code>
            </div>
            
            <div class="bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-lg p-4 border border-blue-700/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span class="text-blue-400 font-medium text-sm uppercase tracking-wide">Auxiliary Space</span>
              </div>
              <code class="text-blue-300 text-lg font-mono">O(1)</code>
            </div>
          </div>
          
          <div class="space-y-6 mb-8">
            <div>
              <h3 class="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <span class="w-1 h-5 bg-purple-500 rounded-full"></span>
                Company Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Flipkart</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Morgan Stanley</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Accolite</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Amazon</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Microsoft</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">D-E-Shaw</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Ola Cabs</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">PayU</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Visa</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Intuit</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Adobe</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Cisco</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">Qualcomm</span>
                <span class="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-colors cursor-pointer">TCS</span>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <span class="w-1 h-5 bg-cyan-500 rounded-full"></span>
                Topic Tags
              </h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors cursor-pointer">Arrays</span>
                <span class="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors cursor-pointer">Searching</span>
                <span class="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors cursor-pointer">Bit Magic</span>
                <span class="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors cursor-pointer">Data Structures</span>
                <span class="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-600/30 hover:bg-cyan-600/30 transition-colors cursor-pointer">Algorithms</span>
              </div>
            </div>
          </div>
          
          <div class="space-y-4 mb-8">
            <div>
              <h3 class="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <span class="w-1 h-5 bg-yellow-500 rounded-full"></span>
                Related Interview Experiences
              </h3>
              <div class="space-y-2">
                <a href="#" class="block p-3 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group">
                  <span class="text-yellow-400 group-hover:text-yellow-300 text-sm font-medium">Ola Interview Experience Set 11 Internship</span>
                </a>
                <a href="#" class="block p-3 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group">
                  <span class="text-yellow-400 group-hover:text-yellow-300 text-sm font-medium">Intuit Interview Experience Set 12</span>
                </a>
                <a href="#" class="block p-3 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group">
                  <span class="text-yellow-400 group-hover:text-yellow-300 text-sm font-medium">Flipkart Interview Experience For SDE 1</span>
                </a>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-white mb-3 flex items-center gap-2">
                <span class="w-1 h-5 bg-pink-500 rounded-full"></span>
                Related Articles
              </h3>
              <a href="#" class="block p-3 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-all duration-200 group">
                <span class="text-pink-400 group-hover:text-pink-300 text-sm font-medium">Find The Missing Number</span>
              </a>
            </div>
          </div>

        <div class="mt-8">
          <h2 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span class="w-1 h-6 bg-yellow-500 rounded-full"></span>
            Example
          </h2>
          
          <div class="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-6 border border-gray-600">
            <div class="space-y-4">
              <div>
                <span class="text-sm font-medium text-gray-400 uppercase tracking-wide">Input:</span>
                <div class="mt-1 bg-gray-900 rounded p-3 border border-gray-700">
                  <code class="text-green-400">nums = [2, 7, 11, 15], target = 9</code>
                </div>
              </div>
              
              <div>
                <span class="text-sm font-medium text-gray-400 uppercase tracking-wide">Output:</span>
                <div class="mt-1 bg-gray-900 rounded p-3 border border-gray-700">
                  <code class="text-purple-400">[0, 1]</code>
                </div>
              </div>
              
              <div>
                <span class="text-sm font-medium text-gray-400 uppercase tracking-wide">Explanation:</span>
                <p class="mt-1 text-gray-300">
                  Because <code class="bg-gray-800 px-2 py-1 rounded text-blue-400">nums[0] + nums[1] == 9</code>, 
                  we return <code class="bg-gray-800 px-2 py-1 rounded text-purple-400">[0, 1]</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  }, [content?.text]);

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
        element.classList.add(`language-${language}`);

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

      {/*  */}

      {/* Content Area */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <CourseLoader />
        </div>
      ) : (
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-2">
            {/* Problem Header */}
            <header className="space-y-2">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold text-white leading-tight">
                  1. Two Sum
                </h1>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3">
                {["Easy", "Hint"].map((tag) => (
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
