import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { SelectRangeEventHandler } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Button,
} from "@/components/ui";
import { PersianCalendar } from "@/components/ui/persianCalendar";
import {
  CalendarArrowRight24Regular,
  CalendarArrowCounterclockwise24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  Checkmark16Regular,
} from "@fluentui/react-icons";
import { formatDateRangeForDisplay } from "@/lib/formatpersiandatetime";

interface CheckInAndOutProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
}

const calendarClassNames = {
  nav: "hidden",
  caption: "flex justify-center",
  caption_label: "text-xl font-bold px-5",
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const CheckInAndOut = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: CheckInAndOutProps) => {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) =>
      direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const handleDateSelect = (selectedDate: Date) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(selectedDate);
      setCheckOutDate(undefined);
    } else {
      if (selectedDate > checkInDate) {
        setCheckOutDate(selectedDate);
      } else {
        setCheckInDate(selectedDate);
        setCheckOutDate(undefined);
      }
    }
  };

  const formattedDateRange = formatDateRangeForDisplay(checkInDate, checkOutDate);

  const getDayAfter = (date: Date): Date => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    return nextDay;
  };

  const disabledDateForCheckout = checkInDate
    ? getDayAfter(checkInDate)
    : tomorrow;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div className="flex items-start gap-2 w-[200px]">
          <CalendarArrowRight24Regular
            className={`transition-colors duration-200 ${
              open ? "text-[#EA443F]" : "text-gray-500"
            }`}
            color={open ? "#EA443F" : "#6B7280"}
          />
          <div>
            <p className="font-medium text-lg text-gray-800">تاریخ رفت و برگشت</p>
            <p className="text-sm mt-1 text-gray-500">{formattedDateRange}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-8 px-4 py-4 rounded-xl">
        <div className="flex items-center justify-between h-16" dir="rtl">
          <div className="flex items-center gap-2">
            <CalendarArrowCounterclockwise24Regular
              
              color="#EA443F"
            />
            <p className="font-bold text-lg">تاریخ رفت و برگشت </p>
          </div>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden h-full flex items-center ${
              checkInDate || checkOutDate
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 max-h-0"
            }`}
          >
          </div>
        </div>
        <hr className="w-full mt-4" />
        <div className="flex items-center gap-4">
          <PersianCalendar
            mode="range"
            selectedRange={{ from: checkInDate, to: checkOutDate }}
            onRangeSelect={(range) => {
              setCheckInDate(range.from);
              setCheckOutDate(range.to);
            }}
            className="ml-4"
            initialMonth={addMonths(currentMonth, 1)}
          />
          <PersianCalendar
            mode="range"
            selectedRange={{ from: checkInDate, to: checkOutDate }}
            onRangeSelect={(range) => {
              setCheckInDate(range.from);
              setCheckOutDate(range.to);
            }}
          />
        </div>
        <hr className="w-full" />
        <div className="flex my-4 justify-between w-full ">
          <Button onClick={() => setOpen(false)} className="rounded-xl" size={"sm"}>
            اعمال <Checkmark16Regular />
          </Button>
          <div className="border border-gray-300 rounded-full px-4 py-2 flex items-center gap-2" dir="rtl">
            <Button>تاریخ دقیق</Button>
            <Button variant="outline" className="flex items-center gap-2">
              <span className="i-fluent:add-subtract-circle-24-regular h-4 w-4"></span>
              ۳ روز
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <span className="i-fluent:add-subtract-circle-24-regular h-4 w-4"></span>
              ۲ روز
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <span className="i-fluent:add-subtract-circle-24-regular h-4 w-4"></span>
              ۱ روز
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CheckInAndOut;
