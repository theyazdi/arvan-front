"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui";
import { CalendarArrowRight24Regular } from "@fluentui/react-icons";
import { useState, useEffect } from "react";
import { formatDateForDisplay } from "@/lib/formatpersiandatetime";
import { PersianCalendar } from "@/components/ui/persianCalendar";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDateSelect?: (date: Date) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function DatePicker({ date, setDate, onDateSelect, isOpen: externalIsOpen, onOpenChange }: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use external isOpen if provided, otherwise use internal state
  const open = externalIsOpen !== undefined ? externalIsOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  
  // Reset internal state when external control is used
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setInternalOpen(false);
    }
  }, [externalIsOpen]);

  const handleSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    onDateSelect?.(selectedDate); // Call external handler - this will close dropdown
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-start gap-2 cursor-pointer px-2 md:px-0" dir="rtl">
            <div>
              <p className="font-bold">تاریخ رفت</p>
              <p className="text-sm mt-1 text-gray-500">
                {formatDateForDisplay(date)}
              </p>
            </div>
            <CalendarArrowRight24Regular
              className={open ? "text-red-500" : "text-gray-500"}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-10 px-4 py-3 rounded-xl">
          <div className="flex items-center gap-2" dir="rtl">
            <CalendarArrowRight24Regular color="#EA443F" />
            <p className="font-bold text-lg ">تاریخ رفت</p>
          </div>
          <hr className="w-full mt-4" />
          <PersianCalendar
            selectedDate={date}
            onDateSelect={handleSelect}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { DatePicker };
