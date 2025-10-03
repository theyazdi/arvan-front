import { FlightSegment } from "../../page";
import { formatPersianDateTime } from "@/lib/formatpersiandatetime";

function SegmentDetails({ segment }: { segment: FlightSegment }) {
  return (
    <div className="flex flex-col gap-9">
      {/* Departure */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{segment.departure.iataCode}</span>
          <div className="w-[1px] h-5 bg-gray"></div>
          <span className="text-sm">
            {segment.departureAirport.AirportName}
          </span>
        </div>
        <span className="text-gray text-xs">
          {formatPersianDateTime(segment.departure.at)}
        </span>
      </div>
      {/* Arrival */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{segment.arrival.iataCode}</span>
          <div className="w-[1px] h-5 bg-gray"></div>
          <span className="text-sm">{segment.arrivalAirport.AirportName}</span>
        </div>
        <span className="text-gray text-xs">
          {formatPersianDateTime(segment.arrival.at)}
        </span>
      </div>
    </div>
  );
}

export { SegmentDetails };
