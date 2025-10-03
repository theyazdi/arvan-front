"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HotelSearch } from "@/components/share/searchBar/hotel/hotelSearch";
import {
  ProcessHotel,
  HotelList,
} from "./index";
import { getHotels, getLocationCode, HotelResponse } from "../actions";
import { useSearchParams } from "next/navigation";
import { HotelFilterSidebar } from "./HotelFilterSidebar";
import { HotelSearchInfoCard } from "./hotelsearchinfocard";
import { HotelFilterMobile } from "./hotelfiltermobile";

export interface HotelSearchParams {
  [key: string]: string | undefined;
  category?: string;
  brand?: string;
  date_added?: string;
  quantity?: string;
  selected_product?: string;
  selectedItemIndex?: string;
  currentIndex?: string;
  city?: string;
  check_in_date?: string;
  check_out_date?: string;
  page?: string;
  current_step?: string;
  sort_by?: string;
  min_price?: string;
  max_price?: string;
  rooms?: string;
  adults?: string;
  star?: string;
}


function getDefaultDate(offsetDays: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateToSlash(date: string) {
  return date.replace(/-/g, '/');
}

function HotelSearchSection() {
  const searchParams = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(true);

  const params = {
    city: searchParams.get("city") || "",
    check_in_date: searchParams.get("check_in_date") || "",
    check_out_date: searchParams.get("check_out_date") || "",
    adults: searchParams.get("adults") || "",
    children: searchParams.get("children") || "",
    rooms: searchParams.get("rooms") || "",
  };

  useEffect(() => {
    if (params.city && params.check_in_date && params.check_out_date) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [params.city, params.check_in_date, params.check_out_date]);

  const clearSearchParams = () => {
    setIsSearchActive(false);
  };

  return (
    <div className="w-full">
      {isSearchActive ? (
        <>
          {/* Desktop version */}
          <div className="hidden md:flex items-center justify-center mt-14">
            <div className="rounded-xl shadow flex bg-white w-full max-w-[1200px]">
              <div className="flex items-center justify-between px-8 py-4 w-full" dir="rtl">
                <div className="flex items-center gap-16">
                  <div className="flex items-center gap-2">
                    <span className="i-fluent:building-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
                    <p>{params.city}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="i-fluent:calendar-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
                    <p>{params.check_in_date} تا {params.check_out_date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="i-fluent:person-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
                    <p>{params.adults} بزرگسال{params.children ? `، ${params.children} کودک` : ''}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="i-fluent:bed-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
                    <p>{params.rooms} اتاق</p>
                  </div>
                </div>
                <button 
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                  onClick={clearSearchParams}
                >
                  تغییر جستجو
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile version */}
          <div className="md:hidden w-full">
            <HotelSearchInfoCard
              city={params.city}
              checkInDate={params.check_in_date}
              checkOutDate={params.check_out_date}
              adults={params.adults}
              children={params.children}
              rooms={params.rooms}
              onEdit={clearSearchParams}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-14">
          <HotelSearch />
        </div>
      )}
    </div>
  );
}

function HotelsWithParams() {
  const searchParams = useSearchParams();
  const [hotelData, setHotelData] = useState<HotelResponse>({ hotels: [], totalCount: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const initialPrice = searchParams.get("max_price") ? parseInt(searchParams.get("max_price")!) : 1000000000;
  const initialRooms = searchParams.get("rooms") ? parseInt(searchParams.get("rooms")!) : 1;
  const initialAdults = searchParams.get("adults") ? parseInt(searchParams.get("adults")!) : 1;
  const initialStar = searchParams.get("star") || "";

  const [price, setPrice] = useState<number>(initialPrice);
  const [rooms, setRooms] = useState<number>(initialRooms);
  const [adults, setAdults] = useState<number>(initialAdults);
  const [starRating, setStarRating] = useState<string>(initialStar);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentStep = parseInt(searchParams.get("current_step") || "1");
        const cityEnglish = searchParams.get("city_english") || "" ;
        const cityPersian = searchParams.get("city_persian") || "";
        const countryCode = searchParams.get("country_code") || "";
        const checkIn = formatDateToSlash(searchParams.get("check_in_date") || getDefaultDate());
        const checkOut = formatDateToSlash(searchParams.get("check_out_date") || getDefaultDate(1));
        const page = parseInt(searchParams.get("page") || "1");

        const minPrice = 0;
        const maxPrice = price;
        const roomsParam = parseInt(searchParams.get("rooms") || rooms.toString() || "1");
        const adultsParam = parseInt(searchParams.get("adults") || adults.toString() || "1");
        const starParam = starRating ? parseInt(starRating) : undefined;
        const data = await getHotels(cityEnglish,cityPersian,countryCode, checkIn, checkOut, page, minPrice, maxPrice, roomsParam, adultsParam, starParam);
        setHotelData(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams, price, rooms, adults, starRating]);

  const currentStep = parseInt(searchParams.get("current_step") || "1");
  const steps = ["انتخاب هتل", "انتخاب اتاق", "بررسی و پرداخت"];

  const plainSearchParams: { [key: string]: string | undefined } = {};
  searchParams.forEach((value, key) => {
    plainSearchParams[key] = value;
  });

  const cityEnglish = searchParams.get("city_english") || "";
  const cityPersian = searchParams.get("city_persian") || "";
  const checkIn = formatDateToSlash(searchParams.get("check_in_date") || getDefaultDate());
  const checkOut = formatDateToSlash(searchParams.get("check_out_date") || getDefaultDate(1));
  const page = parseInt(searchParams.get("page") || "1");

  const roomsParam = parseInt(searchParams.get("rooms") || rooms.toString() || "1");
  const adultsParam = parseInt(searchParams.get("adults") || adults.toString() || "1");
  const starParam = starRating ? parseInt(starRating) : undefined;

  const currentSearchParams: HotelSearchParams = {
    ...plainSearchParams,
    city_english: cityEnglish,
    city_persian: cityPersian,
    check_in_date: checkIn,
    check_out_date: checkOut,
    page: page.toString(),
    min_price: "0",
    max_price: price.toString(),
    rooms: roomsParam.toString(),
    adults: adultsParam.toString(),
    star: starRating,
  };

  const firstHotel = hotelData.hotels[0];
  const latitude = firstHotel?.hotel?.latitude ?? 0;
  const longitude = firstHotel?.hotel?.longitude ?? 0;
  const hasValidCoords = typeof latitude === "number" && typeof longitude === "number" && latitude !== 0 && longitude !== 0;

  const Map = dynamic(() => import("@/components/share/MapComponent/Map"), { ssr: false });

  return (
    <>
      <HotelSearchSection />
      
      {/* Process Steps: Mobile full-width, Desktop inside results (top-left) */}
      <div className="px-4 mt-6 md:hidden">
        <ProcessHotel
          steps={steps}
          currentStep={currentStep}
          searchParams={currentSearchParams}
        />
      </div>
      
      {/* Mobile Filter Section */}
      <div className="md:hidden px-4">
        <HotelFilterMobile 
          price={price} 
          setPrice={setPrice} 
          starRating={starRating} 
          setStarRating={setStarRating} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-6 md:mt-8 px-4 md:px-6" dir="rtl">
        <div className="col-span-1 md:col-span-3 hidden md:flex md:flex-col gap-4">
          {/* City Location Box (Map) */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full self-start">
            <div className="relative aspect-square w-full z-0">
              {hasValidCoords && !loading ? (
                <div className="w-full h-full">
                  <Map latitude={latitude} longitude={longitude} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  در حال بارگذاری نقشه
                </div>
              )}
              <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-full">
                {}
              </div>
            </div>
          </div>
          {/* Filters Sidebar */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
            <HotelFilterSidebar price={price} setPrice={setPrice} starRating={starRating} setStarRating={setStarRating} />
          </div>
        </div>
        <div className="col-span-1 md:col-span-9 px-0 md:px-4">
          {/* Desktop: Process steps full-width at the top of results */}
          <div className="hidden md:block mb-4 w-full">
            <ProcessHotel
              steps={steps}
              currentStep={currentStep}
              searchParams={currentSearchParams}
            />
          </div>
          <div className="hidden md:flex flex-col md:flex-row gap-4 my-4 md:my-6 items-start w-full max-w-full [&>*]:flex-shrink-0 [&>*]:bg-white [&>*]:rounded-2xl [&>*]:shadow-md [&>*]:p-0">
            <div className="w-full md:w-[320px] flex items-start">
              {/* <HotelSortComponent searchParams={currentSearchParams} /> */}
            </div>
            <div className="flex-1 min-w-0">
              {/* <WeatherCalendar searchParams={currentSearchParams} /> */}
            </div>
          </div>
          <HotelList
            searchParams={currentSearchParams}
            initialHotels={hotelData.hotels}
            totalCount={hotelData.totalCount}
            totalPages={hotelData.totalPages}
            isLoading={loading}
            onSearchAgain={() => {
              // Clear search params to show search form
              const url = new URL(window.location.href);
              url.search = '';
              window.history.replaceState({}, '', url.toString());
              window.location.reload();
            }}
          />
        </div>
      </div>
    </>
  );
}

export { HotelsWithParams }; 