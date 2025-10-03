"use client";

import React from 'react';
import { HotelMainContent } from "./HotelMainContent";
import { HotelBookingSidebar } from "./HotelBookingSidebar";
import { HotelInformation } from "../hotel-information/HotelInformation";

interface HotelLocation { address: string; city: string; country: string; latitude?: number; longitude?: number; }
interface HotelAmenity { name: string; icon: string; }
interface HotelData { id: string; name: string; description: string; images: string[]; rating: number; price: string; currency: string; amenities: HotelAmenity[]; location: HotelLocation; }
interface HotelRoom { id: string; name: string; price: { currency: string; total: string; }; capacity: { adults: number; children: number; }; amenities: string[]; cancellationPolicy: string; breakfastIncluded: boolean; freeCancellation: boolean; }
interface SearchParams { nights: number; adults: number; children: number; rooms: number; }

interface HotelDetailContentProps {
  hotelData: HotelData;
  rooms: HotelRoom[];
  onGalleryOpen: () => void;
  city_net_code: string;
  onBookNow?: (room: HotelRoom) => void;
}

export const HotelDetailContent: React.FC<HotelDetailContentProps> = ({ 
  hotelData, 
  rooms, 
  onGalleryOpen,
  city_net_code,
  onBookNow
}) => {
  
  const latitude = hotelData.location && hotelData.location.latitude ? Number(hotelData.location.latitude) : undefined;
  const longitude = hotelData.location && hotelData.location.longitude ? Number(hotelData.location.longitude) : undefined;
  const locationWithCoords = { ...hotelData.location, latitude, longitude };
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Desktop Layout */}
      <div className="hidden md:block col-span-8">
        <HotelMainContent
          hotelData={{ ...hotelData, location: locationWithCoords }}
          rooms={rooms}
          onGalleryOpen={onGalleryOpen}
          loading={false}
          city_net_code={city_net_code}
        />
        <div className="mt-8">
          <HotelInformation
            description={hotelData.description}
            location={locationWithCoords}
            rooms={rooms}
            amenities={hotelData.amenities}
            latitude={latitude}
            longitude={longitude}
            onBookNow={onBookNow}
          />
        </div>
      </div>
      <div className="hidden md:block col-span-4">
        <HotelBookingSidebar
          hotelData={{ ...hotelData, location: locationWithCoords }}
          rooms={rooms}
          loading={false}
          city_net_code={city_net_code}
          onBookNow={onBookNow}
        />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden col-span-12 space-y-0">
        <HotelMainContent
          hotelData={{ ...hotelData, location: locationWithCoords }}
          rooms={rooms}
          onGalleryOpen={onGalleryOpen}
          loading={false}
          city_net_code={city_net_code}
        />
        <HotelBookingSidebar
          hotelData={{ ...hotelData, location: locationWithCoords }}
          rooms={rooms}
          loading={false}
          city_net_code={city_net_code}
          onBookNow={onBookNow}
        />
        <HotelInformation
          description={hotelData.description}
          location={locationWithCoords}
          rooms={rooms}
          amenities={hotelData.amenities}
          latitude={latitude}
          longitude={longitude}
          onBookNow={onBookNow}
        />
      </div>
    </div>
  );
}; 