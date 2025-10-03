"use client";
import { Button } from "@/components/ui";
import {
  Add12Regular,
  CalendarReply24Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Calendar,
} from "@/components/ui";
import { formatDateForDisplay } from "@/lib/formatpersiandatetime";
import { PersianCalendar } from "@/components/ui/persianCalendar";

interface ReturnTicketProps {
  returnDate: Date | undefined;
  setReturnDate: (date: Date | undefined) => void;
}

function ReturnTicket({ returnDate, setReturnDate }: ReturnTicketProps) {
  const [isReturnTicket, setIsReturnTicket] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedDate: Date) => {
    setReturnDate(selectedDate);
    setOpen(false);
  };

  const handleDismiss = () => {
    setIsReturnTicket(false);
    setReturnDate(undefined);
  };

  return (
    <div className="md:block hidden">
      {!isReturnTicket ? (
        <div
          className="flex items-center justify-center cursor-pointer gap-2 rounded-full px-4 py-3  hover:bg-gray-50 transition-all duration-300 ease-in-out w-[200px]"
          style={{
            border: "2px dotted #d1d5db",
            borderSpacing: "10px",
            borderStyle: "dotted",
            borderWidth: "2px",
            borderColor: "#d1d5db",
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 4px 4px",
          }}
          dir="rtl"
          onClick={() => setIsReturnTicket(true)}
        >
          <Button
            className="border  h-4 w-4 p-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 ease-in-out"
            variant={"outline"}
            onClick={() => setIsReturnTicket(true)}
          >
            <Add12Regular className="text-gray-500" color="#EA443F" />
          </Button>
          <p className="text-sm text-gray-500">سفر برگشت</p>
        </div>
      ) : (
        <div
          className="flex items-start justify-between gap-10 rounded-xl px-4 py-3 w-[200px]"
          style={{
            border: "2px dotted #d1d5db",
            borderSpacing: "10px",
            borderStyle: "dotted",
            borderWidth: "2px",
            borderColor: "#d1d5db",
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 4px 4px",
          }}
        >
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <div className="flex items-start gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <CalendarReply24Regular
                  className={`transition-colors duration-300 ${
                    open ? "text-red-500" : "text-gray-500"
                  }`}
                  color={open ? "#EA443F" : "#6B7280"}
                />
                <div>
                  <p className="font-bold">برگشت</p>
                  <p className="text-sm mt-1 text-gray-500">
                    {formatDateForDisplay(returnDate)}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-10 px-4 py-3 rounded-xl animate-in fade-in-50 slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2" dir="rtl">
                <CalendarReply24Regular
                  color="#EA443F"
                  className="text-red-500"
                />
                <p className="font-bold text-lg">تاریخ برگشت</p>
              </div>
              <hr className="w-full mt-4" />
              <PersianCalendar
                selectedDate={returnDate}
                onDateSelect={handleSelect}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="border h-2 w-2 p-3 rounded-full flex items-center justify-center hover:bg-red-50 transition-all duration-300 ease-in-out group"
            variant={"destructive"}
            onClick={handleDismiss}
          >
            <Dismiss16Regular className="text-white group-hover:text-[#EA443F] transition-colors duration-300" />
          </Button>
        </div>
      )}
    </div>
  );
}

export { ReturnTicket };
