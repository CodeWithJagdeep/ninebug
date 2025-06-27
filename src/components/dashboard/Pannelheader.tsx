import { Link } from "react-router-dom";
import Logo from "@/assets/logo4.png";
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

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { selectCurrentUser } from "@/Container/reducer/slicers/userSlicer";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  BookOpen,
  Code,
  Database,
  FileText,
  HelpCircle,
  LayoutTemplate,
  LifeBuoy,
  Rocket,
  GraduationCap,
  Server,
  Type,
  Palette,
  Users,
  Briefcase,
  MessageSquareIcon,
  LogOutIcon,
  LifeBuoyIcon,
  HomeIcon,
  CreditCardIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  Crown,
} from "lucide-react";
import authServices from "@/Services/authService";
import { motion, AnimatePresence } from "framer-motion";

const learningPaths = [
  {
    title: "Frontend Developer",
    href: "/paths/frontend",
    description: "Master HTML, CSS, JavaScript and modern frameworks",
    icon: <LayoutTemplate className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Full-Stack Engineer",
    href: "/paths/fullstack",
    description: "Learn both frontend and backend development",
    icon: <Code className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "JavaScript Specialist",
    href: "/paths/javascript",
    description: "Deep dive into advanced JavaScript concepts",
    icon: <BookOpen className="w-5 h-5 text-yellow-500" />,
  },
  {
    title: "React Developer",
    href: "/paths/react",
    description: "Become proficient in React ecosystem",
    icon: <Rocket className="w-5 h-5 text-cyan-500" />,
  },
  {
    title: "Node.js Backend",
    href: "/paths/nodejs",
    description: "Build scalable server-side applications",
    icon: <Server className="w-5 h-5 text-green-500" />,
  },
  {
    title: "Python Developer",
    href: "/paths/python",
    description: "Learn Python for web, data, and automation",
    icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
  },
];

const courses = [
  {
    title: "JavaScript Fundamentals",
    href: "/courses/javascript-fundamentals",
    description: "Master the core concepts of JavaScript",
    icon: <BookOpen className="w-5 h-5 text-amber-600" />,
    bgColor: "hover:bg-amber-500/10",
    iconBg: "bg-amber-500/10",
  },
  {
    title: "React Complete Guide",
    href: "/courses/react-complete",
    description: "From basics to advanced React patterns",
    icon: <Rocket className="w-5 h-5 text-cyan-600" />,
    bgColor: "hover:bg-cyan-500/10",
    iconBg: "bg-cyan-500/10",
  },
  {
    title: "Node.js & Express",
    href: "/courses/node-express",
    description: "Build backend services with Node.js",
    icon: <Server className="w-5 h-5 text-emerald-600" />,
    bgColor: "hover:bg-emerald-500/10",
    iconBg: "bg-emerald-500/10",
  },
  {
    title: "TypeScript Mastery",
    href: "/courses/typescript",
    description: "Add type safety to your JavaScript",
    icon: <Type className="w-5 h-5 text-blue-600" />,
    bgColor: "hover:bg-blue-500/10",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "CSS & Responsive Design",
    href: "/courses/css-responsive",
    description: "Modern styling techniques",
    icon: <Palette className="w-5 h-5 text-pink-600" />,
    bgColor: "hover:bg-pink-500/10",
    iconBg: "bg-pink-500/10",
  },
  {
    title: "Database Fundamentals",
    href: "/courses/databases",
    description: "SQL and NoSQL database concepts",
    icon: <Database className="w-5 h-5 text-orange-600" />,
    bgColor: "hover:bg-orange-500/10",
    iconBg: "bg-orange-500/10",
  },
];

const resources = [
  {
    title: "Blog",
    href: "/blog",
    color: "bg-purple-500/10",
    description: "Articles on learning strategies and tech trends",
    icon: <FileText className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "Community",
    href: "/community",
    color: "bg-green-200/10",
    description: "Connect with other learners and mentors",
    icon: <Users className="w-5 h-5 text-green-500" />,
  },
  {
    title: "Career Guide",
    href: "/in/career",
    color: "bg-amber-500/10",
    description: "Job search strategies and interview prep",
    icon: <Briefcase className="w-5 h-5 text-amber-500" size={28} />,
  },
  {
    title: "FAQ",
    color: "bg-gray-200",
    href: "/faq",
    description: "Answers to common questions",
    icon: <HelpCircle className="w-10 h-10 text-gray-500" size={28} />,
  },
];

function PanelHeader() {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
  >(({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            to={props.href as string}
            ref={ref}
            className={cn(
              "flex items-start gap-3 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10",
              "text-gray-300 hover:text-white flex-row items-center",
              className
            )}
            {...props}
          >
            {/* <div className={`mt-0.5 text-xl p-3  ${props.color} rounded-md`}>
              {icon}
            </div> */}
            <div>
              <div className="text-sm leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                {children}
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  const MobileNavItem = ({ item }: { item: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-white/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full py-4 px-2 text-left"
        >
          <div className="flex items-center gap-3">
            {/* {item.icon} */}
            <span>{item.title}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-2 pl-8 space-y-2">
                {item.items.map((subItem: any) => (
                  <Link
                    key={subItem.title}
                    to={subItem.href}
                    className="block py-2 px-2 rounded hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      {/* {subItem.icon} */}
                      <div>
                        <div className="font-medium">{subItem.title}</div>
                        <div className="text-sm text-gray-400">
                          {subItem.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const mobileNavItems = [
    {
      title: "Learning Paths",
      // icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      items: learningPaths,
    },
    {
      title: "Courses",
      // icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      items: courses,
    },
    {
      title: "Resources",
      // icon: <LifeBuoy className="w-5 h-5 text-green-400" />,
      items: resources,
    },
    {
      title: "Pricing",
      // icon: <CreditCardIcon className="w-5 h-5 text-yellow-400" />,
      items: [
        {
          title: "Pricing Plans",
          href: "/pricing",
          description: "View our subscription options",
          icon: <CreditCardIcon className="w-5 h-5" />,
        },
      ],
    },
  ];
  return (
    <header
      className={`border-b border-white/20 backdrop-blur-md bg-white sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center space-x-4 lg:space-x-10">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              width={120}
              height={20}
              alt="Mentorsland Logo"
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {/* Learning Paths Dropdown */}
              <div>
                <div className="bg-transparent text-sm hover:bg-white/10 text-black data-[state=open]:bg-white/10">
                  <div className="flex items-center gap-2 font-normal">
                    Problems
                  </div>
                </div>
              </div>

              {/* Courses Dropdown */}
              <div>
                <div className="bg-transparent text-sm hover:bg-white/10 text-black data-[state=open]:bg-white/10">
                  <div className="flex items-center gap-2 font-normal">
                    {/* <GraduationCap className="w-4 h-4 text-blue-400" /> */}
                    Companies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <div>
            <img
              src="https://assets.leetcode.com/users/Jagdeep__singh/avatar_1725206361.png"
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 text-xs font-medium hover:from-yellow-500 hover:to-orange-600 transition-all">
              <Crown className="w-4 h-4 inline mr-2" />
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Mobile menu button - visible only on mobile */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export { PanelHeader as default };
