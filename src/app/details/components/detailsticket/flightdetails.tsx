import { FlightSegment as IFlightSegment } from "../../page";
import {
  SummaryInfo,
  SegmentList,
  HeaderFlighTicket,
} from "@/app/details/index";

interface flightDeparture {
  destination: string;
  from: string;
  model: "پرواز رفت" | "پرواز برگشت";
}

interface flightArrival {
  destination: string;
  from: string;
  model: "پرواز رفت" | "پرواز برگشت";
}

interface FlightDetailsProps {
  flightDeparture: flightDeparture;
  flightArrival?: flightArrival;
  flightItinerary: IFlightSegment[];
  duration: string;
  airlineNameFa : string
  flightNumber : string
}

function FlightDetails({
  flightDeparture,
  flightItinerary,
  duration,
  airlineNameFa,
  flightNumber
}: FlightDetailsProps) {
  return (
    <div className="w-full" dir="rtl">
      <HeaderFlighTicket flightDeparture={flightDeparture} />
      {flightItinerary.length > 0 && (
        <SummaryInfo
          firstFlight={flightItinerary[0]}
          lastFlight={flightItinerary[flightItinerary.length - 1]}
          from={flightDeparture.from}
          to={flightDeparture.destination}
          duration={duration}
          airlineNameFa={airlineNameFa}
        />
      )}
      <SegmentList segments={flightItinerary} airlineNameFa={airlineNameFa} flightNumber={flightNumber}/>
    </div>
  );
}

export { FlightDetails };
