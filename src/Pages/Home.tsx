import { motion } from "framer-motion";
import {
  ArrowRight,
  LayoutTemplate,
  Terminal,
  Timer,
  Trophy,
  BarChart2,
  Binary,
  Braces,
  Sparkles,
  Target,
} from "lucide-react";
import Header from "@/components/common/Header";
import HeroSection from "@/components/common/HeroSection";
import { InfiniteScrollLogos } from "@/components/common/InfiniteScrollLogos";
import { problemSets } from "@/data/DataStore";
import { CompanyProblemSet } from "@/components/common/CompanyProblemSet";
import HowWeHelpSection from "@/components/common/HelpingSection";
import ChallengeSection from "@/components/common/ChallegeUser";
import PremiumTestimonials from "@/components/common/Testimonial";

type Feature = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

const features: Feature[] = [
  {
    title: "Pattern Explorer",
    icon: Braces,
    description: "Learn problem-solving patterns instead of memorizing",
  },
  {
    title: "Time/Space Analysis",
    icon: Timer,
    description: "Auto-calculated for every solution you submit",
  },
  {
    title: "Company Tagged",
    icon: Target,
    description: "Top problems asked by FAANG+ companies",
  },
  {
    title: "Visual Debugger",
    icon: Binary,
    description: "Step-through execution with visualization",
  },
  {
    title: "Progress Tracking",
    icon: BarChart2,
    description: "Track weak areas with detailed analytics",
  },
  {
    title: "AI Hints",
    icon: Sparkles,
    description: "Get unstuck with smart hints (no spoilers!)",
  },
];

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

  return (
    <div className="min-h-screen bg-black text-gray-100 ">
      {/* Navigation */}
      <Header />

      <HeroSection />

      <section id="companies" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Master <span className="text-blue-400">Company-Specific</span>{" "}
              Questions
            </h2>
            <p className="text-xl text-gray-400">
              Practice problems frequently asked by top tech companies
            </p>
          </motion.div>

          <InfiniteScrollLogos />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {problemSets.map((set, index) => (
              <CompanyProblemSet key={index} {...set} />
            ))}
          </motion.div>
        </div>
      </section>

      <HowWeHelpSection />
      <ChallengeSection />
      <PremiumTestimonials />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-blue-400 mb-4 md:mb-0"
            >
              &lt;Ninebug/&gt;
            </motion.div>
            <motion.div
              className="flex space-x-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["Privacy", "Terms", "Contact"].map((item, index: number) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3 }}
                  href="#"
                  className="text-gray-400 hover:text-blue-400"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} Ninebug DSA. All rights reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
