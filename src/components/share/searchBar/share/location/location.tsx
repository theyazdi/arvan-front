"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@/components/ui";
import { Search20Regular, Dismiss16Regular } from "@fluentui/react-icons";
import React, { useEffect, useState } from "react";
import HeaderAirportSearch from "./headerAirportSearch";
import AirportName from "./airportName";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

interface LocationProps {
  title: "انتخاب مبدا" | "انتخاب مقصد";
  icon: React.ReactNode;
  setLocation: (location: string) => void;
  location: string;
  selectedLocation: Region | null;
  setSelectedLocation: (location: Region | null) => void;
  iconColor?: React.ReactNode;
  setIsCity: (isCity: boolean) => void;
  onLocationSelect?: (location: Region) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface Address {
  countryName: string;
  countryCode: string;
  cityName: string;
  cityCode: string;
}

export interface Region {
  address: Address;
  detailedName: string;
  iataCode: string;
  id: string;
  name: string;
  subType: string;
  timeZoneOffset: string;
  isCity?: boolean;
}

function Location({
  title,
  icon,
  setLocation,
  selectedLocation,
  setSelectedLocation,
  setIsCity,
  onLocationSelect,
  isOpen: externalIsOpen,
  onOpenChange,
}: LocationProps) {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState<Region[]>([]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external isOpen if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  
  // Reset internal state when external control is used
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setInternalIsOpen(false);
    }
  }, [externalIsOpen]);

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
    setIsCity(selectedLocation.isCity || false);
    onLocationSelect?.(selectedLocation); // Call external handler - this will close dropdown
  };

  const handleRemoveLocation = () => {
    setLocation("");
    setSearchLocation("");
    setSelectedLocation(null);
    setSearchResults([]);
  };

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-start gap-2  cursor-pointer">
            <div
              className={`border tex ${
                title === "انتخاب مبدا" ? "rounded-full" : "rounded-full"
              } min-w-[32px] max-w-[32px] h-8 flex items-center justify-center overflow-hidden ${
                isOpen ? "border-[#EA443F]" : ""
              }`}
            >
              <div
                className={`flex items-center justify-center w-6 h-6 text-[#9EA8C3] ${
                  isOpen ? "text-[#EA443F]" : ""
                }`}
              >
                {icon}
              </div>
            </div>
            <div>
              <p className="font-bold">{title}</p>
              <p className="text-sm mt-1 text-gray-500">
                {selectedLocation
                  ? `${selectedLocation.name}`
                  : "شهر و یا فرودگاه"}
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-10 w-[340px] px-4 py-3 rounded-xl overflow-hidden">
          <DropdownMenuItem>
            <div
              className="flex items-center justify-between gap-2 w-full"
              dir="rtl"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`border ${
                    title === "انتخاب مبدا"
                      ? "rounded-full border-[#EA443F]"
                      : "rounded-full border-[#EA443F]"
                  } min-w-[32px] max-w-[32px] h-8 flex items-center justify-center overflow-hidden`}
                >
                  <div className="flex items-center justify-center w-6 h-6 text-[#EA443F]">
                    {icon}
                  </div>
                </div>
                <p className="font-bold text-sm">{title}</p>
              </div>
              {selectedLocation && (
                <Button variant={"outline"} onClick={handleRemoveLocation}>
                  حذف جستجو <Dismiss16Regular />
                </Button>
              )}
            </div>
          </DropdownMenuItem>
          <hr className="w-full border-gray-300 my-4" />
          <div className="relative">
            <Search20Regular className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
            <Input
              size="sm"
              type="text"
              placeholder="شهر و یا فرودگاه"
              className="w-full outline-none border rounded-full py-2 text-sm text-gray-500 pl-10 text-right"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>

          {searchResults.length > 0 && (
            <>
              <hr className="w-full border-gray-300 my-4" />
              <HeaderAirportSearch
                data={searchResults[0]}
                setLocation={handleLocationSelect}
              />
              <AirportName
                data={searchResults}
                setLocation={handleLocationSelect}
              />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { Location as Region };
