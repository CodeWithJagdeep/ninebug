import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo2.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  BugIcon,
  CreditCardIcon,
  HomeIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageSquareIcon,
  UserIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { NavigationMenuLink } from "../ui/navigation-menu";

interface PanelHeaderProps {
  children?: React.ReactNode;
  currentLesson?: number;
  totalLessons?: number;
  onReportBug?: (bugDescription: string) => void;
  onRaiseDoubt?: (doubtDescription: string) => void;
  onNavigateLesson?: (direction: "next" | "prev") => void;
  onSignOut?: () => void;
  onRunCode?: () => void;
  onShareCode?: () => void;
  onDownloadCode?: () => void;
  onToggleTheme?: (theme: "light" | "dark") => void;
  onToggleLayout?: (layout: "editor" | "preview" | "split") => void;
  currentTheme?: "light" | "dark";
  currentLayout?: "editor" | "preview" | "split";
  availableLanguages?: string[];
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

function PanelHeader({
  children,
  onReportBug,
  onSignOut,
  availableLanguages = ["JavaScript", "Python", "Java", "C++"],
  currentLanguage = "JavaScript",
  onLanguageChange,
}: PanelHeaderProps) {
  const user: any = null;
  const [bugDescription, setBugDescription] = useState("");
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  // Add this helper function (mock API call)

  const handleLanguageChange = (language: string) => {
    if (onLanguageChange) onLanguageChange(language);
  };
  return (
    <header className="border-b border-white/20 backdrop-blur-md sticky top-0 z-50 bg-black px-0">
      <div className="mx-auto px-6 py-3.5 flex items-center justify-between w-full">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-10 w-1/3">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              width={110}
              height={20}
              alt="Mentorsland Logo"
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-0 justify-center w-1/3">
          <Popover open={isBugReportOpen} onOpenChange={setIsBugReportOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center rounded-l-md px-3 h-9 bg-white/10 hover:bg-white/20 text-sm font-medium text-red-300 transition-colors">
                <BugIcon className="mr-2 text-red-400" size={15} />
                Report Bug
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Report a Bug</h3>
                <Textarea
                  value={bugDescription}
                  onChange={(e) => setBugDescription(e.target.value)}
                  placeholder="Describe the bug you encountered..."
                  className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">
                    Our team will address this promptly
                  </p>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      onReportBug?.(bugDescription);
                      setIsBugReportOpen(false);
                    }}
                  >
                    Submit Report
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {children}
          {/* Progress Indicator with Navigation */}

          {/* Bug Report */}
        </div>
        <div className="flex items-center w-1/3 justify-end">
          {/* <div className="mx-4">
            <Select
              value={currentLanguage}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-32 h-8 ml-1 text-white bg-gray-800 border-none">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {availableLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang} className="text-white">
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 bg-[#615fff] text-white flex items-center justify-center">
                  <AvatarImage src={user.imageUrl as string} />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 py-2">
                <DropdownMenuItem asChild className="px-4 py-3 cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5" />
                    <span className="text-lg">Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link
                    to="/account/billing"
                    className="flex items-center gap-3"
                  >
                    <CreditCardIcon className="h-5 w-5" />
                    <span className="text-base">Account & Billing</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link to="/home" className="flex items-center gap-3">
                    <HomeIcon className="h-5 w-5" />
                    <span className="text-base">My Home</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link to="/help" className="flex items-center gap-3">
                    <LifeBuoyIcon className="h-5 w-5" />
                    <span className="text-base">Help Center</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="px-4 py-2 cursor-pointer">
                  <Link to="/feedback" className="flex items-center gap-3">
                    <MessageSquareIcon size={40} />
                    <span className="text-base">Give Feedback</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem
                  className="px-4 py-2.5 text-destructive focus:bg-destructive/10 cursor-pointer"
                  onClick={onSignOut}
                >
                  <LogOutIcon className="h-5 w-5 mr-3" />
                  <span className="text-base">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/in/auth">
                <Button
                  variant="ghost"
                  className="relative overflow-hidden bg-black text-white rounded transition-all"
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-[#c96ef9]/20 backdrop-blur-sm rounded-md"></span>
                </Button>
              </Link>
              <Link to="/in/auth">
                <Button className="relative overflow-hidden bg-white text-xs text-black hover:bg-[#c96ef9] hover:text-white rounded transition-all">
                  <span className="relative z-10">Create a free account</span>
                  <span className="absolute inset-0 bg-[#c96ef9]/20 backdrop-blur-sm rounded-md"></span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default PanelHeader;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10",
            "text-gray-300 hover:text-white",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
