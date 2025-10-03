"use client";
import { FromMobile } from "./frommobile";
import {
  DateMobile,
  RoomMobile,
  TravelersMobile,
} from "@/components/share/searchBar";
import { Button } from "@/components/ui/button";
import { HotelRegion } from "./frommobile"; // import your hotel region type

interface HotelSearchMobileProps {
  selectedLocationName: string;
  setSelectedLocationName: (value: HotelRegion | null) => void;
  checkInDate: Date | undefined;
  setCheckInDate: (value: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (value: Date | undefined) => void;
  adultCount: number;
  setAdultCount: (value: number) => void;
  childCount: number;
  setChildCount: (value: number) => void;
  infantCount: number;
  setInfantCount: (value: number) => void;
  rooms: number;
  setRooms: (value: number) => void;
  handleSearch: () => void;
  isPending: boolean;
}

function HotelSearchMobile({
  selectedLocationName,
  setSelectedLocationName,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infantCount,
  setInfantCount,
  rooms,
  setRooms,
  handleSearch,
  isPending,
}: HotelSearchMobileProps) {
  return (
    <div className="flex flex-col gap-6 md:hidden">
      <FromMobile
        title="انتخاب مقصد"
        icon={<span className="i-fluent:arrow-sort-down-24-regular"></span>}
        setLocation={setSelectedLocationName}
      />
      <DateMobile
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
      />
      <TravelersMobile
        adultCount={adultCount}
        setAdultCount={setAdultCount}
        childCount={childCount}
        setChildCount={setChildCount}
        infantCount={infantCount}
        setInfantCount={setInfantCount}
      />
      <RoomMobile rooms={rooms} setRooms={setRooms} />
      <Button
        onClick={handleSearch}
        className="w-full flex items-center gap-2"
        disabled={
          isPending ||
          !selectedLocationName ||
          !checkInDate ||
          !checkOutDate
        }
      >
        <span className="i-fluent:search-24-regular"></span>
        جستجوهتل و اقامتگاه
      </Button>
    </div>
  );
}

export { HotelSearchMobile };
