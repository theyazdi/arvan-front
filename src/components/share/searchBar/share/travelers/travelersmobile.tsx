"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/";
import { useState } from "react";
import Counter from "./counter";

interface TravelersProps {
  adultCount: number;
  setAdultCount: (count: number) => void;
  childCount: number;
  setChildCount: (count: number) => void;
  infantCount: number;
  setInfantCount: (count: number) => void;
  spacing?: "normal" | "wide";
}

function TravelersMobile({
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infantCount,
  setInfantCount,
  spacing = "normal",
}: TravelersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild dir="rtl">
          <div className="flex items-start gap-2 mr-1 ">
            <span className="i-fluent:person-24-regular h-6 w-6 text-[#9EA8C3]"></span>
            <div className="flex flex-col gap-1">
              <span className="font-bold">مسافرها</span>
              <span className="text-sm  text-gray-500">
                {adultCount + childCount + infantCount} مسافر
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white rounded-xl h-[80vh] bg-gray-1 !px-4 flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle className="text-base font-400 text-right text-[#212121]">
              تعداد بلیط های خود را تعیین کنید.
            </DialogTitle>
          </DialogHeader>
          <div className=" p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="i-fluent:person-24-regular h-6 w-6 text-[#9EA8C3]"></span>
              <p className="font-bold text-lg">مسافرها</p>
            </div>
            <hr />
            <Counter
              lable="بزرگسال"
              subLable="(بالای ۱۶ سال)"
              count={adultCount}
              onIncrement={() => setAdultCount(adultCount + 1)}
              onDecrement={() => setAdultCount(adultCount - 1)}
              icon={
                <span className="i-fluent:person-24-regular h-6 w-6 text-[#9EA8C3]"></span>
              }
            />
            <hr />
            <Counter
              lable="کودک"
              subLable="بین 2 تا 16 سال"
              count={childCount}
              onIncrement={() => setChildCount(childCount + 1)}
              onDecrement={() => setChildCount(childCount - 1)}
              icon={
                <span className="i-fluent:person-24-regular h-6 w-6 text-[#9EA8C3]"></span>
              }
            />
            <hr />
            <Counter
              lable="نوزاد"
              subLable="کمتر از 2 سال"
              count={infantCount}
              onIncrement={() => setInfantCount(infantCount + 1)}
              onDecrement={() => setInfantCount(infantCount - 1)}
              icon={
                <span className="i-fluent:person-24-regular h-6 w-6 text-[#9EA8C3]"></span>
              }
            />
          </div>
          <Button
            className="flex items-center gap-2"
            size={"lg"}
            onClick={() => setIsOpen(false)}
          >
            <span className="i-fluent:checkmark-24-regular text-white"></span>
            اعمال
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { TravelersMobile };
