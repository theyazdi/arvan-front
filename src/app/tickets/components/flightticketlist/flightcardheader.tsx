import Image from "next/image";
import { getAirlineLogo } from "@/lib/airlineLogos";

function FlightCardHeader({ airline }: { airline: string }) {
  const logoPath = getAirlineLogo(airline);

  return (
    <div className="flex items-center justify-between">
      {logoPath && (
        <Image
          src={logoPath}
          alt={`${airline} logo`}
          width={40}
          height={40}
          className="object-contain"
        />
      )}
      <p className="font-300">{airline}</p>
    </div>
  );
}

export { FlightCardHeader };
