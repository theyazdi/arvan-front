import { QuickAmenityItem } from "./QuickAmenityItem";
import { AmenityIcon } from "./AmenityIcon";

interface HotelAmenity {
  name: string;
  icon: string;
}

interface HotelQuickAmenitiesProps {
  amenities: HotelAmenity[];
  maxItems?: number;
}

export const HotelQuickAmenities: React.FC<HotelQuickAmenitiesProps> = ({ 
  amenities,
  maxItems = 8
}) => (
  <div>
    <div className="text-xs md:text-lg font-bold text-right mb-2">امکانات هتل</div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4 rounded-3xl bg-white p-3 md:p-4">
      {amenities.slice(0, maxItems).map((amenity, index) => {
        return (
          <QuickAmenityItem 
            key={`${amenity.name}-${index}`}
            icon={<AmenityIcon iconIdentifier={amenity.icon} />} 
            label={amenity.name}
            isLast={index === amenities.slice(0, maxItems).length - 1}
          />
        );
      })}
    </div>
  </div>
); 