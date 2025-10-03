"use client";
import {
  MobilePriceCalendar,
  MobileStepIndicator,
  SearchSection,
  Filltersidbarmobile,
  TicketPurchaseSteps,
  MostPopular,
} from "@/app/tickets/components";
import { useState, useEffect } from "react";
import { FilterSidebar } from "./filtersidebar";
import { useRouter, useSearchParams } from "next/navigation";

type AirlineChoice = { code: string; name: string };
export const airline: AirlineChoice[] = [
  { code: "B9", name: "ایران ایرتور" },
  { code: "ZV", name: "زاگرس ایر" },
  { code: "W5", name: "ماهان ایر" },
  { code: "IR", name: "ایران ایر" },
  { code: "EP", name: "آسمان" },
  { code: "IV", name: "کاسپین ایر" },
  { code: "VR", name: "وارش ایر" },
  { code: "HH", name: "تابان ایر" },
  { code: "I3", name: "آتا ایر" },
  { code: "JI", name: "معراج ایر" },
  { code: "FP", name: "فلای پرشیا" },
  { code: "I3", name: "آتا ایر" },
];

function TicketsWithParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const defaultPrice = 5000000;
  const initialPrice = searchParams.get("max-cost")
    ? [Number(searchParams.get("max-cost")) / 10]
    : [defaultPrice];
  const [price, setPrice] = useState(initialPrice);

  const defaultDuration = 2;
  const initialDuration = searchParams.get("max_duration")
    ? Number(searchParams.get("max_duration"))
    : defaultDuration;
  const [duration, setDuration] = useState(initialDuration);

  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [stopFilter, setStopFilter] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (price[0] === defaultPrice) {
      params.delete("max-cost");
      setOpen(false);
    } else {
      params.set("max-cost", (price[0] * 10).toString());
      setOpen(false);
    }

    if (duration === defaultDuration) {
      params.delete("max_duration");
      setOpen(false);
    } else {
      params.set("max_duration", duration.toString());
      setOpen(false);
    }

    if (selectedAirlines.length > 0) {
      params.set("airline", selectedAirlines.join(","));
      setOpen(false);
    } else {
      params.delete("airline");
    }

    if (stopFilter === "") {
      params.delete("number_of_stops");
      setOpen(false);
    } else {
      params.set("number_of_stops", stopFilter);
      setOpen(false);
    }

    router.replace(`?${params.toString()}`);
  }, [price, duration, selectedAirlines, stopFilter]);

  return (
    <>
      <SearchSection />
      <MobileStepIndicator
        origin={searchParams.get("origin") || ""}
        destination={searchParams.get("destination") || ""}
      />
      <MobilePriceCalendar />
      <div className="md:hidden flex items-center justify-between mx-5 mt-4">
        <Filltersidbarmobile
          price={price}
          setPrice={setPrice}
          duration={duration}
          setDuration={setDuration}
          selectedAirlines={selectedAirlines}
          setSelectedAirlines={setSelectedAirlines}
          stopFilter={stopFilter}
          setStopFilter={setStopFilter}
          open={open}
          setOpen={setOpen}
        />
        <MostPopular />
      </div>
      <div className="grid grid-cols-12 gap-6 md:mt-8 mt-4 md:px-6" dir="rtl">
        <FilterSidebar
          price={price}
          setPrice={setPrice}
          duration={duration}
          setDuration={setDuration}
          selectedAirlines={selectedAirlines}
          setSelectedAirlines={setSelectedAirlines}
          stopFilter={stopFilter}
          setStopFilter={setStopFilter}
          open={open}
          setOpen={setOpen}
        />

        <div className="md:col-span-9 col-span-full md:px-4">
          <TicketPurchaseSteps />
        </div>
      </div>
    </>
  );
}

export { TicketsWithParams };
