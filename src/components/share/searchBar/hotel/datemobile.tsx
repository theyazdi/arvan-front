"use client";
import {
    Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  PersianCalendar,
} from "@/components/ui/";
import { addMonths } from "date-fns";
import { useState } from "react";

type TypeDate = "check_in" | "check_out";

interface DateMobileProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
}

function DateMobile({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: DateMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [typeDate, setTypeDate] = useState<TypeDate>("check_in");

  const handleDateSelect = (date: Date) => {
    if (typeDate === "check_in") {
      setCheckInDate(date);
      setTypeDate("check_out");
    } else {
      setCheckOutDate(date);
      setIsOpen(false);
      setTypeDate("check_in");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-start gap-2" dir="rtl">
          <span className="i-fluent:calendar-arrow-counterclockwise-24-regular h-6 w-6 text-[#9EA8C3]"></span>
          <div className="flex flex-col gap-2">
            <p className="font-bold">تاریخ رفت و برگشت </p>
            {checkInDate && checkOutDate ? (
              <p className="text-sm text-gray-500">
                {checkOutDate.toLocaleDateString("fa-IR")}-{" "}
                {checkInDate.toLocaleDateString("fa-IR")} 
              </p>
            ) : (
              <p className="text-sm text-gray-500">تاریخ مورد نظر</p>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[80vh] bg-gray-1 !px-4 flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-400 text-right text-[#212121]">
            {typeDate === "check_in" ? (
              <p className="text-[#212121]">تاریخ ورود خود را انتخاب کنید.</p>
            ) : (
              <p className="text-[#212121]">تاریخ خروج خود را انتخاب کنید.</p>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 bg-white rounded-xl p-4">
          <div className="flex items-center gap-2">
            {typeDate === "check_in" ? (
              <div className="flex items-center gap-2">
                <span className="i-fluent:calendar-arrow-right-24-regular h-6 w-6 text-[#9EA8C3]"></span>
                <p className="text-lg text-[#33363B]">تاریخ رفت</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="i-fluent:calendar-reply-24-regular h-6 w-6 text-[#9EA8C3]"></span>
                <p className="text-lg text-[#33363B]">تاریخ بازگشت </p>
              </div>
            )}
          </div>
          <hr />
          {typeDate === "check_in" ? (
            <div className="flex flex-col gap-4">
              <PersianCalendar
                selectedDate={checkInDate}
                onDateSelect={handleDateSelect}
                initialMonth={addMonths(new Date(), 1)}
                mode="range"
                isMobile={true}
              />
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="i-fluent:add-subtract-circle-24-regular"></span>
                1 روز
              </Button>
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="i-fluent:add-subtract-circle-24-regular"></span>
               2 روز
              </Button>
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="i-fluent:add-subtract-circle-24-regular"></span>
                3روز
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <PersianCalendar
                selectedDate={checkOutDate}
                onDateSelect={handleDateSelect}
                mode="range"
                initialMonth={addMonths(new Date(), 1)}
                isMobile={true}
              />
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="i-fluent:add-subtract-circle-24-regular"></span>
                1 روز
              </Button>
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="i-fluent:add-subtract-circle-24-regular"></span>
                2 روز
              </Button>
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center gap-2"
              >
                <span className="i-fluent:add-subtract-circle-24-regular"></span>
                3 روز
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { DateMobile };
