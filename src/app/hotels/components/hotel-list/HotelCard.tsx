"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GridHotelCard } from "./GridHotelCard";
import { formatPriceWithToman } from "@/lib/price";

interface HotelCardProps {
  viewMode?: "list" | "grid";
  id: string;
  name?: string;
  price?: {
    currency: string;
    total: string;
  };
  rating?: number;
  beds?: number;
  roomCategory?: string;
  searchDetails?: {
    nights: number;
    adults: number;
    children: number;
    rooms: number;
  };

  address?: string;
  tripAdvisorRating?: number;
  hotelType?: string;
  roomTypeName?: string;
  mealType?: string;
  hotelPicture?: string;
  checkInDate?: string;
  checkOutDate?: string;
  city_net_code?: string;
}

const amenities = [
  { icon: <span className="i-fluent:food-egg-24-regular w-4 h-4"></span>, label: 'صبحانه رایگان' },
  { icon: <span className="i-fluent:weather-sunny-24-regular w-4 h-4"></span>, label: 'منظره شهر' }
];

const HotelCard: React.FC<HotelCardProps> = ({
  viewMode = "list",
  id,
  name = "نام هتل",
  price = { currency: "تومان", total: "نامشخص" },
  rating = 0,
  beds,
  roomCategory,
  searchDetails = { nights: 1, adults: 1, children: 0, rooms: 1 },
  address,
  tripAdvisorRating,
  hotelType,
  roomTypeName,
  mealType,
  hotelPicture,
  checkInDate,
  checkOutDate,
  city_net_code
}) => {
  if (viewMode === "grid") {
    return (
      <GridHotelCard
        id={id}
        name={name}
        price={price}
        rating={rating}
        searchDetails={searchDetails}
        address={address}
        tripAdvisorRating={tripAdvisorRating}
        hotelPicture={hotelPicture}
      />
    );
  }

  const formatDateToSlash = (date: string) => date?.replace(/-/g, '/');
  const createHotelUrl = () => {
    const params = new URLSearchParams({
      check_in_date: formatDateToSlash(checkInDate || ''),
      check_out_date: formatDateToSlash(checkOutDate || ''),
      city_net_code: city_net_code || ''
    });
    return `/hotels/${id}?${params.toString()}`;
  };

  const formatPrice = (priceStr: string) => formatPriceWithToman(priceStr);

  const formatCurrency = (currency: string) => {
    return currency === 'IRR' ? 'تومان' : currency;
  };

  return (
    <div className="w-full mx-auto my-6 bg-white shadow-md rounded-2xl overflow-hidden flex flex-row-reverse rtl">
      <div className="w-64 flex-shrink-0 p-5 flex flex-col justify-center items-center border-r">
        <div className="text-xs text-gray-500 mb-1">شروع قیمت</div>
        <div className="text-2xl font-bold text-primary mb-2">
          {formatPrice(price.total)}
        </div>
        <Link href={createHotelUrl()}>
          <Button variant="default" size="sm" className="w-full mb-2">مشاهده و رزرو</Button>
        </Link>
        <div className="text-xs text-red-500 mt-2">۳۳ اتاق باقی‌مانده است</div>
      </div>
      <div className="flex-1 m-5 pr-5 flex flex-col justify-between">
        <div>
          <Link href={createHotelUrl()} className="text-lg font-semibold hover:text-primary transition-colors block mb-2">{name}</Link>
          
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              i < (tripAdvisorRating || rating)
                ? <span key={i} className="i-fluent:star-24-filled w-4 h-4 text-yellow-500"></span>
                : <span key={i} className="i-fluent:star-24-filled w-4 h-4 text-gray-300"></span>
            ))}
            <span className="text-xs mr-2">{tripAdvisorRating || rating} ستاره</span>
            {tripAdvisorRating && <span className="text-xs text-gray-500">(TripAdvisor)</span>}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <span className="i-fluent:location-24-regular w-4 h-4"></span>
            <span>{address || "آدرس در دسترس نیست"}</span>
            <Link href="#" className="underline ml-2">مشاهده روی نقشه</Link>
          </div>

          <div className="flex flex-row w-2/3 text-sm mt-4 mb-2 overflow-hidden">
            <div className="flex-1 flex items-center gap-1 py-2">
              <span className="i-fluent:bed-24-regular w-4 h-4 text-gray-500"></span>
              {beds || 2} تخته
            </div>
            <div className="w-px bg-gray-200 my-2" />
            <div className="flex-1 flex items-center justify-center gap-1 py-2">
              <span className="i-fluent:calendar-24-regular w-4 h-4 text-gray-500"></span>
              {searchDetails.nights} شب
            </div>
            <div className="w-px bg-gray-200 my-2" />
            <div className="flex-1 flex items-center justify-center gap-1 py-2">
              <span className="i-fluent:person-24-regular w-4 h-4 text-gray-500"></span>
              {searchDetails.adults} بزرگسال{searchDetails.children ? ` و ${searchDetails.children} کودک` : ''}
            </div>
          </div>
          <div className="flex flex-wrap text-xs text-gray-600 mt-2">
            {mealType && (
              <div className="flex items-center gap-1 pl-4">
                <span className="i-fluent:food-egg-24-regular w-4 h-4"></span>
                {mealType}
              </div>
            )}
            {hotelType && hotelType.includes("Hotel") && (
              <div className="flex items-center gap-1 pl-4">
                <span className="i-fluent:weather-sunny-24-regular w-4 h-4"></span>
                منظره شهر
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-48 h-48 flex-shrink-0 p-2">
        <Link href={createHotelUrl()} className="block h-full">
          <img
            src={hotelPicture || `https://images.unsplash.com/photo-${id === "1" ? "1566073771259-6a8506099945" : id === "2" ? "1618773928121-c32242e63f39" : "1571896349842-33c89424de2d"}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80`}
            alt={name}
            className="w-full h-full object-cover rounded-xl cursor-pointer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/600x400";
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export { HotelCard }; 