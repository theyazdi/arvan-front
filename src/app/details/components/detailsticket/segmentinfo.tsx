import { FlightSegment } from "../../page";

interface SegmentInfoProps {
  airlineNameFa : string,
  flightNumber : string,
  segments: FlightSegment;
}

function SegmentInfo({airlineNameFa , flightNumber , segments} : SegmentInfoProps) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-48">
        <span className="text-sm">فرودگاه</span>
        <span className="text-sm text-gray text-left">{segments.departureAirport.AirportName}</span>
        <span className="text-sm">بار مجاز</span>
        <span className="text-sm text-gray text-left">۲۰ کیلوگرم</span>
        <span className="text-sm">کلاس پرواز</span>
        <span className="text-sm text-gray text-left">اقتصادی</span>
        <span className="text-sm">ایرلاین</span>
        <span className="text-sm text-gray text-left">{airlineNameFa}</span>
        <span className="text-sm">شماره پرواز</span>
        <span className="text-sm text-gray text-left">{flightNumber}</span>
      </div>
    </div>
  );
}

export { SegmentInfo };
