"use client";

import React from 'react';
import { HotelMainContent } from "./HotelMainContent";
import { HotelBookingSidebar } from "./HotelBookingSidebar";


interface HotelLocation { address: string; city: string; country: string; }
interface HotelAmenity { name: string; icon: string; }
interface HotelData { id: string; name: string; description: string; images: string[]; rating: number; price: string; currency: string; amenities: HotelAmenity[]; location: HotelLocation; }
interface SearchParams { nights: number; adults: number; children: number; rooms: number; }

interface HotelDetailSkeletonProps {
}

export const HotelDetailSkeleton: React.FC<HotelDetailSkeletonProps> = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Desktop Layout */}
      <div className="hidden md:block col-span-8">
        <HotelMainContent
          hotelData={{} as HotelData}
          rooms={[]}
          onGalleryOpen={() => {}}
          loading={true}
          city_net_code=""
        />
      </div>
      <div className="hidden md:block col-span-4">
        <HotelBookingSidebar
          hotelData={{} as HotelData}
          rooms={[]}
          loading={true}
        />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden col-span-12 space-y-4">
        <HotelMainContent
          hotelData={{} as HotelData}
          rooms={[]}
          onGalleryOpen={() => {}}
          loading={true}
          city_net_code=""
        />
        <HotelBookingSidebar
          hotelData={{} as HotelData}
          rooms={[]}
          loading={true}
        />
      </div>
    </div>
  );
}; 