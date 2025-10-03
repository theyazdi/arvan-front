"use server";
import { API_BASE_URL } from "@/lib";
import { formatDuration } from "@/lib/formatDurationTime";

export interface StopInfo {
  airport: string;
  duration: string;
}

export interface BaggageAllowance {
  UnitOfMeasure: string;
  UnitOfMeasureCode: string;
  UnitOfMeasureQuantity: string;
}

export interface Flight {
  airline: string;
  airlineImage: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  price: string;
  flightNumber: string;
  stops: string;
  stopInfo: StopInfo[];
  offerId: string;
  AirlineNameFa: string;
  remainingSeats?: number;
  baggageAllowance?: BaggageAllowance;
}

export interface FlightSegment {
  carrierCode: string;
  carrierImage?: string;
  number: string;
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
}
export interface FlightApiResponse {
  id: string;
  itineraries: Array<{
    duration: string;
    segments: FlightSegment[];
  }>;
  price: {
    grandTotal: string;
  };
}

// Extend FlightApiResponse to include optional extra fields
export interface FlightApiResponseExtended extends FlightApiResponse {
  AirlineNameFa?: string;
  remainingSeats?: number;
  baggageAllowance?: BaggageAllowance;
}

function formatLayoverDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function formatDateForAPI(dateStr: string): string {
  try {
    if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(dateStr)) {
      const formatted = dateStr.replace(/-/g, "/");
      return formatted;
    }

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      console.error("Server Action: Invalid date provided:", dateStr);
      const today = new Date();
      const fallbackDate = `${today.getFullYear()}/${String(
        today.getMonth() + 1
      ).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
      return fallbackDate;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formatted = `${year}/${month}/${day}`;
    return formatted;
  } catch (error) {
    console.error("Server Action: Error formatting date:", error);
    return "2025/04/10";
  }
}

function processFlightData(flight: FlightApiResponseExtended): Flight {
  const segments = flight.itineraries[0].segments;
  const stopCount = segments.length - 1;

  let stopInfo: StopInfo[] = [];
  if (stopCount > 0) {
    stopInfo = segments.slice(0, -1).map((currentSegment, i) => {
      const nextSegment = segments[i + 1];

      const departureTime = new Date(currentSegment.arrival.at);
      const arrivalTime = new Date(nextSegment.departure.at);
      const layoverDuration = Math.floor(
        (arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60)
      );

      return {
        airport: currentSegment.arrival.iataCode,
        duration: formatLayoverDuration(layoverDuration),
      };
    });
  }

  const departureSegment = segments[0];
  const arrivalSegment = segments[segments.length - 1];

  return {
    airline: departureSegment.carrierCode,
    airlineImage: departureSegment.carrierImage || "",
    departureTime: new Date(departureSegment.departure.at).toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    ),
    departureCity: departureSegment.departure.iataCode,
    arrivalTime: new Date(arrivalSegment.arrival.at).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    arrivalCity: arrivalSegment.arrival.iataCode,
    duration: formatDuration(flight.itineraries[0].duration),
    price: `${flight.price.grandTotal}`,
    flightNumber: segments.map((seg: FlightSegment) => seg.number).join(" / "),
    stops:
      stopCount === 0
        ? "Direct"
        : `${stopCount} Stop${stopCount > 1 ? "s" : ""}`,
    stopInfo: stopInfo,
    offerId: flight.id,
    AirlineNameFa: flight.AirlineNameFa || "",
    remainingSeats: flight.remainingSeats,
    baggageAllowance: flight.baggageAllowance,
  };
}

export async function fetchFlightData(
  origin: string,
  destination: string,
  departureDate: string,
  adults: number,
  page: number,
  pageSize: number,
  maxCost?: string,
  maxDuration?: string,
  airline?: string,
  numberOfStops?: string,
  is_orgin_city?: string,
  is_destination_city?: string
) {
  const formattedOrigin = origin.toUpperCase();
  const formattedDestination = destination.toUpperCase();
  const formattedDate = formatDateForAPI(departureDate);

  try {
    let url = `${API_BASE_URL}/flight/offer/search?origin=${formattedOrigin}&destination=${formattedDestination}&is_orgin_city=${is_orgin_city}&is_destination_city=${is_destination_city}&departure_date=${formattedDate}&adults=${adults}&page=${page}&page_size=${pageSize}`;
    if (maxCost && maxCost !== "") {
      url += `&max_cost=${maxCost}`;
    }
    if (maxDuration && maxDuration !== "") {
      url += `&max_duration=${maxDuration}`;
    }

    if (airline && airline !== "") {
      url += `&airline=${airline}`;
    }

    if (numberOfStops && numberOfStops !== "") {
      url += `&number_of_stops=${numberOfStops}`;
    }

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch flight data: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();

    if (!data.results || !Array.isArray(data.results)) {
      console.error(
        "Server Action: Invalid response format, missing results array"
      );
      return {
        results: [],
        totalPages: 0,
      };
    }

    // Map the raw API results using the processing helper function
    const results = data.results.map((f: FlightApiResponseExtended) =>
      processFlightData(f)
    );

    return {
      results,
      totalPages: data.total_pages || 1,
    };
  } catch (error) {
    console.error("Server Action: Error fetching flight data:", error);
    return {
      results: [],
      totalPages: 0,
    };
  }
}
