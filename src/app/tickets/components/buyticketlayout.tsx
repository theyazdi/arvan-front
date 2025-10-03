"use client";
import { StepNavigator } from "@/components/ui/stepNavigator";
import { useWizard } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { FlightTicketList } from "@/app/tickets/components";

function BuyTicketLayout() {
  const { currentStep, totalSteps, goToStep, prevStep } = useWizard();
  const searchParams = useSearchParams();
  const params: any = {
    origin: searchParams.get("origin") || "",
    destination: searchParams.get("destination") || "",
  };
  const steps = [
    {
      title: `بلیط رفت ${params.origin}`,
      number: 1,
      key: "round-trip-ticket",
      icon: (
        <span className="i-fluent:airplane-24-regular h-4 w-4 text-[#EA443F] rotate-180"></span>
      ),
      iconFilled: (
        <span className="i-fluent:airplane-24-filled h-4 w-4 text-red-500 rotate-180"></span>
      ),
    },
    {
      title: `بلیط های انتخاب شده`,
      number: 2,
      key: "selected-tickets",
      icon: (
        <span className="i-fluent:document-checkmark-24-regular h-4 w-4 text-gray-900"></span>
      ),
      iconFilled: (
        <span className="i-fluent:document-checkmark-24-regular h-4 w-4 text-red-500"></span>
      ),
    },
    {
      title: "اطلاعات پرداخت",
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
        <span className="i-fluent:wallet-credit-card-24-filled w-4 text-red-500"></span>
      ),
    },
  ];

  return (
    <div className="px-6">
      <StepNavigator
        model="ticket"
        title="مراحل"
        currentStep={currentStep}
        onBack={prevStep}
        steps={steps}
        totalSteps={totalSteps}
        goToStep={goToStep}
      />
      <div className="md:mt-6">
        <FlightTicketList />,
      </div>
    </div>
  );
}

export { BuyTicketLayout };
