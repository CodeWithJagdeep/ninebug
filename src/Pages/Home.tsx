import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import HeroSection from "@/components/common/HeroSection";
import { InfiniteScrollLogos } from "@/components/common/InfiniteScrollLogos";
import { problemSets } from "@/data/DataStore";
import { CompanyProblemSet } from "@/components/common/CompanyProblemSet";
import HowWeHelpSection from "@/components/common/HelpingSection";
import ChallengeSection from "@/components/common/ChallegeUser";
import PremiumTestimonials from "@/components/common/Testimonial";
import CodingProblem from "@/components/common/CodePreview";
import CodingJourney from "@/components/common/Journey";
import ProblemPreview from "@/components/common/Preview";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "@/assets/logo4.png";
import Footer from "@/components/common/Footer";
import { useTranslation } from "react-i18next";
export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-gray-100 ">
      {/* <div className="bg-black h-10"></div> */}
      {/* Navigation */}
      <Header />

      <HeroSection />
      <div>
        <InfiniteScrollLogos />
      </div>
      <ProblemPreview />
      <CodingJourney />

      <HowWeHelpSection />
      {/* <ChallengeSection /> */}
      <PremiumTestimonials />

      <div className="px-20 py-20">
        <div className="relative  bg-black rounded-xl overflow-hidden shadow-lg">
          {/* Background SVG pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="5,5"
              />
              <path
                d="M30,30 L70,30 L70,70 L30,70 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="3,3"
              />
              <path
                d="M10,10 L20,10 L20,20 L10,20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <path
                d="M80,80 L90,80 L90,90 L80,90 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-5xl md:text-5xl text-white mb-3">
                {t("home.cta.title.line1")}{" "}
                <span className="text-orange-500">
                  {t("home.cta.title.line2")}
                </span>
              </h2>
              <p className="text-slate-300 mb-5">{t("home.cta.subtitle")}</p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-md shadow-md transition-colors">
                {t("home.cta.button")}
              </button>
            </div>

            {/* DSA Illustration SVG */}
            <div className="w-full md:w-auto">
              <svg
                width="240"
                height="180"
                viewBox="0 0 240 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Binary Tree */}
                <path
                  d="M120 20V60M90 60L120 60M120 60L150 60M90 60V100M150 60V100M60 100L90 100M90 100L120 100M150 100L180 100"
                  stroke="#EC661B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="20" r="8" fill="#3B82F6" />
                <circle cx="90" cy="60" r="8" fill="#10B981" />
                <circle cx="150" cy="60" r="8" fill="#10B981" />
                <circle cx="60" cy="100" r="8" fill="#F59E0B" />
                <circle cx="90" cy="100" r="8" fill="#F59E0B" />
                <circle cx="120" cy="100" r="8" fill="#F59E0B" />
                <circle cx="150" cy="100" r="8" fill="#F59E0B" />
                <circle cx="180" cy="100" r="8" fill="#F59E0B" />

                {/* Array */}
                <rect
                  x="30"
                  y="130"
                  width="180"
                  height="40"
                  rx="2"
                  stroke="#64748B"
                  strokeWidth="1.5"
                  fill="#1E293B"
                />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <g key={i}>
                    <rect
                      x={40 + i * 20}
                      y="135"
                      width="15"
                      height="30"
                      rx="1"
                      fill="#334155"
                    />
                    <text
                      x={47.5 + i * 20}
                      y="155"
                      fontSize="10"
                      fill="#F8FAFC"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {i}
                    </text>
                  </g>
                ))}

                {/* Graph nodes */}
                <circle cx="200" cy="40" r="6" fill="#EC661B" />
                <circle cx="220" cy="30" r="6" fill="#3B82F6" />
                <circle cx="220" cy="50" r="6" fill="#10B981" />
                <path d="M206 40L214 30" stroke="#EC661B" strokeWidth="1.5" />
                <path d="M206 40L214 50" stroke="#EC661B" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
