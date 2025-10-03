"use client";
import {
  AirTraveler,
  FlightDetailsMobile,
  GatewayToken,
  PassengersForm,
  PassengersFormData,
  PaymentFormMobile,
  PriceSummaryMobile,
} from "@/app/details";
import { StepNavigatorMobile } from "@/components/ui/stepnavigatormobile";
import { useWizard } from "@/hooks";
import { AirItinerary, FlightSegment } from "../page";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/app/(auth)/authProvider";
import { postRefId } from "@/lib/postrefid";
import { API_BASE_URL } from "@/lib";
import { redirectToPaymentGateway } from "@/lib/paymentGateway";

interface PaymentLayoutMobileProps {
  flightItinerary: FlightSegment[];
  travellers: [];
  grandTotal: number;
  AirlineNameFa: string;
  duration: string;
  unitOfMeasureQuantity: string;
  token?: string;
  AirItinerary: AirItinerary[];
}

function PaymentLayoutMobile({
  flightItinerary,
  travellers,
  grandTotal,
  AirlineNameFa,
  duration,
  unitOfMeasureQuantity,
  token,
  AirItinerary,
}: PaymentLayoutMobileProps) {
  const { currentStep, goToStep, nextStep, setStepData } = useWizard();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const { isLoggedIn } = useAuth();
  const [formMethods, setFormMethods] = useState<any>(null);
  const [gatewayToken, setGatewayToken] = useState<GatewayToken>();
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const origin = params.get("origin");
  const destination = params.get("destination");
  const adults = params.get("adults");
  const steps = [
    {
      title: `بلیط های انتخاب شده`,
      number: 0,
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
      number: 1,
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
      number: 2,
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
      number: 3,
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
    if (currentStep === 0) {
      nextStep();
    } else if (currentStep === 1) {
      if (!isLoggedIn) {
        setOpen(true);
        return;
      }
      if (formMethods) {
        formMethods.handleSubmit(async (passengers: PassengersFormData) => {
          const airItinerary: AirItinerary[] = AirItinerary;

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
              console.error("خطا در ارسال درخواست:", error);
            }
          }

          setStepData("passengers", passengers);
          nextStep();
        })();
      }
    } else if (currentStep === 2 && gatewayToken) {
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

  const stepMap: Record<number, React.ReactNode> = {
    0: (
      <FlightDetailsMobile
        origin={origin || ""}
        destination={destination || ""}
        AirlineNameFa={AirlineNameFa}
        flightItinerary={flightItinerary}
        duration={duration}
        unitOfMeasureQuantity={unitOfMeasureQuantity}
      />
    ),
    1: (
      <PassengersForm
        onSubmit={() => handelPayment()}
        setFormMethods={setFormMethods}
        travellers={travellers}
        open={open}
        setOpen={setOpen}
        token={token}
      />
    ),
    2: (
      <PaymentFormMobile
        selectedPayment={selectedPayment}
        onChange={setSelectedPayment}
      />
    ),
    3: <div></div>,
  };
  return (
    <div className="md:hidden mx-5">
      <StepNavigatorMobile
        currentStep={currentStep}
        steps={steps}
        goToStep={goToStep}
      />
      <div
        className={`flex flex-col ${
          currentStep === 2 ? "flex-col-reverse" : ""
        }`}
      >
        {currentStep !== 1 && (
          <PriceSummaryMobile
            flightItinerary={flightItinerary}
            travellers={travellers}
            grandTotal={grandTotal}
            nextStep={handelPayment}
            currentStep={currentStep}
            adults={adults || ""}
            origin={origin || ""}
            destination={destination || ""}
          />
        )}
        <div className="mt-8">{stepMap[currentStep]}</div>
      </div>
    </div>
  );
}

export { PaymentLayoutMobile };
