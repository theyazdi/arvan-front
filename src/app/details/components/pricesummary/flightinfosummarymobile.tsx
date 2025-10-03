"use client";
import { FlightSegment as IFlightSegment } from "@/app/details/page";

interface FlightInfoProps {
  flightItinerary: IFlightSegment[];
  origin: string | null;
  destination: string | null;
}

function formatPersianDate(date: Date) {
  const weekday = date.toLocaleDateString("fa-IR", { weekday: "long" });
  const day = date.toLocaleDateString("fa-IR", { day: "2-digit" });
  const month = date.toLocaleDateString("fa-IR", { month: "long" });
  const year = date.toLocaleDateString("fa-IR", { year: "numeric" });
  return `${weekday} ${day} ${month} ${year}`;
}

function FlightInfoSummaryMobile({ flightItinerary, origin, destination }: FlightInfoProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="i-fluent:arrow-up-right-24-regular text-[#9EA8C3]"></span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold">پرواز رفت </span>
        <div className="flex items-center gap-2 text-xs text-[#757575]">
          <p>
            پرواز {origin} به {destination} -{" "}
          </p>
          <p>
            {formatPersianDate(new Date(flightItinerary[0].departure.at))}
          </p>
        </div>
      </div>
    </div>
  );
}

export { FlightInfoSummaryMobile };