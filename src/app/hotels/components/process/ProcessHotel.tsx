"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StepNavigator } from "@/components/ui/stepNavigator";
import { VerticalStepNavigator } from "@/components/ui/verticalStepNavigator";
import { useSearchParams } from "next/navigation";

interface ProcessHotelProps {
  steps: string[];
  currentStep: number;
  searchParams: Record<string, string | undefined>;
}

export const ProcessHotel = ({ steps, currentStep, searchParams }: ProcessHotelProps) => {
  const [loading, setLoading] = useState(true);
  const searchParamsHook = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const city = searchParams.city || searchParamsHook.get("city") || "تهران";

  const hotelSteps = [
    {
      title: `هتل ها`,
      number: 1,
      key: "hotel-selection",
      icon: (
        <span className="i-fluent:building-24-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:building-24-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "انتخاب اتاق",
      number: 2,
      key: "room-selection",
      icon: (
        <span className="i-fluent:bed-24-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:bed-24-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "اطلاعات مسافرها",
      number: 3,
      key: "payment-information",
      icon: (
        <span className="i-fluent:person-info-16-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:person-info-16-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "پرداخت",
      number: 4,
      key: "payment",
      icon: (
        <span className="i-fluent:wallet-credit-card-16-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:wallet-credit-card-24-filled h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "تایید رزرو",
      number: 5,
      key: "reservation-confirmation",
      icon: (
        <span className="i-fluent:checkmark-circle-16-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:checkmark-circle-16-filled h-4 w-4 text-red-500"></span>
      ),
    },
  ];

  const goToStep = (step: number) => {
  };

  const prevStep = () => {
  };

  if (loading) {
    return (
      <div className="p-5 bg-white rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="flex items-center space-x-4">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index !== 0 && <Skeleton className="h-5 w-5 mr-4" />}
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <StepNavigator
          model="hotel"
          title="مراحل"
          currentStep={currentStep - 1}
          onBack={prevStep}
          steps={hotelSteps}
          totalSteps={5}
          goToStep={goToStep}
        />
      </div>
      
      {/* Mobile View - Vertical Layout */}
      <div className="block md:hidden">
        <VerticalStepNavigator
          model="hotel"
          title="مراحل"
          currentStep={currentStep - 1}
          onBack={prevStep}
          steps={hotelSteps}
          totalSteps={5}
          goToStep={goToStep}
        />
      </div>
    </>
  );
}; 