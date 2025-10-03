import Image from "next/image";
import { getAirlineLogo } from "@/lib/airlineLogos";
import {
  SegmentTimeline,
  SegmentDetails,
  SegmentInfo,
  SegmentFacilities,
} from "@/app/details/index";
import { FlightSegment } from "../../page";

interface SegmentItemProps {
  segment: FlightSegment;
  airlineNameFa: string;
  flightNumber: string;
  showVerticalBorder?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

function SegmentItem({
  segment,
  airlineNameFa,
  flightNumber,
  showVerticalBorder,
  isFirst,
  isLast,
}: SegmentItemProps) {
  const logoPath = getAirlineLogo(airlineNameFa);

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-7">
        <div className="flex  items-start flex-col">
          <div className="flex flex-row items-center gap-10">
            {logoPath && (
              <Image
                alt={`${airlineNameFa} logo`}
                src={logoPath}
                width={40}
                height={40}
                className="object-contain"
              />
            )}
            <SegmentTimeline isFirst={isFirst} isLast={isLast} />
          </div>
          {showVerticalBorder && (
            <div
              className="mr-20 "
              style={{
                borderLeft: "2px dashed #ef4444",
                height: "130px",
              }}
            />
          )}
        </div>
        <SegmentDetails segment={segment} />
      </div>
      <div className="flex items-center gap-12">
        <SegmentInfo
          airlineNameFa={airlineNameFa}
          flightNumber={flightNumber}
          segments={segment}
        />
        <div className="w-px h-30 bg-gray"></div>
        <SegmentFacilities />
      </div>
    </div>
  );
}

export { SegmentItem };
