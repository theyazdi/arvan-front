"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/";
import { PersianCalendar } from "@/components/ui/persianCalendar";
import { formatDateForDisplay } from "@/lib/formatpersiandatetime";

interface DatePickerMobileProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  title: "تاریخ رفت" | "تاریخ برگشت";
}

function DatePickerMobile({ date, setDate, title }: DatePickerMobileProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = React.useCallback(
    (selectedDate: Date) => {
      setDate(selectedDate);
      setOpen(false);
    },
    [setOpen]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-start gap-2 pr-1" dir="rtl">
          <div className="flex flex-col gap-1">
            <span className="font-bold">{title}</span>
            <span className="text-sm font-300 text-gray-500">
              {date ? date.toLocaleDateString("fa-IR") : title}
            </span>
          </div>
          {title === "تاریخ رفت" ? (
            <span className="i-fluent:calendar-arrow-right-24-regular text-gray-500 h-6 w-6"></span>
          ) : (
            <span className="i-fluent:calendar-reply-24-regular text-gray-500 h-6 w-6"></span>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="h-[80vh] bg-gray-1 !px-4 flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-base text-right text-[#212121]">
            تاریخی که برای پرواز میخواهید انتخاب کنید.
          </DialogTitle>
        </DialogHeader>
        <div className=" bg-white rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2" dir="rtl">
            {title === "تاریخ رفت" ? (
              <span className="i-fluent:calendar-arrow-right-24-regular text-gray-500 h-6 w-6"></span>
            ) : (
              <span className="i-fluent:calendar-reply-24-regular text-gray-500 h-6 w-6"></span>
            )}
            <p className="text-lg font-bold">{title}</p>
          </div>
          <hr className="w-full" />
          <PersianCalendar selectedDate={date} onDateSelect={handleSelect} isMobile={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { DatePickerMobile };
