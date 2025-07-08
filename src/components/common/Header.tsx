import { Link } from "react-router-dom";
import Logo from "@/assets/logo4.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Container/reducer/slicers/userSlicer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LogOutIcon,
  CreditCardIcon,
  MessageSquareIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import LanguageSelect from "./LanguageSelect";
import authServices from "@/Services/authService";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { title: "DSA Roadmap", href: "/roadmap" },
  { title: "Company Prep", href: "/in/company/prep" },
  { title: "AI Interview", href: "/interview/onboard" },
  { title: "Pricing", href: "/in/pricing" },
];

function Header() {
  const { currentUser, isAuthenticated } = useSelector(selectCurrentUser);
  console.log(isAuthenticated);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white backdrop-blur-lg">
      <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center space-x-16">
          <Link to="/">
            <img src={Logo} alt="Ninebug Logo" className="h-8" />
          </Link>

          {/* Desktop Nav */}
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

        {/* Right Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelect />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={currentUser?.profilePicture} />
                  <AvatarFallback className="bg-black text-white">
                    {currentUser?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/account/billing"
                    className="flex items-center gap-2"
                  >
                    <CreditCardIcon className="h-4 w-4" /> Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/feedback" className="flex items-center gap-2">
                    <MessageSquareIcon className="h-4 w-4" /> Feedback
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => new authServices().logout()}
                  className="text-red-500"
                >
                  <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                to="/in/auth"
                className="text-sm text-black hover:text-black border border-black/70 rounded-md px-4 py-2 "
              >
                Login
              </Link>
              <Link
                to="/in/auth"
                className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-900 transition"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white shadow-md px-4 pb-4"
          >
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
            <div className="mt-4 border-t pt-4">
              {isAuthenticated ? (
                <button
                  onClick={async () => {
                    await new authServices().logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-red-500"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link to="/in/auth" className="block text-sm">
                    Login
                  </Link>
                  <Link to="/in/auth" className="block text-sm font-medium">
                    Create Account
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

export default Header;
