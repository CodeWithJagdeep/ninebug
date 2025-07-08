"use client";

import Header from "@/components/common/Header";
import PremiumTestimonials from "@/components/common/Testimonial";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  convertPrice,
  formatCurrency,
  getCurrencyForLanguage,
} from "@/util/currency";
import {
  Check,
  Star,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  Crown,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Footer from "@/components/common/Footer";

interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  features: string[];
  bestFor: string;
  cta: string;
  highlight?: boolean;
  popular?: boolean;
  ctaVariant?: "default" | "secondary" | "outline";
}

const Checkout = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currency = getCurrencyForLanguage(currentLanguage);

  const PLANS: Plan[] = useMemo(
    () => [
      {
        id: "free",
        name: "Free Plan",
        duration: "Forever",
        price: 0,
        bestFor: "Perfect for getting started",
        cta: "Start Free",
        ctaVariant: "outline",
        features: [
          "Access to 500+ DSA questions",
          "Company-wise question roadmap",
          "Frequency-based problem sets",
          "Structured DSA roadmap",
          "Daily XP and learning tracker",
          "Basic code analysis",
        ],
      },
      {
        id: "one-day",
        name: "1-Day AI Access",
        duration: "24 hours",
        price: 0.49,
        bestFor: "Quick AI-powered practice session",
        cta: "Get 1-Day Access",
        ctaVariant: "secondary",
        features: [
          "Unlimited AI interview simulations",
          "Real-time AI feedback & hints",
          "All practice problems included",
          "Code execution and analysis",
          "Priority server access",
          "Performance insights",
        ],
      },
      {
        id: "monthly",
        name: "Monthly Pro",
        duration: "30 days",
        price: 3.99,
        bestFor: "Complete interview preparation",
        cta: "Start Pro Trial",
        highlight: true,
        popular: true,
        ctaVariant: "default",
        features: [
          "Everything in Free & 1-Day Plans",
          "Unlimited AI feedback & interviews",
          "Advanced performance analytics",
          "Premium learning modules",
          "Priority support",
          "Custom study plans",
          "Mock interview recordings",
        ],
      },
    ],
    []
  );

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(PLANS[2]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    setIsPurchasing(true);
    // Add purchase logic here
    setTimeout(() => setIsPurchasing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20 transition-colors"
            >
              <Crown className="w-3 h-3 mr-1" />
              Trusted by 10,000+ developers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Choose Your Path to
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {" "}
                Excellence
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Whether you're preparing for your first tech interview or aiming
              for FAANG, our AI-powered platform adapts to your needs. Start
              free and scale as you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan, idx: number) => (
            <Card
              key={idx}
              className={cn(
                "relative cursor-pointer transition-all duration-300 hover:scale-[1.02] group",
                "bg-gray-900/80 border-gray-800 backdrop-blur-sm hover:bg-gray-900/90",
                selectedPlan?.id === plan.id
                  ? "ring-2 ring-orange-500 shadow-2xl shadow-orange-500/20 bg-gray-900"
                  : "hover:border-gray-700 hover:shadow-xl hover:shadow-orange-500/5",
                plan.highlight &&
                  "border-orange-500/30 shadow-xl shadow-orange-500/10"
              )}
              onClick={() => handlePlanSelect(plan)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-orange-50 transition-colors">
                    {plan.name}
                  </CardTitle>
                  {selectedPlan?.id === plan.id && (
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <CardDescription className="text-gray-400 text-base group-hover:text-gray-300 transition-colors">
                  {plan.bestFor}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-6">
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white group-hover:text-orange-50 transition-colors">
                      {formatCurrency(
                        convertPrice(plan.price, currency),
                        currency
                      )}
                    </span>
                    <span className="text-gray-400 ml-2 group-hover:text-gray-300 transition-colors">
                      /{plan.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start">
                      <Check className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={cn(
                    "w-full py-3 font-semibold transition-all duration-200 shadow-lg",
                    selectedPlan?.id === plan.id
                      ? "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25"
                      : plan.highlight
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/25"
                      : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-orange-500/50"
                  )}
                  variant={plan.ctaVariant}
                >
                  {selectedPlan?.id === plan.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Selected Plan Summary */}
        {selectedPlan && (
          <Card className="bg-gradient-to-r from-orange-900/20 via-gray-900/50 to-orange-900/20 border-orange-500/30 mb-16 shadow-xl shadow-orange-500/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ready to get started with {selectedPlan.name}?
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {formatCurrency(
                      convertPrice(selectedPlan.price, currency),
                      currency
                    )}
                    {selectedPlan.price > 0 && ` for ${selectedPlan.duration}`}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 mt-4 md:mt-0 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
                  onClick={handlePurchase}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Overview */}
        <Card className="bg-gray-900/50 border-gray-800 mb-16 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Access to all coding problems",
                "Company-specific question banks",
                "Pattern recognition drills",
                "Advanced code analysis",
                "Progress tracking dashboard",
                "Mobile-friendly interface",
                "Regular content updates",
                "Priority community support",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start group">
                  <Check className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0 group-hover:text-orange-400 transition-colors" />
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="px-20 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How We Accelerate Your{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform is designed to maximize your learning
            efficiency and interview performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "AI-Powered Pattern Recognition",
              description:
                "Our advanced algorithms analyze your coding patterns to identify knowledge gaps and create personalized learning roadmaps tailored to your goals.",
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Adaptive Learning Engine",
              description:
                "The system intelligently adapts to your progress, delivering problem sets that match your skill level and target companies for optimal preparation.",
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Real Interview Simulation",
              description:
                "Experience authentic interview scenarios with real-time feedback, comprehensive performance analytics, and detailed improvement recommendations.",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="bg-gray-900/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group backdrop-blur-sm"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-orange-50 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <PremiumTestimonials />

      {/* Final CTA */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-600/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of developers who've landed their dream jobs with our
            platform.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Choose Your Plan
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
