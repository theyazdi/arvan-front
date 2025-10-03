import { FlightTimelineMobile } from "./flighttimelinemobile";
interface FlightCardDetailsProps {
    duration: string;
    stops: string;
  }
function FlightCardDetails({
  duration,
  stops,
}: FlightCardDetailsProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1 text-[#757575] text-sm">
        <span className="font-medium">{duration}</span>
        <div className="w-1 h-1 bg-[#757575] rounded-full"></div>
        {stops === "Direct" ? "مستقیم" : "توقف"}
      </div>
      <FlightTimelineMobile />
    </div>
  );
}

export { FlightCardDetails };