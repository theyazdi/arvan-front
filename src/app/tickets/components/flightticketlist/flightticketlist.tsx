"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchParams } from "../searchsection";
import { fetchFlightData, Flight } from "../../action";
import { FlightCard, FlightCardMobile } from "../index";
import React from "react";

const LoadingState = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    <span className="mr-2">در حال بارگذاری...</span>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center p-8 text-red-500">
    <span>خطا: {message}</span>
  </div>
);

const EmptyState = () => (
  <div className="flex items-center justify-center p-8 text-gray-500">
    <span>اطلاعاتی یافت نشد</span>
  </div>
);

function FlightTicketList() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flightData, setFlightData] = useState<Flight[] | null>(null);

  const params: SearchParams = {
    origin: searchParams.get("origin") || "",
    destination: searchParams.get("destination") || "",
    departure_date: searchParams.get("departure_date") || "",
    adults: searchParams.get("adults") || "",
    page: searchParams.get("page") || "",
    maxCost: searchParams.get("max-cost") || "",
    maxDuration: searchParams.get("max_duration") || "",
    airline: searchParams.get("airline") || "",
    numberOfStops: searchParams.get("number_of_stops") || "",
    is_orgin_city: searchParams.get("is_orgin_city") || "",
    is_destination_city: searchParams.get("is_destination_city") || "",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!params.origin || !params.destination || !params.departure_date) {
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchFlightData(
          params.origin,
          params.destination,
          params.departure_date,
          parseInt(params.adults) || 1,
          parseInt(params.page) || 1,
          10,
          params.maxCost,
          params.maxDuration,
          params.airline,
          params.numberOfStops,
          params.is_orgin_city,
          params.is_destination_city
        );
        setFlightData(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "خطا در دریافت اطلاعات پرواز"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    params.origin,
    params.destination,
    params.departure_date,
    params.adults,
    params.page,
    params.maxCost,
    params.maxDuration,
    params.airline,
    params.numberOfStops,
    params.is_orgin_city,
    params.is_destination_city,
  ]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className={`flex flex-col md:gap-6 gap-4`}>
      {flightData && flightData.length === 0 && <EmptyState />}
      {flightData?.map((flight, index) => (
        <React.Fragment key={flight.offerId || index}>
          <FlightCard flight={flight} index={index} />
          <FlightCardMobile flight={flight} />
        </React.Fragment>
      ))}
    </div>
  );
}

export { FlightTicketList };
