"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPriceWithToman } from "@/lib/price";


interface RoomPriceCardProps {
  id: string;
  name: string;
  image?: string;
  price: {
    currency: string;
    total: string;
  };
  capacity: {
    adults: number;
    children: number;
  };
  amenities: string[];
  cancellationPolicy: string;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  searchDetails?: {
    nights: number;
    adults: number;
    children: number;
  };
  onBookNow?: (room: any) => void;
}

const RoomPriceCard: React.FC<RoomPriceCardProps> = ({
  id,
  name,
  image = "https://placehold.co/600x400",
  price,
  capacity,
  amenities,
  cancellationPolicy,
  breakfastIncluded,
  freeCancellation,
  searchDetails = {
    nights: 1,
    adults: 1,
    children: 0
  },
  onBookNow
}) => {
  const remainingRooms = 33;

  return (
    <div className="w-full max-w-md mx-auto my-3 md:my-6 bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200" dir="rtl">
      <div className="w-full h-20 md:h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400";
          }}
        />
      </div>
      <div className="p-3 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <div className="text-sm md:text-xl font-bold mb-1">{name}</div>
            <div className="flex items-center gap-1 text-gray-600">
              <span className="i-fluent:info-24-regular w-3 h-3 md:w-4 md:h-4"></span>
              <span className="i-fluent:person-24-regular w-3 h-3 md:w-4 md:h-4"></span>
              <span className="i-fluent:person-24-regular w-3 h-3 md:w-4 md:h-4"></span>
              <span className="i-fluent:person-24-regular w-3 h-3 md:w-4 md:h-4"></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-3 md:mt-6 mb-3 md:mb-4">
          <div className="flex-1">
            <div className="font-bold text-xs md:text-sm mb-2 text-right">سرویس ها</div>
            <ul className="space-y-1 text-xs md:text-sm text-right">
              {breakfastIncluded && (
                <li className="flex items-center gap-1 text-green-600">
                  <span className="i-fluent:food-24-regular w-3 h-3 md:w-4 md:h-4"></span>
                  صبحانه
                </li>
              )}
              <li className="flex items-center gap-1 text-green-600">
                <span className="i-fluent:payment-24-regular w-3 h-3 md:w-4 md:h-4"></span>
                پرداخت آنلاین
              </li>
              <li className="flex items-center gap-1 text-red-500">
                <span className="i-fluent:money-hand-24-regular w-3 h-3 md:w-4 md:h-4"></span>
                وجه غیرقابل بازگشت
              </li>
            </ul>
          </div>
          <div className="flex-1 md:border-r border-gray-200 md:pr-4">
            <div className="font-bold text-xs md:text-sm mb-2 text-right">امکانات</div>
            <ul className="space-y-1 text-xs md:text-sm text-right">
              {amenities.slice(0,2).map((amenity, idx) => (
                <li key={idx} className="flex items-center gap-1 text-gray-700">
                  {amenity === 'منظره شهر' && <span className="i-fluent:calendar-24-regular w-3 h-3 md:w-4 md:h-4"></span>}
                  {amenity === 'تخت دونفره' && <span className="i-fluent:bed-24-regular w-3 h-3 md:w-4 md:h-4"></span>}
                  {amenity !== 'منظره شهر' && amenity !== 'تخت دونفره' && <span className="i-fluent:info-24-regular w-3 h-3 md:w-4 md:h-4"></span>}
                  {amenity}
                </li>
              ))}
            </ul>
            {amenities.length > 2 && (
              <div className="mt-2">
                <button className="text-xs text-primary-600 hover:underline">نمایش بیشتر</button>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 my-3 md:my-4" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col items-start">
            <div className="text-lg md:text-lg font-bold text-gray-800">
              {formatPriceWithToman(price.total)}
            </div>
            <div className="text-xs text-gray-500">قیمت برای هر شب</div>
            <div className="text-xs text-red-500 mt-1">{remainingRooms} اتاق باقی‌مانده</div>
          </div>
          <button 
            className="bg-gray-800 text-white rounded-xl px-6 py-3 text-sm font-bold"
            onClick={() => {
              if (onBookNow) {
                onBookNow({
                  id,
                  name,
                  price,
                  capacity,
                  amenities,
                  cancellationPolicy,
                  breakfastIncluded,
                  freeCancellation
                });
              }
            }}
          >
            انتخاب اتاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomPriceCard; 