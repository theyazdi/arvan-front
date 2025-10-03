"use client";

import * as React from "react";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
} from "@fluentui/react-icons";
import jalaali from "jalaali-js";
import { cn } from "@/utils";
import { buttonVariants } from "@/components/ui/button";

interface PersianCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
  mode?: "single" | "range";
  selectedRange?: { from?: Date; to?: Date };
  onRangeSelect?: (range: { from?: Date; to?: Date }) => void;
  initialMonth?: Date;
  isMobile?: boolean;
}

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const persianWeekdayAbbr = ["ی", "د", "س", "چ", "پ", "ج", "ش"];

export function PersianCalendar({
  selectedDate,
  onDateSelect,
  className,
  mode = "single",
  selectedRange,
  onRangeSelect,
  initialMonth,
  isMobile,
}: PersianCalendarProps) {
  const [currentPersianDate, setCurrentPersianDate] = React.useState(() => {
    const dateToUse = initialMonth || new Date();
    return jalaali.toJalaali(
      dateToUse.getFullYear(),
      dateToUse.getMonth() + 1,
      dateToUse.getDate()
    );
  });

  const [selectedPersianDate, setSelectedPersianDate] = React.useState(() => {
    if (!selectedDate) return null;
    return jalaali.toJalaali(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      selectedDate.getDate()
    );
  });

  // Get days in current Persian month
  const getDaysInPersianMonth = (year: number, month: number) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return jalaali.isLeapJalaaliYear(year) ? 30 : 29;
  };

  // Get first day of month (0 = Saturday, 1 = Sunday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = jalaali.toJalaali(year, month, 1);
    const gregorianDate = jalaali.toGregorian(
      firstDay.jy,
      firstDay.jm,
      firstDay.jd
    );
    const date = new Date(
      gregorianDate.gy,
      gregorianDate.gm - 1,
      gregorianDate.gd
    );
    return date.getDay();
  };

  const daysInMonth = getDaysInPersianMonth(
    currentPersianDate.jy,
    currentPersianDate.jm
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentPersianDate.jy,
    currentPersianDate.jm
  );
  const persianFirstDay = (firstDayOfMonth + 1) % 7;

  const handleDateClick = (day: number) => {
    const newPersianDate = {
      jy: currentPersianDate.jy,
      jm: currentPersianDate.jm,
      jd: day,
    };
    setSelectedPersianDate(newPersianDate);
    const gregorian = jalaali.toGregorian(
      newPersianDate.jy,
      newPersianDate.jm,
      newPersianDate.jd
    );
    const gregorianDate = new Date(
      gregorian.gy,
      gregorian.gm - 1,
      gregorian.gd
    );

    if (mode === "range" && onRangeSelect) {
      if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
        onRangeSelect({ from: gregorianDate, to: undefined });
      } else {
        if (gregorianDate > selectedRange.from) {
          onRangeSelect({ from: selectedRange.from, to: gregorianDate });
        } else {
          onRangeSelect({ from: gregorianDate, to: undefined });
        }
      }
    } else {
      onDateSelect?.(gregorianDate);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentPersianDate((prev) => {
      if (prev.jm === 1) {
        return { jy: prev.jy - 1, jm: 12, jd: 1 };
      }
      return { ...prev, jm: prev.jm - 1, jd: 1 };
    });
  };

  const goToNextMonth = () => {
    setCurrentPersianDate((prev) => {
      if (prev.jm === 12) {
        return { jy: prev.jy + 1, jm: 1, jd: 1 };
      }
      return { ...prev, jm: prev.jm + 1, jd: 1 };
    });
  };

  const isToday = (day: number) => {
    const now = new Date();
    const todayPersian = jalaali.toJalaali(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );
    return (
      day === todayPersian.jd &&
      currentPersianDate.jm === todayPersian.jm &&
      currentPersianDate.jy === todayPersian.jy
    );
  };

  const isSelected = (day: number) => {
    if (mode === "range" && selectedRange) {
      const currentDate = jalaali.toGregorian(
        currentPersianDate.jy,
        currentPersianDate.jm,
        day
      );
      const gregorianDate = new Date(
        currentDate.gy,
        currentDate.gm - 1,
        currentDate.gd
      );

      if (
        selectedRange.from &&
        gregorianDate.getTime() === selectedRange.from.getTime()
      ) {
        return true;
      }
      if (
        selectedRange.to &&
        gregorianDate.getTime() === selectedRange.to.getTime()
      ) {
        return true;
      }
      if (selectedRange.from && selectedRange.to) {
        return (
          gregorianDate > selectedRange.from && gregorianDate < selectedRange.to
        );
      }
      return false;
    }

    return (
      selectedPersianDate &&
      day === selectedPersianDate.jd &&
      currentPersianDate.jm === selectedPersianDate.jm &&
      currentPersianDate.jy === selectedPersianDate.jy
    );
  };

  const isInRange = (day: number) => {
    if (mode === "range" && selectedRange?.from && selectedRange?.to) {
      const currentDate = jalaali.toGregorian(
        currentPersianDate.jy,
        currentPersianDate.jm,
        day
      );
      const gregorianDate = new Date(
        currentDate.gy,
        currentDate.gm - 1,
        currentDate.gd
      );
      return (
        gregorianDate > selectedRange.from && gregorianDate < selectedRange.to
      );
    }
    return false;
  };

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < persianFirstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className={cn("p-4 rounded-lg text-base", className)}>
      {/* Header */}
      <div className={cn("flex justify-between items-center mb-4", isMobile && "flex-row-reverse")}>
        {/* Next/Prev buttons on left */}
        <div className={cn("flex gap-1 order-1", isMobile && "flex-row-reverse")}>
          <button
            onClick={goToPreviousMonth}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "h-7 w-7 bg-transparent p-0 opacity-100"
            )}
          >
            <ChevronLeft24Regular className="h-4 w-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "h-7 w-7 bg-transparent p-0 opacity-100"
            )}
          >
            <ChevronRight24Regular className="h-4 w-4" />
          </button>
        </div>
        {/* Month/Year on right */}
        <div className="text-lg font-bold px-3 order-3">
          {persianMonths[currentPersianDate.jm - 1]} {currentPersianDate.jy}
        </div>
      </div>
      {/* Weekdays */}
      <div className={cn("flex mb-3 text-sm flex-row-reverse", isMobile && "flex-row")}>
        {persianWeekdayAbbr.map((day, index) => (
          <div key={index} className="flex-1 text-center font-bold text-black">
            {day}
          </div>
        ))}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7 gap-1" dir="rtl">
        {calendarDays.map((day, index) => (
          <div key={index} className="h-8">
            {day && (
              <button
                onClick={() => handleDateClick(day)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-8 w-8 p-0 text-sm rounded-full relative",
                  isToday(day) && "bg-accent text-accent-foreground",
                  isSelected(day) &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  isInRange(day) && "bg-primary/20 text-primary-foreground"
                )}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
