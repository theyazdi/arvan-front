import Image from "next/image";
import { getAirlineLogo } from "@/lib/airlineLogos";
import { ProgressLine } from "./progressline";
import { formatPersianTime } from "@/lib/formatpersiandatetime";
import { Button } from "@/components/ui";
import { formatDuration } from "@/utils";

interface SummaryInfoProps {
  firstFlight: any;
  lastFlight: any;
  from: string;
  to: string;
  duration: string;
  airlineNameFa: string;
}

function SummaryInfo({
  firstFlight,
  lastFlight,
  from,
  to,
  duration,
  airlineNameFa,
}: SummaryInfoProps) {
  const logoPath = getAirlineLogo(airlineNameFa);

  return (
    <div className="flex items-center justify-between w-full mt-5">
      <div className="flex items-center gap-12">
        {logoPath && (
          <Image
            alt={`${airlineNameFa} logo`}
            src={logoPath}
            width={40}
            height={40}
            className="object-contain"
          />
        )}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium">
              {formatPersianTime(firstFlight.departure.at)}
            </span>
            <span className="text-xs">{from}</span>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-xs text-gray">
              {formatDuration(duration)}
            </span>
            <ProgressLine />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-medium">
              {formatPersianTime(lastFlight.arrival.at)}
            </span>
            <span className="text-xs">{to}</span>
          </div>
        </div>
      </div>
      <Button
        variant={"outline"}
        className="rounded-lg px-4 py-6 flex items-center gap-2"
      >
        <span className="i-fluent:edit-24-regular"></span>
        تغییر بلیط
      </Button>
    </div>
  );
}
export { SummaryInfo };
