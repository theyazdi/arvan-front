import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HotelCardSkeleton: React.FC<{ viewMode?: "list" | "grid" }> = ({ viewMode = "list" }) => {
  if (viewMode === "list") {
    return (
      <div className="w-full mx-auto my-4 md:my-6 bg-white shadow-md rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-48 h-32 md:h-48 flex-shrink-0 p-2">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-3 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
            <Skeleton className="h-5 md:h-6 w-3/4 md:w-48 mb-2 md:mb-0" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 md:h-4 w-16 md:w-24" />
              <Skeleton className="h-6 md:h-8 w-24 md:w-32" />
            </div>
          </div>
          <div className="flex flex-col space-y-2 mt-2">
            <Skeleton className="h-3 md:h-4 w-32 md:w-40" />
            <Skeleton className="h-3 md:h-4 w-24 md:w-32" />
            <Skeleton className="h-3 md:h-4 w-28 md:w-36" />
          </div>
        </div>
        
        {/* Price Section */}
        <div className="w-full md:w-64 flex-shrink-0 p-3 md:p-5 flex flex-col justify-center border-t md:border-t-0 md:border-l">
          <div className="flex flex-col items-center mb-3 md:mb-4">
            <Skeleton className="h-6 md:h-8 w-24 md:w-32 mb-2" />
            <Skeleton className="h-3 md:h-4 w-32 md:w-40" />
          </div>
          <Skeleton className="h-8 md:h-10 w-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full mx-auto my-3 md:my-4 bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="w-full p-2 md:p-3">
        <Skeleton className="w-full h-32 md:h-40 rounded-xl" />
      </div>
      
      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col">
        <Skeleton className="h-5 md:h-6 w-3/4 mb-2" />
        <Skeleton className="h-3 md:h-4 w-1/2 mb-3" />
        
        {/* Amenities */}
        <div className="flex flex-col space-y-1 md:space-y-2 mb-3">
          <Skeleton className="h-3 md:h-4 w-32 md:w-40" />
          <Skeleton className="h-3 md:h-4 w-28 md:w-36" />
          <Skeleton className="h-3 md:h-4 w-24 md:w-32" />
        </div>
        
        {/* Room Type */}
        <Skeleton className="h-6 md:h-8 w-full mb-3" />
        
        {/* Separator */}
        <div className="border-t border-gray-200 my-2 md:my-3"></div>
        
        {/* Price Section */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <Skeleton className="h-6 md:h-8 w-24 md:w-32 mb-1 md:mb-2" />
            <Skeleton className="h-3 md:h-4 w-32 md:w-40" />
          </div>
          <Skeleton className="h-8 md:h-10 w-20 md:w-24" />
        </div>
      </div>
    </div>
  );
};

export { HotelCardSkeleton }; 