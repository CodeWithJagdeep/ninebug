"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Building2,
  ChevronDown,
  ChevronRight,
  Code,
  Filter,
  Moon,
  Save,
  Search,
  Settings2,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Enums matching your Mongoose schema
enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

enum Frequency {
  VERY_HIGH = "very-high",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
  RARE = "rare",
}

// Interfaces matching your schema
interface SubTopic {
  title: string;
  companies: string[];
  topic: string;
  difficulty: Difficulty;
  slug: string;
  frequency: Frequency;
}

interface RoadmapTopic {
  _id: string;
  title: string;
  description: string;
  topics: SubTopic[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoadmapModule {
  title: string;
  description: string;
  modules: RoadmapTopic[];
}

// Sample data matching your schema structure
const roadmapData: RoadmapModule = {
  title: "Top 75 LeetCode Questions",
  description: "Essential coding interview questions from top tech companies",
  modules: [
    {
      _id: "array-module",
      title: "Array",
      description: "Master array manipulation and algorithms",
      topics: [
        {
          title: "Two Sum",
          companies: ["Google", "Microsoft", "Amazon"],
          topic: "Array",
          difficulty: Difficulty.EASY,
          slug: "two-sum",
          frequency: Frequency.VERY_HIGH,
        },
        {
          title: "Best Time to Buy and Sell Stock",
          companies: ["Google", "Facebook"],
          topic: "Array",
          difficulty: Difficulty.EASY,
          slug: "best-time-to-buy-and-sell-stock",
          frequency: Frequency.HIGH,
        },
        {
          title: "Maximum Subarray",
          companies: ["Microsoft", "Apple"],
          topic: "Array",
          difficulty: Difficulty.MEDIUM,
          slug: "maximum-subarray",
          frequency: Frequency.HIGH,
        },
        {
          title: "Merge Intervals",
          companies: ["Google", "Microsoft"],
          topic: "Array",
          difficulty: Difficulty.MEDIUM,
          slug: "merge-intervals",
          frequency: Frequency.MEDIUM,
        },
        {
          title: "Trapping Rain Water",
          companies: ["Google", "Amazon"],
          topic: "Array",
          difficulty: Difficulty.HARD,
          slug: "trapping-rain-water",
          frequency: Frequency.MEDIUM,
        },
      ],
      order: 1,
    },
    {
      _id: "linkedlist-module",
      title: "LinkedList",
      description: "Understand linked list operations and patterns",
      topics: [
        {
          title: "Add Two Numbers",
          companies: ["Microsoft", "Facebook"],
          topic: "LinkedList",
          difficulty: Difficulty.MEDIUM,
          slug: "add-two-numbers",
          frequency: Frequency.HIGH,
        },
        {
          title: "Remove Nth Node From End of List",
          companies: ["Google", "Apple"],
          topic: "LinkedList",
          difficulty: Difficulty.MEDIUM,
          slug: "remove-nth-node-from-end-of-list",
          frequency: Frequency.MEDIUM,
        },
        {
          title: "Merge Two Sorted Lists",
          companies: ["Google", "Microsoft", "Amazon"],
          topic: "LinkedList",
          difficulty: Difficulty.EASY,
          slug: "merge-two-sorted-lists",
          frequency: Frequency.HIGH,
        },
      ],
      order: 2,
    },
    {
      _id: "stack-module",
      title: "Stack",
      description: "Learn stack-based problem solving techniques",
      topics: [
        {
          title: "Valid Parentheses",
          companies: ["Microsoft", "Facebook"],
          topic: "Stack",
          difficulty: Difficulty.EASY,
          slug: "valid-parentheses",
          frequency: Frequency.VERY_HIGH,
        },
        {
          title: "Min Stack",
          companies: ["Google", "Amazon"],
          topic: "Stack",
          difficulty: Difficulty.MEDIUM,
          slug: "min-stack",
          frequency: Frequency.MEDIUM,
        },
      ],
      order: 3,
    },
    {
      _id: "tree-module",
      title: "Tree",
      description: "Master tree traversal and manipulation",
      topics: [
        {
          title: "Binary Tree Inorder Traversal",
          companies: ["Google", "Apple"],
          topic: "Tree",
          difficulty: Difficulty.EASY,
          slug: "binary-tree-inorder-traversal",
          frequency: Frequency.HIGH,
        },
        {
          title: "Maximum Depth of Binary Tree",
          companies: ["Microsoft", "Amazon"],
          topic: "Tree",
          difficulty: Difficulty.EASY,
          slug: "maximum-depth-of-binary-tree",
          frequency: Frequency.HIGH,
        },
      ],
      order: 4,
    },
  ],
};

const companies = ["Google", "Microsoft", "Amazon", "Facebook", "Apple"];
const difficulties = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];
const frequencies = [
  Frequency.VERY_HIGH,
  Frequency.HIGH,
  Frequency.MEDIUM,
  Frequency.LOW,
  Frequency.RARE,
];

export default function Component() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<Frequency[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedModules, setExpandedModules] = useState<string[]>([
    "array-module",
  ]); // Array expanded by default
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for black theme
  const [savedRoadmaps, setSavedRoadmaps] = useState<any[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedQuestions");
    const savedRoadmapsData = localStorage.getItem("savedRoadmaps");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedCompleted) {
      setCompletedQuestions(JSON.parse(savedCompleted));
    }
    if (savedRoadmapsData) {
      setSavedRoadmaps(JSON.parse(savedRoadmapsData));
    }
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(
      "completedQuestions",
      JSON.stringify(completedQuestions)
    );
  }, [completedQuestions]);

  useEffect(() => {
    localStorage.setItem("savedRoadmaps", JSON.stringify(savedRoadmaps));
  }, [savedRoadmaps]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company)
        ? prev.filter((c) => c !== company)
        : [...prev, company]
    );
  };

  const handleDifficultyToggle = (difficulty: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleFrequencyToggle = (frequency: Frequency) => {
    setSelectedFrequencies((prev) =>
      prev.includes(frequency)
        ? prev.filter((f) => f !== frequency)
        : [...prev, frequency]
    );
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const toggleQuestionCompletion = (questionSlug: string) => {
    setCompletedQuestions((prev) =>
      prev.includes(questionSlug)
        ? prev.filter((slug) => slug !== questionSlug)
        : [...prev, questionSlug]
    );
  };

  const saveCurrentRoadmap = () => {
    const totalQuestions = roadmapData.modules.reduce(
      (acc, module) => acc + module.topics.length,
      0
    );
    const roadmap = {
      id: Date.now(),
      name: `${roadmapData.title} - ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleDateString(),
      filters: {
        companies: selectedCompanies,
        difficulties: selectedDifficulties,
        frequencies: selectedFrequencies,
        searchQuery,
      },
      completedQuestions,
      totalQuestions,
      completionRate: Math.round(
        (completedQuestions.length / totalQuestions) * 100
      ),
    };

    setSavedRoadmaps((prev) => [...prev, roadmap]);
  };

  const clearAllFilters = () => {
    setSelectedCompanies([]);
    setSelectedDifficulties([]);
    setSelectedFrequencies([]);
    setSearchQuery("");
  };

  const filteredModules = useMemo(() => {
    return roadmapData.modules
      .map((module) => ({
        ...module,
        topics: module.topics.filter((topic) => {
          if (
            searchQuery &&
            !topic.title.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return false;
          }
          if (selectedCompanies.length > 0) {
            const hasMatchingCompany = topic.companies.some((company) =>
              selectedCompanies.includes(company)
            );
            if (!hasMatchingCompany) return false;
          }
          if (selectedDifficulties.length > 0) {
            if (!selectedDifficulties.includes(topic.difficulty)) return false;
          }
          if (selectedFrequencies.length > 0) {
            if (!selectedFrequencies.includes(topic.frequency)) return false;
          }
          return true;
        }),
      }))
      .filter((module) => module.topics.length > 0)
      .sort((a, b) => a.order - b.order);
  }, [
    selectedCompanies,
    selectedDifficulties,
    selectedFrequencies,
    searchQuery,
  ]);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.EASY:
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case Difficulty.MEDIUM:
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case Difficulty.HARD:
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getFrequencyColor = (frequency: Frequency) => {
    switch (frequency) {
      case Frequency.VERY_HIGH:
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case Frequency.HIGH:
        return "bg-orange-400/20 text-orange-300 border-orange-400/30";
      case Frequency.MEDIUM:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case Frequency.LOW:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case Frequency.RARE:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const activeFiltersCount =
    selectedCompanies.length +
    selectedDifficulties.length +
    selectedFrequencies.length;
  const totalQuestions = roadmapData.modules.reduce(
    (acc, module) => acc + module.topics.length,
    0
  );
  const completionRate = Math.round(
    (completedQuestions.length / totalQuestions) * 100
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Filter Bar */}
      <div className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Code className="w-7 h-7 text-orange-500" />
                {roadmapData.title}
              </h1>
              <p className="text-gray-400 text-sm mb-2">
                {roadmapData.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>
                  {filteredModules.reduce(
                    (acc, module) => acc + module.topics.length,
                    0
                  )}{" "}
                  questions found
                </span>
                <span>•</span>
                <span className="text-orange-400">
                  {completedQuestions.length} completed ({completionRate}%)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}

              {/* Save Roadmap */}
              <Button
                onClick={saveCurrentRoadmap}
                className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Save className="w-4 h-4" />
                Save Progress
              </Button>

              {/* Advanced Filters Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                  >
                    <Settings2 className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-1 bg-orange-600 text-white">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-96 bg-black px-6 border-gray-800">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-white">
                      <Filter className="w-5 h-5 text-orange-500" />
                      Advanced Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Companies */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-orange-500" />
                        Companies
                      </Label>
                      <div className="grid grid-cols-1 gap-3">
                        {companies.map((company) => (
                          <div
                            key={company}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={`company-${company}`}
                              checked={selectedCompanies.includes(company)}
                              onCheckedChange={() =>
                                handleCompanyToggle(company)
                              }
                              className="border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                            />
                            <Label
                              htmlFor={`company-${company}`}
                              className="text-sm cursor-pointer flex-1 text-gray-300"
                            >
                              {company}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    {/* Difficulties */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block">
                        Difficulty
                      </Label>
                      <div className="grid grid-cols-1 gap-3">
                        {difficulties.map((difficulty) => (
                          <div
                            key={difficulty}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={`difficulty-${difficulty}`}
                              checked={selectedDifficulties.includes(
                                difficulty
                              )}
                              onCheckedChange={() =>
                                handleDifficultyToggle(difficulty)
                              }
                              className="border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                            />
                            <Label
                              htmlFor={`difficulty-${difficulty}`}
                              className="text-sm cursor-pointer flex-1 text-gray-300 capitalize"
                            >
                              {difficulty}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    {/* Frequencies */}
                    <div>
                      <Label className="text-sm font-medium text-white mb-3 block flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        Frequency
                      </Label>
                      <div className="grid grid-cols-1 gap-3">
                        {frequencies.map((frequency) => (
                          <div
                            key={frequency}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={`frequency-${frequency}`}
                              checked={selectedFrequencies.includes(frequency)}
                              onCheckedChange={() =>
                                handleFrequencyToggle(frequency)
                              }
                              className="border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                            />
                            <Label
                              htmlFor={`frequency-${frequency}`}
                              className="text-sm cursor-pointer flex-1 text-gray-300 capitalize"
                            >
                              {frequency.replace("-", " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Saved Roadmaps */}
                    {savedRoadmaps.length > 0 && (
                      <>
                        <Separator className="bg-gray-800" />
                        <div>
                          <Label className="text-sm font-medium text-white mb-3 block">
                            Saved Progress
                          </Label>
                          <div className="space-y-2">
                            {savedRoadmaps.map((roadmap) => (
                              <div
                                key={roadmap.id}
                                className="p-3 border border-gray-800 rounded-lg bg-gray-800/50"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium text-white">
                                      {roadmap.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                      {roadmap.date} • {roadmap.completionRate}%
                                      complete
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {activeFiltersCount > 0 && (
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-orange-500"
              />
            </div>

            {/* Quick Company Filters */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-300 whitespace-nowrap">
                Companies:
              </Label>
              {companies.slice(0, 3).map((company) => (
                <Button
                  key={company}
                  variant={
                    selectedCompanies.includes(company) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleCompanyToggle(company)}
                  className={
                    selectedCompanies.includes(company)
                      ? "text-xs bg-orange-600 hover:bg-orange-700 text-white"
                      : "text-xs border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }
                >
                  {company}
                </Button>
              ))}
            </div>

            {/* Quick Difficulty Filters */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-gray-300 whitespace-nowrap">
                Difficulty:
              </Label>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={
                    selectedDifficulties.includes(difficulty)
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => handleDifficultyToggle(difficulty)}
                  className={
                    selectedDifficulties.includes(difficulty)
                      ? "text-xs bg-orange-600 hover:bg-orange-700 text-white capitalize"
                      : "text-xs border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 capitalize"
                  }
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-800">
              <span className="text-sm text-gray-400">Active filters:</span>
              {selectedCompanies.map((company) => (
                <Badge
                  key={company}
                  className="gap-1 bg-gray-800 text-gray-300 border-gray-700"
                >
                  <Building2 className="w-3 h-3" />
                  {company}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => handleCompanyToggle(company)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              {selectedDifficulties.map((difficulty) => (
                <Badge
                  key={difficulty}
                  className="gap-1 bg-gray-800 text-gray-300 border-gray-700 capitalize"
                >
                  {difficulty}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => handleDifficultyToggle(difficulty)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              {selectedFrequencies.map((frequency) => (
                <Badge
                  key={frequency}
                  className="gap-1 bg-gray-800 text-gray-300 border-gray-700 capitalize"
                >
                  <Zap className="w-3 h-3" />
                  {frequency.replace("-", " ")}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => handleFrequencyToggle(frequency)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-400 hover:text-white"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Expandable Modules */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {filteredModules.map((module) => (
            <Collapsible
              key={module._id}
              open={expandedModules.includes(module._id)}
              onOpenChange={() => toggleModuleExpansion(module._id)}
            >
              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 hover:bg-gray-800 cursor-pointer transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      {expandedModules.includes(module._id) ? (
                        <ChevronDown className="w-5 h-5 text-orange-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-orange-500" />
                      )}
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          {module.title}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {module.description}
                        </p>
                      </div>
                      <Badge className="bg-orange-600/20 text-orange-400 border-orange-600/30">
                        {module.topics.length} questions
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {
                          module.topics.filter((topic) =>
                            completedQuestions.includes(topic.slug)
                          ).length
                        }{" "}
                        / {module.topics.length} completed
                      </span>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-t border-gray-800">
                    <div className="p-4 space-y-4">
                      {module.topics.map((topic) => (
                        <Card
                          key={topic.slug}
                          className={`hover:shadow-lg transition-all cursor-pointer border-l-4 ${
                            completedQuestions.includes(topic.slug)
                              ? "border-l-orange-500 bg-orange-500/5"
                              : "border-l-gray-700"
                          } bg-gray-800 border-gray-700`}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={completedQuestions.includes(
                                    topic.slug
                                  )}
                                  onCheckedChange={() =>
                                    toggleQuestionCompletion(topic.slug)
                                  }
                                  className="border-gray-600 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                />
                                <CardTitle
                                  className={`text-lg font-semibold ${
                                    completedQuestions.includes(topic.slug)
                                      ? "text-orange-400 line-through"
                                      : "text-white"
                                  }`}
                                >
                                  {topic.title}
                                </CardTitle>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getDifficultyColor(
                                    topic.difficulty
                                  )}
                                >
                                  {topic.difficulty}
                                </Badge>
                                <Badge
                                  className={getFrequencyColor(topic.frequency)}
                                >
                                  {topic.frequency.replace("-", " ")}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardFooter className="pt-0">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Building2 className="w-4 h-4" />
                              <span>Asked by:</span>
                              <div className="flex gap-1">
                                {topic.companies.map((company, index) => (
                                  <span key={company}>
                                    <span className="font-medium text-gray-300">
                                      {company}
                                    </span>
                                    {index < topic.companies.length - 1 && ", "}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}

          {filteredModules.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-400">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
