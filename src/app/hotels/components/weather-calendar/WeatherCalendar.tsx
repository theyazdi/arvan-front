"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchWeatherData } from "../../actions";
import { CalendarHeader } from "./CalendarHeader";
import { NavigationButton } from "./NavigationButton";
import { CalendarContent } from "./CalendarContent";
import { HotelSearchParams } from "../hotelswithparams";
import { formatPersianDate, formatPersianDay } from "@/lib/formatpersiandatetime";

interface WeatherCalendarProps {
  searchParams: HotelSearchParams;
}

const WeatherCalendar = ({ searchParams }: WeatherCalendarProps) => {
  const selectedItemIndex = parseInt(searchParams.selectedItemIndex || "0");
  const currentIndex = parseInt(searchParams.currentIndex || "0");
  
  const [weatherData, setWeatherData] = useState<{ date: string; temp: string; condition: string; icon: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(Math.min(currentIndex + 5, weatherData.length));
  
  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
        setVisibleItems(Math.min(currentIndex + 5, data.length));
      } catch (error) {

        const sampleData = generateSampleWeatherData();
        setWeatherData(sampleData);
        setVisibleItems(Math.min(currentIndex + 5, sampleData.length));
      } finally {
        setLoading(false);
      }
    };
    
    loadWeatherData();
  }, [currentIndex]);
  


  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const weekday = formatPersianDay(dateObj);
    const fullDate = formatPersianDate(dateObj, "dd MMMM");
    return { weekday, fullDate };
  };

  const getDateRange = () => {
    if (weatherData.length === 0) return '';
    const startDate = new Date(weatherData[currentIndex].date);
    const endIndex = Math.min(currentIndex + 4, weatherData.length - 1);
    const endDate = new Date(weatherData[endIndex].date);
    const startPersian = formatPersianDate(startDate, "dd MMMM");
    const endPersian = formatPersianDate(endDate, "dd MMMM");
    return `${endPersian} - ${startPersian}`;
  };

  if (loading) {
    return (
      <div className="p-5 bg-white rounded-2xl mt-5">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="relative w-full flex items-center justify-center my-4">
          <Skeleton className="h-8 w-8 rounded-full mr-2" />
          <div className="flex-1 flex space-x-1 justify-between px-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="w-16 h-5 mb-2" />
                <Skeleton className="w-20 h-20 rounded-lg mb-1" />
                <Skeleton className="w-12 h-4 mb-1" />
                <Skeleton className="w-10 h-4" />
              </div>
            ))}
          </div>
          <Skeleton className="h-8 w-8 rounded-full ml-2" />
        </div>
      </div>
    );
  }

  const commonFormData = {
    selectedItemIndex: selectedItemIndex.toString(),
    currentIndex: currentIndex.toString(),
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow w-full max-w-full flex flex-col justify-between items-stretch">
      <CalendarHeader />
      <div className="relative w-full flex items-center justify-center my-1 min-h-[90px]">
        <NavigationButton 
          direction="left" 
          disabled={currentIndex === 0} 
          formData={{
            ...commonFormData,
            currentIndex: Math.max(currentIndex - 5, 0).toString()
          }} 
        />
        <CalendarContent 
          weatherData={weatherData}
          currentIndex={currentIndex}
          visibleItems={visibleItems}
          selectedItemIndex={selectedItemIndex}
          formData={commonFormData}
          formatDate={formatDate}
        />
        <NavigationButton 
          direction="right" 
          disabled={currentIndex + 5 >= weatherData.length} 
          formData={{
            ...commonFormData,
            currentIndex: Math.min(currentIndex + 5, weatherData.length - 1).toString()
          }} 
        />
      </div>
    </div>
  );
};

function generateSampleWeatherData() {
  const weatherConditions = [
    { temp: '22°C', condition: 'Sunny', icon: '☀️' },
    { temp: '18°C', condition: 'Partly Cloudy', icon: '⛅' },
    { temp: '15°C', condition: 'Cloudy', icon: '☁️' },
    { temp: '12°C', condition: 'Rainy', icon: '🌧️' },
    { temp: '8°C', condition: 'Stormy', icon: '⛈️' },
    { temp: '25°C', condition: 'Hot', icon: '🔥' },
    { temp: '5°C', condition: 'Cold', icon: '❄️' }
  ];
  
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const randomIndex = Math.floor(Math.random() * weatherConditions.length);
    const { temp, condition, icon } = weatherConditions[randomIndex];
    
    result.push({
      date: date.toISOString().split('T')[0],
      temp,
      condition,
      icon
    });
  }
  
  return result;
}

export { WeatherCalendar }; 
