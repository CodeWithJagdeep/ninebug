import { useSelector } from "react-redux";
import { useState, useMemo, useCallback } from "react";
import { selectRoadmapState } from "@/Container/reducer/slicers/roadmapSlicer";
import Header from "@/components/common/Header";
import {
  ChevronDown,
  ChevronRight,
  Building2,
  TrendingUp,
  CheckCircle,
  Circle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Difficulty, Frequency, modules, Roadmap } from "@/types/roadmap";
import Footer from "@/components/common/Footer";

interface ITopic {
  title: string;
  companies: string[];
  topic: string;
  difficulty: Difficulty;
  frequency: Frequency;
  slug: string;
}

interface ICompanyBadgeProps {
  company: string;
}

interface ITopicCardProps {
  topic: ITopic;
  isCompleted?: boolean;
  onToggleComplete?: (slug: string) => void;
}

interface IModuleCardProps {
  module: modules;
  isExpanded: boolean;
  onToggleExpand: () => void;
  completedTopics: Set<string>;
  onToggleTopicComplete?: (slug: string) => void;
}

const getDifficultyColor = (difficulty: Difficulty): string => {
  const colorMap = {
    [Difficulty.EASY]: "text-green-400 bg-green-400/10 border-green-400/20",
    [Difficulty.MEDIUM]:
      "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    [Difficulty.HARD]: "text-red-400 bg-red-400/10 border-red-400/20",
  };
  return (
    colorMap[difficulty] || "text-gray-400 bg-gray-400/10 border-gray-400/20"
  );
};

const getFrequencyColor = (frequency: Frequency): string => {
  const colorMap = {
    [Frequency.VERY_HIGH]: "text-red-500 bg-red-500/10 border-red-500/20",
    [Frequency.HIGH]: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    [Frequency.MEDIUM]: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    [Frequency.LOW]: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    [Frequency.RARE]: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  };
  return (
    colorMap[frequency] || "text-gray-400 bg-gray-400/10 border-gray-400/20"
  );
};

const getFrequencyLabel = (frequency: Frequency): string => {
  const labelMap = {
    [Frequency.VERY_HIGH]: "Very High",
    [Frequency.HIGH]: "High",
    [Frequency.MEDIUM]: "Medium",
    [Frequency.LOW]: "Low",
    [Frequency.RARE]: "Rare",
  };
  return labelMap[frequency] || "Unknown";
};

const getDifficultyLabel = (difficulty: Difficulty): string => {
  const labelMap = {
    [Difficulty.EASY]: "Easy",
    [Difficulty.MEDIUM]: "Medium",
    [Difficulty.HARD]: "Hard",
  };
  return labelMap[difficulty] || "Unknown";
};

const CompanyBadge: React.FC<ICompanyBadgeProps> = ({ company }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
    {company}
  </span>
);

const TopicCard: React.FC<ITopicCardProps> = ({
  topic,
  isCompleted = false,
  onToggleComplete,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/problem/${topic.slug}`);
  };

  const handleCompletionToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete?.(topic.slug);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white/5 cursor-pointer border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-200"
      aria-label={`Problem: ${topic.title}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={handleCompletionToggle}
            className="flex-shrink-0 hover:scale-110 transition-transform"
            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-green-400" />
            )}
          </button>
          <div className="flex-1">
            <h3
              className={`font-medium text-white mb-1 ${
                isCompleted ? "line-through opacity-60" : ""
              }`}
            >
              {topic.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm flex-wrap gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                  topic.difficulty
                )}`}
              >
                {getDifficultyLabel(topic.difficulty)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getFrequencyColor(
                  topic.frequency
                )}`}
              >
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {getFrequencyLabel(topic.frequency)}
              </span>
              {topic.topic && (
                <span className="text-gray-400 text-xs px-2 py-1 bg-gray-500/10 rounded-full">
                  {topic.topic}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {topic.companies.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center mb-2">
            <Building2 className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-400">Asked by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.companies.slice(0, 5).map((company) => (
              <CompanyBadge key={company} company={company} />
            ))}
            {topic.companies.length > 5 && (
              <span className="text-xs text-gray-400 px-2 py-1 bg-gray-500/10 rounded-full">
                +{topic.companies.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ModuleCard: React.FC<IModuleCardProps> = ({
  module,
  isExpanded,
  onToggleExpand,
  completedTopics,
  onToggleTopicComplete,
}) => {
  const completedCount = module.topics.filter((topic) =>
    completedTopics.has(topic.slug)
  ).length;

  const totalCount = module.topics.length;

  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={onToggleExpand}
        className="w-full px-6 py-4 hover:bg-white/5 transition-all duration-200 text-left"
        aria-expanded={isExpanded}
        aria-controls={`module-${module._id}-content`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-white" />
              ) : (
                <ChevronRight className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-white mb-1">
                {module.title}
              </h3>
              {module.description && (
                <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                  {module.description}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-400 flex-wrap gap-2">
                <span>{totalCount} problems</span>
                {/* <span className="text-green-400">
                  {moduleStatistics.easy} Easy
                </span>
                <span className="text-yellow-400">
                  {moduleStatistics.medium} Medium
                </span>
                <span className="text-red-400">
                  {moduleStatistics.hard} Hard
                </span>
                {moduleStatistics.veryHigh > 0 && (
                  <span className="text-red-500">
                    {moduleStatistics.veryHigh} Very High
                  </span>
                )}
                {moduleStatistics.high > 0 && (
                  <span className="text-orange-400">
                    {moduleStatistics.high} High Freq
                  </span>
                )} */}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-white">
                {completedCount}/{totalCount}
              </div>
              <div className="text-xs text-gray-400">
                {progressPercentage}% complete
              </div>
            </div>
            <div className="w-24 bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div
          id={`module-${module._id}-content`}
          className="border-t border-white/10 bg-black/20"
        >
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {module.topics.map((topic) => (
                <TopicCard
                  key={topic.slug}
                  topic={topic}
                  isCompleted={completedTopics.has(topic.slug)}
                  onToggleComplete={onToggleTopicComplete}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const RoadmapsPage: React.FC = () => {
  const { roadmaps } = useSelector(selectRoadmapState);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set()
  );

  const currentRoadmap = roadmaps?.[activeTabIndex] as Roadmap;

  const toggleModuleExpansion = useCallback((moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      newSet.has(moduleId) ? newSet.delete(moduleId) : newSet.add(moduleId);
      return newSet;
    });
  }, []);

  const handleTopicCompletionToggle = useCallback((slug: string) => {
    setCompletedTopics((prev) => {
      const newSet = new Set(prev);
      newSet.has(slug) ? newSet.delete(slug) : newSet.add(slug);
      return newSet;
    });
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-21">
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Practice DSA Questions
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed">
            Accelerate your career with essential data structures and algorithms
            problems. Our curated collection includes frequency data and company
            information to help you focus on the most important questions for
            technical interviews.
          </p>
        </section>

        <nav className="mb-8">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {roadmaps.map((roadmap: Roadmap, index: number) => (
                <button
                  key={roadmap._id}
                  onClick={() => setActiveTabIndex(index)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTabIndex === index
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  aria-current={activeTabIndex === index ? "page" : undefined}
                >
                  <span>{roadmap.title}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {currentRoadmap?.description && (
          <section className="mb-8 bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              About this Roadmap
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {currentRoadmap.description}
            </p>
          </section>
        )}

        <section className="space-y-6">
          {currentRoadmap?.modules.map((module) => (
            <ModuleCard
              key={module._id}
              module={module}
              isExpanded={expandedModules.has(module._id)}
              onToggleExpand={() => toggleModuleExpansion(module._id)}
              completedTopics={completedTopics}
              onToggleTopicComplete={handleTopicCompletionToggle}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};
