import { API_BASE_URL } from "@/lib";

interface FlightOfferParams {
    origin: string;
    destination: string;
    departure_date: string;
    adults: number;
    page: number;
    page_size: number;
  }
  
  const getFlightOffer = async (id: string, params: FlightOfferParams) => {
    try {
      const query = new URLSearchParams({
        origin: params.origin,
        destination: params.destination,
        departure_date: params.departure_date,
        adults: params.adults.toString(),
        page: params.page.toString(),
        page_size: params.page_size.toString(),
      });
  
      const response = await fetch(
        `${API_BASE_URL}/flight/offer/${id}?${query.toString()}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching flight offer:", error);
      throw error;
    }
  };
  
  export { getFlightOffer };
  