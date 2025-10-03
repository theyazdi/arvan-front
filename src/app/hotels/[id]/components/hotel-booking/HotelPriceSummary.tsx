"use client";
import { Button } from "@/components/ui/button";
import { formatPriceWithToman } from "@/lib/price";
import { HotelPaymentMethodSelector } from "./HotelPaymentMethodSelector";
import { useState } from "react";

interface HotelPriceSummaryProps {
  nextStep: () => void;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  rooms: number;
  nights: number;
  pricePerNight: number;
  serviceFee: number;
  discount: number;
  total: number;
  currentStep: number;
}

function HotelPriceSummary({
  nextStep,
  hotelName,
  checkInDate,
  checkOutDate,
  adults,
  children,
  rooms,
  nights,
  pricePerNight,
  serviceFee,
  discount,
  total,
  currentStep,
}: HotelPriceSummaryProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  return (
    <div dir="rtl">

      <div className="bg-[#FAFAFA] rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <span className="i-fluent:building-24-regular w-6 h-6 text-red-500"></span> هتل
            </span>
            <span className="text-sm font-bold">{hotelName}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <span className="i-fluent:calendar-ltr-24-regular w-6 h-6 text-red-500"></span> ورود
            </span>
            <span className="text-sm font-bold">{checkInDate}</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <span className="i-fluent:calendar-ltr-24-regular w-6 h-6 text-red-500"></span> خروج
            </span>
            <span className="text-sm font-bold">{checkOutDate}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <span className="i-fluent:bed-24-regular w-6 h-6 text-red-500"></span> اتاق
            </span>
            <span className="text-sm font-bold">{rooms} اتاق</span>
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <span className="i-fluent:people-24-regular w-6 h-6 text-red-500"></span> مهمان
            </span>
            <span className="text-sm font-bold">{adults} بزرگسال{children ? `، ${children} کودک` : ''}</span>
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-2xl font-bold">خلاصه قیمت</h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">{nights} شب</span>
          <span className="text-sm">{formatPriceWithToman(pricePerNight * nights)}</span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">هزینه سرویس</span>
          <span className="text-sm">{formatPriceWithToman(serviceFee)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">تخفیف</span>
            <span className="text-sm text-green-600">-{formatPriceWithToman(discount)}</span>
          </div>
        )}
        
        <div className="w-full h-px bg-gray-2 my-4"></div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">قیمت نهایی</h3>
          <span className="text-xl font-bold">
            {formatPriceWithToman(total)}
          </span>
        </div>
        
        {currentStep === 3 && (
          <HotelPaymentMethodSelector
            selectedPayment={selectedPayment}
            onChange={setSelectedPayment}
          />
        )}
      </div>

      <Button className="rounded-lg mt-8 w-full" onClick={nextStep}>
        تایید و ادامه خرید
      </Button>
    </div>
  );
}

export { HotelPriceSummary }; 