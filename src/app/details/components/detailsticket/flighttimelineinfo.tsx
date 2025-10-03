import { FlightSegment } from "@/app/details/page";
import { FlightTimelineMobile } from "@/app/tickets/components";
import { formatPersianTime } from "@/lib/formatpersiandatetime";
import { formatDuration } from "@/utils";

interface FlightTimelineInfoProps {
  origin: string;
  destination: string;
  flightItinerary: FlightSegment[];
  duration: string;
}

function formatPersianDate(date: Date) {
  const weekday = date.toLocaleDateString("fa-IR", { weekday: "long" });
  const day = date.toLocaleDateString("fa-IR", { day: "2-digit" });
  const month = date.toLocaleDateString("fa-IR", { month: "long" });
  const year = date.toLocaleDateString("fa-IR", { year: "numeric" });

  return `${weekday} ${day} ${month} ${year}`;
}

function FlightTimelineInfoMobile({
  origin,
  destination,
  flightItinerary,
  duration,
}: FlightTimelineInfoProps) {
  if (flightItinerary.length === 0) return null;

  return (
    <div className="mt-2 flex flex-col gap-4">
      {/* Departure */}
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold">
          {formatPersianTime(flightItinerary[0].departure.at)}
        </span>
        <span className="text-sm">{origin}</span>
        <span className="text-sm text-[#757575]">
          {formatPersianDate(new Date(flightItinerary[0].departure.at))}
        </span>
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-3 mr-1">
        <FlightTimelineMobile orientation="vertical" />
        <div className="flex items-center gap-1 text-xs text-[#707174]">
          <span>مستقیم</span>
          <div className="w-1 h-1 bg-[#757575] rounded-full"></div>
          <span className="text-sm">{formatDuration(duration)}</span>
        </div>
      </div>

      {/* Arrival */}
      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold">
          {formatPersianTime(
            flightItinerary[flightItinerary.length - 1].arrival.at
          )}
        </span>
        <span className="text-sm">{destination}</span>
        <span className="text-sm text-[#757575]">
          {formatPersianDate(
            new Date(flightItinerary[flightItinerary.length - 1].arrival.at)
          )}
        </span>
      </div>
    </div>
  );
}

export { FlightTimelineInfoMobile };
