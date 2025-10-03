"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AirplaneSearch } from "@/components/share/searchBar/airplane/airplaineSearch";
import {
  SearchSummary,
  SearchSummaryMobile,
} from "@/app/tickets/components/index";
import { AirplaneSearchMobile } from "@/components/share/searchBar";

export interface SearchParams {
  origin: string;
  destination: string;
  departure_date: string;
  adults: string;
  page: string;
  offerId?: string;
  maxCost?: string;
  maxDuration?: string;
  airline?: string;
  numberOfStops?: string;
  is_orgin_city?: string;
  is_destination_city?: string;
}

function SearchSection() {
  const searchParams = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(true);

  const params: SearchParams = {
    origin: searchParams.get("origin") || "",
    destination: searchParams.get("destination") || "",
    departure_date: searchParams.get("departure_date") || "",
    adults: searchParams.get("adults") || "",
    page: searchParams.get("page") || "",
  };

  useEffect(() => {
    if (params.origin && params.destination && params.departure_date) {
      setIsSearchActive(true);
    } else {
      setIsSearchActive(false);
    }
  }, [params.origin, params.destination, params.departure_date]);

  const clearSearchParams = () => {
    setIsSearchActive(false);
  };

  return (
    <div className="flex items-center justify-center md:mt-14 mt-4">
      <div className="rounded-xl flex  w-full md:w-auto mx-5 md:mx-0">
        {isSearchActive ? (
          <>
            <SearchSummary
              date={params.departure_date}
              from={`بلیط هواپیما ${params.origin} به ${params.destination}`}
              passengers={`${params.adults} بزرگسال`}
              onClick={clearSearchParams}
            />
            <SearchSummaryMobile
              origin={params.origin}
              destination={params.destination}
              date={params.departure_date}
              adults={params.adults}
              onClick={clearSearchParams}
            />
          </>
        ) : (
          <>
            <div className="w-full hidden md:block">
              <AirplaneSearch hasParams={true}/>
            </div>
            <div className="md:hidden w-full">
              <AirplaneSearchMobile />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { SearchSection };
