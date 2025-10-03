"use client";
import { useState, useEffect } from "react";
import { HotelSearchSummary } from "./hotelsearchsummary";
import { useSearchParams } from "next/navigation";
import { HotelSearch } from "@/components/share/searchBar/hotel/hotelSearch";

export interface HotelSearchParams {
  city: string;
  check_in_date: string;
  check_out_date: string;
  rooms: string;
  page: string;
}

function HotelSearchSection() {
  const searchParams = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(true);

  const params: HotelSearchParams = {
    city: searchParams.get("city") || "",
    check_in_date: searchParams.get("check_in_date") || "",
    check_out_date: searchParams.get("check_out_date") || "",
    rooms: searchParams.get("rooms") || "",
    page: searchParams.get("page") || "",
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
    <div className="w-full flex items-center justify-center mt-8 md:mt-14 px-4 md:px-0">
      {isSearchActive ? (
        <div className="rounded-sm shadow flex bg-white w-full max-w-md md:max-w-none">
          <HotelSearchSummary
            city={params.city}
            checkIn={params.check_in_date}
            checkOut={params.check_out_date}
            rooms={`${params.rooms} اتاق`}
            onClick={clearSearchParams}
          />
        </div>
      ) : (
        <div className="w-full max-w-md md:max-w-none">
          <HotelSearch />
        </div>
      )}
    </div>
  );
}

export { HotelSearchSection }; 