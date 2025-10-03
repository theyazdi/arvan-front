"use client";
import { Button } from "@/components/ui";
import { FlightSegment as IFlightSegment } from "@/app/details/page";
import { TravellersInfo , FlightInfoSummaryMobile} from "@/app/details/index";


interface PriceSummaryHeaderProps {
  flightItinerary: IFlightSegment[];
  origin: string | null;
  destination: string | null;
  adults: string | null;
}

function PriceSummaryHeader({ flightItinerary, origin, destination, adults }: PriceSummaryHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <FlightInfoSummaryMobile flightItinerary={flightItinerary} origin={origin} destination={destination} />
      <TravellersInfo adults={adults} />
      <Button variant={"outline"} className="text-xs flex items-center gap-2 mt-2">
        <span className="i-fluent:edit-24-regular"></span>
        ویرایش بلیت ها
      </Button>
    </div>
  );
}

export { PriceSummaryHeader };