import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Code,
  AlertCircle,
  Bot,
  CheckCircle,
  Play,
  Terminal,
} from "lucide-react";
import { sampleSolutions } from "@/data/DataStore";
import { useTranslation } from "react-i18next";

interface CodingJourneyProps {
  onComplete?: () => void;
}

interface JourneySection {
  id: number;
  title: string;
  description: string;
  visual: "editor" | "code" | "error" | "ai";
  alignment: "left" | "right";
}

const CODE_EXAMPLE = `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      
      if (map.has(complement)) {
          return [map.get(complement)!, i];
      }
      
      map.set(nums[i], i);
  }
  
  return [];
}`;

const EditorVisual = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 rounded-lg p-4 h-full border border-gray-700"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-sm ml-2">solution.ts</span>
      </div>
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-600 rounded-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Code className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-400">{t("journey.editor.ready")}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CodeVisual = ({ code }: { code: string; isTyping: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black rounded-lg p-4 h-full border overflow-hidden border-gray-700 font-mono text-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 text-sm ml-2">solution.ts</span>
      </div>
      <pre className="text-green-400 overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {code}
        </motion.span>
        {
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="bg-green-400 w-2 h-5 inline-block ml-1"
          />
        }
      </pre>
    </motion.div>
  );
};

const ErrorVisual = () => {
  const { t } = useTranslation();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-red-950/30 border border-red-500/30 rounded-lg p-6 h-full flex flex-col justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={shouldAnimate ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-center"
      >
        <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-red-300 mb-2">
          {t("journey.testFailed")}
        </h3>
        <div className="bg-red-900/20 rounded p-4 text-left">
          <p className="text-red-200 text-sm font-mono">
            ❌ Expected: [0, 1]
            <br />
            ❌ Received: undefined
            <br />❌ 3 of 5 tests failed
          </p>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-gray-300 mt-4 text-sm"
        >
          {t("journey.dontWorry")}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const AIVisual = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-lg p-6 h-full"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="flex items-start gap-4"
      >
        <div className="bg-purple-600 p-3 rounded-full flex-shrink-0">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-purple-300 font-semibold mb-2">
            {t("journey.ai.title")}
          </h4>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-sm space-y-2"
          >
            <p>{t("journey.ai.suggestion1")}</p>
            <p>{t("journey.ai.suggestion2")}</p>
            <p>{t("journey.ai.suggestion3")}</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm transition-colors"
          >
            {t("journey.ai.applyButton")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SectionVisual = ({
  visual,
  code,
  isTyping,
}: {
  visual: string;
  code: string;
  isTyping: boolean;
}) => {
  switch (visual) {
    case "editor":
      return <EditorVisual />;
    case "code":
      return <CodeVisual code={code} isTyping={isTyping} />;
    case "error":
      return <ErrorVisual />;
    case "ai":
      return <AIVisual />;
    default:
      return <EditorVisual />;
  }
};

const ProgressIndicators = ({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="flex justify-center mt-16 space-x-4"
  >
    {Array.from({ length: totalSections }).map((_, index) => (
      <motion.div
        key={index}
        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
          currentSection >= index ? "bg-[#ed7419]" : "bg-[#ed7419]"
        }`}
        animate={{
          scale: currentSection === index ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    ))}
  </motion.div>
);

const CodingJourneySection = ({
  section,
  currentSection,
  typewriterText,
  isTyping,
}: {
  section: JourneySection;
  index: number;
  currentSection: number;
  typewriterText: string;
  isTyping: boolean;
}) => {
  return (
    <motion.div
      key={section.id}
      className={`flex flex-col py-20 lg:flex-row items-center gap-8 lg:gap-16 ${
        section.alignment === "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Text Content */}
      <motion.div
        className="lg:w-1/2 space-y-6"
        initial={{
          opacity: 0,
          x: section.alignment === "left" ? -50 : 50,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <span className="bg-[#f0721a] text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
            {section.id}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {section.title}
          </h2>
        </div>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          {section.description}
        </p>
      </motion.div>

      {/* Visual Content */}
      <motion.div
        className="w-full lg:w-1/2 h-80"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AnimatePresence>
          <motion.div
            key={`${section.id}-${currentSection}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <SectionVisual
              visual={section.visual}
              code={typewriterText}
              isTyping={isTyping}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const CodingJourney: React.FC<CodingJourneyProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const [typewriterText, setTypewriterText] = useState(sampleSolutions);
  const [isTyping, setIsTyping] = useState(true);
  const SECTIONS: JourneySection[] = [
    {
      id: 1,
      title: t("journey.section1.title"),
      description: t("journey.section1.description"),
      visual: "editor",
      alignment: "left",
    },
    {
      id: 2,
      title: t("journey.section2.title"),
      description: t("journey.section2.description"),
      visual: "code",
      alignment: "right",
    },
    {
      id: 3,
      title: t("journey.section3.title"),
      description: t("journey.section3.description"),
      visual: "error",
      alignment: "left",
    },
    {
      id: 4,
      title: t("journey.section4.title"),
      description: t("journey.section4.description"),
      visual: "ai",
      alignment: "right",
    },
  ];
  return (
    <div className="px-4 py-0 bg-black">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 mx-auto py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 text-5xl"
        >
          <h1 className="text-4xl md:text-6xl text-white mb-4">
            {t("journey.header.title")}{" "}
            <span className="text-[#e46219]">
              {t("journey.header.journey")}
            </span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-lg">
            {t("journey.header.subtitle")}
          </p>
        </motion.div>

        {/* Journey Sections */}
        <div className="space-y-16">
          {SECTIONS.map((section, index) => (
            <div key={section.id} data-section-index={index}>
              <CodingJourneySection
                section={section}
                index={index}
                currentSection={currentSection}
                typewriterText={typewriterText}
                isTyping={isTyping}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <motion.div className="text-center mt-16">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#f48a1c] px-8 py-4 rounded-full text-black font-semibold text-lg transition-all duration-300 shadow-lg"
            onClick={() => onComplete?.()}
          >
            Start Your Journey
          </motion.button>
        </motion.div> */}
      </div>
    </div>
  );
};

export default CodingJourney;
