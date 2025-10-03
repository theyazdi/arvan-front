"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib";
import { FlightOrder } from "./types";
import {
  FlightInfo,
  ContactInfoSection,
  TravelerDropdown,
  TravelerInfo,
} from "@/app/dashboard/components";
import { LoadingSpinner } from "@/components/ui";

function FlightContent({ token }: { token: string }) {
  const [flightOrder, setFlightOrder] = useState<FlightOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFlightOrder = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/panel/order/?order_type=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setFlightOrder(data);
    } catch (error) {
      console.error("Error fetching flight orders:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFlightOrder();
  }, [token]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const renderOrderContent = (order: FlightOrder, index: number) => {
    const { offer_data, status } = order;
    const { Passengers, OriginDestinationInformation, TotalPrice } = offer_data;

    if (status === 1) {
      return (
        <div key={index} className="text-center py-8 text-gray-500">
          اطلاعاتی یافت نشد
        </div>
      );
    }

    if (status === 2) {
      return (
        <div className="flex flex-col gap-6" key={index}>
          <ContactInfoSection
            email={Passengers[0]?.Email}
            phoneNumber={Passengers[0]?.Mobile}
          />
          <div className="flex items-center gap-6">
            <TravelerDropdown
              title="اطلاعات مسافرین"
              icon="i-fluent:receipt-sparkles-24-regular"
            >
              <div>
                {Passengers.map((passenger, passengerIndex) => (
                  <div className="flex flex-col gap-2" key={passengerIndex}>
                    <span className="font-bold text-lg text-[#212121]">
                      اطلاعات مسافر {passengerIndex + 1}
                    </span>
                    <TravelerInfo traveler={passenger} />
                  </div>
                ))}
              </div>
            </TravelerDropdown>
            <TravelerDropdown
              title="اطلاعات پرواز"
              icon="i-fluent:receipt-sparkles-24-regular"
            >
              <FlightInfo
                flightInfo={OriginDestinationInformation}
                totalPrice={TotalPrice}
              />
            </TravelerDropdown>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      {flightOrder.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          هیچ سفارش پروازی یافت نشد
        </div>
      ) : (
        flightOrder.map(renderOrderContent)
      )}
    </div>
  );
}

export { FlightContent };
