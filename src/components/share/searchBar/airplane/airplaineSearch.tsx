"use client";
import {
  ArrowUp12Regular,
  Search16Regular,
  ArrowDown12Regular,
} from "@fluentui/react-icons";
import { Button } from "@/components/ui/button";
import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DatePicker,
  ReturnTicket,
  Travelers,
  Location,
  Location as LocationType,
} from "@/components/share/searchBar";

interface AirplaneSearchProps {
  hasParams?: boolean;
}

function AirplaneSearch({ hasParams }: AirplaneSearchProps) {
  const router = useRouter();
  const [fromLocation, setFromLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isOriginCity, setIsOriginCity] = useState(false);
  const [isDestinationCity, setIsDestinationCity] = useState(false);
  const [selectedFromLocation, setSelectedFromLocation] =
    useState<LocationType | null>(null);
  const [selectedDestinationLocation, setSelectedDestinationLocation] =
    useState<LocationType | null>(null);
  const [isPending, startTransition] = useTransition();
  
  // Focus management for workflow
  const [currentFocus, setCurrentFocus] = useState<'origin' | 'destination' | 'date' | 'complete'>('origin');
  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  
  // Dropdown states
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // Workflow handlers
  const handleOriginSelect = (location: LocationType) => {
    setSelectedFromLocation(location);
    setIsOriginOpen(false); // Close origin dropdown
    setCurrentFocus('destination');
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsDestinationOpen(true); // Open destination dropdown
    }, 100);
  };

  const handleDestinationSelect = (location: LocationType) => {
    setSelectedDestinationLocation(location);
    setIsDestinationOpen(false); // Close destination dropdown
    setCurrentFocus('date');
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setIsDateOpen(true); // Open date dropdown
    }, 100);
  };

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setIsDateOpen(false); // Close date dropdown
    setCurrentFocus('complete');
  };

  // Reset workflow to a specific step
  const resetToStep = (step: 'origin' | 'destination' | 'date') => {
    setCurrentFocus(step);
    if (step === 'origin') {
      setSelectedFromLocation(null);
      setFromLocation("");
    } else if (step === 'destination') {
      setSelectedDestinationLocation(null);
      setDestinationLocation("");
    } else if (step === 'date') {
      setDate(undefined);
    }
  };

  // Auto-focus effect - removed to prevent auto-opening on page load

  const handleSearch = async () => {
    const formatDate = (date: Date | undefined) => {
      if (!date) return undefined;
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}/${month}/${day}`;
    };

    try {
      const totalTravelers = adultCount + childCount + infantCount;
      const effectiveAdultCount = totalTravelers === 0 ? 1 : adultCount;

      const params = new URLSearchParams({
        origin: selectedFromLocation?.iataCode || "",
        is_orgin_city: isOriginCity.toString(),
        destination: selectedDestinationLocation?.iataCode || "",
        is_destination_city: isDestinationCity.toString(),
        departure_date: formatDate(date) || "",
        adults: effectiveAdultCount.toString(),
        page: "1",
      });

      if (returnDate) {
        params.set("arrival_date", formatDate(returnDate) || "");
      }

      startTransition(() => {
        router.push(`/tickets?${params.toString()}`);
      });
    } catch (error) {
      console.error("خطا در جستجوی پروازها:", error);
    }
  };

  return (
    <div
      className={`bg-white rounded-[32px] px-6 py-3 md:flex hidden gap-4 w-[1100px] mx-auto items-center justify-between h-20 shadow-md ${
        hasParams ? "flex-row-reverse" : ""
      }`}
    >
      <Button
        className="bg-gray-800  items-center justify-center text-white w-10 h-10 rounded-full hover:bg-gray-700"
        aria-label="Search flights"
        size={"icon"}
        onClick={handleSearch}
        disabled={
          isPending ||
          !selectedFromLocation ||
          !selectedDestinationLocation ||
          !date
        }
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
      <ReturnTicket returnDate={returnDate} setReturnDate={setReturnDate} />
      <div ref={dateRef}>
        <DatePicker 
          date={date} 
          setDate={setDate} 
          onDateSelect={handleDateSelect}
          isOpen={isDateOpen}
          onOpenChange={setIsDateOpen}
        />
      </div>
      <div ref={destinationRef}>
        <Location
          title="انتخاب مقصد"
          icon={<ArrowDown12Regular />}
          location={destinationLocation}
          setLocation={setDestinationLocation}
          selectedLocation={selectedDestinationLocation}
          setSelectedLocation={setSelectedDestinationLocation}
          iconColor={<ArrowDown12Regular color="#EA443F" />}
          setIsCity={setIsDestinationCity}
          onLocationSelect={handleDestinationSelect}
          isOpen={isDestinationOpen}
          onOpenChange={setIsDestinationOpen}
        />
      </div>
      <div ref={originRef}>
        <Location
          title="انتخاب مبدا"
          icon={<ArrowUp12Regular />}
          location={fromLocation}
          setLocation={setFromLocation}
          selectedLocation={selectedFromLocation}
          setSelectedLocation={setSelectedFromLocation}
          iconColor={<ArrowUp12Regular color="#EA443F" />}
          setIsCity={setIsOriginCity}
          onLocationSelect={handleOriginSelect}
          isOpen={isOriginOpen}
          onOpenChange={setIsOriginOpen}
        />
      </div>
    </div>
  );
}

export { AirplaneSearch };
