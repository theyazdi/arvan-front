"use client";
import { Button, Slider } from "@/components/ui";
import { useState, useEffect } from "react";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

interface DurationFilterProps {
  duration: number;
  setDuration: (value: number) => void;
}

function DurationFilter({ duration, setDuration }: DurationFilterProps) {
  const [open, setOpen] = useState(true);
  const [sliderValue, setSliderValue] = useState(duration);
  
  // Use debounced search hook with 2 seconds delay
  const debouncedSliderValue = useDebouncedSearch({ 
    searchTerm: sliderValue.toString(), 
    delay: 2000,
    minLength: 0 
  });

  // Apply filter when debounced value changes
  useEffect(() => {
    const debouncedValue = parseInt(debouncedSliderValue) || 1;
    if (debouncedValue !== duration) {
      setDuration(debouncedValue);
    }
  }, [debouncedSliderValue, setDuration, duration]);

  // Sync slider value when duration prop changes (e.g., from URL)
  useEffect(() => {
    setSliderValue(duration);
  }, [duration]);

  const hourLabel = (val: number) => `${val} ساعت`;

  return (
    <div>
      <Button
        variant={"link"}
        className="flex items-center justify-between w-full p-0"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <span className="i-fluent:clock-24-regular"></span>
          <span className="text-sm font-medium">مدت زمان پرواز</span>
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
            <span>{hourLabel(sliderValue)}</span>
          </div>
          <div dir="ltr">
            <Slider
              min={1}
              max={24}
              step={1}
              value={[sliderValue]}
              onValueChange={(value) => {
                // Ensure the value is properly aligned with the step
                const alignedValue = Math.round(value[0]);
                setSliderValue(alignedValue);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export {DurationFilter}