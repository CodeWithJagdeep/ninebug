import { useEffect, useMemo, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // or another theme you like

import { X, Copy, CheckCircle, XCircle, Clock, Zap } from "lucide-react";

interface SubmissionDetailModalProps {
  submission: {
    status: string;
    runtime: number;
    code: string;
    language?: string;
    timestamp?: string;
    memory?: number;
  };
  onClose: () => void;
}

export const SubmissionDetailModal = ({
  submission,
  onClose,
}: SubmissionDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [submission.code, submission.language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(submission.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const getStatusConfig = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "accepted":
      case "success":
        return {
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          icon: <CheckCircle className="w-4 h-4" />,
          dot: "bg-emerald-500",
        };
      case "rejected":
      case "failed":
      case "error":
        return {
          color: "text-red-700 bg-red-50 border-red-200",
          icon: <XCircle className="w-4 h-4" />,
          dot: "bg-red-500",
        };
      case "pending":
      case "running":
        return {
          color: "text-amber-700 bg-amber-50 border-amber-200",
          icon: <Clock className="w-4 h-4" />,
          dot: "bg-amber-500",
        };
      default:
        return {
          color: "text-gray-700 bg-gray-50 border-gray-200",
          icon: <Clock className="w-4 h-4" />,
          dot: "bg-gray-500",
        };
    }
  };

  const getPerformanceConfig = (runtime: number) => {
    if (runtime < 100) {
      return {
        level: "Excellent",
        color: "text-emerald-600",
        dot: "bg-emerald-500",
        description: "Highly optimized performance",
      };
    } else if (runtime < 500) {
      return {
        level: "Good",
        color: "text-blue-600",
        dot: "bg-blue-500",
        description: "Acceptable performance",
      };
    } else if (runtime < 1000) {
      return {
        level: "Fair",
        color: "text-amber-600",
        dot: "bg-amber-500",
        description: "Could be optimized",
      };
    } else {
      return {
        level: "Slow",
        color: "text-red-600",
        dot: "bg-red-500",
        description: "Needs optimization",
      };
    }
  };

  const formatStatus = (status: string) =>
    status.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const statusConfig = getStatusConfig(submission.status);
  const performanceConfig = getPerformanceConfig(submission.runtime);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Submission Analysis
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Detailed execution results and performance metrics
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {/* Metrics Grid */}
          <div className="p-6 bg-gray-50/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Card */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Status
                  </h3>
                  {statusConfig.icon}
                </div>
                <div
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${statusConfig.color}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${statusConfig.dot}`}
                  ></div>
                  {formatStatus(submission.status)}
                </div>
              </div>

              {/* Runtime Card */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Runtime
                  </h3>
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {submission.runtime.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-500 ml-1">
                      ms
                    </span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${performanceConfig.dot}`}
                    ></div>
                    <span className={`font-medium ${performanceConfig.color}`}>
                      {performanceConfig.level}
                    </span>
                    <span className="text-gray-500 ml-1">
                      • {performanceConfig.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Memory Card */}
              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Memory
                  </h3>
                  <Zap className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {submission.memory
                        ? (submission.memory / 1024).toFixed(1)
                        : "N/A"}
                    </span>
                    <span className="text-sm font-medium text-gray-500 ml-1">
                      {submission.memory ? "KB" : ""}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {submission.memory ? "Memory usage" : "Not measured"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Section */}
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Code Header */}
              <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-mono text-gray-300">
                    {submission.language || "javascript"} •{" "}
                    {submission.code.split("\n").length} lines
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1.5 transition-all duration-200 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* Code Content */}
              <div className="relative">
                <pre className="bg-gray-50 p-6 overflow-x-auto text-sm leading-relaxed font-mono">
                  <code
                    ref={codeRef}
                    className={`language-${
                      submission.language || "javascript"
                    }`}
                  >
                    {submission.code}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              {submission.timestamp && (
                <span>
                  Submitted: {new Date(submission.timestamp).toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span>Language: {submission.language || "JavaScript"}</span>
              <span>•</span>
              <span>Size: {new Blob([submission.code]).size} bytes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
