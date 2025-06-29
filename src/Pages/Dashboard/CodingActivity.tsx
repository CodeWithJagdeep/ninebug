import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ContributionData {
  [date: string]: number;
}

interface CalendarDay {
  date: Date;
  count: number;
  level: number;
  isCurrentMonth: boolean;
}

const ActivityCalendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [hoveredCell, setHoveredCell] = useState<CalendarDay | null>(null);
  const [contributionData, setContributionData] = useState<ContributionData>(
    {}
  );
const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  // Generate GitHub-like contribution data
  const generateContributionData = (year: number): ContributionData => {
    const data: ContributionData = {};
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      let rand = Math.random();
      if (isWeekend) rand = rand * 0.7;

      let count = 0;
      if (rand > 0.7) count = Math.floor(Math.random() * 3) + 1;
      if (rand > 0.85) count = Math.floor(Math.random() * 5) + 3;
      if (rand > 0.95) count = Math.floor(Math.random() * 10) + 8;

      data[dateStr] = count;
    }
    return data;
  };

  useEffect(() => {
    setContributionData(generateContributionData(selectedYear));
  }, [selectedYear]);

  // GitHub's green color scheme - enhanced
  const getActivityColor = (level: number): string => {
    const colors = [
      "#1a1a1a", // 0 - Dark gray for black theme
      "#0d4429", // 1 - Dark green
      "#006d32", // 2 - Medium green
      "#26a641", // 3 - Light green
      "#39d353", // 4 - Bright green
    ];
    return colors[level] || colors[0];
  };

  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  // Create GitHub-style calendar layout (weeks as columns)
  const createCalendar = (year: number) => {
    const weeks: CalendarDay[][] = Array(53)
      .fill(null)
      .map(() => []);
    const firstDay = new Date(year, 0, 1);

    // Adjust to start on Sunday
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    // Fill all 53 weeks
    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + week * 7 + day);

        const dateStr = currentDate.toISOString().split("T")[0];
        const count = contributionData[dateStr] || 0;
        const isCurrentMonth = currentDate.getFullYear() === year;

        weeks[week][day] = {
          date: new Date(currentDate),
          count,
          level: isCurrentMonth ? getActivityLevel(count) : 0,
          isCurrentMonth,
        };
      }
    }

    return weeks;
  };

  const weeks = createCalendar(selectedYear);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate statistics
  const totalContributions = Object.values(contributionData).reduce(
    (sum, count) => sum + count,
    0
  );
  const activeDays = Object.values(contributionData).filter(
    (count) => count > 0
  ).length;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const availableYears = Array.from(
    { length: 6 },
    (_, i) => new Date().getFullYear() - i
  );

  const renderMonthLabels = () => {
    const months = [];
    let currentMonth = -1;

    for (let week = 0; week < Math.min(weeks.length, 53); week++) {
      const firstDay = weeks[week][0]?.date;
      if (!firstDay) continue;

      const month = firstDay.getMonth();

      if (month !== currentMonth && week > 0) {
        months.push(
          <div
            key={`month-${week}`}
            className="text-xs font-medium text-white/60 h-5 flex items-center"
            style={{
              gridColumn: `${week + 2} / span 4`,
            }}
          >
            {monthNames[month]}
          </div>
        );
        currentMonth = month;
      }
    }

    return months;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="bg-black rounded-xl shadow-lg border border-white/20">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              {selectedYear} Contributions
            </h2>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <button
                onClick={() => setSelectedYear(selectedYear - 1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedYear <= 2019}
              >
                <ChevronLeft size={20} className="text-white/70" />
              </button>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white text-sm"
              >
                {availableYears.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="bg-black text-white"
                  >
                    {year}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSelectedYear(selectedYear + 1)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedYear >= new Date().getFullYear()}
              >
                <ChevronRight size={20} className="text-white/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {totalContributions}
              </div>
              <div className="text-sm text-white/60">
                contributions in {selectedYear}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">
                {activeDays}
              </div>
              <div className="text-sm text-white/60">active days</div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="w-full overflow-x-auto">
            <div
              className="grid gap-0.5 sm:gap-1"
              style={{
                gridTemplateColumns: "auto repeat(53, minmax(10px, 16px))",
                gridTemplateRows: "auto repeat(7, minmax(10px, 16px))",
                minWidth: "700px",
              }}
            >
              {/* Month labels row */}
              <div className="col-start-2 col-span-full grid grid-cols-53 gap-0.5 sm:gap-1 mb-2">
                {renderMonthLabels()}
              </div>

              {/* Day labels */}
              {dayNames.map((day, i) => (
                <div
                  key={i}
                  className="text-xs font-medium text-white/50 flex items-center justify-end pr-1 sm:pr-2 w-6 sm:w-8"
                  style={{ gridRow: i + 2 }}
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{day.charAt(0)}</span>
                </div>
              ))}

              {/* Contribution squares */}
              {dayNames.map((_, dayIndex) => (
                <React.Fragment key={dayIndex}>
                  {weeks.map((week, weekIndex) => {
                    const day = week[dayIndex];
                    if (!day) return null;

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-sm transition-all duration-200 ${
                          day.isCurrentMonth
                            ? "cursor-pointer hover:ring-1 hover:ring-green-400 hover:ring-opacity-60"
                            : "opacity-30"
                        }`}
                        style={{
                          backgroundColor: getActivityColor(day.level),
                          gridColumn: weekIndex + 2,
                          gridRow: dayIndex + 2,
                        }}
                        onMouseEnter={() =>
                          day.isCurrentMonth && setHoveredCell(day)
                        }
                        onMouseLeave={() => {
                          setHoveredCell(null);
                          setMousePosition(null);
                        }}
                        onMouseMove={(e) => {
                          setMousePosition({ x: e.clientX, y: e.clientY });
                        }}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
          <div className="flex items-center justify-center sm:justify-end">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs font-medium text-white/50">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm"
                  style={{ backgroundColor: getActivityColor(level) }}
                />
              ))}
              <span className="text-xs font-medium text-white/50">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl pointer-events-none"
          style={{
            position: "fixed",
            left: mousePosition?.x ?? 0,
            top: (mousePosition?.y ?? 0) - 10,
            transform: "translate(10px, -100%)",
          }}
        >
          <div className="font-medium">
            {hoveredCell.count === 0
              ? "No contributions"
              : hoveredCell.count === 1
              ? "1 contribution"
              : `${hoveredCell.count} contributions`}
          </div>
          <div className="text-gray-300 text-xs mt-1">
            {formatDate(hoveredCell.date)}
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );
};

export default ActivityCalendar;
