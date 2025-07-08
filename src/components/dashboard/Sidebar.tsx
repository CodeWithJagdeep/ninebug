import {
  LayoutDashboard,
  Target,
  Bot,
  Briefcase,
  BarChart2,
  BookOpen,
  Trophy,
  BrainCircuit,
  TrendingUp,
  PlayCircle,
  Settings,
  HelpCircle,
  LogOut,
  Flame,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  isActive?: boolean;
}

const NavItem = ({
  to,
  icon,
  label,
  badge,
  isActive = false,
}: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
      isActive ? "bg-slate-800/30" : "hover:bg-slate-800/70"
    }`}
  >
    <span
      className={`w-5 h-5 mr-3 ${
        isActive ? "text-orange-500" : "text-slate-400 group-hover:text-white"
      }`}
    >
      {icon}
    </span>
    <span className="font-medium">{label}</span>
    {badge && (
      <span
        className={`ml-auto text-xs px-2 py-1 rounded-full ${
          isActive ? "bg-orange-500/20 text-orange-400" : "text-slate-400"
        }`}
      >
        {badge}
      </span>
    )}
    {!badge && (
      <ChevronRight className="w-4 h-4 ml-auto text-slate-500 group-hover:text-white" />
    )}
  </Link>
);

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
}

const NavSection = ({ title, children }: NavSectionProps) => (
  <div className="mb-4">
    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
      {title}
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);

const UserProfile = () => (
  <div className="flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 cursor-pointer">
    <div className="relative">
      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-white">JS</span>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
    </div>
    <div className="flex-1">
      <div className="font-semibold text-white">Jagdeep Singh</div>
      <div className="text-xs text-slate-400 flex items-center">
        <span>Free Member</span>
        <Zap className="w-3 h-3 ml-1 text-orange-400" />
      </div>
    </div>
    <button className="p-1 hover:bg-slate-700 rounded-lg transition-colors">
      <LogOut className="w-4 h-4 text-slate-400" />
    </button>
  </div>
);

const UpgradeBanner = () => (
  <div className="mt-3 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
    <div className="flex items-center space-x-2 mb-2">
      <Flame className="w-4 h-4 text-orange-400" />
      <span className="text-sm font-semibold text-orange-400">
        Upgrade to Pro
      </span>
    </div>
    <p className="text-xs text-slate-300 mb-2">
      Unlock unlimited practice, AI features, and company-specific prep
    </p>
    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
      Get Pro Access
    </button>
  </div>
);

const ProgressStats = () => (
  <div className="mb-6 px-2">
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-300">Progress</span>
        <span className="text-xs text-orange-400">Level 3</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-3/5"></div>
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>240 solved</span>
        <span>68% completion</span>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  return (
    <div className="w-80 bg-black text-white p-4 sticky top-20 h-[90vh] overflow-y-auto border-r border-slate-700/50">
      <ProgressStats />

      <nav className="space-y-2">
        <NavItem
          to="/in/dashboard"
          icon={<LayoutDashboard />}
          label="Dashboard"
        />

        <NavSection title="Practice & Learn">
          <NavItem
            to="/in/problems"
            icon={<Target />}
            label="DSA Problems"
            badge="1000+"
            isActive
          />
          {/* <NavItem
            to="/in/roadmap"
            icon={<TrendingUp />}
            label="DSA Roadmap"
            badge="12 tracks"
          /> */}
          {/* <NavItem
            to="/in/learning-paths"
            icon={<BookOpen />}
            label="Learning Paths"
            badge="8 paths"
          /> */}
        </NavSection>

        <NavSection title="AI Powered">
          {/* <NavItem
            to="/in/ai-mentor"
            icon={<BrainCircuit />}
            label="AI Mentor"
            badge="New"
          /> */}
          <NavItem
            to="/in/ai-interview"
            icon={<Bot />}
            label="Progress"
            badge="Practice"
          />
          <NavItem
            to="/in/simulator"
            icon={<PlayCircle />}
            label="Interview Simulator"
            badge="Live"
          />
        </NavSection>

        <NavSection title="Career Prep">
          <NavItem
            to="company/prep"
            icon={<Briefcase />}
            label="Company Prep"
            badge="FAANG+"
          />
          {/* <NavItem
            to="/in/achievements"
            icon={<Trophy />}
            label="Achievements"
            badge="12"
          />
          <NavItem
            to="/in/analytics"
            icon={<BarChart2 />}
            label="Analytics"
            badge="Insights"
          /> */}
        </NavSection>

        <NavSection title="Account">
          <NavItem to="/in/settings" icon={<Settings />} label="Settings" />
          <NavItem to="/in/help" icon={<HelpCircle />} label="Help & Support" />
        </NavSection>
      </nav>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <UserProfile />
        <UpgradeBanner />
      </div>
    </div>
  );
};

export default Sidebar;
