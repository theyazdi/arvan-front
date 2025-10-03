"use client";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "../common/SectionHeader";
import dynamic from "next/dynamic";

interface LocationSectionProps {
  address: string;
  latitude?: number;
  longitude?: number;
}

const Map = dynamic(() => import("../../../../../../components/share/MapComponent/Map"), { ssr: false });

export const LocationSection: React.FC<LocationSectionProps> = ({ address, latitude, longitude }) => {
  const mapLat = typeof latitude === "number" && !isNaN(latitude) ? latitude : 35.6892;
  const mapLng = typeof longitude === "number" && !isNaN(longitude) ? longitude : 51.3890;
  
  return (
    <div className="mb-8">
      <div className="w-full h-80 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center mt-4">
        <Map latitude={mapLat} longitude={mapLng} />
      </div>
    </div>
  );
}; 