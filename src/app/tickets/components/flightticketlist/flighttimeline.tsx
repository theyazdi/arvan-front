import { StopInfo } from "../../action";

interface FlightTimelineProps {
  duration: string;
  stopInfo: StopInfo[];
}

function FlightTimeline({ duration, stopInfo }: FlightTimelineProps) {
  return (
    <div className="flex flex-col gap-2 items-center w-full -mt-6">
      <span className="text-gray text-xs">{duration}</span>
      <div className="relative w-48 h-0.5 bg-[#F9C7C5]">
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
          <div className="w-2 h-2 border border-[#EA443F] bg-[#EA443F] rounded-full"></div>
        </div>

        {stopInfo.map((_, index) => (
          <div
            key={index}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{
              left: `${((index + 1) * 100) / (stopInfo.length + 1)}%`,
            }}
          >
            <div className="w-1 h-1 border border-[#EA443F] bg-[#EA443F] rounded-full"></div>
          </div>
        ))}

        <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
          <div className="w-2 h-2 border border-[#EA443F] bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { FlightTimeline };
