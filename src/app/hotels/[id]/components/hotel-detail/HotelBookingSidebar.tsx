"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { formatPriceWithToman } from "@/lib/price";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

import type { ApiItem } from "../../hotel.actions";

interface HotelLocation { address: string; city: string; country: string; }
interface HotelAmenity { name: string; icon: string; }
interface HotelData { id: string; name: string; description: string; images: string[]; rating: number; price: string; currency: string; amenities: HotelAmenity[]; location: HotelLocation; rawData?: unknown; }
interface HotelRoom {
  id: string;
  name: string;
  price: { currency: string; total: string; };
  capacity: { adults: number; children: number; };
  amenities: string[];
  cancellationPolicy: string;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
}

interface HotelBookingSidebarProps {
  hotelData: HotelData;
  rooms: HotelRoom[];
  loading?: boolean;
  city_net_code?: string;
  onBookNow?: (room: HotelRoom) => void;
}

const extraFeatures = [
  { value: "pet", label: "Allow to bring pet", price: 15 },
  { value: "lunch", label: "Lunch a day per person", price: 15 },
  { value: "parking", label: "Parking a day", price: 15 },
  { value: "pillow", label: "Extra pillow", price: 15 }
];

export const HotelBookingSidebar: React.FC<HotelBookingSidebarProps> = ({
  hotelData,
  rooms,
  loading = false,
  city_net_code,
  onBookNow
}) => {
  const selectedRoom = rooms && rooms.length > 0 ? rooms[0] : undefined;
  const nights = 1;
  const pricePerNight = selectedRoom ? Number(selectedRoom.price.total) : 0;
  const serviceFee = 0;
  const discount = 0;
  const total = pricePerNight * nights + serviceFee - discount;
  const roomName = selectedRoom ? selectedRoom.name : 'اتاق انتخاب نشده';
  const guests = selectedRoom ? `${selectedRoom.capacity.adults} بزرگسال${selectedRoom.capacity.children ? `، ${selectedRoom.capacity.children} کودک` : ''}` : '---';
  const rawData = hotelData.rawData as ApiItem | undefined;
  const checkIn = rawData?.HotelInfo?.CheckInDate ?? '---';
  const checkOut = rawData?.HotelInfo?.CheckOutDate ?? '---';

  const handleBookNow = () => {
    if (selectedRoom && onBookNow) {
      onBookNow(selectedRoom);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-3 md:p-6 rounded-3xl shadow-sm sticky top-4">
        {/* Booking Info Skeleton */}
        <div className="bg-[#FAFAFA] rounded-2xl p-3 md:p-4 mb-3 md:mb-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex flex-col flex-1">
              <Skeleton className="h-3 md:h-4 w-12 md:w-16 mb-1" />
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
            </div>
            <div className="flex flex-col flex-1">
              <Skeleton className="h-3 md:h-4 w-12 md:w-16 mb-1" />
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col flex-1">
              <Skeleton className="h-3 md:h-4 w-12 md:w-16 mb-1" />
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
            </div>
            <div className="flex flex-col flex-1">
              <Skeleton className="h-3 md:h-4 w-12 md:w-16 mb-1" />
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
            </div>
          </div>
        </div>
        
        {/* Price Details Skeleton */}
        <div className="mb-3 md:mb-6">
          <Skeleton className="h-4 md:h-6 w-12 md:w-16 mb-3 md:mb-4" />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
              <Skeleton className="h-3 md:h-4 w-20 md:w-24" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 md:h-4 w-20 md:w-24" />
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 md:h-4 w-12 md:w-16" />
              <Skeleton className="h-3 md:h-4 w-16 md:w-20" />
            </div>
            <div className="flex items-center justify-between mt-3 md:mt-4">
              <Skeleton className="h-4 md:h-6 w-16 md:w-20" />
              <Skeleton className="h-4 md:h-6 w-24 md:w-32" />
            </div>
          </div>
        </div>
        
        {/* Book Now Button Skeleton */}
        <Skeleton className="h-10 md:h-12 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-white p-3 md:p-6 rounded-3xl shadow-sm sticky top-4 text-right" dir="rtl">
      <div className="bg-[#FAFAFA] rounded-2xl p-3 md:p-4 mb-3 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:calendar-ltr-24-regular w-4 h-4 md:w-6 md:h-6 text-red-500"></span> ورود</span>
            <span className="text-xs md:text-sm font-bold">{checkIn}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:calendar-ltr-24-regular w-4 h-4 md:w-6 md:h-6 text-red-500"></span> خروج</span>
            <span className="text-xs md:text-sm font-bold">{checkOut}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:bed-24-regular w-4 h-4 md:w-6 md:h-6 text-red-500"></span> اتاق</span>
            <span className="text-xs md:text-sm font-bold">{roomName}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><span className="i-fluent:people-24-regular w-4 h-4 md:w-6 md:h-6 text-red-500"></span> مهمان</span>
            <span className="text-xs md:text-sm font-bold">{guests}</span>
          </div>
        </div>
      </div>
      <div className="mb-3 md:mb-6">
        <div className="text-sm md:text-base font-bold mb-3 md:mb-4">قیمت</div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm">{nights} شب</span>
          <span className="text-xs md:text-sm">{formatPriceWithToman(pricePerNight)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm">هزینه سرویس</span>
          <span className="text-xs md:text-sm">{formatPriceWithToman(serviceFee)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm">تخفیف</span>
          <span className="text-xs md:text-sm">{formatPriceWithToman(discount)}</span>
        </div>
        <div className="flex items-center justify-between mt-3 md:mt-4">
          <span className="text-base md:text-lg font-bold">جمع کل</span>
          <span className="text-base md:text-lg font-bold">{formatPriceWithToman(total)}</span>
        </div>
      </div>
      <button 
        className="w-full py-3 md:py-4 text-sm md:text-base bg-black text-white rounded-xl font-bold hover:bg-black/90 transition"
        onClick={handleBookNow}
      >
        تایید و ادامه خرید
      </button>
    </div>
  );
};