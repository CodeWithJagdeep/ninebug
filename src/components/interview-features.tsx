import { MessageCircle, Code2, Eye, BarChart3 } from "lucide-react";

export function InterviewFeatures() {
  const features = [
    {
      icon: MessageCircle,
      title: "Natural Conversation",
      description:
        "Jenie engages in natural dialogue, asking clarifying questions and discussing your approach",
    },
    {
      icon: Code2,
      title: "Live Code Review",
      description:
        "Watch as Jenie reviews your code in real-time and suggests optimizations",
    },
    {
      icon: Eye,
      title: "Behavioral Assessment",
      description:
        "Practice answering behavioral questions and receive feedback on your communication style",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Get detailed insights on your coding speed, accuracy, and problem-solving approach",
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-white/20">
      <h3 className="text-xl font-bold mb-6 text-center">
        What to Expect in Your Interview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="flex items-start space-x-3 py-3 px-4 rounded-lg bg-black/5"
            >
              <IconComponent className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
