import React from "react";

function TravelStats({ number, text , title}: { number: number; text: string , title?: string }) {
  return (
    <div className="flex flex-col items-center bg-[#D9E2EC] rounded-lg py-2 sm:py-3 w-full sm:w-[150px] md:w-[193px] justify-center">
      <span className="text-lg sm:text-xl md:text-2xl font-bold">{title}{number}{number === 20 ? "سال" : ""}</span>
      <span className="text-sm sm:text-base md:text-lg mt-1 text-gray-5">{text}</span>
    </div>
  );
}

export { TravelStats };
