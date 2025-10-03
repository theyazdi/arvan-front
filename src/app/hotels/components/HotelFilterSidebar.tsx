"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui";
import { useState } from "react";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HotelFilterSidebarProps {
  price: number;
  setPrice: (v: number) => void;
  starRating?: string;
  setStarRating?: (v: string) => void;
}

const HotelFilterSidebar: React.FC<HotelFilterSidebarProps> = ({ price, setPrice, starRating = "", setStarRating }) => {
  const [open, setOpen] = useState(true);
  const [sliderValue, setSliderValue] = useState<number>(price);
  const [openStar, setOpenStar] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="i-fluent:filter-24-regular w-6 h-6"></span>
        <span className="text-lg font-medium">فیلتر هتل</span>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <div>
          <button
            type="button"
            className="flex items-center justify-between w-full p-0 bg-transparent border-0 outline-none"
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center gap-2">
              <span className="i-fluent:money-24-regular"></span>
              <span className="text-sm font-medium">قیمت</span>
            </div>
            <span
              className={`i-fluent:chevron-up-24-regular transition-transform duration-500 ${open ? "rotate-180" : "rotate-0"}`}
            ></span>
          </button>

          <div
            className={`transition-all duration-500 overflow-hidden ${open ? "max-h-40" : "max-h-0"}`}
          >
            <div
              className={`transition-all duration-500 mt-2 ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
            >
              <div className="text-xs mb-2">
                تا سقف <span>{(sliderValue/10).toLocaleString()}</span> تومان
              </div>
              <Slider
                min={1000000}
                max={1000000000}
                step={1000000}
                value={[sliderValue]}
                onValueChange={([val]) => setSliderValue(val)}
                onValueCommit={([val]) => setPrice(val)}
                type="single"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <Button
            variant={"link"}
            className="flex items-center justify-between w-full p-0"
            onClick={() => setOpenStar(!openStar)}
          >
            <div className="flex items-center gap-2">
              <span className="i-fluent:star-24-regular"></span>
              <span className="text-sm font-medium">ستاره هتل</span>
            </div>
            <span
              className={`i-fluent:chevron-up-24-regular transition-transform duration-500 ${openStar ? "rotate-180" : "rotate-0"}`}
            ></span>
          </Button>
          <div
            className={`transition-all duration-500 overflow-hidden ${openStar ? "max-h-100" : "max-h-0"}`}
          >
            <div
              className={`transition-all duration-500 mt-2 ${openStar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
            >
              <RadioGroup
                value={starRating}
                onValueChange={setStarRating}
                className="flex flex-col gap-2"
                dir="rtl"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="" id="star-all" />
                  <span className="text-sm">همه</span>
                </label>
                {["5", "4", "3", "2", "1"].map((star) => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value={star} id={`star-${star}`} />
                    <span className="text-sm">{star} ستاره</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HotelFilterSidebar }; 