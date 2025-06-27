import { ChevronLeft, ChevronRight, Flame, Calendar } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ActivityDay = {
  date: string;
  count: number;
  level: number;
};

const StreakCalendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    position: { x: number; y: number };
  } | null>(null);

  //   const months = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate realistic activity data for multiple years
  const generateStreakData = useMemo(() => {
    const data: ActivityDay[] = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setFullYear(today.getFullYear() - 2); // 3 years of data
    startDate.setMonth(5, 1); // Start from June 1st

    // Create realistic activity pattern with seasonal variations
    const activityPattern = [
      // Current year
      { year: today.getFullYear(), month: 5, days: [5, 12, 19], count: 2 }, // Jun
      { year: today.getFullYear(), month: 6, days: [2, 9, 16, 23], count: 1 }, // Jul
      {
        year: today.getFullYear(),
        month: 7,
        days: [1, 8, 15, 22, 29],
        count: 3,
      }, // Aug
      { year: today.getFullYear(), month: 8, days: [5, 12, 19, 26], count: 2 }, // Sep
      {
        year: today.getFullYear(),
        month: 9,
        days: [3, 10, 17, 24, 31],
        count: 4,
      }, // Oct
      { year: today.getFullYear(), month: 10, days: [7, 14, 21, 28], count: 1 }, // Nov
      { year: today.getFullYear(), month: 11, days: [5, 12, 19, 26], count: 3 }, // Dec
      {
        year: today.getFullYear(),
        month: 0,
        days: [2, 9, 16, 23, 30],
        count: 2,
      }, // Jan
      { year: today.getFullYear(), month: 1, days: [6, 13, 20, 27], count: 1 }, // Feb
      { year: today.getFullYear(), month: 2, days: [6, 13, 20, 27], count: 4 }, // Mar
      { year: today.getFullYear(), month: 3, days: [3, 10, 17, 24], count: 2 }, // Apr
      {
        year: today.getFullYear(),
        month: 4,
        days: [1, 8, 15, 22, 29],
        count: 1,
      }, // May
      // Previous year
      {
        year: today.getFullYear() - 1,
        month: 5,
        days: [7, 14, 21, 28],
        count: 1,
      }, // Jun
      {
        year: today.getFullYear() - 1,
        month: 6,
        days: [4, 11, 18, 25],
        count: 2,
      }, // Jul
      {
        year: today.getFullYear() - 1,
        month: 7,
        days: [4, 11, 18, 25],
        count: 3,
      }, // Aug
      {
        year: today.getFullYear() - 1,
        month: 8,
        days: [1, 8, 15, 22, 29],
        count: 1,
      }, // Sep
      {
        year: today.getFullYear() - 1,
        month: 9,
        days: [6, 13, 20, 27],
        count: 4,
      }, // Oct
      {
        year: today.getFullYear() - 1,
        month: 10,
        days: [3, 10, 17, 24],
        count: 2,
      }, // Nov
      {
        year: today.getFullYear() - 1,
        month: 11,
        days: [1, 8, 15, 22, 29],
        count: 1,
      }, // Dec
      {
        year: today.getFullYear() - 1,
        month: 0,
        days: [5, 12, 19, 26],
        count: 3,
      }, // Jan
      {
        year: today.getFullYear() - 1,
        month: 1,
        days: [2, 9, 16, 23, 30],
        count: 2,
      }, // Feb
      {
        year: today.getFullYear() - 1,
        month: 2,
        days: [7, 14, 21, 28],
        count: 1,
      }, // Mar
      {
        year: today.getFullYear() - 1,
        month: 3,
        days: [4, 11, 18, 25],
        count: 4,
      }, // Apr
      {
        year: today.getFullYear() - 1,
        month: 4,
        days: [2, 9, 16, 23, 30],
        count: 2,
      }, // May
    ];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const dayOfMonth = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();

      const matchingPattern = activityPattern.find(
        (pattern) =>
          pattern.year === year &&
          pattern.month === month &&
          pattern.days.includes(dayOfMonth)
      );

      const count = matchingPattern?.count || 0;
      data.push({
        date: dateStr,
        count,
        level: count ? Math.min(Math.floor(count / 2) + 1, 4) : 0,
      });
    }

    return data;
  }, []);

  // Filter data for the current year (June to June)
  const yearData = useMemo(() => {
    return generateStreakData.filter((day) => {
      const date = new Date(day.date);
      const month = date.getMonth();

      // For current year, include all months up to current month
      if (date.getFullYear() === currentYear) {
        if (currentYear === new Date().getFullYear()) {
          return month >= 5 || month <= new Date().getMonth(); // June to current month
        }
        return true; // For past years, include all months
      }

      // For previous year, include June to May
      if (date.getFullYear() === currentYear - 1) {
        return month >= 5; // June to December
      }

      // For next year, include January to May
      if (date.getFullYear() === currentYear + 1) {
        return month <= 4; // January to May
      }

      return false;
    });
  }, [generateStreakData, currentYear]);

  // Group data by weeks for the current year
  const weeks = useMemo(() => {
    const weeks: (ActivityDay | null)[][] = [];
    let currentWeek: (ActivityDay | null)[] = [];

    yearData.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();

      if (index === 0) {
        // Fill empty days at the beginning of the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null);
        }
      }

      currentWeek.push(day);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    // Add remaining days to the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [yearData]);

  const getIntensityColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-white/10 border-white/10 border";
      case 1:
        return "bg-green-100 dark:bg-green-900";
      case 2:
        return "bg-green-300 dark:bg-green-700";
      case 3:
        return "bg-green-500 dark:bg-green-600";
      case 4:
        return "bg-green-700 dark:bg-green-500";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  // Calculate streaks across all years
  const { currentStreak, maxStreak, totalSubmissions } = useMemo(() => {
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let total = 0;

    generateStreakData.forEach((day) => {
      total += day.count;
      if (day.count > 0) {
        tempStreak++;
        if (day.date === new Date().toISOString().split("T")[0]) {
          currentStreak = tempStreak;
        }
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    });

    return { currentStreak, maxStreak, totalSubmissions: total };
  }, [generateStreakData]);

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    generateStreakData.forEach((day) => {
      years.add(new Date(day.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a); // Most recent first
  }, [generateStreakData]);

  const handlePrevYear = () => {
    const currentIndex = availableYears.indexOf(currentYear);
    if (currentIndex < availableYears.length - 1) {
      setCurrentYear(availableYears[currentIndex + 1]);
    }
  };

  const handleNextYear = () => {
    const currentIndex = availableYears.indexOf(currentYear);
    if (currentIndex > 0) {
      setCurrentYear(availableYears[currentIndex - 1]);
    }
  };

  // Calculate the range of years to display
  const getYearRange = () => {
    if (availableYears.length === 0) return "";
    const minYear = Math.min(...availableYears);
    const maxYear = Math.max(...availableYears);
    return `${minYear} - ${maxYear}`;
  };

  // Get the first day of the first week to determine offset
  const firstDayOfFirstWeek = useMemo(() => {
    if (yearData.length === 0) return null;
    return new Date(yearData[0].date);
  }, [yearData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black rounded-xl border border-white/40 p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white dark:text-gray-100 flex items-center">
            <Flame className="w-5 h-5 mr-2 text-orange-500" />
            Coding Activity
          </h3>
          <p className="text-sm text-white/90 mt-1">
            {getYearRange()} • {totalSubmissions} total submissions
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm text-white/70">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
                />
              ))}
            </div>
            <span className="text-white">More</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrevYear}
              disabled={
                availableYears.indexOf(currentYear) ===
                availableYears.length - 1
              }
              className={`p-1.5 rounded-md ${
                availableYears.indexOf(currentYear) ===
                availableYears.length - 1
                  ? "text-white/80"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <ChevronLeft className="w-4 h-4" color="white" />
            </button>

            <span className="text-sm font-medium text-white min-w-[60px] text-center">
              {currentYear}
            </span>

            <button
              onClick={handleNextYear}
              disabled={availableYears.indexOf(currentYear) === 0}
              className={`p-1.5 rounded-md ${
                availableYears.indexOf(currentYear) === 0
                  ? "text-white"
                  : "text-white  hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-3 shadow-lg z-10 pointer-events-none"
            style={{
              left: `${hoveredDay.position.x}px`,
              top: `${hoveredDay.position.y}px`,
            }}
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {new Date(hoveredDay.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {hoveredDay.count} problem{hoveredDay.count !== 1 ? "s" : ""}{" "}
              solved
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <div className="flex space-x-2">
          {/* Day labels */}
          <div className="flex flex-col">
            <div className="h-6"></div>
            {/* {days.map((day, index) => (
              <div
                key={index}
                className="h-4 flex items-center text-xs text-gray-500 dark:text-gray-400 pr-2"
              >
                {day[0]}
              </div>
            ))} */}
          </div>

          {/* Calendar grid */}
          <div className="flex-1">
            {/* Month labels */}
            <div className="flex mb-1 h-6">
              {weeks.map((week, weekIndex) => {
                const firstDay = week.find((day) => day !== null);
                if (!firstDay) return null;

                const date = new Date(firstDay.date);

                return (
                  <div
                    key={weekIndex}
                    className="w-4 flex justify-center"
                    style={{
                      marginLeft:
                        weekIndex === 0 && firstDayOfFirstWeek
                          ? `${firstDayOfFirstWeek.getDay() * 16}px`
                          : "0",
                    }}
                  ></div>
                );
              })}
            </div>

            {/* Activity grid */}
            <div className="flex space-x-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={dayIndex}
                      className={`w-4 h-4 rounded-sm ${
                        day ? getIntensityColor(day.level) : "bg-transparent"
                      } cursor-pointer relative border border-transparent hover:border-gray-300 dark:hover:border-gray-600`}
                      onMouseEnter={(e) => {
                        if (!day) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({
                          date: day.date,
                          count: day.count,
                          position: {
                            x: rect.left + window.scrollX,
                            y: rect.top + window.scrollY - 50,
                          },
                        });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      whileHover={{ scale: 1.15 }}
                    >
                      {(day?.count as number) > 3 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full border border-white dark:border-gray-900"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/30 flex flex-col md:flex-row items-start md:items-center justify-between text-sm text-white/70">
        <div className="mb-3 md:mb-0">
          <span className="font-medium text-white">
            {yearData.reduce((sum, day) => sum + day.count, 0)} submissions
          </span>{" "}
          in {currentYear}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center">
            <Flame className="w-4 h-4 mr-1.5 text-orange-500" />
            <span>
              Current streak:{" "}
              <span className="font-medium text-white">
                {currentStreak} day{currentStreak !== 1 ? "s" : ""}
              </span>
            </span>
          </div>

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5 text-blue-500" />
            <span>
              Max streak:{" "}
              <span className="font-medium text-white">
                {maxStreak} day{maxStreak !== 1 ? "s" : ""}
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StreakCalendar;
