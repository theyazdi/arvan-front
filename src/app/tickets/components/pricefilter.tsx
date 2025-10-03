"use client";
import { Button, Slider } from "@/components/ui";
import { useState, useEffect } from "react";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

interface PriceFilterProps {
  price: number[];
  setPrice: (value: number[]) => void;
}

function PriceFilter({ price, setPrice }: PriceFilterProps) {
  const [open, setOpen] = useState(true);
  const [sliderValue, setSliderValue] = useState(price);
  
  // Use debounced search hook with 2 seconds delay
  const debouncedSliderValue = useDebouncedSearch({ 
    searchTerm: sliderValue[0].toString(), 
    delay: 2000,
    minLength: 0 
  });

  // Apply filter when debounced value changes
  useEffect(() => {
    const debouncedValue = parseInt(debouncedSliderValue) || 0;
    if (debouncedValue !== price[0]) {
      setPrice([debouncedValue]);
    }
  }, [debouncedSliderValue, setPrice, price]);

  // Sync slider value when price prop changes (e.g., from URL)
  useEffect(() => {
    setSliderValue(price);
  }, [price]);

  return (
    <div>
      <Button
        variant={"link"}
        className="flex items-center justify-between w-full p-0"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="i-fluent:money-24-regular"></span>
          <span className="text-sm font-medium">قیمت</span>
        </div>
        <span
          className={`i-fluent:chevron-up-24-regular transition-transform duration-500 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        ></span>
      </Button>

      <div
        className={`transition-all duration-500 overflow-hidden ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <div
          className={`transition-all duration-500 mt-2 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="text-xs mb-2">
            تا سقف <span>{sliderValue[0].toLocaleString()} تومان برای هر شخص</span>
          </div>
          <Slider
            min={0}
            max={100000000}
            step={100000}
            value={sliderValue}
            onValueChange={(value) => {
              // Ensure the value is properly aligned with the step
              const alignedValue = Math.round(value[0] / 100000) * 100000;
              setSliderValue([alignedValue]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { PriceFilter };
