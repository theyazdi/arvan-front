"use client";
import {
  AirllineFilter,
  DurationFilter,
  PriceFilter,
  StopFilter,
} from "@/app/tickets/components/index";

export interface FilterSidebarProps {
  price: number[];
  setPrice: (value: number[]) => void;
  duration: number;
  setDuration: (value: number) => void;
  selectedAirlines: string[];
  setSelectedAirlines: (value: string[]) => void;
  stopFilter: string;
  setStopFilter: (value: string) => void;
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

export function FilterSidebar({
  price,
  setPrice,
  duration,
  setDuration,
  selectedAirlines,
  setSelectedAirlines,
  stopFilter,
  setStopFilter,
}: FilterSidebarProps) {
  return (
    <div className="md:col-span-3  hidden md:block">
      <div className="bg-white p-6 rounded-2xl shadow-md sticky top-6 self-start z-10 max-h-screen overflow-y-auto scrollbar-left">
        <div className="flex items-center gap-2">
          <span className="i-fluent:filter-24-regular w-6 h-6"></span>
          <span className="text-lg font-medium">فیلتر</span>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <PriceFilter price={price} setPrice={setPrice} />
          <hr className="mt-6" />
          <StopFilter stopFilter={stopFilter} setStopFilter={setStopFilter} />
          <hr className="mt-6" />
          <DurationFilter duration={duration} setDuration={setDuration} />
          <hr className="mt-6" />
          <AirllineFilter
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
          />
        </div>
      </div>
    </div>
  );
}
