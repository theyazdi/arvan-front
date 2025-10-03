import React from 'react';
import { HotelCard } from './HotelCard';
import { Skeleton } from '@/components/ui/skeleton';

interface HotelListSkeletonProps {
    viewMode: "list" | "grid";
    pageSize: number;
}

const HotelListSkeleton: React.FC<HotelListSkeletonProps> = ({ viewMode, pageSize }) => {

    return (
        <div>
             {/* Render a skeleton version of the header */}
             <div className="flex items-center justify-between p-3 md:p-4 rounded-lg">
                <Skeleton className="h-4 md:h-5 w-24 md:w-32" />
                <div className="flex items-center space-x-1 md:space-x-2">
                    <Skeleton className="h-4 md:h-5 w-4 md:w-5" />
                    <Skeleton className="h-5 md:h-6 w-8 md:w-12" /> 
                    <Skeleton className="h-4 md:h-5 w-4 md:w-5" />
                </div>
            </div>

            {/* Mobile Grid */}
            <div className="md:hidden grid grid-cols-1 gap-3 mt-3">
                {Array(pageSize).fill(0).map((_, i) => (
                    <HotelCard key={`skeleton-mobile-${i}`} viewMode="grid" id={`skeleton-mobile-${i}`} />
                ))}
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
                <div className={viewMode === "list" ? "space-y-4 mt-5" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"}>
                    {Array(pageSize).fill(0).map((_, i) => (
                        <HotelCard key={`skeleton-desktop-${i}`} viewMode={viewMode} id={`skeleton-desktop-${i}`} />
                    ))}
                </div>
            </div>
            
             {/* Pagination skeleton */}
             <div className="mt-3 md:mt-5 flex justify-center">
                <Skeleton className="h-8 md:h-10 w-48 md:w-64" /> 
             </div>
        </div>
    );
};

export { HotelListSkeleton }; 