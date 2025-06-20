import { companies } from "@/data/DataStore";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Replace your companies data with actual logo images

export const InfiniteScrollLogos = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= companies.length - itemsPerView ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, itemsPerView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? companies.length - itemsPerView : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev >= companies.length - itemsPerView ? 0 : prev + 1
    );
  };

  const maxIndex = Math.max(0, companies.length - itemsPerView);

  return (
    <div className="relative overflow-hidden py-7">
      {/* Gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Carousel Container */}
      <div
        className="relative group"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Carousel Track */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              width: `${(companies.length * 100) / itemsPerView}%`,
            }}
          >
            {companies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / companies.length}%` }}
              >
                <div
                  className="group/card relative rounded-xl p-8 h-40
                               transition-all duration-300 hover:shadow-lg hover:shadow-primary/5
                               hover:border-primary/20 hover:-translate-y-1"
                >
                  {/* Logo container */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-h-16 max-w-32 object-contain 
                               transition-all duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Company name tooltip */}
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full
                                 bg-primary text-primary-foreground text-xs px-2 py-1 rounded
                                 opacity-0 group-hover/card:opacity-100 transition-all duration-300
                                 pointer-events-none whitespace-nowrap"
                  >
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Auto-play indicator */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors
                       flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isAutoPlay ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <span>{isAutoPlay ? "Auto-play on" : "Auto-play off"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
