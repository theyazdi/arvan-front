import { WizardProvider } from "@/hooks";
import { getFlightOffer } from "./action/flightoffer";
import { cookies } from "next/headers";
import { SecondaryNavbar } from "@/components/ui/secondary-navbar";
import { PaymentLayoutMobile, PaymentLayout } from "@/app/details";

export interface FlightSegment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  flightNumber: string;
  departureAirport: {
    AirportName: string;
  };
  arrivalAirport: {
    AirportName: string;
  };
}

export interface Itinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface Price {
  grandTotal: number;
  currency: string;
}

export interface BaggageAllowance {
  UnitOfMeasure: string;
  UnitOfMeasureCode: string;
  UnitOfMeasureQuantity: string;
}

export interface AirItinerary {
  SessionId: string;
  CombinationId: number;
  RecommendationId: number;
  SubsystemId: number;
  SubsystemName: string;
}

export interface FlightOffer {
  AirItinerary: AirItinerary[];
  id: string;
  itineraries: Itinerary[];
  price: Price;
  remainingSeats: number;
  baggageAllowance: BaggageAllowance;
  AirlineNameFa: string;
}

export type FlightOfferResults = FlightOffer[];

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    offerId: string;
    origin: string;
    destination: string;
    departure_date: string;
    adults: number;
    page: number;
    page_size: number;
  }>;
}) {
  const params = await searchParams;
  const id = params.offerId;
  const origin = params.origin;
  const destination = params.destination;
  const adults = params.adults;
  const departure_date = params.departure_date;

  const flightOffer = await getFlightOffer(id, {
    origin,
    destination,
    departure_date,
    adults: Number(adults) || 1,
    page: Number(params.page) || 1,
    page_size: Number(params.page_size) || 10,
  });

  const airlineNameFa = flightOffer.AirlineNameFa;
  const flightItinerary: FlightSegment[] = flightOffer.itineraries[0].segments;
  const duration = flightOffer.itineraries[0].duration;
  const token = (await cookies()).get("arvan_access")?.value;
  const flightNumber = flightOffer.itineraries[0].segments[0].flightNumber;
  const {
    travelerPricing,
    price: { grandTotal: grandTotal },
  } = flightOffer;
  const unitOfMeasureQuantity =
    flightOffer.baggageAllowance.UnitOfMeasureQuantity;
  return (
    <>
      <SecondaryNavbar />
      <WizardProvider totalSteps={4} initialStep={0}>
        <PaymentLayoutMobile
          flightItinerary={flightItinerary}
          travellers={travelerPricing}
          grandTotal={grandTotal}
          AirlineNameFa={airlineNameFa}
          duration={duration.toString()}
          unitOfMeasureQuantity={unitOfMeasureQuantity}
          token={token}
          AirItinerary={flightOffer.AirItinerary}
        />
      </WizardProvider>
      <WizardProvider totalSteps={5} initialStep={1}>
        <PaymentLayout
          flightItinerary={flightItinerary}
          destination={destination}
          from={origin}
          duration={duration.toString()}
          adults={adults}
          departure_date={departure_date}
          offerId={id}
          grandTotal={grandTotal}
          travellers={travelerPricing}
          airlineNameFa={airlineNameFa}
          token={token}
          flightNumber={flightNumber}
          AirItinerary={flightOffer.AirItinerary}
        />
      </WizardProvider>
    </>
  );
}

export default page;
