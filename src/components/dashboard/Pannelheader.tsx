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
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState, useEffect, PropsWithChildren } from "react";
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
  ChevronDown,
} from "lucide-react";
import authServices from "@/Services/authService";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelect from "../common/LanguageSelect";

const navItems = [
  { title: "DSA Roadmap", href: "/roadmap" },
  { title: "Company Prep", href: "/in/company/prep" },
  { title: "AI Interview", href: "/interview/onboard" },
];

function PanelHeader({ children }: PropsWithChildren) {
  const { currentUser, isAuthenticated } = useSelector(selectCurrentUser);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
              "flex items-start gap-3 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              "text-gray-700 hover:text-gray-900 flex-row items-center",
              className
            )}
            {...props}
          >
            <div className={`mt-0.5 text-xl p-3 ${props.color} rounded-md`}>
              {icon}
            </div>
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-gray-600 mt-1">
                {children}
              </p>
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  return (
    <>
      <header
        className={`border-b border-gray-200 backdrop-blur-md bg-white/95 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-13">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                width={120}
                height={32}
                alt="Mentorsland Logo"
                className="object-contain h-8 w-auto"
              />
            </Link>
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="hidden lg:flex items-center gap-9">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-black/90 hover:text-black text-sm transition"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Desktop Navigation */}

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSelect />
            {children}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-4">
                <button className="bg-gradient-to-r flex items-center py-2 px-5 text-sm rounded-md text-black from-yellow-400 to-orange-500 border-0 hover:from-yellow-500 hover:to-orange-600 transition-all">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative h-9 w-9 flex items-center justify-center bg-black rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={currentUser.profilePicture}
                          alt={currentUser.name}
                        />
                        <AvatarFallback className="bg-gray-900 text-[#ffb76e] w-full  text-center flex items-center justify-center">
                          <div>
                            {" "}
                            {currentUser.name?.[0]?.toUpperCase() || "U"}
                          </div>
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/account/billing"
                        className="flex items-center gap-2"
                      >
                        <CreditCardIcon className="h-4 w-4" />
                        Billing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/feedback" className="flex items-center gap-2">
                        <MessageSquareIcon className="h-4 w-4" />
                        Feedback
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => new authServices().logout()}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOutIcon className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <Link
                  to="/in/auth"
                  className="text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/in/auth"
                  className="bg-gray-900 text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {isAuthenticated && currentUser && (
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={currentUser?.profilePicture}
                  alt={currentUser.name}
                  className="w-full h-full"
                />
                <AvatarFallback className="bg-gray-900 text-white text-sm">
                  {currentUser.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors mobile-menu-container"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden mobile-menu-container"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <img
                    src={Logo}
                    width={100}
                    height={24}
                    alt="Mentorsland Logo"
                    className="object-contain h-6 w-auto"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-md"
                    aria-label="Close menu"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-black"
                  >
                    {item.title}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated && currentUser ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={currentUser.profilePicture}
                            alt={currentUser.name}
                          />
                          <AvatarFallback className="bg-gray-900 text-white">
                            {currentUser.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">
                            {currentUser.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <UserIcon className="h-4 w-4" />
                          Profile
                        </Link>
                        <Link
                          to="/account/billing"
                          className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <CreditCardIcon className="h-4 w-4" />
                          Billing
                        </Link>
                        <Link
                          to="/feedback"
                          className="flex items-center gap-2 p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <MessageSquareIcon className="h-4 w-4" />
                          Feedback
                        </Link>
                        <button
                          onClick={() => {
                            new authServices().logout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-2 p-3 text-sm text-red-600 hover:bg-red-50 rounded-md w-full text-left"
                        >
                          <LogOutIcon className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/in/auth"
                        className="block text-center text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/in/auth"
                        className="block text-center bg-gray-900 text-white px-4 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Premium Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:from-yellow-500 hover:to-orange-600 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { PanelHeader as default };
