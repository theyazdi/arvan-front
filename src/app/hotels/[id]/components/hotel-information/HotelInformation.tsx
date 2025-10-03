"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { LocationSection } from "./sections/LocationSection";
import { AboutPropertySection } from "./sections/AboutPropertySection";
import { FacilitiesSection } from "./sections/FacilitiesSection";
import { RulesSection } from "./sections/RulesSection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { RoomPricesSection } from "./sections/RoomPricesSection";
import { TabTrigger } from "./common/TabTrigger";
import { PageHeader } from "./common/PageHeader";
import { Separator } from "./common/Separator";
import { Skeleton } from "@/components/ui/skeleton";
import { HotelQuickAmenities } from "../hotel-detail/HotelQuickAmenities";

interface HotelLocation {
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface HotelAmenity {
  name: string;
  icon: string;
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

interface HotelInformationProps {
  description: string;
  location: HotelLocation;
  rooms: HotelRoom[];
  amenities: HotelAmenity[];
  latitude?: number;
  longitude?: number;
  onBookNow?: (room: HotelRoom) => void;
}

export const HotelInformation: React.FC<HotelInformationProps & { loading?: boolean }> = ({
  description,
  location,
  rooms,
  amenities = [],
  loading = false,
  latitude,
  longitude,
  onBookNow
}) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-3 md:p-8">
        {/* Tabs Skeleton */}
        <div className="flex flex-row-reverse gap-1 md:gap-2 mb-3 md:mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 md:h-10 w-16 md:w-24 rounded-lg" />
          ))}
        </div>
        
        {/* Separator */}
        <Skeleton className="h-px w-full mb-3 md:mb-4" />
        
        {/* Content Skeleton */}
        <div className="space-y-4 md:space-y-6">
          <Skeleton className="h-6 md:h-8 w-1/3" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-8 md:h-10 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-32 md:h-64 w-full" />
        </div>
      </div>
    );
  }

  const tabs = [
    {
      value: "facilities",
      icon: <span className="i-fluent:home-24-regular w-5 h-5"></span>,
      label: "امکانات"
    },
    {
      value: "room-prices",
      icon: <span className="i-fluent:money-24-regular w-5 h-5"></span>,
      label: "قیمت اتاق ها"
    },
    {
      value: "description",
      icon: <span className="i-fluent:text-description-24-regular w-5 h-5"></span>,
      label: "توضیحات"
    },
    {
      value: "rules",
      icon: <span className="i-fluent:document-text-24-regular w-5 h-5"></span>,
      label: "قوانین"
    }
  ];

  return (
    <div dir="rtl">
      <Tabs defaultValue="facilities" className="w-full">
        <TabsList className="flex flex-row-reverse w-full gap-1 md:gap-2 bg-transparent justify-start mb-3 md:mb-6">
          {tabs.map((tab) => (
            <TabTrigger
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </TabsList>
        <Separator className="my-3 md:my-4" />
        <TabsContent value="facilities" className="mt-3 md:mt-4 bg-white rounded-3xl p-3 md:p-8">
          {amenities && amenities.length > 0 ? (
            <ul className="flex flex-wrap gap-2 mb-4">
              {amenities.map((a, idx) => (
                <li key={idx} className="bg-gray-100 rounded-lg px-2 md:px-3 py-1 text-xs flex items-center gap-1">
                  <span>{a.icon && <i className={`i-fluent:${a.icon}-24-regular`} />}</span>
                  {a.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-xs text-gray-400 mb-4 text-right">امکانی ثبت نشده است</div>
          )}
        </TabsContent>
        <TabsContent value="room-prices" className="bg-white rounded-3xl p-3 md:p-8">
          <RoomPricesSection rooms={rooms} onBookNow={onBookNow} />
        </TabsContent>
        <TabsContent value="description" className="mt-3 md:mt-4 text-right bg-white rounded-3xl p-3 md:p-8">
          <div className="mb-4 md:mb-8">
            <h2 className="text-sm md:text-xl font-bold mb-3 md:mb-6">درباره هتل</h2>
            <div className="space-y-3 md:space-y-4 text-gray-700 leading-6 md:leading-8 text-sm md:text-base">
              {description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-4 md:mt-6 text-xs md:text-sm text-gray-600">
              <span className="font-bold">آدرس: </span>
              {location && location.address ? location.address : 'آدرسی ثبت نشده است'}
            </div>
          </div>
          <div className="mt-6 md:mt-10">
            <h3 className="text-sm md:text-lg font-bold mb-3 md:mb-4 flex flex-row-reverse items-center gap-2">
              <span className="i-fluent:location-24-regular w-4 h-4 md:w-5 md:h-5"></span>
              موقعیت در نقشه
            </h3>
            <LocationSection address={location.address} latitude={location.latitude} longitude={location.longitude} />
          </div>
        </TabsContent>
        <TabsContent value="rules" className="bg-white rounded-3xl p-3 md:p-8">
          <RulesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};