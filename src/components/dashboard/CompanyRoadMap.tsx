import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChevronDown, Filter, X } from "lucide-react";
import { Separator } from "../ui/separator"; // Changed import
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox"; // Added Checkbox import
import { ScrollArea } from "../ui/scroll-area";

// Type definitions
type Difficulty = "Easy" | "Medium" | "Hard";
type Frequency = "Low" | "Medium" | "High" | "Very High";
type Topic =
  | "Arrays"
  | "Strings"
  | "Linked Lists"
  | "Trees"
  | "Graphs"
  | "Dynamic Programming"
  | "Other";

interface Problem {
  id: number;
  title: string;
  link: string;
  frequency: Frequency;
}

interface TopicData {
  [difficulty: string]: Problem[];
}

interface CompanyData {
  frequency: Frequency;
  [topic: string]: TopicData | Frequency;
}

interface CompanyRoadmapData {
  [company: string]: CompanyData;
}

interface SolvedProblems {
  [id: number]: boolean;
}

// Main component
const CompanyRoadmap: React.FC = () => {
  // Data with proper typing
  const companyData: CompanyRoadmapData = {
    Google: {
      frequency: "High",
      Arrays: {
        Easy: [
          {
            id: 1,
            title: "Two Sum",
            link: "https://leetcode.com/problems/two-sum",
            frequency: "Very High",
          },
          {
            id: 2,
            title: "Plus One",
            link: "https://leetcode.com/problems/plus-one",
            frequency: "Medium",
          },
          {
            id: 3,
            title: "Merge Sorted Arrays",
            link: "https://leetcode.com/problems/merge-sorted-array",
            frequency: "High",
          },
        ],
        Medium: [
          {
            id: 6,
            title: "Product of Array Except Self",
            link: "https://leetcode.com/problems/product-of-array-except-self",
            frequency: "Very High",
          },
          {
            id: 7,
            title: "Next Permutation",
            link: "https://leetcode.com/problems/next-permutation",
            frequency: "High",
          },
        ],
        Hard: [
          {
            id: 11,
            title: "Trapping Rain Water",
            link: "https://leetcode.com/problems/trapping-rain-water",
            frequency: "Very High",
          },
          {
            id: 12,
            title: "Sliding Window Maximum",
            link: "https://leetcode.com/problems/sliding-window-maximum",
            frequency: "High",
          },
        ],
      },
      Strings: {
        Easy: [
          {
            id: 16,
            title: "Valid Palindrome",
            link: "https://leetcode.com/problems/valid-palindrome",
            frequency: "High",
          },
        ],
        Medium: [
          {
            id: 18,
            title: "Longest Substring Without Repeating Characters",
            link: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
            frequency: "Very High",
          },
        ],
      },
    },
    Amazon: {
      frequency: "Very High",
      Arrays: {
        Easy: [
          {
            id: 21,
            title: "Contains Duplicate",
            link: "https://leetcode.com/problems/contains-duplicate",
            frequency: "Very High",
          },
        ],
        Medium: [
          {
            id: 22,
            title: "3Sum",
            link: "https://leetcode.com/problems/3sum",
            frequency: "Very High",
          },
        ],
      },
      Strings: {
        Easy: [
          {
            id: 23,
            title: "Valid Parentheses",
            link: "https://leetcode.com/problems/valid-parentheses",
            frequency: "Very High",
          },
        ],
      },
    },
    Microsoft: {
      frequency: "High",
      Arrays: {
        Medium: [
          {
            id: 25,
            title: "Rotate Image",
            link: "https://leetcode.com/problems/rotate-image",
            frequency: "High",
          },
        ],
      },
    },
  };

  // State with proper typing
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(
    Object.keys(companyData)
  );
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >(["Easy", "Medium", "Hard"]);
  const [minFrequency, setMinFrequency] = useState<Frequency>("Medium");
  const [viewMode, setViewMode] = useState<"all" | "filtered">("filtered");
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblems>({});
  const [selectionChance, setSelectionChance] = useState<number | null>(null);

  // Load solved problems from localStorage
  useEffect(() => {
    const savedSolvedProblems = localStorage.getItem("solvedProblems");
    if (savedSolvedProblems) {
      try {
        const parsed = JSON.parse(savedSolvedProblems);
        if (typeof parsed === "object" && parsed !== null) {
          setSolvedProblems(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved problems", e);
      }
    }
  }, []);

  // Save solved problems to localStorage
  useEffect(() => {
    localStorage.setItem("solvedProblems", JSON.stringify(solvedProblems));
    calculateSelectionChance();
  }, [solvedProblems]);

  // Toggle problem solved status
  const toggleProblemSolved = (problemId: number) => {
    setSolvedProblems((prev) => ({
      ...prev,
      [problemId]: !prev[problemId],
    }));
  };

  // Get all unique topics from selected companies
  const getAllTopics = (): Topic[] => {
    const topics = new Set<Topic>();
    selectedCompanies.forEach((company) => {
      Object.keys(companyData[company]).forEach((key) => {
        if (key !== "frequency") {
          topics.add(key as Topic);
        }
      });
    });
    return Array.from(topics);
  };

  // Get all questions based on current filters
  const getAllQuestions = () => {
    let questions: Array<
      Problem & { company: string; topic: string; difficulty: Difficulty }
    > = [];

    selectedCompanies.forEach((company) => {
      const companyTopics = companyData[company];

      Object.keys(companyTopics).forEach((topic) => {
        if (topic === "frequency") return;

        if (
          selectedTopics.length === 0 ||
          selectedTopics.includes(topic as Topic)
        ) {
          const topicData = companyTopics[topic] as TopicData;
          Object.keys(topicData).forEach((difficulty) => {
            if (selectedDifficulties.includes(difficulty as Difficulty)) {
              topicData[difficulty].forEach((problem) => {
                questions.push({
                  ...problem,
                  company,
                  topic,
                  difficulty: difficulty as Difficulty,
                });
              });
            }
          });
        }
      });
    });

    return questions;
  };

  // Calculate selection chance based on solved problems
  const calculateSelectionChance = () => {
    const allProblems = getAllQuestions();
    const solvedCount = allProblems.filter(
      (problem) => solvedProblems[problem.id]
    ).length;
    const totalCount = allProblems.length;

    if (totalCount === 0) {
      setSelectionChance(null);
      return;
    }

    // Difficulty weights
    const difficultyWeights: Record<Difficulty, number> = {
      Easy: 0.2,
      Medium: 0.5,
      Hard: 0.8,
    };

    // Frequency weights
    const frequencyWeights: Record<Frequency, number> = {
      Low: 0.2,
      Medium: 0.5,
      High: 0.8,
      "Very High": 1.0,
    };

    let weightedScore = 0;
    let maxPossibleScore = 0;

    allProblems.forEach((problem) => {
      const problemWeight =
        difficultyWeights[problem.difficulty] *
        frequencyWeights[problem.frequency];
      maxPossibleScore += problemWeight;

      if (solvedProblems[problem.id]) {
        weightedScore += problemWeight;
      }
    });

    const chance =
      maxPossibleScore > 0
        ? Math.min(100, Math.round((weightedScore / maxPossibleScore) * 100))
        : 0;

    setSelectionChance(chance);
  };

  // Filter questions based on frequency
  const allQuestions = getAllQuestions();
  const filteredQuestions = allQuestions.filter((question) => {
    const frequencyOrder: Frequency[] = ["Low", "Medium", "High", "Very High"];
    const questionFreqIndex = frequencyOrder.indexOf(question.frequency);
    const minFreqIndex = frequencyOrder.indexOf(minFrequency);
    return questionFreqIndex >= minFreqIndex;
  });

  const questionsToDisplay =
    viewMode === "all" ? allQuestions : filteredQuestions;

  // Get solved statistics
  const solvedCount = questionsToDisplay.filter(
    (q) => solvedProblems[q.id]
  ).length;
  const totalCount = questionsToDisplay.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Get frequency color
  const getFrequencyColor = (frequency: Frequency): string => {
    switch (frequency) {
      case "Very High":
        return "bg-purple-100 text-purple-800";
      case "High":
        return "bg-blue-100 text-blue-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: Difficulty): string => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Toggle company selection
  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.length > 1
          ? prev.filter((c) => c !== company)
          : prev
        : [...prev, company]
    );
  };

  // Toggle topic selection
  const toggleTopic = (topic: Topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  // Toggle difficulty selection
  const toggleDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.length > 1
          ? prev.filter((d) => d !== difficulty)
          : prev
        : [...prev, difficulty]
    );
  };

  // Get all unique topics
  const allTopics = getAllTopics();

  const hasActiveFilters =
    selectedCompanies.length > 0 ||
    selectedTopics.length > 0 ||
    selectedDifficulties.length > 0 ||
    minFrequency !== "Low";

  const totalActiveFilters =
    selectedCompanies.length +
    selectedTopics.length +
    selectedDifficulties.length;

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="shadow-md overflow-hidden rounded-lg">
        {/* Header with stats */}
        <div className="bg-black py-4">
          <h1 className="text-2xl font-bold text-white">Company Roadmap</h1>
          <p className="mt-1 text-blue-100">
            Filter and practice questions by company, topic, and difficulty
          </p>
        </div>

        {/* Filters Section */}
        <div className="py-6 rounded-lg shadow-lg bg-black">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-white" />
                  <h2 className="text-xl font-semibold text-white">Filters</h2>
                </div>
                {hasActiveFilters && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-white"
                  >
                    {totalActiveFilters} active
                  </Badge>
                )}
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Companies Filter */}
              <div className="space-y-2 ">
                <Label className="text-sm font-medium text-white">
                  Companies
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-10 text-white bg-black"
                      role="combobox"
                    >
                      <span className="truncate">
                        {selectedCompanies.length === 0
                          ? "Select companies"
                          : selectedCompanies.length === 1
                          ? selectedCompanies[0]
                          : `${selectedCompanies.length} companies`}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4 bg-black" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium leading-none text-white">
                          Select Companies
                        </h4>
                        {selectedCompanies.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCompanies([])}
                            className="h-auto p-1 text-xs text-white"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <Separator />
                      <ScrollArea className="h-48">
                        <div className="space-y-3">
                          {Object.keys(companyData).map((company) => (
                            <div
                              key={company}
                              className="flex items-center space-x-2 text-white"
                            >
                              <Checkbox
                                id={`company-${company}`}
                                checked={selectedCompanies.includes(company)}
                                onCheckedChange={() => toggleCompany(company)}
                              />
                              <Label
                                htmlFor={`company-${company}`}
                                className="text-sm font-normal cursor-pointer flex-1"
                              >
                                {company}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      {selectedCompanies.length > 0 && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <p className="text-xs text-muted-foreground">
                              Selected companies:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {selectedCompanies.map((company) => (
                                <Badge
                                  key={company}
                                  variant="secondary"
                                  className="text-xs cursor-pointer hover:bg-secondary/80"
                                  onClick={() => toggleCompany(company)}
                                >
                                  {company}
                                  <X className="ml-1 h-3 w-3" />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Topics Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Topics</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-10 text-white bg-black"
                      role="combobox"
                    >
                      <span className="truncate">
                        {selectedTopics.length === 0
                          ? "Select topics"
                          : selectedTopics.length === 1
                          ? selectedTopics[0]
                          : `${selectedTopics.length} topics`}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 bg-black p-4" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium leading-none text-white">
                          Select Topics
                        </h4>
                        {selectedTopics.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTopics([])}
                            className="h-auto p-1 text-xs text-white"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                      <Separator />
                      <ScrollArea className="h-48">
                        <div className="space-y-3">
                          {allTopics.map((topic) => (
                            <div
                              key={topic}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`topic-${topic}`}
                                checked={selectedTopics.includes(topic)}
                                onCheckedChange={() => toggleTopic(topic)}
                              />
                              <Label
                                htmlFor={`topic-${topic}`}
                                className="text-sm font-normal cursor-pointer text-white flex-1"
                              >
                                {topic}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">
                  Difficulty
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-10 bg-black text-white"
                      role="combobox"
                    >
                      <span className="truncate">
                        {selectedDifficulties.length === 0
                          ? "Select difficulty"
                          : selectedDifficulties.length === 1
                          ? selectedDifficulties[0]
                          : `${selectedDifficulties.length} levels`}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 bg-black text-white p-4"
                    align="start"
                  >
                    <div className="space-y-4">
                      <h4 className="font-medium leading-none">
                        Select Difficulty
                      </h4>
                      <Separator />
                      <div className="space-y-3">
                        {(["Easy", "Medium", "Hard"] as Difficulty[]).map(
                          (difficulty) => (
                            <div
                              key={difficulty}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`difficulty-${difficulty}`}
                                checked={selectedDifficulties.includes(
                                  difficulty
                                )}
                                onCheckedChange={() =>
                                  toggleDifficulty(difficulty)
                                }
                              />
                              <Label
                                htmlFor={`difficulty-${difficulty}`}
                                className="text-sm font-normal cursor-pointer flex-1"
                              >
                                {difficulty}
                              </Label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Advanced Options */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">
                  Options
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-10 bg-black text-white"
                    >
                      <span>Advanced</span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4 bg-black" align="start">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h4 className="font-medium leading-none text-white">
                          Minimum Frequency
                        </h4>
                        <Select
                          value={minFrequency}
                          onValueChange={(value) =>
                            setMinFrequency(value as Frequency)
                          }
                        >
                          <SelectTrigger className="w-full bg-black text-white">
                            <SelectValue className="text-white bg-black" />
                          </SelectTrigger>
                          <SelectContent>
                            {(
                              [
                                "Very High",
                                "High",
                                "Medium",
                                "Low",
                              ] as Frequency[]
                            ).map((freq) => (
                              <SelectItem
                                key={freq}
                                value={freq}
                                className="text-sm"
                              >
                                {freq}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-3 text-white">
                        <h4 className="font-medium leading-none ">View Mode</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {(["filtered", "all"] as const).map((mode) => (
                            <Button
                              key={mode}
                              variant={
                                viewMode === mode ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => setViewMode(mode)}
                              className={`justify-center text-white bg-black ${
                                viewMode === mode
                                  ? "bg-gray-800"
                                  : "bg-black hover:bg-white hover:text-black"
                              }`}
                            >
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2  rounded-lg">
                <span className="text-sm text-white block w-full">
                  Active filters:
                </span>
                {selectedCompanies.map((company) => (
                  <Badge
                    key={`company-${company}`}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleCompany(company)}
                  >
                    {company}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedTopics.map((topic) => (
                  <Badge
                    key={`topic-${topic}`}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedDifficulties.map((difficulty) => (
                  <Badge
                    key={`difficulty-${difficulty}`}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                    onClick={() => toggleDifficulty(difficulty)}
                  >
                    {difficulty}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {minFrequency !== "Low" && (
                  <Badge variant="secondary">Min: {minFrequency}</Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="py-4 bg-black">
          {questionsToDisplay.length === 0 ? (
            <div className="bg-black rounded-lg p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">
                No questions found
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-black">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Topic
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Difficulty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Frequency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20 bg-black">
                  {questionsToDisplay.map((question) => (
                    <tr
                      key={`${question.company}-${question.id}`}
                      className={`hover:bg-white/5 transition-colors ${
                        solvedProblems[question.id] ? "bg-gray-800/50" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <input
                          type="checkbox"
                          checked={!!solvedProblems[question.id]}
                          onChange={() => toggleProblemSolved(question.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-white">
                          {question.title}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-white/80">
                          {question.company}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-white/80">
                          {question.topic}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(
                            question.difficulty
                          )}`}
                        >
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getFrequencyColor(
                            question.frequency
                          )}`}
                        >
                          {question.frequency}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a
                          href={question.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Solve
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyRoadmap;
