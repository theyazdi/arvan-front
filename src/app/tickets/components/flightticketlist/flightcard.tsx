"use client";
import { Flight } from "../../action";
import {
  AirlineInfo,
  FlightTimeline,
  FlightTime,
  FlightActions,
  FlightPriceBox,
  FlightBaggageInfo,
} from "@/app/tickets/components";

interface FlightCardProps {
  flight: Flight;
  index: number;
}

function FlightCard({ flight, index }: FlightCardProps) {
  return (
    <div
      className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 hidden md:block"
      key={index}
      dir="rtl"
    >
      <div className="flex items-center justify-center gap-20">
        <AirlineInfo AirlineNameFa={flight.AirlineNameFa} />

        <div className="flex items-center gap-3 flex-row-reverse">
          <FlightTime time={flight.arrivalTime} city={flight.arrivalCity} />
          <FlightTimeline
            duration={flight.duration}
            stopInfo={flight.stopInfo}
          />
          <FlightTime time={flight.departureTime} city={flight.departureCity} />
        </div>

        <FlightBaggageInfo UnitOfMeasureQuantity={flight.baggageAllowance?.UnitOfMeasureQuantity ?? ""} />
        <div className="w-px h-33 bg-gray-300"></div>
        <div className="mt-10">
          <FlightPriceBox
            price={flight.price}
            offerId={flight.offerId}
            remainingSeats={flight.remainingSeats ?? 0}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-start">
        <FlightActions />
      </div>
    </div>
  );
}

export { FlightCard };
