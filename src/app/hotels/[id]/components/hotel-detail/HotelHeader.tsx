import { RatingStars } from "./RatingStars";

interface HotelHeaderProps {
  name: string;
  rating: number;
}

export const HotelHeader: React.FC<HotelHeaderProps> = ({ name, rating }) => (
  <div className="hidden md:block p-4">
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{name}</h1>
      <div className="flex items-center gap-2">
        <RatingStars rating={rating} />
        <span className="text-gray-600 text-sm">{rating} ستاره</span>
      </div>
    </div>
  </div>
); 