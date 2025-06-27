import React from "react";
import { motion } from "framer-motion";
import {
  LayoutTemplate,
  Terminal,
  Trophy,
  Binary,
  BarChart2,
  Timer,
  ArrowRight,
  Zap,
  Target,
  Brain,
} from "lucide-react";

const HowWeHelpSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const steps = [
    {
      title: "AI-Powered Pattern Recognition",
      description:
        "Advanced algorithms analyze your coding patterns and identify knowledge gaps with precision, creating a personalized learning roadmap tailored to your unique strengths and areas for improvement.",
      icon: Brain,
      accent: "from-blue-500 to-cyan-400",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      visual: (
        <div className="relative h-64 w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          <div className="relative grid grid-cols-4 gap-3 h-full">
            {[
              { name: "Loops", color: "from-blue-400 to-cyan-400" },
              { name: "Recursion", color: "from-purple-400 to-fuchsia-400" },
              { name: "OOP", color: "from-green-400 to-emerald-400" },
              { name: "DP", color: "from-yellow-400 to-amber-400" },
              { name: "Sorting", color: "from-red-400 to-pink-400" },
              { name: "Graphs", color: "from-indigo-400 to-violet-400" },
              { name: "Trees", color: "from-lime-400 to-green-400" },
              { name: "Hashing", color: "from-orange-400 to-red-400" },
            ].map((concept, i) => (
              <motion.div
                key={concept.name}
                className={`bg-gradient-to-br ${concept.color}/20 rounded-xl p-3 flex flex-col items-center justify-center border border-white/10`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.05, 0.9],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              >
                <div
                  className={`w-3 h-3 rounded-full mb-2 bg-gradient-to-br ${concept.color}`}
                />
                <span className="text-xs text-white font-medium text-center">
                  {concept.name}
                </span>
                <motion.div
                  className="w-full h-1.5 mt-2 bg-white/10 rounded-full overflow-hidden"
                  animate={{
                    scaleX: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className={`h-full bg-gradient-to-r ${concept.color} rounded-full`}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Binary className="w-8 h-8 text-blue-400" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Adaptive Learning Engine",
      description:
        "Our intelligent system continuously adapts to your progress, delivering personalized problem sets that match your skill level and target company requirements, ensuring optimal learning efficiency.",
      icon: Target,
      accent: "from-purple-500 to-pink-400",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      visual: (
        <div className="relative h-64 w-full border border-white/30 rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="relative w-full max-w-xs">
              <motion.div
                className="absolute top-4 left-4 w-20 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex flex-col items-center justify-center border border-green-500/30"
                whileInView={{
                  y: [0, -10, 0],
                  rotateY: [0, 10, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs text-green-400 font-semibold">
                  Easy
                </span>
                <span className="text-lg font-bold text-green-300">85%</span>
              </motion.div>
              <motion.div
                className="absolute top-8 right-8 w-24 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex flex-col items-center justify-center border border-yellow-500/30"
                whileInView={{
                  y: [10, -15, 10],
                  rotateY: [0, -10, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs text-yellow-400 font-semibold">
                  Medium
                </span>
                <span className="text-lg font-bold text-yellow-300">72%</span>
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-8 w-28 h-18 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-xl flex flex-col items-center justify-center border border-red-500/30"
                whileInView={{
                  y: [0, -20, 0],
                  rotateY: [0, 15, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs text-red-400 font-semibold">Hard</span>
                <span className="text-lg font-bold text-red-300">45%</span>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BarChart2 className="w-8 h-8 text-purple-400" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Real-World Interview Simulation",
      description:
        "Experience authentic interview scenarios from leading tech companies with real-time feedback, performance analytics, and comprehensive preparation for technical interviews.",
      icon: Zap,
      accent: "from-orange-500 to-red-400",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
      visual: (
        <div className="relative h-64 w-full border border-white/30 rounded-2xl p-6 overflow-hidden">
          <div className="absolute inset-0  to-red-500/5"></div>
          <div className="relative flex items-center justify-center h-full">
            <div className="flex space-x-10 grid grid-cols-3">
              {[
                {
                  name: "Google",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                  url: "https://google.com",
                },
                {
                  name: "Amazon",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                  url: "https://amazon.com",
                },

                {
                  name: "Netflix",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                  url: "https://netflix.com",
                },
              ].map((company, i) => (
                <motion.div
                  key={company.name}
                  className={`h-16 object-contain rounded-xl flex flex-col items-center justify-center shadow-lg`}
                  initial={{ opacity: 0, y: 30, rotateY: -90 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    scale: [1, 1.05, 1],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.2,
                    duration: 0.8,
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <div className=" rounded-lg h-full mb-2 flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt="company-logo"
                      className="h-8 object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Timer className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20"></div>

      <div className="px-10 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            whileInView={{ scale: [0.8, 1.05, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm text-white ">
              How We Accelerate Your Success
            </span>
          </motion.div>

          <h2 className="text-7xl md:text-7xl mb-6 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight">
            Transform Your
            <span className="block bg-[#f48a1c] bg-clip-text text-transparent">
              Coding Journey
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Our intelligent platform combines cutting-edge AI with proven
            methodologies to deliver personalized learning experiences that
            adapt to your unique pace and goals.
          </p>
        </motion.div>

        {/* Enhanced Process Flow */}
        <div className="relative">
          {/* Animated Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent transform -translate-x-1/2 hidden lg:block">
            <motion.div
              className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500 to-transparent"
              animate={{ y: [0, 400, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-32"
          >
            {steps.map((step, index) => (
              <motion.div key={index} className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                  {/* Content */}
                  <motion.div
                    className={`${
                      index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                    } ${index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div
                      className={`rounded-2xl p-8 backdrop-blur-sm border border-white/5`}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div
                          className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                        </motion.div>
                        <div>
                          <span className="text-sm font-medium text-gray-400 mb-1 block">
                            Step {String(index + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-2xl font-bold text-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {step.description}
                      </p>

                      <motion.button
                        whileHover={{ x: 8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex cursor-pointer items-center text-transparent bg-gradient-to-r ${step.accent} bg-clip-text font-semibold text-lg`}
                      >
                        Explore Feature
                        <ArrowRight className="ml-3 h-5 w-5 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Visual */}
                  <motion.div
                    className={`${
                      index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, rotateY: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.visual}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <motion.div
                  className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${step.accent} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <motion.div
                    className={`absolute inset-0 w-8 h-8 bg-gradient-to-r ${step.accent} rounded-full opacity-30`}
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
