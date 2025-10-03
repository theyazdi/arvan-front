"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoomPriceCard } from "../../room-price";
import { Skeleton } from "@/components/ui/skeleton";
import { ProcessHotel } from "@/app/hotels/components/process";

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
}

interface RoomPricesSectionProps {
  rooms: HotelRoom[];
  onBookNow?: (room: HotelRoom) => void;
}

export const RoomPricesSection: React.FC<RoomPricesSectionProps & { loading?: boolean }> = ({
  rooms,
  loading = false,
  onBookNow
}) => {
  if (loading) {
    return (
      <div className="space-y-3 md:space-y-6">
        <Skeleton className="h-5 md:h-8 w-1/3 mb-3 md:mb-4" />
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="w-full">
              <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                  <Skeleton className="h-5 md:h-6 w-3/4 md:w-1/2 mb-2 md:mb-0" />
                  <Skeleton className="h-6 md:h-8 w-20 md:w-24" />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Skeleton className="h-4 md:h-5 w-full" />
                  <Skeleton className="h-4 md:h-5 w-2/3" />
                  <Skeleton className="h-4 md:h-5 w-1/2" />
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 md:h-6 w-24 md:w-32" />
                    <Skeleton className="h-8 md:h-10 w-20 md:w-24" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-6 text-right" dir="rtl">    
      <div className="flex items-center mb-3 md:mb-6 text-right">
        <h3 className="text-sm md:text-lg font-medium">اتاق‌های موجود</h3>
      </div>
      <div className="w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6 py-2">
          {rooms.map((room) => (
            <div key={room.id} className="w-full">
              <RoomPriceCard {...room} onBookNow={onBookNow} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 