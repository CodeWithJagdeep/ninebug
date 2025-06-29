import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  Route,
  List,
  Link,
  Map,
  ChartLine,
  Search,
  Cog,
  Building,
  Dice1,
  CalendarDays,
  Shuffle,
  Clock,
  Timer,
  Flame,
  Star,
  TrendingUp,
  Zap,
  Target,
  Trophy,
  Users,
  ChevronUp,
  ChevronDown,
  Lock,
} from "lucide-react";
import Problemset from "../Problem/Problemset";
import { FcGoogle } from "react-icons/fc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TbArrowNarrowDown } from "react-icons/tb";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const roadmapTopics = [
  {
    title: "Arrays & Strings",
    description: "Foundation data structures",
    icon: List,
    questions: 25,
    gradient: "from-violet-500 via-purple-500 to-blue-500",
    badgeColor: "bg-gradient-to-r from-violet-500 to-purple-500",
    difficulty: "Beginner",
    popularity: 95,
    mockQuestions: [
      {
        title: "Two Sum Problem",
        difficulty: "Easy",
        color: "text-emerald-400",
      },
      {
        title: "Maximum Subarray",
        difficulty: "Medium",
        color: "text-amber-400",
      },
      { title: "Merge Intervals", difficulty: "Hard", color: "text-rose-400" },
    ],
  },
  {
    title: "Linked Lists",
    description: "Pointer manipulation mastery",
    icon: Link,
    questions: 18,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    difficulty: "Intermediate",
    popularity: 87,
    mockQuestions: [
      {
        title: "Reverse Linked List",
        difficulty: "Easy",
        color: "text-emerald-400",
      },
      { title: "Detect Cycle", difficulty: "Medium", color: "text-amber-400" },
      {
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        color: "text-rose-400",
      },
    ],
  },
  {
    title: "Trees & Graphs",
    description: "Hierarchical data exploration",
    icon: Map,
    questions: 32,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    badgeColor: "bg-gradient-to-r from-rose-500 to-pink-500",
    difficulty: "Advanced",
    popularity: 92,
    mockQuestions: [
      {
        title: "Binary Tree Traversal",
        difficulty: "Easy",
        color: "text-emerald-400",
      },
      { title: "Graph BFS/DFS", difficulty: "Medium", color: "text-amber-400" },
      {
        title: "Dijkstra's Algorithm",
        difficulty: "Hard",
        color: "text-rose-400",
      },
    ],
  },
  {
    title: "Dynamic Programming",
    description: "Optimization & memoization",
    icon: TrendingUp,
    questions: 28,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    badgeColor: "bg-gradient-to-r from-orange-500 to-red-500",
    difficulty: "Expert",
    popularity: 78,
    mockQuestions: [
      {
        title: "Fibonacci Sequence",
        difficulty: "Easy",
        color: "text-emerald-400",
      },
      {
        title: "Longest Common Subsequence",
        difficulty: "Medium",
        color: "text-amber-400",
      },
      { title: "Edit Distance", difficulty: "Hard", color: "text-rose-400" },
    ],
  },
  {
    title: "Algorithms",
    description: "Sorting, searching & more",
    icon: Zap,
    questions: 22,
    gradient: "from-amber-500 via-yellow-500 to-lime-500",
    badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-500",
    difficulty: "Intermediate",
    popularity: 89,
    mockQuestions: [
      { title: "Binary Search", difficulty: "Easy", color: "text-emerald-400" },
      {
        title: "Quick Sort Implementation",
        difficulty: "Medium",
        color: "text-amber-400",
      },
      {
        title: "Search in Rotated Array",
        difficulty: "Hard",
        color: "text-rose-400",
      },
    ],
  },
  {
    title: "System Design",
    description: "Scalable architecture patterns",
    icon: Cog,
    questions: 35,
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    badgeColor: "bg-gradient-to-r from-indigo-500 to-blue-500",
    difficulty: "Expert",
    popularity: 84,
    mockQuestions: [
      {
        title: "Design URL Shortener",
        difficulty: "Medium",
        color: "text-amber-400",
      },
      {
        title: "Design Chat System",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Design Search Engine",
        difficulty: "Hard",
        color: "text-rose-400",
      },
    ],
  },
];

const companies = [
  {
    name: "Google",
    questions: 67,
    letter: "G",
    logo: "🔍",
    gradient: "from-blue-500 via-red-500 via-yellow-500 to-green-500",
    tier: "FAANG",
    difficulty: "Expert",
    successRate: 12,
    mockQuestions: [
      {
        title: "Page Rank Algorithm",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "MapReduce Implementation",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Search Autocomplete System",
        difficulty: "Medium",
        color: "text-amber-400",
      },
    ],
  },
  {
    name: "Meta",
    questions: 54,
    letter: "M",
    logo: "📘",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    tier: "FAANG",
    difficulty: "Expert",
    successRate: 15,
    mockQuestions: [
      {
        title: "News Feed Ranking",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Friend Graph Algorithm",
        difficulty: "Medium",
        color: "text-amber-400",
      },
      {
        title: "Real-time Messaging",
        difficulty: "Hard",
        color: "text-rose-400",
      },
    ],
  },
  {
    name: "Amazon",
    questions: 73,
    letter: "A",
    logo: "📦",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    tier: "FAANG",
    difficulty: "Expert",
    successRate: 18,
    mockQuestions: [
      {
        title: "Two Day Delivery System",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Prime Video Streaming",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Alexa Voice Processing",
        difficulty: "Medium",
        color: "text-amber-400",
      },
    ],
  },
  {
    name: "Apple",
    questions: 42,
    letter: "🍎",
    logo: "🍎",
    gradient: "from-slate-600 via-gray-600 to-zinc-600",
    tier: "FAANG",
    difficulty: "Expert",
    successRate: 10,
    mockQuestions: [
      {
        title: "iOS Performance Optimization",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Core ML Implementation",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "App Store Algorithm",
        difficulty: "Medium",
        color: "text-amber-400",
      },
    ],
  },
  {
    name: "Microsoft",
    questions: 58,
    letter: "MS",
    logo: "🪟",
    gradient: "from-blue-600 via-cyan-500 to-teal-500",
    tier: "Big Tech",
    difficulty: "Advanced",
    successRate: 22,
    mockQuestions: [
      {
        title: "Azure Load Balancing",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Office 365 Sync",
        difficulty: "Medium",
        color: "text-amber-400",
      },
      {
        title: "Teams Video Calling",
        difficulty: "Hard",
        color: "text-rose-400",
      },
    ],
  },
  {
    name: "Netflix",
    questions: 39,
    letter: "N",
    logo: "🎬",
    gradient: "from-red-600 via-rose-500 to-pink-500",
    tier: "Streaming",
    difficulty: "Advanced",
    successRate: 25,
    mockQuestions: [
      {
        title: "Content Delivery Network",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Recommendation Engine",
        difficulty: "Hard",
        color: "text-rose-400",
      },
      {
        title: "Video Encoding Pipeline",
        difficulty: "Medium",
        color: "text-amber-400",
      },
    ],
  },
];

const TopicCard = ({ topic }: { topic: (typeof roadmapTopics)[0] }) => {
  const IconComponent = topic.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 hover:border-white/20 transition-all duration-500 group backdrop-blur-sm">
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${topic.gradient
              .split(" ")
              .join(", ")})`,
          }}
        />

        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div
                className={`w-14 h-14 bg-gradient-to-r ${topic.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-black/25`}
              >
                <IconComponent className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-xl font-bold text-white">
                    {topic.title}
                  </h4>
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-600 text-slate-400"
                  >
                    {topic.difficulty}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {topic.description}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span className="text-slate-400 text-xs">
                      {topic.popularity}% popularity
                    </span>
                  </div>
                  <div
                    className={`${topic.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm`}
                  >
                    {topic.questions} Problems
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="space-y-3 blur-[2px] group-hover:blur-[3px] transition-all duration-300">
              {topic.mockQuestions.map((question, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-800/60 rounded-xl border border-slate-700/50"
                >
                  <span className="text-slate-300 font-medium">
                    {question.title}
                  </span>
                  <Badge
                    variant="outline"
                    className={`${question.color} border-current/20 text-xs`}
                  >
                    {question.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent flex items-end justify-center pb-6">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Zap className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CompanyCard = ({ key, company }: any) => {
  const [expanded, setExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = { isAuthenticated: false };
  const { t } = useTranslation("preview");
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log("Translation test:", {
    signInRequired: t("preview.signInRequired"),
    signInMessage: t("preview.signInMessage"),
    continueWithGoogle: t("preview.continueWithGoogle"),
  });
  return (
    <>
      <motion.div
        variants={itemVariants}
        key={key}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative overflow-hidden cursor-pointer bg-black transition-all duration-500 group backdrop-blur-sm">
          <div className="hover:bg-white/5 py-2 px-6 relative z-0 border flex items-center justify-between border-white/10">
            {/* Company Information Section */}
            <div className="flex items-center justify-between py-5 w-full">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {company.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-blue-200 text-sm">
                      <Target className="w-4 h-4" />
                      <span>{company.successRate}% Success Rate</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-200 text-sm">
                      <Trophy className="w-4 h-4" />
                      <span>{company.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Questions Section */}

            {/* Expand/Collapse Button */}
            <div className="flex justify-end w-full mt-4">
              <Button
                className="border border-white text-white font-semibold px-6 py-3 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
                <TbArrowNarrowDown
                  className={`transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          
          className="overflow-hidden w-full px-8 relative"
        >
          <div className="inset-0 flex items-center justify-center z-10">
            <div className="bg-black backdrop-blur-md p-8 ">
              <div className="flex flex-col items-center text-center space-y-6">
                <Lock className="w-12 h-12 text-[#fc3830]" />
                <h2 className="text-2xl font-bold text-white">
                  {t("preview.signInRequired")}
                </h2>
                <p className="text-gray-300">{t("preview.signInMessage")}</p>
                <div className="flex space-x-4 w-full">
                  <div className="py-3 px-7 cursor-pointer border border-white/70 w-full rounded-lg flex items-center justify-between text-white/80">
                    <FcGoogle size={23} />
                    <span className="ml-3 text-base">
                      {t("preview.continueWithGoogle")}
                    </span>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default function ProblemPreview() {
  const { t } = useTranslation();
  return (
    <div className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <section
        id="companies"
        aria-labelledby="companies-heading"
        className="relative py-10 px-4 sm:px-6 md:px-10 lg:px-24"
      >
        <div className="mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left mb-10"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-2 mb-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-white text-sm font-medium">
                {t("preview.practicePlatform")}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-0 leading-tight">
              {t("preview.master")}{" "}
              <span className="bg-[#ed7519] bg-clip-text text-transparent">
                {t("preview.codingInterviews")}
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed">
              {t("preview.practiceDescription")}
            </p>
            <div className="flex flex-wrap gap-4 sm:gap-8 items-center justify-start mt-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-slate-400">50k+ Developers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-slate-400">95% Success Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span className="text-slate-400">Industry Approved</span>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="roadmap" className="w-full">
            <div className="w-full overflow-x-auto">
              <TabsList className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-none h-12">
                <TabsTrigger
                  value="roadmap"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-5 h-full text-slate-400 hover:text-white transition-all duration-300"
                >
                  <Route className="mr-2" size={18} />
                  {t("preview.learningRoadmap")}
                </TabsTrigger>
                <TabsTrigger
                  value="companies"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-8 py-4 text-slate-400 hover:text-white transition-all duration-300"
                >
                  <Building className="mr-2" size={18} />
                  {t("preview.companyQuestions")}
                </TabsTrigger>
                <TabsTrigger
                  value="random"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-8 py-4 text-slate-400 hover:text-white transition-all duration-300"
                >
                  <Shuffle className="mr-2" size={18} />
                  {t("preview.randomPractice")}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="roadmap">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 "
              >
                <Problemset />
              </motion.div>
            </TabsContent>

            <TabsContent value="companies">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {companies.map((company, index) => (
                  <CompanyCard
                    key={index}
                    company={company}
                    isAuthenticated={false}
                  />
                ))}
                <div className="relative overflow-hidden cursor-pointer bg-black transition-all duration-500 group backdrop-blur-sm">
                  <div className="hover:bg-white/5 py-2 px-6 relative z-0 border flex items-center justify-between border-white/10">
                    {/* Company Information Section */}
                    <div className="flex items-center justify-center py-5 w-full">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-xl font-bold text-center text-white">
                            {t("preview.exploreMoreCompanies")}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="random">
              <div className="grid grid-cols-1 gap-6 mb-12">
                {/* Daily Challenge */}
                <div className="bg-sblack border border-white/30 rounded-lg shadow-md">
                  <div className="p-6 flex items-center justify-between  w-full">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                        <CalendarDays className="text-orange-500" size={21} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">
                          {t("preview.dailyChallenge")}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {t("preview.dailyChallengeDescription")}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 font-medium rounded-md">
                        {t("preview.startTodaysChallenge")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-sblack border border-white/30 rounded-lg shadow-md">
                  <div className="p-6 flex items-center justify-between  w-full">
                    <div className="flex items-center ">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                        <Shuffle className="text-teal-500" size={21} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">
                          {t("preview.randomMix")}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {t("preview.randomMix")}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button className="border-orange-600 border hover:bg-orange-700 text-white px-6 py-2 font-medium rounded-md">
                        {t("preview.shuffleNow")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-sblack border border-white/30 rounded-lg shadow-md">
                  <div className="p-6 flex items-center justify-between  w-full">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                        <Clock className="text-red-400" size={18} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">
                          {t("preview.minuteSprint")}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {t("preview.sprintDescription")}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button className="w-full px-5 bg-white border border-white hover:bg-green-700 text-black text-sm font-medium py-2 rounded-md">
                        {t("preview.startSprint")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-sblack border border-white/30 rounded-lg shadow-md">
                  <div className="p-6 flex items-center justify-between  w-full">
                    <div className="flex items-center ">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                        <Shuffle className="text-teal-500" size={21} />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white">
                          {t("preview.randomMix")}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {t("preview.curatedSelection")}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <button className="border-orange-600 border hover:bg-orange-700 text-white px-6 py-2 font-medium rounded-md">
                        {t("preview.startSprint")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
