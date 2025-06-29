import {
  LayoutDashboard,
  Target,
  Bot,
  Briefcase,
  GraduationCap,
  BarChart2,
  FileText,
  BookOpen,
  Users,
  HelpCircle,
  Settings,
  LogOut,
  Flame,
  BrainCircuit,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-80 bg-black text-white p-3 sticky top-20 h-screen overflow-y-auto">
    {/* Main Navigation */}
    <nav className="mt-2 p-3 border border-white/30 rounded-md">
      <div className="space-y-1 px-2 py-3">
        <Link
          to="/in/dashboard"
          className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/in/problems"
          className="flex items-center px-3 py-2 rounded-lg transition-colors"
        >
          <Target className="w-5 h-5 mr-3 text-[#fa6600]" />
          <span>Practice Problems</span>
          <span className="ml-auto text-xs text-gray-400">120+</span>
        </Link>
        <a
          href="#"
          className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Bot className="w-5 h-5 mr-3 text-gray-400" />
          <span>AI Mentor</span>
        </a>
        <Link
          to="/in/practice/company"
          className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
          <span>Company Prep</span>
          <span className="ml-auto text-xs text-gray-400">FAANG</span>
        </Link>
        <a
          href="#"
          className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <GraduationCap className="w-5 h-5 mr-3 text-gray-400" />
          <span>Learning Paths</span>
        </a>
      </div>

      {/* User Section */}
      <div className="px-4 py-3 border-t border-gray-800 mt-2">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">JS</span>
          </div>
          <div>
            <div className="font-medium">Jagdeep Singh</div>
            <div className="text-xs text-gray-400">Free Member</div>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default Sidebar;
