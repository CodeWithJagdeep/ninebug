import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Code,
  TestTube,
  Target,
  Clock,
  BarChart3,
} from "lucide-react";

const ApproachSection = ({ problem }: any) => {
  const [expandedSteps, setExpandedSteps] = useState(new Set([0])); // First step expanded by default

  const toggleStep = (index: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSteps(newExpanded);
  };

  // Sample approach data - this would typically come from props or API
  const approachSteps = [
    {
      title: "Understand the Problem",
      icon: Target,
      time: "2-3 min",
      description: "Break down what we need to solve",
      details: [
        "Read the problem statement carefully",
        "Identify input and output requirements",
        "Note any constraints or edge cases",
        "Clarify any ambiguous requirements",
      ],
      example:
        "For array problems: What's the input size? Are there duplicates? What's the expected output format?",
    },
    {
      title: "Analyze Examples",
      icon: Lightbulb,
      time: "3-5 min",
      description: "Work through given examples manually",
      details: [
        "Trace through each example step by step",
        "Identify patterns in the input-output relationship",
        "Look for edge cases in the examples",
        "Create additional test cases if needed",
      ],
      example:
        "Input: [1,2,3,4,5], k=3 → Output: [3,4,5,1,2]. Pattern: Rotate array right by k positions.",
    },
    {
      title: "Choose Algorithm & Data Structure",
      icon: BarChart3,
      time: "5-8 min",
      description: "Select the most efficient approach",
      details: [
        "Consider brute force approach first",
        "Think about optimization opportunities",
        "Choose appropriate data structures",
        "Analyze time and space complexity",
      ],
      example:
        "For rotation: Brute force O(n×k) vs. Reverse method O(n) vs. Cyclic replacement O(n)",
    },
    {
      title: "Write Pseudocode",
      icon: Code,
      time: "3-5 min",
      description: "Plan the implementation structure",
      details: [
        "Write high-level algorithm steps",
        "Define helper functions if needed",
        "Plan error handling",
        "Consider variable names and structure",
      ],
      example: `
        function rotate(nums, k):
          k = k % nums.length
          reverse(nums, 0, length-1)  
          reverse(nums, 0, k-1)
          reverse(nums, k, length-1)
      `,
    },
    {
      title: "Implement Solution",
      icon: Code,
      time: "10-15 min",
      description: "Code the solution step by step",
      details: [
        "Start with the main function structure",
        "Implement helper functions first",
        "Add input validation",
        "Write clean, readable code",
      ],
      example:
        "Focus on correctness first, then optimize. Use meaningful variable names and add comments for complex logic.",
    },
    {
      title: "Test & Debug",
      icon: TestTube,
      time: "5-8 min",
      description: "Verify the solution works correctly",
      details: [
        "Test with provided examples",
        "Test edge cases (empty input, single element, etc.)",
        "Trace through the algorithm manually",
        "Fix any bugs found during testing",
      ],
      example:
        "Test cases: empty array [], single element [1], normal case [1,2,3,4,5], k > array length",
    },
  ];

  const complexityAnalysis = {
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    explanation:
      "We perform three reversals, each taking O(n) time. Space complexity is constant as we modify the array in-place.",
  };

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

        {/* Approach Steps */}
        <div className="space-y-3">
          {approachSteps.map((step, index) => {
            const Icon = step.icon;
            const isExpanded = expandedSteps.has(index);

            return (
              <div
                key={index}
                className="border border-gray-800 rounded-lg bg-gray-900/30"
              >
                <button
                  onClick={() => toggleStep(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {step.time}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4">
                    <div className="pl-11">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Key Points:
                      </h4>
                      <ul className="space-y-1">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-400 flex items-start"
                          >
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {step.example && (
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">
                            Example:
                          </h4>
                          <div className="bg-gray-800/50 rounded p-3 text-sm text-gray-300 font-mono whitespace-pre-wrap">
                            {step.example}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Complexity Analysis */}
        <div className="border border-gray-800 rounded-lg bg-gray-900/30 p-4">
          <h3 className="font-medium text-white mb-3 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
            Complexity Analysis
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Time Complexity:</span>
              <span className="text-green-400 font-mono">
                {complexityAnalysis.timeComplexity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Space Complexity:</span>
              <span className="text-blue-400 font-mono">
                {complexityAnalysis.spaceComplexity}
              </span>
            </div>
            <p className="text-gray-400 mt-2 text-xs leading-relaxed">
              {complexityAnalysis.explanation}
            </p>
          </div>
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
