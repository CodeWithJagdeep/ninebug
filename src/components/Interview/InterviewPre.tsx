"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, Zap, Search, Trophy, ArrowRight } from "lucide-react";
import { InterviewFeatures } from "@/components/interview-features";
import Logo from "@/assets/logo4.png";
import { Link } from "react-router-dom";
import _ApiServices from "@/Services/apiServices";

interface CarouselSlide {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface FormData {
  targetCompany: string;
  jobTitle: string;
  difficulty: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    icon: Brain,
    title: "Meet Jenie, Your AI Interviewer",
    description:
      "Experience realistic technical interviews with Jenie, our advanced AI interviewer. She adapts to your responses and provides authentic feedback just like a real hiring manager.",
  },
  {
    icon: Zap,
    title: "Real-Time Code Evaluation",
    description:
      "Jenie evaluates your code in real-time, asks follow-up questions about your approach, and challenges you to optimize solutions—just like actual technical interviews.",
  },
  {
    icon: Search,
    title: "Authentic Interview Environment",
    description:
      "Practice in a simulated interview setting with live coding, behavioral questions, and system design discussions tailored to your target company's interview style.",
  },
  {
    icon: Trophy,
    title: "Detailed Performance Feedback",
    description:
      "Receive comprehensive post-session feedback on your coding style, communication skills, and areas for improvement to prepare effectively for real interviews.",
  },
];

const JOB_ROLES: SelectOption[] = [
  { value: "sde", label: "Software Development Engineer" },
  { value: "sde2", label: "Software Development Engineer II" },
  { value: "senior-sde", label: "Senior Software Engineer" },
  { value: "frontend", label: "Frontend Engineer" },
  { value: "backend", label: "Backend Engineer" },
  { value: "fullstack", label: "Full Stack Engineer" },
  { value: "intern", label: "Software Engineering Intern" },
];

const DIFFICULTY_LEVELS: SelectOption[] = [
  { value: "easy", label: "Easy (Basic Arrays, Strings)" },
  { value: "medium", label: "Medium (Trees, Graphs, DP)" },
  { value: "hard", label: "Hard (Advanced DP, Complex Algorithms)" },
  { value: "mixed", label: "Mixed (Gradual Difficulty)" },
];

const INTERVIEW_DURATION_MINUTES = 45;

export default function InterviewPreparationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    targetCompany: "",
    jobTitle: "",
    difficulty: "",
  });

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsLoading(true);

    const request = await new _ApiServices(
      "/interview/onboard",
      formData
    )._handlePostRequest();

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // const successMessage = `
    //   🎯 Interview Session Configured Successfully!

    //   AI Interviewer: Jenie
    //   Target Company: ${formData.targetCompany}
    //   Role: ${formData.jobTitle}
    //   Difficulty: ${formData.difficulty}
    //   Duration: ${INTERVIEW_DURATION_MINUTES} minutes

    //   Jenie is now preparing your personalized interview session.
    //   Get ready to code and receive real-time feedback! 🚀
    // `;

    // alert(successMessage);
    setIsLoading(false);
  };

  const isFormValid = Object.values(formData).every(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center">
      <div className="w-full bg-white backdrop-blur-sm shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[700px]">
          {/* Left - Carousel Section */}
          <CarouselSection
            currentSlide={currentSlide}
            slides={CAROUSEL_SLIDES}
            onSlideChange={setCurrentSlide}
          />

          {/* Right - Form Section */}
          <div className="p-5 flex flex-col justify-centerv">
            <div className="bg-black rounded-md  w-full h-full py-18 px-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl lg:text-4xl text-white mb-3">
                  Configure Your Interview Session
                </h1>
                <p className="text-white/60 text-lg">
                  Set up your mock interview with Jenie for realistic practice.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 py-8">
                <SelectField
                  label="Target Company *"
                  value={formData.targetCompany}
                  onChange={(val) => handleInputChange("targetCompany", val)}
                  options={[
                    {
                      value: "mang",
                      label: "MANG (Meta, Amazon, Netflix, Google)",
                    },
                    { value: "startup", label: "Startup" },
                    { value: "other", label: "Other" },
                  ]}
                />

                <SelectField
                  label="Target Role *"
                  value={formData.jobTitle}
                  onChange={(val) => handleInputChange("jobTitle", val)}
                  options={JOB_ROLES}
                />

                <SelectField
                  label="Difficulty *"
                  value={formData.difficulty}
                  onChange={(val) => handleInputChange("difficulty", val)}
                  options={DIFFICULTY_LEVELS}
                />

                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg rounded-xl transition-all hover:from-orange-600 hover:to-orange-700"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-5 w-5 border-b-2 border-white mr-3 rounded-full" />
                      Preparing Interview Room...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Start Interview with Jenie
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>

              <InterviewTip />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CarouselSectionProps {
  currentSlide: number;
  slides: CarouselSlide[];
  onSlideChange: (index: number) => void;
}

function CarouselSection({
  currentSlide,
  slides,
  onSlideChange,
}: CarouselSectionProps) {
  return (
    <div className="bg-white text-black p-8 lg:p-8 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-orange-500 rounded-full" />
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-orange-400 rounded-lg rotate-45" />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-orange-500/20 rounded-full" />
      </div>

      <Link to="/">
        <img src={Logo} alt="Ninebug Logo" className="h-10" />
      </Link>
      <div className="relative z-10  px-7">
        <div className="h-72 relative">
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <div className="flex flex-col justify-center h-full">
                  <Icon className="w-8 h-8 text-orange-400 mb-6" />
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-black/80 text-lg">{slide.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-orange-400 scale-125"
                  : "bg-black/30 hover:bg-black/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <InterviewFeatures />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12 border-2 mt-2 w-full border-gray-200 bg-transparent text-white focus:border-orange-500">
          <SelectValue
            placeholder={`Select ${label}`}
            className="text-white placeholder-white"
          />
        </SelectTrigger>
        <SelectContent className="bg-black text-white border border-gray-700">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="hover:bg-orange-600 focus:bg-orange-700 text-white"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function InterviewTip() {
  return (
    <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-200 text-sm text-orange-800 text-center">
      <strong>Interview Tip:</strong> Verbalize your thought process while
      coding to demonstrate problem-solving approach.
    </div>
  );
}
