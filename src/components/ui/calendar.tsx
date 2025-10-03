"use client";

import * as React from "react";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
} from "@fluentui/react-icons";
import { DayPicker } from "react-day-picker";
import { faIR } from "date-fns-jalali/locale";

import { cn } from "@/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Persian weekday abbreviations
const persianWeekdayAbbr = ["ش", "ج", "پ", "چ", "س", "د", "ی"];

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  locale = faIR,
  month,
  ...props
}: CalendarProps) {
  // Ensure the calendar shows the current month if no month is specified
  const defaultMonth = month || new Date();
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className, "rounded-lg")}
      locale={locale}
      month={defaultMonth}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 text-black",
        caption: "flex justify-between items-center",
        caption_label: "text-xl font-bold px-5 order-2",
        nav: "flex space-x-1 items-center order-1",
        nav_button: cn(
          buttonVariants({ variant: "secondary" }),
          "h-7 w-7 bg-transparent p-0 opacity-100"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-black text-sm rounded-md w-full mr-4 font-bold",
        row: "flex w-full mt-2",
        cell: "h-7 w-7 text-center text-sm p-0 relative mr-[17px] [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20 rounded-full text-[#666666]",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-2 font-normal text-sm aria-selected:opacity-100 rounded-full"
        ),
        day_range_end: "day-range-end ",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        day_today: "bg-accent text-accent-foreground ",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground ",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-[#BABABB] aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft24Regular
            className={cn("h-4 w-4", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight24Regular
            className={cn("h-4 w-4", className)}
            {...props}
          />
        ),
        Head: () => (
          <thead>
            <tr className="flex">
              {persianWeekdayAbbr.map((day, index) => (
                <th key={index} className="text-black text-sm rounded-md w-full mr-4 font-bold">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        ),
      }}
      fixedWeeks
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
