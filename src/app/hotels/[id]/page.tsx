"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SecondaryNavbar } from "@/components/ui/secondary-navbar";
import { ImageGalleryDialog } from "./components/hotel-detail/ImageGalleryDialog";
import { HotelGallery } from "./components/hotel-detail/HotelGallery";
import { getHotelById, getHotelRooms } from "./hotel.actions";
import { HotelDetailContent } from "./components/hotel-detail/HotelDetailContent";
import { HotelDetailSkeleton } from "./components/hotel-detail/HotelDetailSkeleton";
import { HotelDetailError } from "./components/hotel-detail/HotelDetailError";
import { HotelSearch } from "@/components/share/searchBar/hotel/hotelSearch";
import { useSearchParams } from "next/navigation";
import { WizardProvider } from "@/hooks";
import { HotelBookingLayout } from "./components/hotel-booking/HotelBookingLayout";
import { BottomNavigationWrapper } from "@/components/ui/bottomNavigationWrapper";
import { Footer } from "@/components/ui/footer";

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

interface SearchParams {
  nights: number;
  adults: number;
  children: number;
  rooms: number;
  city?: string;
  check_in_date?: string;
  check_out_date?: string;
}


export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  const searchParams = useSearchParams();

  const resolvedParams = React.use(params);

  const fetchHotelData = useCallback(async () => {
    let isMounted = true;
    try {
      setLoading(true);
      setError(null);

      const check_in_date = searchParams.get('check_in_date') || '';
      const check_out_date = searchParams.get('check_out_date') || '';
      const city_net_code = searchParams.get('city_net_code') || '';

      const [hotel, hotelRooms] = await Promise.all([
        getHotelById(resolvedParams.id, { check_in_date, check_out_date, city_net_code }),
        getHotelRooms(resolvedParams.id, { check_in_date, check_out_date, city_net_code })
      ]);

      if (isMounted) {
        setHotelData(hotel);
        setRooms(hotelRooms);
        if (hotelRooms.length > 0) {
          setSelectedRoom(hotelRooms[0]);
        }
      }
    } catch (err) {
      
      if (isMounted) {
        setError('Failed to load hotel data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id, searchParams]);

  useEffect(() => {
    const cleanup = fetchHotelData();
  }, [fetchHotelData]);

  const handleRetry = () => {
    fetchHotelData();
  };

  const handleBookNow = (room: HotelRoom) => {
    setSelectedRoom(room);
    setShowBooking(true);
  };

  const renderPageContent = () => {
    if (loading) return <HotelDetailSkeleton />;
    if (error) return <HotelDetailError error={error} onRetry={handleRetry} />;
    if (!hotelData) return null;
    
    if (showBooking) {
      return (
        <WizardProvider totalSteps={5} initialStep={1}>
          <HotelBookingLayout
            hotelData={hotelData}
            selectedRoom={selectedRoom}
            adults={parseInt(searchParams.get('adults') || '1')}
            children={parseInt(searchParams.get('children') || '0')}
            rooms={parseInt(searchParams.get('rooms') || '1')}
          />
        </WizardProvider>
      );
    }

    return (
      <HotelDetailContent
        hotelData={hotelData}
        rooms={rooms}
        city_net_code={hotelData.city_net_code}
        onGalleryOpen={() => setIsGalleryOpen(true)}
        onBookNow={handleBookNow}
      />
    );
  };

  return (
    <BottomNavigationWrapper>
      <div className="min-h-screen">
        <SecondaryNavbar />
        
        {/* Hotel Name Section - Mobile */}
        {!loading && hotelData && !showBooking && (
          <div className="md:hidden w-full flex justify-center">
            <div className="px-4 py-6 w-full max-w-4xl">
              <div className="bg-white rounded-2xl px-12 py-4 shadow-sm w-full">
                <div className="flex flex-col items-center gap-5">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span 
                        key={i} 
                        className={`i-fluent:star-24-filled w-6 h-6 ${
                          i < Math.floor(hotelData.rating) ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 text-center">{hotelData.name}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Gallery Section - Full Width */}
        {!loading && hotelData && !showBooking && (
          <div className="w-full">
            <HotelGallery
              images={hotelData.images}
              name={hotelData.name}
              onGalleryOpen={() => setIsGalleryOpen(true)}
              loading={loading}
            />
          </div>
        )}
        
        {/* Main Content Section */}
        <div className="container mx-auto px-4 py-8">
          {renderPageContent()}
        </div>

        {!loading && hotelData && (
          <ImageGalleryDialog
            images={hotelData.images}
            open={isGalleryOpen}
            onOpenChange={setIsGalleryOpen}
          />
        )}
        
        {/* Footer */}
        <Footer />
      </div>
    </BottomNavigationWrapper>
  );
} 