"use client";
import { useTransition } from "react";
import { Flight } from "../../action";
import { useRouter, useSearchParams } from "next/navigation";

import {
  FlightCardHeader,
  FlightCardRoute,
  FlightCardDetails,
  FlightCardFooter,
} from "../index";

interface FlightCardMobileProps {
  flight: Flight;
}

function FlightCardMobile({ flight }: FlightCardMobileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSelectFlight = () => {
    const params = new URLSearchParams(searchParams);
    params.set("offerId", flight.offerId);
    startTransition(() => {
      router.push(`/details?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white px-3 py-4 rounded-2xl md:hidden">
      <FlightCardHeader airline={flight.AirlineNameFa} />

      <div className="mt-5 flex flex-col items-center justify-center gap-5">
        <FlightCardRoute
          departureTime={flight.departureTime}
          departureCity={flight.departureCity}
          arrivalTime={flight.arrivalTime}
          arrivalCity={flight.arrivalCity}
        />
        <FlightCardDetails duration={flight.duration} stops={flight.stops} />
      </div>

      <hr className="my-5" />

      <FlightCardFooter
        price={flight.price}
        onSelect={handleSelectFlight}
        isPending={isPending}
      />
    </div>
  );
}

export { FlightCardMobile };
