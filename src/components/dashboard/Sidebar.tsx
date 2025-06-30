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
  X,Menu
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const navItems = [
  {
    path: "/in/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    className: "text-gray-400",
  },
  {
    path: "/in/problems",
    icon: Target,
    label: "Practice Problems",
    className: "text-[#fa6600]",
    badge: "120+",
  },
  {
    path: "#",
    icon: Bot,
    label: "AI Mentor",
    className: "text-gray-400",
  },
  {
    path: "/in/practice/company",
    icon: Briefcase,
    label: "Company Prep",
    className: "text-gray-400",
    badge: "FAANG",
  },
  {
    path: "#",
    icon: GraduationCap,
    label: "Learning Paths",
    className: "text-gray-400",
  },
];

const Sidebar = ({ isOpen, onClose, onOpen  }: SidebarProps) => (
  <>
    <button
      onClick={onOpen}
      className="fixed md:hidden z-30 top-4 left-4 p-2 rounded-md text-[#fa6600] hover:bg-gray-800 transition-colors"
      aria-label="Open sidebar"
    >
      <Menu className="h-6 w-6" />
    </button>

    <aside
      className={`fixed top-0 left-0 z-40 h-full w-72 bg-black text-white transition-transform duration-300 border-r border-gray-800 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:w-64 md:z-10`}
    >
      {/* Sidebar Content Container with proper top spacing */}
      <div className="h-full flex flex-col pt-16 md:pt-4">
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden px-4 pb-2">
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <div className="border border-white/30 rounded-md p-3">
            <ul className="space-y-1 px-2 py-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    onClick={onClose} // Close sidebar on mobile when nav item is clicked
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${item.className}`} />
                    <span className="text-sm">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="px-4 pb-4">
          <div className="border border-white/30 rounded-md p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-sm font-semibold text-white">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">
                  Jagdeep Singh
                </div>
                <div className="text-xs text-gray-400">Free Member</div>
              </div>
            </div>

            {/* Upgrade prompt for free members */}
            <div className="mt-3 pt-3 border-t border-gray-800">
              <button className="w-full text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-3 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;
