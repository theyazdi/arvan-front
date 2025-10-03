"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPriceWithToman } from "@/lib/price";

interface GridHotelCardProps {
  id: string;
  name?: string;
  price?: {
    currency: string;
    total: string;
  };
  rating?: number;
  searchDetails?: {
    nights: number;
    adults: number;
    children: number;
    rooms: number;
  };

  address?: string;
  tripAdvisorRating?: number;
  hotelPicture?: string;
  city_net_code?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

const GridHotelCard: React.FC<GridHotelCardProps> = ({
  id,
  name = "نام هتل",
  price = { currency: "تومان", total: "نامشخص" },
  rating = 0,
  searchDetails = { nights: 1, adults: 1, children: 0, rooms: 1 },
  address,
  tripAdvisorRating,
  hotelPicture,
  city_net_code,
  checkInDate,
  checkOutDate
}) => {
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
    <div className="w-full mx-auto my-4 bg-white shadow-md rounded-2xl overflow-hidden flex flex-col border border-gray-200 rtl">
      <div className="w-full h-48 p-3 flex items-center justify-center">
        <Link href={createHotelUrl()} className="block w-full h-full">
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
      <div className="pb-4 pt-1 px-4 flex flex-col">
        <Link href={createHotelUrl()} className="text-base font-bold mb-2 hover:text-primary transition-colors text-right">
          {name}
        </Link>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            i < (tripAdvisorRating || rating)
              ? <span key={i} className="i-fluent:star-24-filled w-4 h-4 text-yellow-400"></span>
              : <span key={i} className="i-fluent:star-24-filled w-4 h-4 text-gray-300"></span>
          ))}
          <span className="text-xs mr-2">۵ ستاره</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span className="i-fluent:location-24-regular w-4 h-4"></span>
          <span>{address || (id === "1" ? "خیابان ولیعصر، پلاک ۱۲۳" : id === "2" ? "خیابان آزادی، پلاک ۴۵۶" : "خیابان فرمانیه، پلاک ۷۸۹")}</span>
          <Link href="#" className="underline ml-2">مشاهده روی نقشه</Link>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{id === "1" ? "۲.۳ کیلومتر فاصله از مرکز شهر" : id === "2" ? "۱.۸ کیلومتر فاصله از مرکز شهر" : "۳.۱ کیلومتر فاصله از مرکز شهر"}</span>
        </div>
        <div className="flex flex-row text-sm mt-2 mb-2 overflow-hidden">
          <div className="flex-1 flex items-center justify-center gap-1 py-2">
            اتاق خواب دو تخته
          </div>
          <div className="w-px bg-gray-200 my-2" />
          <div className="flex-1 flex items-center justify-center gap-1 py-2">
            {searchDetails.nights} شب
          </div>
          <div className="w-px bg-gray-200 my-2" />
          <div className="flex-1 flex items-center justify-center gap-1 py-2">
            {searchDetails.adults} بزرگسال{searchDetails.children ? ` و ${searchDetails.children} کودک` : ''}
          </div>
        </div>
        <div className="border-t border-gray-200 my-3"></div>
        <div className="flex flex-row items-center justify-between mt-3 gap-2 w-full">
          <div className="flex flex-col">
            <div className="text-xs text-center text-gray-500 mb-1">شروع قیمت از</div>
            <div className="text-xl font-bold text-primary mb-0">
              {formatPrice(price.total)}
            </div>
            <div className="text-xs text-center text-red-500 mt-2 w-full">۳۳ اتاق باقی‌مانده است</div>
          </div>
          <Link href={createHotelUrl()} className="w-1/2 min-w-[120px]">
            <Button variant="default" size="lg" className="w-full rounded-xl text-base font-bold">مشاهده و رزرو</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { GridHotelCard }; 