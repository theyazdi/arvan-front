"use client";
import { Button } from "@/components/ui";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StopFilterProps {
  stopFilter: string;
  setStopFilter: (value: string) => void;
}

function StopFilter({ stopFilter, setStopFilter }: StopFilterProps) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Button
        variant={"link"}
        className="flex items-center justify-between w-full p-0"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="i-fluent:stop-24-regular"></span>
          <span className="text-sm font-medium">توقف ها</span>
        </div>
        <span
          className={`i-fluent:chevron-up-24-regular transition-transform duration-500 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        ></span>
      </Button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-100" : "max-h-0"
        }`}
      >
        <div
          className={`transition-all duration-500 mt-2 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <RadioGroup
            value={stopFilter}
            onValueChange={setStopFilter}
            className="flex flex-col gap-2"
            dir="rtl"
          >
            <label
              htmlFor="all"
              className="flex items-center gap-2 cursor-pointer"
            >
              <RadioGroupItem value="" id="" />
              <span className="text-sm">همه</span>
            </label>
            <label
              htmlFor="direct"
              className="flex items-center gap-2 cursor-pointer"
            >
              <RadioGroupItem value="0" id="0" />
              <span className="text-sm">فقط پرواز های مستقیم</span>
            </label>
            <label
              htmlFor="max1"
              className="flex items-center gap-2 cursor-pointer"
            >
              <RadioGroupItem value="1" id="1" />
              <span className="text-sm">حداکثر یک توقف</span>
            </label>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

export { StopFilter };
