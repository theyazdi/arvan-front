import { OriginDestinationInformation } from "./types";
import LogoAirline from "../../../../../public/img/THYAO.IS 1.png";
import Image from "next/image";
import { VerticalProgrec } from "./verticalprogrec";
import { Button } from "@/components/ui";
import { getAirlineLogo } from "@/lib/airlineLogos";

interface FlightInfoProps {
  flightInfo: OriginDestinationInformation;
  totalPrice: string;
}

function FlightInfo({ flightInfo, totalPrice }: FlightInfoProps) {
  const BaggageAllowance =
    flightInfo.FlightSegment[0].MarketingCabin.BaggageAllowance;
  const CabinClassCode = flightInfo.FlightSegment[0].CabinClassCode;
  const FlightNumber =
    flightInfo.FlightSegment[0].OperatingAirline.FlightNumber;
  const logoPath = getAirlineLogo(flightInfo.FlightSegment[0].TPA_Extensions.AirlineNameFa);
  
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[#FAFAFA] rounded-xl py-6 px-8 flex flex-col gap-5">
        <div className="flex items-start gap-2">
          <span className="i-fluent:airplane-24-regular h-6 w-6 mt-1 text-[#EA443F]"></span>
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">پرواز رفت </p>
            <div className="flex flex-col text-[#757575] text-sm font-medium">
              <p>
                {flightInfo.TPA_Extensions.OriginFa} به{" "}
                {flightInfo.TPA_Extensions.DestinationFa} -{" "}
                {flightInfo.DepartureDateJ}
              </p>
              <span>
                بار مجاز {BaggageAllowance.UnitOfMeasureQuantity}
                کیلوگرم
              </span>
              <span>کلاس پرواز {CabinClassCode}</span>
              <span>شماره پرواز {FlightNumber}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-3 items-center">
            {logoPath && (
              <Image 
                src={logoPath} 
                alt={`${flightInfo.FlightSegment[0].TPA_Extensions.AirlineNameFa} logo`} 
                width={40} 
                height={40}
                className="object-contain"
              />
            )}
            <span className="text-xs text-[#757575]">
              {flightInfo.FlightSegment[0].TPA_Extensions.AirlineNameFa}
            </span>
          </div>
          <VerticalProgrec />
          <div className="flex flex-col gap-2 justify-between h-51">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {flightInfo.TPA_Extensions.OriginFa}
                </span>
                <div className="w-px h-5 rounded-full bg-gray-200"></div>
                <span className="text-sm">
                  {flightInfo.FlightSegment[0].DepartureAirport.LocationCode}
                </span>
                <span className="text-sm">
                  {flightInfo.FlightSegment[0].DepartureAirport.AirportName}
                </span>
              </div>
              <p className="text-xs text-[#707174]">
                {flightInfo.FlightSegment[0].TPA_Extensions.DepartureDateJ}{" "}
                {flightInfo.FlightSegment[0].TPA_Extensions.FlightTime}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {flightInfo.TPA_Extensions.DestinationFa}
                </span>
                <div className="w-px h-5 rounded-full bg-gray-200"></div>
                <span className="text-sm">
                  {flightInfo.FlightSegment[0].ArrivalAirport.LocationCode}
                </span>
                <span className="text-sm">
                  {flightInfo.FlightSegment[0].ArrivalAirport.AirportName}
                </span>
              </div>
              <p className="text-xs text-[#707174]">
                {flightInfo.FlightSegment[0].TPA_Extensions.ArrivalDateJ}{" "}
                {flightInfo.FlightSegment[0].TPA_Extensions.ArrivalTime}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 text-lg font-medium">
          <p>قیمت پرداخت شده</p>
          <p>{Number(totalPrice).toLocaleString("fa-IR")} تومان</p>
        </div>
        <Button className="flex items-center gap-2 bg-[#33363B] text-white py-3 px-8 rounded-lg">
          <span className="i-fluent:arrow-download-24-regular"></span>
          دانلود بلیط
        </Button>
      </div>
    </div>
  );
}

export { FlightInfo };
