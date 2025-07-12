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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currency = getCurrencyForLanguage(currentLanguage);

  const PLANS: Plan[] = useMemo(
    () => [
      {
        id: "free",
        name: t("pricing.plans.free.name"),
        duration: t("pricing.plans.free.duration"),
        price: 0,
        bestFor: t("pricing.plans.free.bestFor"),
        cta: t("pricing.plans.free.cta"),
        ctaVariant: "outline",
        features: [
          t("pricing.features.access500"),
          t("pricing.features.companyRoadmap"),
          t("pricing.features.frequencySets"),
          t("pricing.features.structuredRoadmap"),
          t("pricing.features.dailyTracker"),
          t("pricing.features.basicAnalysis"),
        ],
      },
      {
        id: "one-day",
        name: t("pricing.plans.oneDay.name"),
        duration: t("pricing.plans.oneDay.duration"),
        price: 0.49,
        bestFor: t("pricing.plans.oneDay.bestFor"),
        cta: t("pricing.plans.oneDay.cta"),
        ctaVariant: "secondary",
        features: [
          t("pricing.features.unlimitedAI"),
          t("pricing.features.realTimeFeedback"),
          t("pricing.features.allProblems"),
          t("pricing.features.codeExecution"),
          t("pricing.features.priorityAccess"),
          t("pricing.features.performanceInsights"),
        ],
      },
      {
        id: "monthly",
        name: t("pricing.plans.monthly.name"),
        duration: t("pricing.plans.monthly.duration"),
        price: 3.99,
        bestFor: t("pricing.plans.monthly.bestFor"),
        cta: t("pricing.plans.monthly.cta"),
        highlight: true,
        popular: true,
        ctaVariant: "default",
        features: [
          t("pricing.features.allIncluded"),
          t("pricing.features.unlimitedFeedback"),
          t("pricing.features.advancedAnalytics"),
          t("pricing.features.premiumModules"),
          t("pricing.features.prioritySupport"),
          t("pricing.features.customPlans"),
          t("pricing.features.mockInterviews"),
        ],
      },
    ],
    [t]
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
              {t("pricing.trustedBy")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {t("pricing.heroTitle")}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {" "}
                {t("pricing.heroHighlight")}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("pricing.heroSubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-4 sm:px-6 lg:px-20 py-16">
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
                    {t("pricing.mostPopular")}
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
                      {t("common.selected")}
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
                    {t("pricing.readyToStart", { plan: selectedPlan.name })}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {formatCurrency(
                      convertPrice(selectedPlan.price, currency),
                      currency
                    )}
                    {selectedPlan.price > 0 &&
                      ` ${t("pricing.forDuration", {
                        duration: selectedPlan.duration,
                      })}`}
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
                      {t("common.processing")}...
                    </>
                  ) : (
                    <>
                      {t("pricing.continueToCheckout")}
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
              {t("pricing.featuresTitle1")}{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {t("pricing.featuresTitle2")}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                t("pricing.allFeatures.accessAll"),
                t("pricing.allFeatures.companyBanks"),
                t("pricing.allFeatures.patternDrills"),
                t("pricing.allFeatures.advancedAnalysis"),
                t("pricing.allFeatures.progressDashboard"),
                t("pricing.allFeatures.mobileFriendly"),
                t("pricing.allFeatures.contentUpdates"),
                t("pricing.allFeatures.communitySupport"),
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
      <div className="px-4 sm:px-6 lg:px-20 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("pricing.howItWorksTitle1")}{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              {t("pricing.howItWorksTitle2")}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("pricing.howItWorksSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: t("pricing.aifeatures.aiPattern.title"),
              description: t("pricing.aifeatures.aiPattern.description"),
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: t("pricing.aifeatures.adaptiveLearning.title"),
              description: t("pricing.aifeatures.adaptiveLearning.description"),
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: t("pricing.aifeatures.interviewSimulation.title"),
              description: t(
                "pricing.aifeatures.interviewSimulation.description"
              ),
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
            {t("pricing.finalCta.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {t("pricing.finalCta.subtitle")}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {t("pricing.finalCta.button")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
