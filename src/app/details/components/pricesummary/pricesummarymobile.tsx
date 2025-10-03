"use client";
import { useSearchParams } from "next/navigation";
import { FlightSegment as IFlightSegment } from "@/app/details/page";
import { Button } from "@/components/ui";
import { PassengerPriceItem } from "./passengerpriceitem";
import { Traveller } from "./priceSummary";
import { PriceSummaryHeader , FinalPriceSummaryMobile} from "@/app/details/index";

interface PriceSummaryMobileProps {
  flightItinerary: IFlightSegment[];
  travellers: Traveller[];
  grandTotal: number;
  nextStep: () => void;
  currentStep: number;
  adults: string;
  origin: string;
  destination: string;
}

export function PriceSummaryMobile({
  flightItinerary,
  travellers,
  grandTotal,
  nextStep,
  currentStep,
  adults,
  origin,
  destination,
}: PriceSummaryMobileProps) {

  const grandTotalPerSeat = (grandTotal / 10).toFixed(0);
  return (
    <div className={`mt-8 bg-white rounded-2xl px-4 py-5 flex flex-col gap-4 md:hidden ${currentStep === 2 ? "hidden" : ""}`}>
      <PriceSummaryHeader
        flightItinerary={flightItinerary}
        origin={origin}
        destination={destination}
        adults={adults}
      />
      <hr />
      <p className="text-lg font-bold">خلاصه قیمت </p>
      <div className="flex flex-col gap-4 mt-4">
        {travellers.map((traveller, index) => (
          <PassengerPriceItem
            key={index}
            index={index}
            base={traveller.price.base}
            total={traveller.price.total}
          />
        ))}
      </div>
      <hr />
      <FinalPriceSummaryMobile grandTotal={Number(grandTotalPerSeat)} />
      <Button className="rounded-xl" onClick={nextStep}>
        تایید و ادامه خرید
      </Button>
    </div>
  );
}
