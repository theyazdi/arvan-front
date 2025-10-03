"use client";

import { Button } from "@/components/ui/button";

interface WeatherDayProps {
  day: { date: string; temp: string; condition: string; icon: string };
  index: number;
  isSelected: boolean;
  formData: {
    selectedItemIndex: string;
    currentIndex: string;
    selected_date: string;
  };
  formatDate: (date: string) => { weekday: string; fullDate: string };
}

const WeatherDay = ({ day, index, isSelected, formData, formatDate }: WeatherDayProps) => {
  const { weekday, fullDate } = formatDate(day.date);
  
  return (
    <form 
      key={index} 
      action="/hotels" 
      method="GET"
      className="inline-block px-1"
    >
      <input type="hidden" name="selectedItemIndex" value={index.toString()} />
      <input type="hidden" name="currentIndex" value={formData.currentIndex} />
      <input type="hidden" name="selected_date" value={day.date} />
      
      <Button 
        type="submit"
        variant="ghost"
        className={`w-[130px] h-[80px] bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col justify-center items-center transition-all duration-150 p-0
          ${isSelected ? "border-2 border-blue-500" : ""} cursor-pointer relative overflow-hidden`}
      >
        <div className="flex items-center pt-2">
          <div className="text-xs font-bold mb-0.5 text-gray-700 text-center">
            {weekday} ـ {fullDate}
          </div>
        </div>
        <div className="flex items-center pb-2 gap-2">
          <span className="text-xl mb-1">{day.icon}</span>
          <span className="text-sm font-semibold">{day.temp.replace(/°|C|F/g, "")}</span>
        </div>
      </Button>
    </form>
  );
};

export { WeatherDay }; 
