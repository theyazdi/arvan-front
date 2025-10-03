"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@/components/ui";
import { Dismiss16Regular, Location12Regular, Search20Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib";
import CityNameHotel from "./cityNameHotel";

export interface HotelRegion {
  cityCode: string;
  cityNameEn: string;
  cityNameFa: string;
  countryCode: string;
  countryNameEn: string;
  countryNameFa: string;
  id: string;
}

interface FromProps {
  setLocation: (location: HotelRegion | null) => void;
}

function From({ setLocation }: FromProps) {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState<HotelRegion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<HotelRegion | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getLocation = async () => {
    if (!searchLocation.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/hotel/location/search/?keyword=${encodeURIComponent(searchLocation)}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        const regions: HotelRegion[] = data.map((item: any) => ({
          id: item._id || item._key,
          cityCode: item.cityCode,
          cityNameEn: item.cityNameEn,
          cityNameFa: item.cityNameFa,
          countryCode: item.countryCode,
          countryNameEn: item.countryNameEn,
          countryNameFa: item.countryNameFa,
        }));
        setSearchResults(regions);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchLocation.trim()) getLocation();
    else setSearchResults([]);
  }, [searchLocation]);

  useEffect(() => {
    setIsOpen(searchResults.length > 0);
  }, [searchResults]);

  const handleSelect = (region: HotelRegion) => {
    setSelectedLocation(region);
    setLocation(region);
    setSearchLocation(region.cityNameFa);
    setSearchResults([]);
    setIsOpen(false);
  };

  const handleRemove = () => {
    setSelectedLocation(null);
    setLocation(null);
    setSearchLocation("");
    setSearchResults([]);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer w-[200px]" dir="rtl">
          <div className={`border rounded-full w-8 h-8 flex items-center justify-center ${isOpen ? "border-[#EA443F]" : "border-gray-400"}`}>
            <Location12Regular color={isOpen ? "#EA443F" : "#9CA3AF"} />
          </div>
          <div>
            <p className="font-bold text-gray-800">مقصد</p>
            <p className="text-sm text-gray-500">{selectedLocation ? selectedLocation.cityNameFa : "شهر"}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-10 w-[302px] px-4 py-3 rounded-xl overflow-hidden">
        <DropdownMenuItem>
          <div className="flex items-center justify-between gap-2 w-full" dir="rtl">
            <div className="flex items-center gap-2">
              <div className="border rounded-full w-8 h-8 flex items-center justify-center border-[#EA443F]">
                <Location12Regular color="#EA443F" />
              </div>
              <p className="font-bold">مقصد</p>
            </div>
            {selectedLocation && (
              <Button variant="outline" onClick={handleRemove}>
                <Dismiss16Regular /> حذف
              </Button>
            )}
          </div>
        </DropdownMenuItem>
        <hr className="my-4 border-gray-300" />
        <div className="relative" dir="rtl">
          <Search20Regular className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 z-10" />
          <Input
            placeholder="شهر"
            className="w-full rounded-full px-4 py-2 pr-10 text-sm text-gray-500"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        {searchResults.length > 0 && (
          <div className="mt-4 max-h-[280px] overflow-y-auto flex flex-col gap-2">
            <CityNameHotel data={searchResults} setLocation={handleSelect} />

          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default From;
