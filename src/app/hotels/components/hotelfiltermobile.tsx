"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HotelFilterMobileProps {
  price: number;
  setPrice: (v: number) => void;
  starRating: string;
  setStarRating: (v: string) => void;
}

function HotelFilterMobile({
  price,
  setPrice,
  starRating,
  setStarRating
}: HotelFilterMobileProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState<number>(price);

  // Update slider value when price changes
  React.useEffect(() => {
    setSliderValue(price);
  }, [price]);

  return (
    <div className="md:hidden">
      {/* Top Bar */}
      <div>
        <div className="flex items-center">
         
        </div>
        
        {/* Filter Button */}
        <div className="flex justify-start px-2">
          <Button
            onClick={() => setIsFilterOpen(true)}
            className="bg-white text-black border border-gray-300 rounded-2xl px-4 py-2 flex items-center gap-2"
          >
            <span className="text-sm">فیلترها</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="w-screen h-screen max-w-none max-h-none m-0 rounded-none">
          <DialogHeader>
            <DialogTitle className="text-right text-lg font-medium flex items-center gap-2">
              <span className="i-fluent:filter-24-regular h-6 w-6"></span>
              فیلترهای هتل
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-6 mt-6">
            {/* Price Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="i-fluent:money-24-regular"></span>
                <span className="text-sm font-medium">قیمت</span>
              </div>
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

            <hr className="my-4" />

            {/* Star Rating Filter */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="i-fluent:star-24-regular"></span>
                <span className="text-sm font-medium">ستاره هتل</span>
              </div>
              <RadioGroup
                value={starRating}
                onValueChange={setStarRating}
                className="flex flex-col gap-3"
                dir="rtl"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <RadioGroupItem value="" id="star-all" />
                  <span className="text-sm">همه</span>
                </label>
                {["5", "4", "3", "2", "1"].map((star) => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value={star} id={`star-${star}`} />
                    <span className="text-sm">{star} ستاره</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 pt-4 border-t">
            <Button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-black hover:bg-gray-800"
            >
              اعمال فیلتر
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { HotelFilterMobile };
