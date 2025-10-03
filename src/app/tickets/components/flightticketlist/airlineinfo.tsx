import Image from "next/image";
import { getAirlineLogo } from "@/lib/airlineLogos";

interface AirlineInfoProps {
  AirlineNameFa: string;
}

function AirlineInfo({ AirlineNameFa }: AirlineInfoProps) {
  const logoPath = getAirlineLogo(AirlineNameFa);

  return (
    <div className="flex flex-col gap-2 items-center">
      <Image
        src={logoPath}
        alt={`${AirlineNameFa} Logo`}
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="text-gray text-xs">{AirlineNameFa}</span>
    </div>
  );
}

export { AirlineInfo };
