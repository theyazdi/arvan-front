"use client";

import { Button } from "@/components/ui/button";

interface NavigationButtonProps {
  direction: "left" | "right";
  disabled: boolean;
  formData: {
    selectedItemIndex: string;
    currentIndex: string;
    [key: string]: string;
  };
}

const NavigationButton = ({ direction, disabled, formData }: NavigationButtonProps) => (
  <form action="/hotels" method="GET" className="inline-block">
    {Object.entries(formData).map(([key, value]) => (
      <input key={key} type="hidden" name={key} value={value} />
    ))}
    
    <Button
      type="submit"
      disabled={disabled}
      className={`absolute top-1/2 -translate-y-1/2 ${direction === "left" ? "left-0" : "right-0"} z-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-md focus:outline-none border border-gray-200 w-9 h-9 flex items-center justify-center ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      variant="ghost"
      size="icon"
    >
      {direction === "left" ? <span className="i-fluent:chevron-left-24-regular"></span> : <span className="i-fluent:chevron-right-24-regular"></span>}
    </Button>
  </form>
);

export { NavigationButton }; 
