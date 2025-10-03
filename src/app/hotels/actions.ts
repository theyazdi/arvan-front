'use server';

const API_BASE_URL = 'https://api.arvantravels.com';

const formatDateForAPI = (date: string): string => {
  if (date.includes('/')) return date;
  const [year, month, day] = date.split('-');
  return `${year}/${month}/${day}`;
};

export interface HotelOffer {
  type: string;
  hotel: {
    type: string;
    hotelId: string;
    chainCode: string;
    dupeId: string;
    name: string;
    cityCode: string;
    latitude: number;
    longitude: number;
    rating: number;
    city_net_code?: string;
  };
  available: boolean;
  offers: Array<{
    id: string;
    checkInDate: string;
    checkOutDate: string;
    rateCode: string;
    rateFamilyEstimated: {
      code: string;
      type: string;
    };
    commission: {
      percentage: string;
    };
    room: {
      type: string;
      typeEstimated: {
        category: string;
        beds: number;
        bedType: string;
      };
      description: {
        text: string;
        lang: string;
      };
    };
    guests: {
      adults: number;
    };
    price: {
      currency: string;
      base: string;
      total: string;
      taxes: Array<{
        code: string;
        amount: string;
        currency: string;
        included: boolean;
      }>;
      variations: {
        average: {
          base: string;
        };
        changes: Array<{
          startDate: string;
          endDate: string;
          total: string;
        }>;
      };
    };
    policies: {
      cancellations: Array<{
        description: {
          text: string;
        };
        policyType: string;
      }>;
      paymentType: string;
      refundable: {
        cancellationRefund: string;
      };
    };
    self: string;
  }>;
  self: string;
}

export interface HotelResponse {
  hotels: HotelOffer[];
  totalCount: number;
  totalPages: number;
}

interface ErrorResponse {
  errors: Array<{
    code: number;
    detail: string;
  }>;
}

interface ApiResponse {
  results: Array<{
    type: string;
    hotel: {
      type: string;
      hotelId: string;
      chainCode: string;
      dupeId: string;
      name: string;
      cityCode: string;
      latitude: number;
      longitude: number;
      rating: number;
    };
    available: boolean;
    offers: Array<{
      id: string;
      checkInDate: string;
      checkOutDate: string;
      rateCode: string;
      rateFamilyEstimated: {
        code: string;
        type: string;
      };
      commission: {
        percentage: string;
      };
      room: {
        type: string;
        typeEstimated: {
          category: string;
          beds: number;
          bedType: string;
        };
        description: {
          text: string;
          lang: string;
        };
      };
      guests: {
        adults: number;
      };
      price: {
        currency: string;
        base: string;
        total: string;
        taxes: Array<{
          code: string;
          amount: string;
          currency: string;
          included: boolean;
        }>;
        variations: {
          average: {
            base: string;
          };
          changes: Array<{
            startDate: string;
            endDate: string;
            total: string;
          }>;
        };
      };
      policies: {
        cancellations: Array<{
          description: {
            text: string;
          };
          policyType: string;
        }>;
        paymentType: string;
        refundable: {
          cancellationRefund: string;
        };
      };
      self: string;
    }>;
    self: string;
  }>;
  count: number;
  total_pages: number;
}

interface LocationResponse {
  iataCode?: string;
  address?: {
    cityCode: string;
  };
}

const convertToEUR = (amount: string, currency: string): string => {
  const rates: { [key: string]: number } = {
    'MXN': 0.055, // 1 MXN = 0.055 EUR
    'USD': 0.92,  // 1 USD = 0.92 EUR
    'GBP': 1.17,  // 1 GBP = 1.17 EUR
    'EUR': 1      // 1 EUR = 1 EUR
  };

  const rate = rates[currency] || 1;
  const amountInEUR = parseFloat(amount) * rate;
  return amountInEUR.toFixed(2);
};

export async function getHotels(
  city_english: string,
  city_persian: string,
  country_code: string,
  checkInDate: string,
  checkOutDate: string,
  page: number = 1,
  limit: number = 10,
  min_price?: number,
  max_price?: number,
  rooms: number = 1,
  adults: number = 1,
  star?: number
): Promise<HotelResponse> {
  try {
    const formattedCheckIn = formatDateForAPI(checkInDate);
    const formattedCheckOut = formatDateForAPI(checkOutDate);

    // Convert city name to English for city_english parameter
    const cityEnglish = city_english;
    const cityPersian = city_persian;
    const countryCode = country_code;
    let url = `${API_BASE_URL}/hotel/location/search-by-city/?city_english=${encodeURIComponent(cityEnglish)}&city_persian=${encodeURIComponent(cityPersian)}&check_in_date=${formattedCheckIn}&check_out_date=${formattedCheckOut}&adults=${adults}&rooms=${rooms}&country_code=${countryCode}`;
    if (typeof min_price === 'number') url += `&min_price=${min_price}`;
    if (typeof max_price === 'number') url += `&max_price=${max_price}`;
    if (typeof star === 'number') url += `&star=${star}`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(
        `Failed to fetch hotel data: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();

    if (!data.Success || !data.Items || !Array.isArray(data.Items)) {
      console.error("Invalid hotel response format", data);
      return {
        hotels: [],
        totalCount: 0,
        totalPages: 1,
      };
    }

    const hotels: HotelOffer[] = data.Items.map((item: ApiItem) => {
      const hotelInfo = item.HotelInfo;
      const combination = item.Combinations[0];
      const hotelItinerary = combination.HotelItinerary as { CombinationId?: number | string } | undefined;
      const combinationId = hotelItinerary?.CombinationId?.toString() ?? "";
      const room = combination.Rooms[0];
      const pricing = room.HotelItineraryPricingInfo?.ItinTotalFare;

      return {
        type: "hotel",
        hotel: {
          type: "hotel",
          hotelId: hotelInfo.HotelId.toString(),
          chainCode: hotelInfo.CitynetCode || "",
          dupeId: hotelInfo.HotelId.toString(),
          name: hotelInfo.HotelName,
          cityCode: hotelInfo.Address || hotelInfo.CityName,
          latitude: 'Lat' in hotelInfo && hotelInfo.Lat ? parseFloat(hotelInfo.Lat as string) : 0,
          longitude: 'Lng' in hotelInfo && hotelInfo.Lng ? parseFloat(hotelInfo.Lng as string) : 0,
          rating: hotelInfo.TripAdvisorRating || hotelInfo.Rating || 0,
          city_net_code: hotelInfo.CitynetCode || ""
        },
        available: true,
        offers: [{
          id: combinationId,
          checkInDate: hotelInfo.CheckInDate,
          checkOutDate: hotelInfo.CheckOutDate,
          rateCode: room.RoomType || "STANDARD",
          rateFamilyEstimated: {
            code: room.RoomType || "STANDARD",
            type: room.RoomType || "STANDARD"
          },
          commission: {
            percentage: "0"
          },
          room: {
            type: room.RoomType || "STANDARD",
            typeEstimated: {
              category: room.RoomType || "STANDARD",
              beds: 2,
              bedType: "DOUBLE"
            },
            description: {
              text: room.RoomTypeName || "اتاق استاندارد",
              lang: "fa"
            }
          },
          guests: {
            adults: 2
          },
          price: {
            currency: pricing?.Currency || "IRR",
            base: pricing?.Total?.toString() || "0",
            total: pricing?.Total?.toString() || "0",
            taxes: [],
            variations: {
              average: {
                base: pricing?.Total?.toString() || "0"
              },
              changes: []
            }
          },
          policies: {
            cancellations: [],
            paymentType: "PAY_AT_HOTEL",
            refundable: {
              cancellationRefund: "REFUNDABLE_UP_TO_DEADLINE"
            }
          },
          self: `/hotels/${hotelInfo.HotelId}`
        }],
        self: `/hotels/${hotelInfo.HotelId}`
      };
    });

    return {
      hotels,
      totalCount: hotels.length,
      totalPages: 1,
    };
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    return {
      hotels: [],
      totalCount: 0,
      totalPages: 1,
    };
  }
}

export async function getLocationCode(keyword: string): Promise<string | null> {
  if (!keyword) return null;

  try {
    // Convert city name to English for city_english parameter
    const cityEnglish = keyword === 'تهران' ? 'Tehran' : keyword;
    const cityPersian = keyword;

    const response = await fetch(
      `${API_BASE_URL}/hotel/location/search-by-city/?city_english=paris&city_persian=پاریس&check_in_date=2025/10/30&check_out_date=2025/10/31&adults=2&country_code=AE`
    );
    
    if (!response.ok) {
      console.error("Failed to fetch location code:", response.status);
      return null;
    }
    
    const data = await response.json();
    
    if (data.Success && data.Items && data.Items.length > 0) {
      return data.Items[0].HotelInfo.CityName;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching location code:", error);
    return null;
  }
}

interface WeatherData {
  date: string;
  temp: string;
  condition: string;
  icon: string;
}

export async function fetchWeatherData(): Promise<WeatherData[]> {
  try {
    const weatherConditions = [
      { temp: '22°C', condition: 'Sunny', icon: '☀️' },
      { temp: '18°C', condition: 'Partly Cloudy', icon: '⛅' },
      { temp: '15°C', condition: 'Cloudy', icon: '☁️' },
      { temp: '12°C', condition: 'Rainy', icon: '🌧️' },
      { temp: '8°C', condition: 'Stormy', icon: '⛈️' },
      { temp: '25°C', condition: 'Hot', icon: '🔥' },
      { temp: '5°C', condition: 'Cold', icon: '❄️' }
    ];
    
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const { temp, condition, icon } = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      return {
        date: date.toISOString().split('T')[0],
        temp,
        condition,
        icon
      };
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return [];
  }
}

export interface HotelDetail {
  id: string;
  name: string;
  description: string;
  images: string[];
  amenities: string[];
  price: number;
  rating: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
}

export async function getHotelById(id: string): Promise<HotelDetail | null> {
  try {

    const response = await fetch(`${API_BASE_URL}/hotels/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch hotel details');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    return null;
  }
} 

export interface ApiRoom {
  RoomTypeId?: string;
  RoomType?: string;
  RoomTypeName?: string;
  HotelItineraryPricingInfo?: {
    ItinTotalFare?: {
      Currency?: string;
      Total?: string | number;
    }
  };
  CountOfPassengers?: number;
  MealType?: string;
}

export interface ApiCombination {
  Rooms: ApiRoom[];
  HotelItinerary?: {
    CombinationId?: number | string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface ApiHotelInfo {
  HotelId: string | number;
  HotelName: string;
  Description?: string;
  HotelPicture?: string[];
  TripAdvisorRating?: number;
  Rating?: number;
  Address?: string;
  CityName: string;
  CountryCode?: string;
  CitynetCode?: string;
  CheckInDate?: string;
  CheckOutDate?: string;
}

export interface ApiItem {
  HotelInfo: ApiHotelInfo;
  Combinations: ApiCombination[];
  [key: string]: unknown;
} 

export async function createHotelOrder(hotelRequest: any, token: string) {
  try {


    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/hotel/order-create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Vora-Hotel-Booking/1.0',
      },
      body: JSON.stringify(hotelRequest),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`خطا در ایجاد سفارش هتل: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('درخواست به سرور timeout شد. لطفاً دوباره تلاش کنید.');
    }
    throw error;
  }
} 
