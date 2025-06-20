import { Link } from "react-router-dom";
import Logo from "@/assets/logo2.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Code,
  Trophy,
  Bot,
  BookOpen,
  FileText,
  HelpCircle,
  Users,
  LogOut,
  Home,
  CreditCard,
  User,
  Menu,
  X,
  Briefcase,
  Server,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelect from "./LanguageSelect";

const problemCategories = [
  {
    title: "Data Structures",
    href: "/problems/data-structures",
    description: "Arrays, Linked Lists, Trees, Graphs, etc.",
    icon: <Code className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Algorithms",
    href: "/problems/algorithms",
    description: "Sorting, Searching, Dynamic Programming, etc.",
    icon: <BookOpen className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "System Design",
    href: "/problems/system-design",
    description: "Scalability, Databases, Distributed Systems",
    icon: <Server className="w-5 h-5 text-green-500" />,
  },
];

const contestTypes = [
  {
    title: "Weekly Challenges",
    href: "/contests/weekly",
    description: "Compete with others in weekly coding battles",
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
  },
  {
    title: "Company Simulations",
    href: "/contests/company",
    description: "Mock interviews with real company questions",
    icon: <Briefcase className="w-5 h-5 text-cyan-500" />,
  },
];

const aiFeatures = [
  {
    title: "AI Interviewer",
    href: "/ai/interview",
    description: "Practice with our AI-powered interviewer",
    icon: <Bot className="w-5 h-5 text-pink-500" />,
  },
  {
    title: "Solution Analyzer",
    href: "/ai/analyzer",
    description: "Get detailed feedback on your solutions",
    icon: <FileText className="w-5 h-5 text-orange-500" />,
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const user = null; // Replace with actual user state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ListItem = ({
    className,
    title,
    children,
    icon,
    href,
    ...props
  }: any) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={href}
            className={cn(
              "flex items-start gap-3 p-3 rounded-md hover:bg-gray-800 transition-colors",
              className
            )}
            {...props}
          >
            <div className="text-gray-400">{icon}</div>
            <div>
              <div className="font-medium text-white">{title}</div>
              <p className="text-sm text-gray-400">{children}</p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  };

  return (
    <header
      className={cn(
        "sticky w-full top-0 z-50 backdrop-blur-md transition-all",
        isScrolled ? "border-b border-gray-800" : ""
      )}
    >
      <div className="px-24 px-4 py-6 flex items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="CodePrep" className="h-10 w-auto" />
          </Link>
          <div className="flex space-x-14 pl-6 mt-1 text-lg">
            <Link to="/problems" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Problems
            </Link>
            <div>Study Plan</div>
            <div>Interview</div>
          </div>
        </div>

        {/* Right side - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelect />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 bg-blue-600">
                  {/* <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback> */}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900 border border-gray-800"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer hover:bg-gray-800"
                >
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer hover:bg-gray-800"
                >
                  <Link to="/home" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-10">
              <Link to="/login">
                <button className="text-white text-lg  hover:bg-gray-800">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-white py-2.5 text-lg px-7 rounded-full text-black hover:bg-blue-700">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-4">
          <LanguageSelect />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-gray-900 border-t border-gray-800"
          >
            <div className="px-4 py-3 space-y-1">
              {/* Problems */}
              <div className="border-b border-gray-800 pb-2">
                <h3 className="flex items-center gap-2 px-3 py-2 text-white font-medium">
                  <Code className="w-5 h-5" />
                  Problems
                </h3>
                <div className="pl-8 py-1 space-y-1">
                  {problemCategories.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block px-3 py-2 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contests */}
              <div className="border-b border-gray-800 pb-2">
                <h3 className="flex items-center gap-2 px-3 py-2 text-white font-medium">
                  <Trophy className="w-5 h-5" />
                  Contests
                </h3>
                <div className="pl-8 py-1 space-y-1">
                  {contestTypes.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block px-3 py-2 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* AI Tools */}
              <div className="border-b border-gray-800 pb-2">
                <h3 className="flex items-center gap-2 px-3 py-2 text-white font-medium">
                  <Bot className="w-5 h-5" />
                  AI Tools
                </h3>
                <div className="pl-8 py-1 space-y-1">
                  {aiFeatures.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block px-3 py-2 rounded hover:bg-gray-800 text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <Link
                to="/solutions"
                className="flex items-center gap-2 px-3 py-3 rounded hover:bg-gray-800 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="w-5 h-5" />
                Solutions
              </Link>

              {/* Auth Buttons */}
              {user ? (
                <div className="pt-4 border-t border-gray-800">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-3 rounded hover:bg-gray-800 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </Link>
                  <button className="flex items-center gap-2 px-3 py-3 rounded hover:bg-gray-800 text-red-400 w-full">
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-800">
                  <Link
                    to="/login"
                    className="w-full py-2 px-4 text-center bg-transparent border border-gray-700 rounded hover:bg-gray-800 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full py-2 px-4 text-center bg-blue-600 rounded hover:bg-blue-700 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
