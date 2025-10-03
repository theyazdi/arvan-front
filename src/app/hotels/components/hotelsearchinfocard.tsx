"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HotelSearchMobile } from "@/components/share/searchBar/hotel/hotelsearchmobile";
import { HotelRegion } from "@/components/share/searchBar/hotel/frommobile";

interface HotelSearchInfoCardProps {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
  rooms: string;
  onEdit: () => void;
}

function HotelSearchInfoCard({
  city,
  checkInDate,
  checkOutDate,
  adults,
  children,
  rooms,
  onEdit
}: HotelSearchInfoCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<HotelRegion | null>(null);
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date(checkInDate));
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date(checkOutDate));
  const [adultCount, setAdultCount] = useState(parseInt(adults));
  const [childCount, setChildCount] = useState(parseInt(children || "0"));
  const [infantCount, setInfantCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(parseInt(rooms));

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSearch = () => {
    // Here you can add logic to perform search with new parameters
    setIsEditModalOpen(false);
    onEdit(); // Call the original onEdit function
  };

  return (
    <>
      <div className="bg-white rounded-none p-5 shadow-md mx-0 mb-4 md:hidden w-full relative" dir="rtl">
        <div className="mb-5">
          <h3 className="text-base font-medium text-gray-800">نمایش اطلاعات</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-1">{city}</h4>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-700">از {checkInDate}</p>
            <p className="text-sm text-gray-700">تا {checkOutDate}</p>
          </div>
          
          <div className="pt-1">
            <p className="text-sm text-gray-700">
              برای {adults} بزرگسال{children ? ` | ${children} کودک` : ''}
            </p>
          </div>
        </div>
        
        {/* Edit button at bottom left */}
        <div className="absolute bottom-4 left-4">
          <Button
            onClick={handleEditClick}
            size="icon"
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex-shrink-0"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Full screen search modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col" dir="rtl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold text-gray-900">جستجوی هتل</h2>
            <Button
              onClick={handleCloseModal}
              size="icon"
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Content - Hotel Search Form */}
          <div className="flex-1 p-4">
            <HotelSearchMobile
              selectedLocationName={selectedLocation?.cityNameFa || city}
              setSelectedLocationName={setSelectedLocation}
              checkInDate={checkIn}
              setCheckInDate={setCheckIn}
              checkOutDate={checkOut}
              setCheckOutDate={setCheckOut}
              adultCount={adultCount}
              setAdultCount={setAdultCount}
              childCount={childCount}
              setChildCount={setChildCount}
              infantCount={infantCount}
              setInfantCount={setInfantCount}
              rooms={roomsCount}
              setRooms={setRoomsCount}
              handleSearch={handleSearch}
              isPending={false}
            />
          </div>
        </div>
      )}
    </>
  );
}

export { HotelSearchInfoCard };
