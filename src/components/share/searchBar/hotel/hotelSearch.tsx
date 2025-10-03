"use client";
import { Search16Regular } from "@fluentui/react-icons";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import CheckInAndOut from "./checkInAndOut";
import { Travelers } from "@/components/share/searchBar";
import Rooms from "./rooms";
import From from "./from";
import { HotelSearchMobile } from "./hotelsearchmobile";
import { useRouter } from "next/navigation";
import { HotelRegion } from "./from";

function HotelSearch() {
  const router = useRouter();
  const [location, setLocation] = useState<HotelRegion | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    if (!location) return;

    const formatDate = (date: Date | undefined) =>
      date ? `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2,"0")}/${String(date.getDate()).padStart(2,"0")}` : undefined;

    const params = new URLSearchParams();
    params.set("city_persian", location.cityNameFa);
    params.set("city_english", location.cityNameEn);
    params.set("country_code", location.countryCode);

    const checkIn = formatDate(checkInDate);
    const checkOut = formatDate(checkOutDate);
    if (checkIn) params.set("check_in_date", checkIn);
    if (checkOut) params.set("check_out_date", checkOut);

    params.set("adults", String(adultCount || 1));
    params.set("children", String(childCount));
    params.set("rooms", String(rooms));

    startTransition(() => router.push(`/hotels?${params.toString()}`));
  };

  return (
    <>
      <div className="w-full max-w-sm md:hidden">
        <HotelSearchMobile
          selectedLocationName={location?.cityNameFa || ""}
          setSelectedLocationName={setLocation}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          adultCount={adultCount}
          setAdultCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          infantCount={infantCount}
          setInfantCount={setInfantCount}
          rooms={rooms}
          setRooms={setRooms}
          handleSearch={handleSearch}
          isPending={isPending}
        />
      </div>

      <div className="bg-white rounded-[32px] px-6 py-3 gap-4 w-[1100px] mx-auto items-center justify-between h-20 shadow-md hidden md:flex flex-row-reverse" dir="rtl">
        <Button
          className="bg-gray-700 text-white w-10 h-10 rounded-full flex-none hover:bg-gray-800"
          onClick={handleSearch}
          size="icon"
          disabled={isPending || !location || !checkInDate}
        >
          <Search16Regular className="text-white" />
        </Button>

        <Travelers
          adultCount={adultCount}
          setAdultCount={setAdultCount}
          childCount={childCount}
          setChildCount={setChildCount}
          infantCount={infantCount}
          setInfantCount={setInfantCount}
        />

        <Rooms rooms={rooms} setRooms={setRooms} />

        <CheckInAndOut
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
        />

        <From setLocation={setLocation} />
      </div>
    </>
  );
}

export { HotelSearch };
