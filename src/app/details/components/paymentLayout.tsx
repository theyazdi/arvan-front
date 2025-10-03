"use client";
import { StepNavigator } from "@/components/ui/stepNavigator";
import { useWizard } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import {
  PriceSummary,
  FlightDetails,
  PassengersFormData,
  PassengersForm,
  PaymentForm,
} from "@/app/details/index";
import { AirItinerary, FlightSegment } from "../page";
import { useAuth } from "@/app/(auth)";
import { API_BASE_URL } from "@/lib/fetch";
import { postRefId } from "@/lib/postrefid";
import { redirectToPaymentGateway } from "@/lib/paymentGateway";

interface PaymentLayoutProps {
  flightItinerary: FlightSegment[];
  destination: string;
  from: string;
  duration: string;
  departure_date: string;
  offerId: string;
  adults: number;
  grandTotal: number;
  travellers: [];
  airlineNameFa: string;
  token?: string;
  flightNumber: string;
  AirItinerary: AirItinerary[];
}

interface Passenger {
  birthday: string;
  gender: string;
  passportName: string;
  passportFamilyName: string;
  passportCountry: string;
  passportNumber: string;
  passportIssueDate: string;
  email: string;
}

export interface AirTraveler {
  PersonName: {
    GivenName: string;
    NamePrefix: string;
    Surname: string;
  };
  Document: {
    DocIssueCountry: string;
  };

  BirthDate: string;
  PassengerTypeCode: string;
}

export interface GatewayToken {
  gateway_token: {
    code: number;
    content: string;
  };
}

function PaymentLayout({
  flightItinerary,
  destination,
  from,
  duration,
  adults,
  grandTotal,
  travellers,
  airlineNameFa,
  token,
  flightNumber,
  AirItinerary,
}: PaymentLayoutProps) {
  const {
    currentStep,
    totalSteps,
    prevStep,
    nextStep,
    setStepData,
    goToStep,
    data,
  } = useWizard();
  const searchParams = useSearchParams();
  const { isLoggedIn } = useAuth();
  const [formMethods, setFormMethods] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [gatewayToken, setGatewayToken] = useState<GatewayToken>();

  const params = {
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
        <span className="i-fluent:document-checkmark-24-filled h-4 w-4 text-red-500"></span>
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
        <span className="i-fluent:wallet-credit-card-24-filled w-4 text-red-500"></span>
      ),
    },
  ];

  const handelPayment = useCallback(() => {
    if (currentStep === 1) {
      nextStep();
    } else if (currentStep === 2) {
      if (!isLoggedIn) {
        setOpen(true);
        return;
      }
      if (formMethods) {
        formMethods.handleSubmit(async (passengers: PassengersFormData) => {
          const airItinerary: AirItinerary[] = AirItinerary;
          const formvalues = formMethods.getValues();

          if (passengers && passengers.adults) {
            const processedPassengers: AirTraveler[] = passengers.adults.map(
              (passenger) => ({
                PersonName: {
                  GivenName: passenger.passportName,
                  NamePrefix: passenger.gender,
                  Surname: passenger.passportFamilyName,
                },
                Document: {
                  DocIssueCountry: passenger.passportCountry,
                },
                BirthDate: passenger.birthday,
                PassengerTypeCode: passenger.passportCountry,
              })
            );

            try {
              // Get auth token from localStorage or use passed token
              const authToken = typeof window !== 'undefined' ? localStorage.getItem('arvan_access') : token;
              
              if (!authToken) {
                throw new Error("Authentication token not found");
              }

              const response = await fetch(
                `${API_BASE_URL}/flight/order-create/`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                  },
                  body: JSON.stringify({
                    AirItinerary: airItinerary,
                    AirTraveler: processedPassengers,
                  }),
                }
              );

              const responseData = await response.json();
              setGatewayToken(responseData);
              
              // Redirect to payment gateway
              if (responseData.payment && responseData.payment.gateway_url) {
                const refId = responseData.payment.gateway_url.split('RefId=')[1];
                if (refId) {
                  redirectToPaymentGateway(refId);
                }
              }
            } catch (error) {
              console.error("Payment order creation failed:", error);
            }
          }

          setStepData("passengers", passengers);
          nextStep();
        })();
      }
    } else if (currentStep === 3 && gatewayToken) {
      postRefId(gatewayToken.gateway_token.content);
    } else {
      nextStep();
    }
  }, [
    currentStep,
    nextStep,
    isLoggedIn,
    formMethods,
    token,
    setStepData,
    gatewayToken,
  ]);
  const selectedStepMap = () => {
    const stepMap: Record<string, React.ReactNode> = {
      "1": (
        <FlightDetails
          flightDeparture={{ destination, from, model: "پرواز رفت" }}
          flightItinerary={flightItinerary}
          duration={duration}
          airlineNameFa={airlineNameFa}
          flightNumber={flightNumber}
        />
      ),
      "2": (
        <PassengersForm
          onSubmit={() => handelPayment()}
          setFormMethods={setFormMethods}
          travellers={travellers}
          open={open}
          setOpen={setOpen}
          token={token}
        />
      ),
      "3": <PaymentForm />,
    };
    return stepMap[currentStep.toString()];
  };
  return (
    <div className="container mx-auto md:block hidden">
      <div className="flex px-4 py-6 gap-6">
        <div className="w-2/3 flex flex-col gap-6">
          <StepNavigator
            model="ticket"
            title="مراحل"
            currentStep={currentStep}
            goToStep={goToStep}
            onBack={prevStep}
            steps={steps}
            totalSteps={totalSteps}
          />
          <div className="bg-white px-12 py-8 shadow-lg rounded-2xl h-fit">
            {selectedStepMap()}
          </div>
        </div>
        <div className="w-1/3 bg-white p-6 shadow-lg rounded-2xl h-fit">
          <PriceSummary
            nextStep={handelPayment}
            destination={destination}
            from={from}
            adults={adults}
            grandTotal={grandTotal}
            travellers={travellers}
            flightItinerary={flightItinerary}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}

export { PaymentLayout };
