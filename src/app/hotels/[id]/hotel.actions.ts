import type { ApiRoom, ApiCombination, ApiHotelInfo } from "../actions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface HotelLocation {
  address: string;
  city: string;
  country: string;
}

interface HotelAmenity {
  name: string;
  icon: string;
}

interface HotelData {
  id: string;
  name: string;
  description: string;
  images: string[];
  rating: number;
  price: string;
  currency: string;
  amenities: HotelAmenity[];
  location: HotelLocation;
  city_net_code: string;
  rawData?: ApiItem;
}

interface HotelRoom {
  id: string;
  name: string;
  price: {
    currency: string;
    total: string;
  };
  capacity: {
    adults: number;
    children: number;
  };
  amenities: string[];
  cancellationPolicy: string;
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  rawData?: unknown;
}

interface SearchParams {
  nights: number;
  adults: number;
  children: number;
  rooms: number;
}

const staticData = {
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ],
  amenities: [
    { name: "Wi-Fi رایگان", icon: "wifi" },
    { name: "صبحانه رایگان", icon: "food" },
    { name: "استخر سرپوشیده", icon: "pool" },
    { name: "سالن ورزشی", icon: "gym" },
    { name: "رستآرونن", icon: "restaurant" },
    { name: "اسپا", icon: "spa" },
    { name: "پارکینگ رایگان", icon: "parking" },
    { name: "خدمات خشکشویی", icon: "laundry" },
    { name: "اتاق جلسات", icon: "meeting" },
    { name: "خدمات نگهداری کودک", icon: "childcare" }
  ]
};


const staticHotels: { [key: string]: HotelData } = {
  "1": {
    id: "1",
    name: "هتل لوکس تهران",
    description: "هتل لوکس تهران با امکانات فوق‌العاده و موقعیت عالی در مرکز شهر، تجربه‌ای بی‌نظیر از اقامت در تهران را برای شما فراهم می‌کند. این هتل با طراحی مدرن و امکانات رفاهی کامل، انتخاب ایده‌آلی برای مسافران تجاری و تفریحی است.",
    images: staticData.images,
    rating: 4.8,
    price: "2,500,000",
    currency: "تومان",
    amenities: staticData.amenities,
    location: {
      address: "خیابان ولیعصر، پلاک ۱۲۳",
      city: "تهران",
      country: "ایران"
    },
    city_net_code: "TNH"
  },
  "2": {
    id: "2",
    name: "هتل پارسیان استقلال",
    description: "هتل پارسیان استقلال با معماری زیبا و امکانات مدرن، یکی از بهترین هتل‌های تهران است. این هتل با رستآرونن‌های متنوع، سالن‌های مجلل و خدمات عالی، تجربه‌ای منحصر به فرد از اقامت در تهران را ارائه می‌دهد.",
    images: staticData.images,
    rating: 4.6,
    price: "3,200,000",
    currency: "تومان",
    amenities: staticData.amenities,
    location: {
      address: "خیابان آزادی، پلاک ۴۵۶",
      city: "تهران",
      country: "ایران"
    },
    city_net_code: "TNH"
  },
  "3": {
    id: "3",
    name: "هتل اسپیناس پالاس",
    description: "هتل اسپیناس پالاس با طراحی لوکس و امکانات فوق‌العاده، یکی از مجلل‌ترین هتل‌های تهران است. این هتل با استخرهای زیبا، اسپای مجهز و رستآرونن‌های بین‌المللی، تجربه‌ای بی‌نظیر از اقامت در تهران را فراهم می‌کند.",
    images: staticData.images,
    rating: 4.9,
    price: "4,500,000",
    currency: "تومان",
    amenities: staticData.amenities,
    location: {
      address: "خیابان فرمانیه، پلاک ۷۸۹",
      city: "تهران",
      country: "ایران"
    },
    city_net_code: "TNH"
  }
};

const convertToEUR = (amount: string, currency: string): string => {
  const rates: { [key: string]: number } = {
    'MXN': 0.055,
    'USD': 0.92,
    'GBP': 1.17,
    'EUR': 1
  };

  const rate = rates[currency] || 1;
  const amountInEUR = parseFloat(amount) * rate;
  return amountInEUR.toFixed(2);
};

const formatDateToSlash = (date: string) => date.replace(/-/g, '/');

export async function getHotelById(id: string, options: { check_in_date: string; check_out_date: string; city_net_code: string; }): Promise<HotelData> {
  const { check_in_date, check_out_date, city_net_code } = options;
  const url = `${API_BASE_URL}/hotel/location/search-room/?check_in_date=${formatDateToSlash(check_in_date)}&check_out_date=${formatDateToSlash(check_out_date)}&city_net_code=${city_net_code}`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  const data = await res.json();
  if (data.Success && data.Items && Array.isArray(data.Items) && data.Items.length > 0) {
    let item;
    if (id) {
      item = (data.Items as ApiItem[]).find((i) => i.HotelInfo && i.HotelInfo.HotelId.toString() === id);
    }
    if (!item) {
      item = data.Items[0];
    }
    if (item && item.HotelInfo) {
      const hotelInfo = item.HotelInfo;
      return {
        id: hotelInfo.HotelId.toString(),
        name: hotelInfo.HotelName,
        description: hotelInfo.Description || "توضیحات ندارد",
        images: hotelInfo.HotelPicture || [],
        rating: hotelInfo.TripAdvisorRating || hotelInfo.Rating || 0,
        price: item.Combinations?.[0]?.Rooms?.[0]?.HotelItineraryPricingInfo?.ItinTotalFare?.Total?.toString() || "0",
        currency: item.Combinations?.[0]?.Rooms?.[0]?.HotelItineraryPricingInfo?.ItinTotalFare?.Currency || "IRR",
        amenities: [],
        location: {
          address: hotelInfo.Address || hotelInfo.CityName,
          city: hotelInfo.CityName,
          country: hotelInfo.CountryCode || "ایران"
        },
        city_net_code: hotelInfo.CitynetCode || "",
        rawData: item
      };
    }
  }
  throw new Error("Hotel not found");
}

export async function getHotelRooms(hotelId: string, options: { check_in_date: string; check_out_date: string; city_net_code: string; }): Promise<HotelRoom[]> {
  const { check_in_date, check_out_date, city_net_code } = options;
  const url = `${API_BASE_URL}/hotel/location/search-room/?check_in_date=${formatDateToSlash(check_in_date)}&check_out_date=${formatDateToSlash(check_out_date)}&city_net_code=${city_net_code}`;
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  const data = await res.json();
  if (data.Success && data.Items && Array.isArray(data.Items)) {
    const item = (data.Items as ApiItem[]).find((i) => i.HotelInfo && (i.HotelInfo.HotelId.toString() === hotelId || i.HotelInfo.CitynetCode === city_net_code));
    if (item) {
      return item.Combinations.flatMap((c: ApiCombination) => (c.Rooms as ApiRoom[]).map((room) => ({
        id: room.RoomTypeId || room.RoomType || '',
        name: room.RoomTypeName || '',
        price: {
          currency: room.HotelItineraryPricingInfo?.ItinTotalFare?.Currency || 'IRR',
          total: room.HotelItineraryPricingInfo?.ItinTotalFare?.Total?.toString() || '0'
        },
        capacity: {
          adults: room.CountOfPassengers || 2,
          children: 0
        },
        amenities: [],
        cancellationPolicy: '',
        breakfastIncluded: room.MealType?.includes('صبحانه') || false,
        freeCancellation: false,
        rawData: room
      })));
    }
  }
  return [];
}

export type { HotelData, HotelRoom };

export interface ApiItem {
  HotelInfo: ApiHotelInfo;
  Combinations: ApiCombination[];
  [key: string]: unknown;
} 
