import { Skeleton } from "@/components/ui/skeleton";

interface HotelGalleryProps {
  images: string[];
  name: string;
  onGalleryOpen: () => void;
  loading?: boolean;
}

export const HotelGallery: React.FC<HotelGalleryProps> = ({ 
  images = [],
  name, 
  onGalleryOpen,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="my-1 md:my-8 px-4 container mx-auto">
        {/* Desktop Skeleton */}
        <div className="hidden md:flex gap-2 mb-8">
          <div className="flex-[2.5] h-[616px]">
            <Skeleton className="w-full h-full rounded-lg bg-gray-200" />
          </div>
          <div className="flex-[0.8] flex flex-col gap-2">
            {[1, 2].map((_, index) => (
              <div key={index} className="h-[200px]">
                <Skeleton className="w-full h-full rounded-lg bg-gray-200" />
              </div>
            ))}
            <div className="h-[200px] relative">
              <Skeleton className="w-full h-full rounded-lg bg-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-6 w-32 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Skeleton */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64 h-64">
                <Skeleton className="w-full h-full rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const mainImage = images[0] || "https://placehold.co/600x400?text=No+Image";
  const smallImages = images.slice(1, 3);
  const showAllImage = images.length > 3 ? images[3] : (smallImages.length > 0 ? smallImages[smallImages.length - 1] : mainImage);
  const canShowAll = images.length > 1;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/img/Blog Avatar 1.png";
  };

  return (
    <div className="my-1 md:my-8 px-4 container mx-auto">
      {/* Desktop Version - Original Layout */}
      <div className="hidden md:flex gap-2">
        {/* Main Image */} 
        <div className="flex-[2.5] h-[616px]">
          <img
            src={mainImage}
            alt={`${name} - Main Image`}
            className="w-full h-full object-cover rounded-lg"
            onError={handleImageError}
          />
        </div>
        {/* Small Images & Show All Button */} 
        <div className="flex-[0.8] flex flex-col gap-2">
          {smallImages.map((image, index) => (
            <div key={index} className="h-[200px]">
              <img
                src={image}
                alt={`${name} - Image ${index + 2}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x130?text=Error"; }}
              />
            </div>
          ))}
          {/* Fill remaining space if less than 2 small images */} 
          {Array.from({ length: Math.max(0, 2 - smallImages.length) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="h-[200px]">
                  <Skeleton className="w-full h-full rounded-lg bg-gray-100" />
              </div>
          ))}
          {/* Show All Button/Image */} 
          <div 
            className={`h-[200px] relative group ${canShowAll ? 'cursor-pointer' : ''}`}
            onClick={canShowAll ? onGalleryOpen : undefined}
          >
            <img
              src={showAllImage}
              alt={`${name} - More Images`}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/200x130?text=Error"; }}
            />
            {canShowAll && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 rounded-lg transition-opacity duration-200">
                <span className="i-fluent:camera-24-regular w-4 h-4 text-white"></span>
                <span className="text-sm font-medium text-white">Show all photos</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version - Horizontal Scrollable Square Images */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {images.map((image, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-64 h-64 relative group cursor-pointer"
              onClick={onGalleryOpen}
            >
              <img
                src={image}
                alt={`${name} - Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/300x300?text=Error"; }}
              />
              {index === images.length - 1 && images.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 rounded-lg transition-opacity duration-200">
                  <span className="i-fluent:camera-24-regular w-6 h-6 text-white"></span>
                  <span className="text-sm font-medium text-white">نمایش همه</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 