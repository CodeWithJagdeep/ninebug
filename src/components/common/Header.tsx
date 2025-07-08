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
  HomeIcon,
  LifeBuoyIcon,
} from "lucide-react";
import LanguageSelect from "./LanguageSelect";
import authServices from "@/Services/authService";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const navItems = [
  { title: "DSA Roadmap", href: "/roadmap" },
  { title: "Company Prep", href: "/in/company/prep" },
  { title: "AI Interview", href: "/interview/onboard" },
  { title: "Pricing", href: "/in/pricing" },
];

function Header() {
  const { currentUser, isAuthenticated } = useSelector(selectCurrentUser);
  const { t } = useTranslation();

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
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 bg-[#15151d] flex items-center justify-center">
                  <AvatarImage src={currentUser?.profilePicture as string} />
                  <AvatarFallback className="bg-black">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 py-2">
                <DropdownMenuItem asChild className="px-4 py-3 cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5" />
                    <span className="text-lg">
                      {t("header.userMenu.profile")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link
                    to="/account/billing"
                    className="flex items-center gap-3"
                  >
                    <CreditCardIcon className="h-5 w-5" />
                    <span className="text-base">
                      {t("header.userMenu.accountBilling")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link to="/home" className="flex items-center gap-3">
                    <HomeIcon className="h-5 w-5" />
                    <span className="text-base">
                      {t("header.userMenu.myHome")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link to="/help" className="flex items-center gap-3">
                    <LifeBuoyIcon className="h-5 w-5" />
                    <span className="text-base">
                      {t("header.userMenu.helpCenter")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link to="/feedback" className="flex items-center gap-3">
                    <MessageSquareIcon size={40} />
                    <span className="text-base">
                      {t("header.userMenu.giveFeedback")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  className="px-4 py-2.5 text-destructive focus:bg-destructive/10 cursor-pointer"
                  onClick={async () => {
                    new authServices().logout();
                  }}
                >
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  <span className="text-base">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                to="/in/auth"
                className="text-sm text-black hover:text-black border border-black/70 rounded-md px-4 py-2 "
              >
                {t("header.auth.login")}
              </Link>
              <Link
                to="/in/auth"
                className="bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-900 transition"
              >
                {t("header.auth.createAccount")}
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
