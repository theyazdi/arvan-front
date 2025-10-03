"use client";

import { useState, useEffect } from "react";
import { HotelCard } from "./HotelCard";
import { HotelCardSkeleton } from "./HotelCardSkeleton";
import { HotelListHeader } from './HotelListHeader';
import { HotelsPagination } from './HotelsPagination';
import { MobileHotelCard } from './MobileHotelCard';
import { HotelOffer } from "@/app/hotels/actions";
import { NoHotelsFound } from "../NoHotelsFound";


function getDefaultDate(offsetDays: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

interface HotelListProps {
  searchParams: {
    city?: string;
    check_in_date?: string;
    check_out_date?: string;
    page?: string;
    limit?: string;
    adults?: string;
    children?: string;
    rooms?: string;
    min_price?: string;
    max_price?: string;
    [key: string]: string | undefined;
  };
  initialHotels: HotelOffer[];
  totalCount: number;
  totalPages: number;
  isLoading?: boolean;
  onSearchAgain?: () => void;
}

const mockHotels: HotelOffer[] = [
  {
    type: "hotel-offer",
    hotel: {
      type: "hotel",
      hotelId: "1",
      chainCode: "VI",
      dupeId: "1001",
      name: "Hotel Victoria Palace Paris",
      cityCode: "PAR",
      latitude: 48.8584,
      longitude: 2.2945,
      rating: 5,
    },
    available: true,
    offers: [
      {
        id: "offer-1",
        checkInDate: getDefaultDate(),
        checkOutDate: getDefaultDate(1),
        rateCode: "STD",
        rateFamilyEstimated: {
          code: "STD",
          type: "Standard"
        },
        commission: {
          percentage: "10%"
        },
        room: {
          type: "Double",
          typeEstimated: {
            category: "دو تخته",
            beds: 2,
            bedType: "Double"
          },
          description: {
            text: "اتاق خواب دو تخته، صبحانه رایگان، منظره شهر، مساحت ۳۲ متر مربع، مناسب دو بزرگسال و یک کودک.",
            lang: "fa"
          }
        },
        guests: {
          adults: 2
        },
        price: {
          currency: "تومان",
          base: "2000000",
          total: "2000000",
          taxes: [],
          variations: {
            average: {
              base: "2000000"
            },
            changes: []
          }
        },
        policies: {
          cancellations: [
            {
              description: {
                text: "تا ۲۴ ساعت قبل رایگان قابل لغو است."
              },
              policyType: "refundable"
            }
          ],
          paymentType: "pay_later",
          refundable: {
            cancellationRefund: "100%"
          }
        },
        self: "#"
      }
    ],
    self: "#"
  }
];

const HotelList = ({ 
  searchParams,
  initialHotels,
  totalCount: initialTotalCount,
  totalPages: initialTotalPages,
  isLoading,
  onSearchAgain,
}: HotelListProps) => {
  const loading = isLoading ?? false;
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [hotels, setHotels] = useState<HotelOffer[]>(initialHotels);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    setHotels(initialHotels);
  }, [initialHotels]);

  
  const maxPrice = searchParams.max_price ? parseInt(searchParams.max_price) : 100000000;
  const filteredHotels = hotels.filter(hotel => {
    const offer = hotel.offers[0];
    const price = offer?.price?.total ? parseInt(offer.price.total) : 0;
    return price <= maxPrice;
  });

  const displayTotalCount = filteredHotels.length;
  const page = currentPage;

  const createPageUrl = (pageNum: number): string | undefined => {
    if (pageNum < 1 || pageNum > totalPages) return undefined;

    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('page', pageNum.toString());
    return `/hotels?${params.toString()}`;
  };

  const calculateNights = () => {
    if (!searchParams.check_in_date || !searchParams.check_out_date) return 1;
    const checkIn = new Date(searchParams.check_in_date);
    const checkOut = new Date(searchParams.check_out_date);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const adults = parseInt(searchParams.adults || "2");
  const children = parseInt(searchParams.children || "0");
  const rooms = parseInt(searchParams.rooms || "1");

  if (loading) {
    return (
      <div>
        <HotelListHeader
          totalCount={0}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <div className={viewMode === "list" ? "space-y-4 md:mt-5 hidden md:block" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-5"}>
          {Array.from({ length: parseInt(searchParams.limit || "10") }).map((_, index) => (
            <HotelCardSkeleton key={index} viewMode={viewMode} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 p-8 bg-white rounded-xl shadow-md text-center">
        <h3 className="text-xl font-semibold text-red-600">خطا در بارگذاری هتل‌ها</h3>
        <p className="text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!hotels.length) {
    return <NoHotelsFound searchParams={searchParams} onSearchAgain={onSearchAgain} />;
  }

  return (
    <div>
      <HotelListHeader
        totalCount={displayTotalCount}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="block md:hidden space-y-4 mt-5">
        {filteredHotels.map((hotelOffer, index) => {
          const hotelInfo = hotelOffer.hotel;
          const offer = hotelOffer.offers[0];
          
          return (
            <MobileHotelCard 
              key={`${hotelInfo.hotelId}-${offer?.id || index}-${index}`} 
              id={hotelInfo.hotelId}
              name={hotelInfo.name}
              price={{
                currency: offer?.price?.currency || "تومان",
                total: offer?.price?.total || "نامشخص"
              }}
              rating={hotelInfo.rating}
              searchDetails={{
                nights,
                adults,
                children,
                rooms
              }}
              address={hotelInfo.cityCode}
              tripAdvisorRating={hotelInfo.rating}
              hotelPicture={hotelInfo.hotelId ? `https://cdn-a-hid.partocrs.com/upload/hotelimagesdomestic/${hotelInfo.hotelId}/main.jpg` : undefined}
              checkInDate={offer?.checkInDate}
              checkOutDate={offer?.checkOutDate}
              city_net_code={hotelInfo.city_net_code}
              roomCategory={offer?.room?.typeEstimated?.category}
            />
          );
        })}
      </div>
      <div className={viewMode === "list" ? "space-y-4 md:mt-5 hidden md:block" : "hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-5"}>
        {filteredHotels.map((hotelOffer, index) => {
          const hotelInfo = hotelOffer.hotel;
          const offer = hotelOffer.offers[0];
          
          return (
            <HotelCard 
              key={`${hotelInfo.hotelId}-${offer?.id || index}-${index}`} 
              viewMode={viewMode} 
              id={hotelInfo.hotelId}
              name={hotelInfo.name}
              price={{
                currency: offer?.price?.currency || "تومان",
                total: offer?.price?.total || "نامشخص"
              }}
              rating={hotelInfo.rating}
              beds={offer?.room?.typeEstimated?.beds}
              roomCategory={offer?.room?.typeEstimated?.category}
              searchDetails={{
                nights,
                adults,
                children,
                rooms
              }}

              address={hotelInfo.cityCode}
              tripAdvisorRating={hotelInfo.rating}
              hotelType={hotelInfo.hotelId === "1611" ? "Hostel/Backpacker accommodation" : hotelInfo.hotelId === "4" ? "Hotel" : "هتل"}
              roomTypeName={offer?.room?.description?.text || "اتاق استاندارد"}
              mealType={offer?.room?.type || "فقط اتاق"}
              hotelPicture={hotelInfo.hotelId ? `https://cdn-a-hid.partocrs.com/upload/hotelimagesdomestic/${hotelInfo.hotelId}/main.jpg` : undefined}
              checkInDate={offer?.checkInDate}
              checkOutDate={offer?.checkOutDate}
              city_net_code={hotelInfo.city_net_code}
            />
          );
        })}
      </div>

      <HotelsPagination
        page={page}
        totalPages={totalPages}
        createPageUrl={createPageUrl}
      />
    </div>
  );
};

export { HotelList }; 