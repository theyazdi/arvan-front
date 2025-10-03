"use client";

import React from "react";
import { HotelHeader } from "./HotelHeader";
import { HotelInformation } from "../hotel-information/HotelInformation";
import { Skeleton } from "@/components/ui/skeleton";
import { ProcessHotel } from "@/app/hotels/components/process";
import { useSearchParams } from "next/navigation";

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
}

interface HotelMainContentProps {
  hotelData: HotelData;
  rooms: HotelRoom[];
  onGalleryOpen: () => void;
  loading: boolean;
  city_net_code: string;
  onBookNow?: (room: HotelRoom) => void;
}

export const HotelMainContent: React.FC<HotelMainContentProps> = ({
  hotelData,
  rooms,
  onGalleryOpen,
  loading,
  city_net_code,
  onBookNow
}) => {
  const searchParams = useSearchParams();
  const currentStep = parseInt(searchParams.get("current_step") || "2");

  if (loading) {
    return (
      <div className="col-span-12 md:col-span-8 space-y-4 md:space-y-8">
        {/* Process Steps Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
          <Skeleton className="h-6 md:h-8 w-1/3 mb-3 md:mb-4" />
          <div className="flex gap-2 md:gap-4">
            <Skeleton className="h-4 md:h-6 w-16 md:w-24" />
            <Skeleton className="h-4 md:h-6 w-16 md:w-24" />
            <Skeleton className="h-4 md:h-6 w-16 md:w-24" />
          </div>
        </div>
        
        {/* Hotel Header Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            <div className="flex-1">
              <Skeleton className="h-6 md:h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 md:h-6 w-1/2" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 md:h-6 w-16 md:w-24" />
              <Skeleton className="h-8 md:h-10 w-8 md:w-10 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Hotel Information Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-6">
          <Skeleton className="h-6 md:h-8 w-1/3 mb-3 md:mb-4" />
          <Skeleton className="h-32 md:h-40 w-full mb-3 md:mb-4" />
          <Skeleton className="h-32 md:h-40 w-full mb-3 md:mb-4" />
          <Skeleton className="h-32 md:h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-12 md:col-span-8">
      <div className="mb-3 md:mb-4">
        <ProcessHotel
          steps={["انتخاب اتاق", "اطلاعات مسافر", "پرداخت"]}
          currentStep={currentStep}
          searchParams={{}}
        />
      </div>
      <div className="rounded-lg mb-1 md:mb-8">
        <HotelHeader name={hotelData.name} rating={hotelData.rating} />
      </div>
    </div>
  );
}; 