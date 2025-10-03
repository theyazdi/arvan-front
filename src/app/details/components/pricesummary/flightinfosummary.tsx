// components/price-summary/FlightInfoSummary.tsx
import React from "react";
import { FlightSegment as IFlightSegment } from "@/app/details/page";
import { formatPersianDateTime } from "@/lib/formatpersiandatetime";

interface Props {
  flightItinerary: IFlightSegment[];
  travellerCount: number;
}

function FlightInfoSummary({ flightItinerary, travellerCount }: Props) {
  return (
    <div className="rounded-2xl bg-gray-1 p-6 flex flex-col gap-8">
      <div className="flex items-start gap-2">
        <span className="i-fluent:calendar-24-regular h-6 w-6 text-[#EA443F]"></span>
        <div className="flex flex-col gap-1">
          <span className="font-medium">پرواز رفت</span>
          {flightItinerary.length > 0 && (
            <p className="text-gray font-medium text-sm">
              {flightItinerary[0].departure.iataCode} به{" "}
              {flightItinerary[flightItinerary.length - 1].arrival.iataCode} -{" "}
              {formatPersianDateTime(flightItinerary[0].departure.at)}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className="i-fluent:person-24-regular h-6 w-6 text-[#EA443F]"></span>
        <div className="flex flex-col gap-1">
          <span className="font-medium">مسافران</span>
          <span>{travellerCount} بزرگسال</span>
        </div>
      </div>
    </div>
  );
}

export {FlightInfoSummary}