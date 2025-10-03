"use client";
import { LoadingSpinner } from "@/components/ui";
import { API_BASE_URL } from "@/lib/fetch";
import React, { useEffect, useState } from "react";
import { HotelOrder } from "./types";
import {
  ContactInfoSection,
  HotelInfo as HotelInfoComponent,
  TravelerDropdown,
  TravelerInfo,
} from "@/app/dashboard/components";

function HotelContent({ token }: { token: string }) {
  const [hotelOrder, setHotelOrder] = useState<HotelOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getHotelOrder = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/panel/order/?order_type=2`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setHotelOrder(data);
    } catch (error) {
      console.error("Error fetching hotel orders:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getHotelOrder();
  }, [token]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const renderOrderContent = (order: HotelOrder, index: number) => {
    const { offer_data, status } = order;
    const { contacts, Passengers, HotelInfo } = offer_data;

    if (status === 1) {
      return (
        <div key={index} className="text-center py-8 text-gray-500">
          اطلاعاتی یافت نشد
        </div>
      );
    }

    if (status === 2) {
      return (
        <div key={index}>
          <ContactInfoSection
            email={contacts.Email}
            phoneNumber={contacts.Telephone}
          />
          <div className="flex items-center gap-6 mt-5">
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
              title="اطلاعات هتل"
              icon="i-fluent:receipt-sparkles-24-regular"
            >
              <HotelInfoComponent
                hotelInfo={HotelInfo}
                passengers={Passengers}
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
      {hotelOrder.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          هیچ سفارش هتلی یافت نشد
        </div>
      ) : (
        hotelOrder.map(renderOrderContent)
      )}
    </div>
  );
}

export { HotelContent };
