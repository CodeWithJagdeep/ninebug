import React, { useState } from "react";
import {
  User,
  Trophy,
  Calendar,
  Code,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Crown,
  Award,
  TrendingUp,
  BarChart3,
  Globe,
  Link,
  Github,
  FileText,
  List,
  Play,
  Eye,
  Star,
  Hash,
  Clock,
  CheckCircle,
  Circle,
  Target,
  Zap,
  Medal,
  Activity,
  Flame,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  XCircle,
  HardDrive,
  AlertCircle,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import StreakCalendar from "./CodingActivity";
import Header from "@/components/common/Header";
import PanelHeader from "@/components/dashboard/Pannelheader";

export default function CodingDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const skillsData = {
    advanced: [
      { name: "Dynamic Programming", count: 4, progress: 30 },
      { name: "Divide and Conquer", count: 4, progress: 35 },
      { name: "Union Find", count: 2, progress: 20 },
    ],
    intermediate: [
      { name: "Binary Search", count: 16, progress: 65 },
      { name: "Math", count: 13, progress: 55 },
      { name: "Hash Table", count: 12, progress: 50 },
    ],
    fundamental: [
      { name: "Array", count: 42, progress: 80 },
      { name: "Two Pointers", count: 16, progress: 60 },
      { name: "Sorting", count: 15, progress: 55 },
    ],
  };

  const recentSubmissions = [
    {
      id: "sub_001",
      problem: "Contains Duplicate",
      timeAgo: "2 hours ago",
      status: "AC",
      difficulty: "Easy",
      language: "Python3",
    },
    {
      id: "sub_002",
      problem: "Add Two Numbers",
      timeAgo: "1 day ago",
      status: "WA",
      difficulty: "Medium",
      language: "TypeScript",
    },
    {
      id: "sub_003",
      problem: "Two Sum",
      timeAgo: "3 days ago",
      status: "AC",
      difficulty: "Easy",
      language: "JavaScript",
    },
    {
      id: "sub_004",
      problem: "Ransom Note",
      timeAgo: "1 week ago",
      status: "AC",
      difficulty: "Easy",
      language: "Python3",
    },
    {
      id: "sub_005",
      problem: "3Sum",
      timeAgo: "2 weeks ago",
      status: "TLE",
      difficulty: "Medium",
      language: "Java",
    },
    {
      id: "sub_006",
      problem: "Container With Most Water",
      timeAgo: "3 weeks ago",
      status: "AC",
      difficulty: "Medium",
      language: "C++",
    },
    {
      id: "sub_007",
      problem: "Longest Substring Without Repeating Characters",
      timeAgo: "1 month ago",
      status: "RE",
      difficulty: "Medium",
      language: "Python3",
    },
    {
      id: "sub_008",
      problem: "Binary Search",
      timeAgo: "2 months ago",
      status: "AC",
      difficulty: "Easy",
      language: "Go",
    },
    {
      id: "sub_009",
      problem: "Sliding Window Maximum",
      timeAgo: "3 months ago",
      status: "MLE",
      difficulty: "Hard",
      language: "Python3",
    },
    {
      id: "sub_010",
      problem: "Merge k Sorted Lists",
      timeAgo: "4 months ago",
      status: "AC",
      difficulty: "Hard",
      language: "Java",
    },
  ];

  const ProfileHeader = () => (
    <div className="bg-black rounded-xl shadow-sm border border-white/30 p-6 mb-6">
      <div className="flex items-start space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">JS</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            <Trophy className="w-3 h-3 inline mr-1" />
            71
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-2">
            <h1 className="text-2xl font-bold text-white">Jagdeep Singh</h1>
            <span className="text-white/90 text-sm">@Jagdeep__singh</span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Medal className="w-4 h-4 text-yellow-500" />
              <span className="text-white/90">Rank: 1,569,349</span>
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <span className="text-white">India</span>
            </div>
          </div>
          <p className="text-white/90 mb-4 max-w-3xl text-sm leading-relaxed">
            For the past 2 years, I've been diving deeper into algorithms and
            data structures, constantly learning and growing. My Computer
            Applications degree from Dibrugarh University provided the
            foundation, but my passion for problem-solving keeps me engaged in
            daily coding challenges.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Link className="w-4 h-4" />
              <span>jagdeep-portfolio.web.app</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              <Github className="w-4 h-4" />
              <span>WorkwithJagdeep</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Edit Profile
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors text-sm font-medium">
            Share Profile
          </button>
        </div>
      </div>
    </div>
  );

  const StatsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      <div className="bg-black rounded-xl border border-white/40 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">
              Problems Solved
            </h3>
            <p className="text-2xl font-bold text-[#fa6600] mt-1">71</p>
            <p className="text-xs text-white/70 mt-1">Acceptance: 39.07%</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 rounded-full"
            style={{ width: "39.07%" }}
          ></div>
        </div>
      </div>

      <div className="bg-black rounded-xl border border-white/40 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white/90 uppercase tracking-wider">
              Active Days
            </h3>
            <p className="text-2xl font-bold text-[#9811fa] mt-1">9</p>
            <p className="text-xs text-white/70 mt-1">Current streak: 3 days</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <Flame className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div>

      <div className="bg-black rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider">
              Contests
            </h3>
            <p className="text-2xl font-bold text-[#fa6600] mt-1">2</p>
            <p className="text-xs text-white/70 mt-1">Best rank: 5,324</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-lg">
            <Award className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-600 rounded-full"
            style={{ width: "20%" }}
          ></div>
        </div>
      </div>
      <div className="bg-black rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white uppercase tracking-wider">
              Reputation
            </h3>
            <p className="text-2xl font-bold text-[#fa6600] mt-1">12</p>
            <p className="text-xs text-white/70 mt-1">Last week</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Star className="w-6 h-6 text-white mx-auto mb-2" />
          </div>
        </div>
        <div className="mt-3 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-600 rounded-full"
            style={{ width: "20%" }}
          ></div>
        </div>
      </div>
    </div>
  );

  const ProblemStats = () => {
    const difficultyData = [
      {
        level: "Easy",
        color: "green",
        solved: 44,
        total: 883,
      },
      {
        level: "Medium",
        color: "yellow",
        solved: 25,
        total: 1868,
      },
      {
        level: "Hard",
        color: "red",
        solved: 2,
        total: 845,
      },
    ];

    return (
      <div className="bg-black rounded-xl shadow-sm mb-6 py-4 ">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-white/70" />
          Problem Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficultyData.map(({ level, color, solved, total }) => {
            const percentage = ((solved / total) * 100).toFixed(1);
            const remaining = total - solved;

            return (
              <div
                key={level}
                className="border border-white/30 rounded-lg p-4 bg-white/5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 bg-${color}-500 rounded-full mr-2`}
                    ></div>
                    <span className="font-medium text-white">{level}</span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {solved}/{total}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${color}-500 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-white">
                  <span>{percentage}% solved</span>
                  <span>{remaining} remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const SkillsSection = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-gray-500" />
        Skills Breakdown
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-medium text-red-600">Advanced</h4>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              3 skills
            </span>
          </div>
          <div className="space-y-3">
            {skillsData.advanced.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{skill.name}</span>
                  <span>{skill.count} problems</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-medium text-yellow-600">
              Intermediate
            </h4>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              3 skills
            </span>
          </div>
          <div className="space-y-3">
            {skillsData.intermediate.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{skill.name}</span>
                  <span>{skill.count} problems</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-medium text-green-600">
              Fundamental
            </h4>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              3 skills
            </span>
          </div>
          <div className="space-y-3">
            {skillsData.fundamental.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{skill.name}</span>
                  <span>{skill.count} problems</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  interface Submission {
    id: string;
    problem: string;
    difficulty: "Easy" | "Medium" | "Hard";
    language: string;
    timeAgo: string;
    status: "AC" | "WA" | "TLE" | "MLE" | "RE" | "CE";
  }

  const RecentActivity = ({
    submissions = [],
  }: {
    submissions: Submission[];
  }) => {
    const statusConfig = {
      AC: {
        bg: "bg-green-900/30",
        text: "text-green-400",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Accepted",
      },
      WA: {
        bg: "bg-red-900/30",
        text: "text-red-400",
        icon: <XCircle className="w-4 h-4" />,
        label: "Wrong Answer",
      },
      TLE: {
        bg: "bg-amber-900/30",
        text: "text-amber-400",
        icon: <Clock className="w-4 h-4" />,
        label: "Time Limit Exceeded",
      },
      MLE: {
        bg: "bg-purple-900/30",
        text: "text-purple-400",
        icon: <HardDrive className="w-4 h-4" />,
        label: "Memory Limit Exceeded",
      },
      RE: {
        bg: "bg-orange-900/30",
        text: "text-orange-400",
        icon: <AlertCircle className="w-4 h-4" />,
        label: "Runtime Error",
      },
      CE: {
        bg: "bg-blue-900/30",
        text: "text-blue-400",
        icon: <Code className="w-4 h-4" />,
        label: "Compilation Error",
      },
    };

    const difficultyColors = {
      Easy: "bg-green-500",
      Medium: "bg-yellow-500",
      Hard: "bg-red-500",
    };

    return (
      <section className="bg-black rounded-lg border border-white/10 shadow-sm">
        <header className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-400" />
            Recent Activity
          </h2>
          <a
            href="#"
            className="text-sm text-orange-400 hover:underline hover:text-orange-300 transition-colors"
          >
            View All
          </a>
        </header>

        {submissions.length === 0 ? (
          <div className="p-6 pt-2 text-center text-white/50 text-sm">
            No recent activity found
          </div>
        ) : (
          <ul className="divide-y divide-white/5">
            {submissions.map((submission) => (
              <li
                key={submission.id}
                className="px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        statusConfig[submission.status].bg
                      }`}
                    >
                      <div className={statusConfig[submission.status].text}>
                        {statusConfig[submission.status].icon}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-white/90 group-hover:text-white transition-colors">
                        {submission.problem}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            difficultyColors[submission.difficulty]
                          }`}
                        />
                        <span className="text-xs text-white/60">
                          {submission.difficulty} • {submission.language}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            statusConfig[submission.status].bg
                          } ${statusConfig[submission.status].text}`}
                        >
                          {statusConfig[submission.status].label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <time
                    className="text-sm text-white/40 whitespace-nowrap group-hover:text-white/60 transition-colors"
                    dateTime={submission.timeAgo}
                  >
                    {submission.timeAgo}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  };

  return (
    <>
      <StreakCalendar />
      <StatsGrid />
      <ProblemStats />

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div>
          <RecentActivity submissions={recentSubmissions as Submission[]} />
        </div>
      </div>
    </>
  );
}
