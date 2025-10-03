"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/img/Vora Logo.png";
import { Faq } from "@/app/components/faq/faq";

interface NoHotelsFoundProps {
  searchParams: {
    city?: string;
    check_in_date?: string;
    check_out_date?: string;
    adults?: string;
    children?: string;
    rooms?: string;
    [key: string]: string | undefined;
  };
  onSearchAgain?: () => void;
}

export function NoHotelsFound({ searchParams, onSearchAgain }: NoHotelsFoundProps) {
  const router = useRouter();
  const adults = parseInt(searchParams.adults || "1");
  const children = parseInt(searchParams.children || "0");
  const rooms = parseInt(searchParams.rooms || "1");
  const city = searchParams.city || "شهر";
  const checkInDate = searchParams.check_in_date || "تاریخ مورد نظر";
  const checkOutDate = searchParams.check_out_date || "تاریخ مورد نظر";

  const handleSearchAgain = () => {
    if (onSearchAgain) {
      onSearchAgain();
    } else {
      // Clear search params and go to hotels page
      router.push('/hotels');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* No Hotels Found Message */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-gray-100 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">i</span>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed">
              متاسفانه در این تاریخ اقامتگاهی پیدا نشد. در صورت امکان، لطفا تاریخ های دیگر را بررسی کنید.
            </p>
          </div>
        </div>

        {/* Search Parameters Display */}
        <div className="max-w-md mx-auto mb-8 space-y-4">
          {/* Travelers */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">مسافرها</p>
              <p className="text-sm font-medium text-gray-800">
                {adults} مسافر{children > 0 ? `، ${children} کودک` : ''}
              </p>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12 7h-8v-1h8v1zm0-2h-8v-1h8v1zm0-2h-8v-1h8v1zm0-2h-8v-1h8v1zm0-2h-8v-1h8v1zm0-2h-8v-1h8v1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">اتاق ها</p>
              <p className="text-sm font-medium text-gray-800">{rooms} اتاق</p>
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">تاریخ رفت و برگشت</p>
              <p className="text-sm font-medium text-gray-800">تاریخ مورد نظر</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">انتخاب مقصد</p>
              <p className="text-sm font-medium text-gray-800">{city}</p>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="max-w-md mx-auto mb-12">
          <button 
            onClick={handleSearchAgain}
            className="w-full bg-gray-700 text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span className="text-sm font-medium">جستجو هتل و اقامتگاه</span>
          </button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <Faq type="hotels" />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Image src={Logo} alt="Vora Logo" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
             هوشمندانه سفر کن.
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3 justify-center">
                <div className="w-5 h-5 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">سفر هوشمند</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3 justify-center">
                <div className="w-5 h-5 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">خدمات</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3 justify-center">
                <div className="w-5 h-5 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">درباره آرون</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
