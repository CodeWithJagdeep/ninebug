import { Link } from "react-router-dom";
import Logo from "@/assets/logo4.png";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../common/LanguageSelect";
import { useInterviewTimer } from "@/Context/InterviewTimerContext";
import { Clock } from "lucide-react";


function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function interviewHeader() {
//   const { t } = useTranslation();
const { timeLeft } = useInterviewTimer();


  return (
    <header
      className={`border-b border-white/20 backdrop-blur-md bg-white sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-12 py-3.5 flex items-center justify-between">
        {/* Logo */}
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
        </div>
        <div className="flex items-center gap-4">
          <Clock className="text-red-500 w-5 h-5" />
          <span className="font-mono text-red-600 font-semibold">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-4">
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
}

export default interviewHeader;
