import { FlightSegment } from "@/app/details/page";
import {
  FlightHeaderMobile,
  FlightAirlineInfoMobile,
  FlightTimelineInfoMobile,
  FlightExtraInfoMobile,
  FlightBaggageRulesMobile,
} from "@/app/details";

interface FlightDetailsMobileProps {
  origin: string;
  destination: string;
  AirlineNameFa: string;
  flightItinerary: FlightSegment[];
  duration: string;
  unitOfMeasureQuantity: string;
}

function FlightDetailsMobile({
  origin,
  destination,
  AirlineNameFa,
  flightItinerary,
  duration,
  unitOfMeasureQuantity,
}: FlightDetailsMobileProps) {
  return (
    <div className="px-2 py-4 bg-white rounded-xl">
      <FlightHeaderMobile origin={origin} destination={destination} />
      <FlightAirlineInfoMobile AirlineNameFa={AirlineNameFa} />
      <FlightTimelineInfoMobile
        origin={origin}
        destination={destination}
        flightItinerary={flightItinerary}
        duration={duration}
      />
      <FlightExtraInfoMobile unitOfMeasureQuantity={unitOfMeasureQuantity} />
      <FlightBaggageRulesMobile />
    </div>
  );
}

export { FlightDetailsMobile };
