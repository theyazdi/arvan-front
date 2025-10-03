import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Button,
  DropdownMenuItem,
} from "@/components/ui";
import { DoorRegular, ArrowUndo16Regular } from "@fluentui/react-icons";
import Counter from "../share/travelers/counter";
import { useState } from "react";

interface RoomsProps {
  rooms: number;
  setRooms: (rooms: number) => void;
}

function Rooms({ rooms, setRooms }: RoomsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div dir="rtl">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger>
          <div className="flex items-start w-[200px] gap-2">
            <div>
              <DoorRegular
                className={isOpen ? "text-[#EA443F]" : "text-gray-500"}
                fontSize={24}
                color={isOpen ? "#EA443F" : "#6B7280"}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm font-bold">اتاق ها</span>
              <span className="text-sm text-gray-500">
                {rooms === 0 ? "انتخاب تعداد اتاق ها" : `${rooms} اتاق`}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-8 px-4  rounded-xl w-[302px]">
          <DropdownMenuItem>
            <div className="flex flex-col gap-2 w-full" dir="rtl">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <span className="i-fluent:door-16-regular h-6 w-6 text-[#EA443F]"></span>
                  <p className="font-bold">اتاق ها</p>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    rooms > 1
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 max-h-0"
                  }`}
                >
                  {rooms > 1 && (
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className="text-sx rounded-full bg-gray-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRooms(1);
                      }}
                    >
                      <ArrowUndo16Regular /> تنظیم مجدد
                    </Button>
                  )}
                </div>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  rooms > 1
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 max-h-0"
                }`}
              >
                {rooms > 1 && (
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">انتخاب شده :</p>
                    <p className="text-sm">{rooms} اتاق</p>
                  </div>
                )}
              </div>
            </div>
          </DropdownMenuItem>
          <hr className="w-full border-gray-300" />
          <div className="my-4">
            <Counter
              lable="اتاق"
              subLable="تعداد اتاق"
              icon={<DoorRegular className="text-[#EA443F]" fontSize={16} />}
              count={rooms}
              onIncrement={() => setRooms(rooms + 1)}
              onDecrement={() => setRooms(rooms - 1)}
            />
            <Button
              className="flex items-center gap-2 mt-6 px-4 py-2 rounded-xl"
              onClick={() => setIsOpen(false)}
            >
              اعمال
              <span className="i-fluent:checkmark-16-regular h-4 w-4"></span>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Rooms;
