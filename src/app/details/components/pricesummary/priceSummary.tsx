// components/price-summary/PriceSummary.tsx
"use client";
import { Button } from "@/components/ui";
import React, { useState } from "react";
import { FlightSegment as IFlightSegment } from "@/app/details/page";
import {
  FlightInfoSummary,
  PassengerPriceItem,
  PaymentMethodSelector,
} from "@/app/details/index";

export interface Traveller {
  price: {
    total: number;
    base: number;
  };
}

interface PriceSummaryProps {
  nextStep: () => void;
  from: string;
  destination: string;
  adults: number;
  grandTotal: number;
  travellers: Traveller[];
  flightItinerary: IFlightSegment[];
  currentStep: number;
}

function PriceSummary({
  nextStep,
  travellers,
  flightItinerary,
  currentStep,
  grandTotal,
}: PriceSummaryProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const grandTotalPerSeat = (grandTotal / 10).toFixed(0);
  return (
    <div dir="rtl">
      <FlightInfoSummary
        flightItinerary={flightItinerary}
        travellerCount={travellers.length}
      />

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="text-2xl font-bold">خلاصه قیمت</h3>
        {travellers.map((traveller, index) => (
          <PassengerPriceItem
            key={index}
            index={index}
            base={traveller.price.base}
            total={traveller.price.total}
          />
        ))}
        <div className="w-full h-px bg-gray-2 my-4"></div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">قیمت نهایی</h3>
          <span className="text-xl font-bold">
            {Number(grandTotalPerSeat).toLocaleString("fa-IR")} تومان
          </span>
        </div>
        {currentStep === 3 && (
          <PaymentMethodSelector
            selectedPayment={selectedPayment}
            onChange={setSelectedPayment}
          />
        )}
      </div>

      <Button className="rounded-lg mt-8 w-full" onClick={nextStep}>
        تایید و ادامه خرید
      </Button>
    </div>
  );
}

export { PriceSummary };
