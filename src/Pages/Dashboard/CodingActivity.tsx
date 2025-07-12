"use client";
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
  dayOfMonth: number;
}

interface CalendarWeek {
  days: CalendarDay[];
}

interface CalendarMonth {
  name: string;
  shortName: string;
  weeks: CalendarWeek[];
}

const StreakCalendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [hoveredCell, setHoveredCell] = useState<CalendarDay | null>(null);
  const [contributionData, setContributionData] = useState<ContributionData>(
    {}
  );

  // Generate contribution data
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
      const rand = Math.random();
      let count = 0;
      if (rand > 0.65) count = Math.floor(Math.random() * 5) + 1;
      if (rand > 0.85) count = Math.floor(Math.random() * 10) + 6;
      if (rand > 0.95) count = Math.floor(Math.random() * 20) + 15;

      data[dateStr] = count;
    }
    return data;
  };

  useEffect(() => {
    setContributionData(generateContributionData(selectedYear));
  }, [selectedYear]);

  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 7) return 2;
    if (count <= 12) return 3;
    return 4;
  };

  const getActivityColor = (level: number): string => {
    const colors: Record<number, string> = {
      0: "#f0f0f0",
      1: "#c6e48b",
      2: "#7bc96f",
      3: "#239a3b",
      4: "#196127",
    };
    return colors[level] || "#f0f0f0";
  };

  // Create calendar structure by months
  const createCalendar = (year: number): CalendarMonth[] => {
    const months: CalendarMonth[] = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(firstDay.getDate() - firstDay.getDay()); // Start from Sunday

      const endDate = new Date(lastDay);
      endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay())); // End on Saturday

      const weeks: CalendarWeek[] = [];
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 7)
      ) {
        const week: CalendarWeek = { days: [] };
        for (let i = 0; i < 7; i++) {
          const day = new Date(d);
          day.setDate(d.getDate() + i);
          const dateStr = day.toISOString().split("T")[0];
          const count = contributionData[dateStr] || 0;
          const isCurrentMonth = day.getMonth() === month;

          week.days.push({
            date: new Date(day),
            count: isCurrentMonth ? count : 0,
            level: isCurrentMonth ? getActivityLevel(count) : 0,
            isCurrentMonth,
            dayOfMonth: day.getDate(),
          });
        }
        weeks.push(week);
      }

      months.push({
        name: monthNames[month],
        shortName: monthNames[month].slice(0, 3),
        weeks,
      });
    }

    return months;
  };

  const months = createCalendar(selectedYear);
  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate statistics
  const totalContributions = Object.values(contributionData).reduce(
    (sum, count) => sum + count,
    0
  );
  const activeDays = Object.values(contributionData).filter(
    (count) => count > 0
  ).length;
  const averageDaily = Math.round((totalContributions / 365) * 10) / 10;
  const maxDay = Math.max(...Object.values(contributionData));

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

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Activity Calendar {selectedYear}
          </h1>
          <p className="text-white">
            Track your daily activities throughout the year
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedYear(selectedYear - 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors bg-white"
            disabled={selectedYear <= 2019}
          >
            <ChevronLeft size={20} />
          </button>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSelectedYear(selectedYear + 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors  bg-white"
            disabled={selectedYear >= new Date().getFullYear()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {totalContributions}
          </div>
          <div className="text-sm text-green-600">Total Activities</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{activeDays}</div>
          <div className="text-sm text-blue-600">Active Days</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">
            {averageDaily}
          </div>
          <div className="text-sm text-purple-600">Daily Average</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="text-2xl font-bold text-orange-700">{maxDay}</div>
          <div className="text-sm text-orange-600">Best Single Day</div>
        </div>
      </div>

      {/* Calendar Grid - Single Row */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: "max-content" }}>
          {months.map((month, monthIndex) => (
            <div
              key={monthIndex}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
              style={{ minWidth: "200px" }}
            >
              {/* Month Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-2 rounded-t-lg border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 text-center text-sm">
                  {month.shortName}
                </h3>
              </div>

              {/* Month Calendar */}
              <div className="p-3">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {dayHeaders.map((day) => (
                    <div
                      key={day}
                      className="text-xs font-medium text-gray-500 text-center py-1"
                    >
                      {day.charAt(0)}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                {month.weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="grid grid-cols-7 gap-0.5 mb-0.5"
                  >
                    {week.days.map((day, dayIndex) => (
                      <div
                        key={`${monthIndex}-${weekIndex}-${dayIndex}`}
                        className={`
                          w-6 h-6 rounded cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium
                          ${
                            day.isCurrentMonth
                              ? "hover:ring-1 hover:ring-blue-400 hover:scale-110"
                              : "opacity-30"
                          }
                        `}
                        style={{
                          backgroundColor: day.isCurrentMonth
                            ? getActivityColor(day.level)
                            : "#f9f9f9",
                          color: day.level > 2 ? "white" : "#374151",
                          fontSize: "10px",
                        }}
                        onMouseEnter={() =>
                          day.isCurrentMonth && setHoveredCell(day)
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        title={
                          day.isCurrentMonth
                            ? `${day.count} activities on ${formatDate(
                                day.date
                              )}`
                            : ""
                        }
                      >
                        {day.dayOfMonth}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-center">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Activity Level:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-4 h-4 rounded-md border border-gray-300"
                  style={{ backgroundColor: getActivityColor(level) }}
                  title={`Level ${level}`}
                />
              ))}
              <span className="text-xs text-gray-500">More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: "50%",
            top: "20px",
          }}
        >
          <div className="font-medium">
            {hoveredCell.count === 0
              ? "No activities"
              : hoveredCell.count === 1
              ? "1 activity"
              : `${hoveredCell.count} activities`}
          </div>
          <div className="text-gray-300 text-xs">
            {formatDate(hoveredCell.date)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakCalendar;
