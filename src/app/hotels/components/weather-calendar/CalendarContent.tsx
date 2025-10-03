"use client";

import { WeatherDay } from './WeatherDay';

interface CalendarContentProps {
  weatherData: { date: string; temp: string; condition: string; icon: string }[];
  currentIndex: number;
  visibleItems: number;
  selectedItemIndex: number;
  formData: {
    selectedItemIndex: string;
    currentIndex: string;
  };
  formatDate: (date: string) => { weekday: string; fullDate: string };
}

const CalendarContent = ({ 
  weatherData, 
  currentIndex, 
  visibleItems, 
  selectedItemIndex, 
  formData, 
  formatDate 
}: CalendarContentProps) => (
  <div className="flex-1 overflow-x-hidden px-0">
    <div className="flex gap-1 justify-center items-center min-w-fit">
      {weatherData.slice(currentIndex, currentIndex + 5).map((day, index) => (
        <WeatherDay 
          key={index}
          day={day} 
          index={index} 
          isSelected={index === selectedItemIndex} 
          formData={{
            ...formData,
            selected_date: day.date
          }} 
          formatDate={formatDate} 
        />
      ))}
    </div>
  </div>
);

export { CalendarContent }; 