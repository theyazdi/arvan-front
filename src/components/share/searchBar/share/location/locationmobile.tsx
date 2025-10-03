"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components/ui/";
import { Region } from "./location";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/fetch";
import HeaderAirportSearch from "./headerAirportSearch";
import AirportName from "./airportName";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

interface LocationMobileProps {
  title: string;
  icon: React.ReactNode;
  setLocation: (location: string) => void;
  location: string;
  selectedLocation: Region | null;
  setSelectedLocation: (location: Region | null) => void;
  setIsCity: (isCity: boolean) => void;
}

function LocationMobile({
  title,
  icon,
  setLocation,
  location,
  selectedLocation,
  setSelectedLocation,
  setIsCity,
}: LocationMobileProps) {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState<Region[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Use debounced search with 1 second delay
  const debouncedSearchTerm = useDebouncedSearch({ 
    searchTerm: searchLocation, 
    delay: 1000,
    minLength: 1 
  });

  const getLocation = async () => {
    try {
      if (debouncedSearchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }
      const response = await fetch(
        `${API_BASE_URL}/flight/location/search?keyword=${encodeURIComponent(
          debouncedSearchTerm
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      getLocation();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);
  const handleLocationSelect = (selectedLocation: Region) => {
    setLocation(selectedLocation.iataCode);
    setSearchLocation(selectedLocation.name);
    setSelectedLocation(selectedLocation);
    setSearchResults([]);
    setIsOpen(false);
    setIsCity(selectedLocation.isCity || false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-start gap-2" dir="rtl">
          <div
            className={`border tex ${
              title === "انتخاب مبدا" ? "rounded-full" : "rounded-lg"
            } min-w-[32px] max-w-[32px] h-8 flex items-center justify-center overflow-hidden ${
              isOpen ? "border-[#EA443F]" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center w-4 h-4 text-[#9EA8C3] ${
                isOpen ? "text-[#EA443F]" : ""
              }`}
            >
              {icon}
            </div>
          </div>
          <div>
            <p className="font-bold">{title}</p>
            <p className="text-sm mt-1 text-gray-500">
              {selectedLocation?.name || "شهر و یا فرودگاه"}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[80vh] bg-gray-1 !px-4 flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-400 text-right text-[#212121]">
            شهر و یا فرودگاهی که قصد سفر از آنرا دارید انتخاب کنید.
          </DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-6 h-6 text-[#9EA8C3] border rounded-full  h-6 w-6`}
            >
              {icon}
            </div>
            <p className="text-lg font-bold">مبدا</p>
          </div>
          <hr />
          <div className="relative">
            <span
              className={`i-fluent:search-24-regular absolute top-1/2 right-4 -translate-y-1/2 z-10  ${
                searchLocation ? "block" : "hidden"
              }`}
            ></span>
            <Input
              size="lg"
              type="text"
              placeholder="شهر و یا فرودگاه"
              className={`rounded-2xl ${searchLocation ? "pr-10" : "pr-4"}`}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
            <hr className="w-full border-gray-300 my-4" />
            <HeaderAirportSearch
              data={searchResults[0]}
              setLocation={handleLocationSelect}
            />
            <AirportName
              data={searchResults}
              setLocation={handleLocationSelect}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { LocationMobile };
