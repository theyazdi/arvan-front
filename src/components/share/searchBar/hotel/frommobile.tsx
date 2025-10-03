"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input } from "@/components/ui";
import { useEffect, useState } from "react";
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

interface FromMobileProps {
  title: string;
  icon: React.ReactNode;
  setLocation: (location: HotelRegion | null) => void;
}

function FromMobile({ title, icon, setLocation }: FromMobileProps) {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState<HotelRegion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<HotelRegion | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch locations when input has at least 3 characters
  useEffect(() => {
    const fetchLocations = async () => {
      if (searchLocation.length < 3) {
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
        }
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      }
    };

    fetchLocations();
  }, [searchLocation]);

  const handleSelect = (region: HotelRegion) => {
    setSelectedLocation(region);
    setLocation(region); // Call parent callback
    setSearchLocation(region.cityNameFa);
    setSearchResults([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer" dir="rtl" onClick={() => setIsOpen(true)}>
          <div className="border rounded-full w-8 h-8 flex items-center justify-center">{icon}</div>
          <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm text-gray-500">{selectedLocation?.cityNameFa || "شهر"}</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="h-[80vh] flex flex-col overflow-y-auto px-4">
        <DialogHeader>
          <DialogTitle className="text-base font-400 text-right">کجا میخواهید بروید؟</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
          <Input
            placeholder="شهر"
            className="pr-10 rounded-full"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />

          {searchResults.length > 0 && (
            <div className="mt-4 max-h-[280px] overflow-y-auto flex flex-col gap-2">
              <CityNameHotel data={searchResults} setLocation={handleSelect} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { FromMobile };
