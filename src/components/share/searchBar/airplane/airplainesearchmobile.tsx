"use client";
import {
  LocationMobile,
  Location as LocationType,
  DatePickerMobile,
  TravelersMobile,
} from "@/components/share/searchBar";
import { Button } from "@/components/ui";
import { Add12Regular, Dismiss16Regular } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

function AirplaneSearchMobile() {
  const router = useRouter();
  const [fromLocation, setFromLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [isFromCity, setIsFromCity] = useState(false);
  const [isDestinationCity, setIsDestinationCity] = useState(false);
  const [selectedFromLocation, setSelectedFromLocation] =
    useState<LocationType | null>(null);
  const [selectedDestinationLocation, setSelectedDestinationLocation] =
    useState<LocationType | null>(null);
  const [isPending, startTransition] = useTransition();

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
        origin: selectedFromLocation?.iataCode || "LON",
        destination: selectedDestinationLocation?.iataCode || "PAR",
        departure_date: formatDate(date) || "",
        adults: effectiveAdultCount.toString(),
        page: "1",
        is_orgin_city: isFromCity.toString(),
        is_destination_city: isDestinationCity.toString(),
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
    <div className="flex flex-col gap-6 md:hidden w-full">
      <LocationMobile
        title="انتخاب مبدا"
        icon={<span className="i-fluent:arrow-sort-up-24-regular"></span>}
        setLocation={setFromLocation}
        location={fromLocation}
        selectedLocation={selectedFromLocation}
        setSelectedLocation={setSelectedFromLocation}
        setIsCity={setIsFromCity}
      />
      <LocationMobile
        title="انتخاب مقصد"
        icon={<span className="i-fluent:arrow-sort-down-24-regular"></span>}
        setLocation={setDestinationLocation}
        location={destinationLocation}
        selectedLocation={selectedDestinationLocation}
        setSelectedLocation={setSelectedDestinationLocation}
        setIsCity={setIsDestinationCity}
      />
      <DatePickerMobile date={date} setDate={setDate} title="تاریخ رفت" />
      {!returnDate ? (
        <div
          className="flex items-center justify-start cursor-pointer gap-2 rounded-full px-4 py-3  hover:bg-gray-50 transition-all duration-300 ease-in-out w-full"
          style={{
            border: "2px dotted #d1d5db",
            borderSpacing: "10px",
            borderStyle: "dotted",
            borderWidth: "2px",
            borderColor: "#d1d5db",
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 4px 4px",
          }}
          dir="rtl"
          onClick={() => setReturnDate(new Date())}
        >
          <Button
            className="border  h-4 w-4 p-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 ease-in-out"
            variant={"outline"}
            onClick={() => setReturnDate(new Date())}
          >
            <Add12Regular className="text-gray-500" color="#EA443F" />
          </Button>
          <p className="text-sm text-gray-500">سفر برگشت</p>
        </div>
      ) : (
        <div
          className="flex items-start gap-2 justify-between px-4 py-3 rounded-lg"
          style={{
            border: "2px dotted #d1d5db",
            borderSpacing: "10px",
            borderStyle: "dotted",
            borderWidth: "2px",
            borderColor: "#d1d5db",
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 4px 4px",
          }}
        >
          <DatePickerMobile
            title="تاریخ برگشت"
            date={returnDate}
            setDate={(date: Date | undefined) => setReturnDate(date)}
          />
          <Button
            className="border h-2 w-2 p-3 rounded-full flex items-center justify-center hover:bg-red-50 transition-all duration-300 ease-in-out group"
            variant={"destructive"}
            onClick={() => setReturnDate(undefined)}
          >
            <Dismiss16Regular className="text-white group-hover:text-[#EA443F] transition-colors duration-300" />
          </Button>
        </div>
      )}
      <TravelersMobile
        adultCount={adultCount}
        setAdultCount={setAdultCount}
        childCount={childCount}
        setChildCount={setChildCount}
        infantCount={infantCount}
        setInfantCount={setInfantCount}
      />
      <Button
        className="flex items-center gap-2"
        size={"lg"}
        onClick={handleSearch}
        disabled={
          isPending ||
          !selectedFromLocation ||
          !selectedDestinationLocation ||
          !date
        }
      >
        {isPending ? "در حال جستجو..." : "جستجو پرواز"}
        <span className="i-fluent:search-24-regular"></span>
      </Button>
    </div>
  );
}

export { AirplaneSearchMobile };
