"use client";
import React, { useState } from "react";
import StepContainer from "./stepContainer";
import { useWizard } from "@/hooks";
import {
  DatePicker,
  DatePickerMobile,
  ReturnTicket,
} from "@/components/share/searchBar";
import {
  Add12Regular,
  CalendarReply24Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import { Button } from "@/components/ui/button";
function TravelDateSelector() {
  const { data, setStepData } = useWizard();
  const [isReturnTicket, setIsReturnTicket] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDismiss = () => {
    setStepData("returnDate", undefined);
    setIsReturnTicket(false);
  };
  return (
    <StepContainer title="از کی و چه مدت تمایل به مسافرت دارید؟">
      <div className="md:flex hidden items-center ">
        <div className="flex-1">
          <DatePicker
            date={data.travelDate}
            setDate={(date: Date | undefined) =>
              setStepData("travelDate", date)
            }
          />
        </div>
        <div className="flex-1">
          <ReturnTicket
            returnDate={data.returnDate}
            setReturnDate={(returnDate: Date | undefined) =>
              setStepData("returnDate", returnDate)
            }
          />
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex flex-col gap-4">
          <DatePickerMobile
            title="تاریخ رفت"
            date={data.travelDate}
            setDate={(date: Date | undefined) =>
              setStepData("travelDate", date)
            }
          />
          {!isReturnTicket ? (
            <div
              className="flex items-center justify-start cursor-pointer gap-2 rounded-full px-4 py-3  hover:bg-gray-50 transition-all duration-300 ease-in-out w-full"
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
            <div className="flex items-start gap-2 justify-between px-4 py-3 rounded-lg"             
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
              }}>
              <DatePickerMobile
                title="تاریخ برگشت"
                date={data.returnDate}
                setDate={(date: Date | undefined) =>
                  setStepData("returnDate", date)
                }
              />
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
      </div>
    </StepContainer>
  );
}

export default TravelDateSelector;
