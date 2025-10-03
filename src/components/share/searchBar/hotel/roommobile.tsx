"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Counter from "../share/travelers/counter";

interface RoomMobileProps {
  rooms: number;
  setRooms: (rooms: number) => void;
}

function RoomMobile({ rooms, setRooms }: RoomMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild dir="rtl">
        <div className="flex items-center gap-2 pr-1">
          <span className="i-fluent:door-20-regular text-gray-500 h-6 w-6 text-[#9EA8C3]"></span>
          <div className="flex flex-col gap-2">
            <p className="font-bold">اتاق ها</p>
            <p className="text-sm text-gray-500">
              {rooms === 0 ? "انتخاب تعداد اتاق ها" : `${rooms} اتاق`}
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="h-[80vh] bg-gray-1 !px-4 flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-400 text-right text-[#212121]">
            چند اتاق میخواهید رزرو کنید؟
          </DialogTitle>
        </DialogHeader>

        <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="i-fluent:door-20-regular text-[#9EA8C3] h-6 w-6"></span>
            <p className="font-bold">اتاق</p>
          </div>
          <hr />
          <Counter
            lable="اتاق ها"
            subLable="تعداد اتاق ها"
            count={rooms}
            onIncrement={() => setRooms(rooms + 1)}
            onDecrement={() => setRooms(rooms - 1)}
          />
        </div>

        {/* اعمال button at bottom */}
        <div className="mt-auto pt-4">
          <Button
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3"
            onClick={() => setIsOpen(false)}
          >
            اعمال
            <span className="i-fluent:checkmark-16-regular h-4 w-4"></span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { RoomMobile };
