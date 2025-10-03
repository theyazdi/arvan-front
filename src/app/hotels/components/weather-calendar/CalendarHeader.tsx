"use client";

import { Calendar24Regular } from "@fluentui/react-icons";

interface CalendarHeaderProps {
  dateRange: string;
}

const CalendarHeader = () => (
  <div className="flex flex-row gap-2 items-center mb-4">
    <span className="i-fluent:calendar-24-regular"></span>
    <span className="text-base font-semibold">پیش‌بینی آب و هوا</span>
  </div>
);

export { CalendarHeader }; 