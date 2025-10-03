import Image from "next/image";
import { getAirlineLogo } from "@/lib/airlineLogos";

interface FlightAirlineInfoProps {
  AirlineNameFa: string;
}

function FlightAirlineInfoMobile({ AirlineNameFa }: FlightAirlineInfoProps) {
  const logoPath = getAirlineLogo(AirlineNameFa);

  return (
    <div className="flex items-center gap-2 mt-3">
      {logoPath && (
        <Image
          src={logoPath}
          alt={`${AirlineNameFa} logo`}
          width={30}
          height={30}
          className="object-contain"
        />
      )}
      <p className="text-sm font-300">{AirlineNameFa}</p>
    </div>
  );
}

export { FlightAirlineInfoMobile };
