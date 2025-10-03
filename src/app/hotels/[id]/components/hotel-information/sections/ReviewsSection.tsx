"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "../common/SectionHeader";

interface RatingBarProps {
  label: string;
  count: number;
  width: string;
  color: string;
}

const RatingBar: React.FC<RatingBarProps> = ({ label, count, width, color }) => (
  <div className="flex items-center gap-3">
    <div className="w-[70px] text-xs text-gray-500">{label}</div>
    <div className="flex-1 h-[3px] bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full" 
        style={{ 
          width,
          backgroundColor: color
        }} 
      />
    </div>
    <div className="w-8 text-xs text-gray-500 text-right">{count}</div>
  </div>
);

interface CategoryScoreProps {
  label: string;
  score: number;
  color: string;
}

const CategoryScore: React.FC<CategoryScoreProps> = ({ label, score, color }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-14 h-14">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="transparent"
          className="opacity-25"
        />
        <circle
          cx="28"
          cy="28"
          r="24"
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={`${(score / 10) * 150.79} 150.79`}
          className="transform"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        {score}
      </div>
    </div>
    <div className="mt-2 text-[11px] text-gray-500 text-center">{label}</div>
  </div>
);

interface ReviewItemProps {
  name: string;
  country: string;
  roomType: string;
  stayDuration: string;
  rating: number;
  comment: string;
  reply?: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ 
  name, 
  country, 
  roomType, 
  stayDuration, 
  rating, 
  comment,
  reply 
}) => (
  <div className="space-y-4">
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100" />
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1.5">
            <div className="flex items-center gap-1.5">
              <img src="/flags/us.svg" alt="USA" className="w-4 h-4" />
              <span>{country}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="i-fluent:home-24-regular w-4 h-4"></span>
              <span>{roomType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="i-fluent:clock-24-regular w-4 h-4"></span>
              <span>{stayDuration}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-medium">Excellent</span>
        <div className="bg-[#FF385C] text-white font-medium rounded px-2 py-1">
          {rating}
        </div>
      </div>
    </div>

    <p className="text-gray-500 leading-relaxed">{comment}</p>

    <div className="flex justify-end items-center gap-6">
      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
        <span className="i-fluent:thumb-like-24-regular w-5 h-5"></span>
        <span>Helpful</span>
      </button>
      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
        <span className="i-fluent:thumb-dislike-24-regular w-5 h-5"></span>
        <span>Not Helpful</span>
      </button>
    </div>

    {reply && (
      <div className="ml-16 p-6 border border-gray-200 rounded-xl">
        <div className="text-sm text-gray-500 mb-2">Reply, owner</div>
        <p className="text-gray-500 leading-relaxed">{reply}</p>
      </div>
    )}
  </div>
);

export const ReviewsSection: React.FC = () => {
  const ratings = [
    { label: "Excellent", count: 152, width: "85%", color: "#22c55e" },
    { label: "Very good", count: 152, width: "40%", color: "#22c55e" },
    { label: "Good", count: 152, width: "35%", color: "#22c55e" },
    { label: "Okay", count: 152, width: "30%", color: "#22c55e" },
    { label: "Fair", count: 152, width: "25%", color: "#22c55e" },
    { label: "Mediocre", count: 152, width: "20%", color: "#22c55e" },
    { label: "Poor", count: 152, width: "15%", color: "#ef4444" }
  ];

  const categories = [
    { label: "Staff", score: 3.0, color: "#FF385C" },
    { label: "Facilities", score: 5.0, color: "#4b5563" },
    { label: "Cleanliness", score: 7.5, color: "#22c55e" },
    { label: "Location", score: 3.0, color: "#FF385C" },
    { label: "Comfort", score: 3.0, color: "#FF385C" },
    { label: "Free wi-fi", score: 3.0, color: "#FF385C" },
    { label: "Value for money", score: 3.0, color: "#FF385C" },
    { label: "Service", score: 3.0, color: "#FF385C" }
  ];

  const reviews = [
    {
      name: "Jenny",
      country: "The USA",
      roomType: "King studio",
      stayDuration: "4 Nights, 10 Nov,2024",
      rating: 10,
      comment: "Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla, Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla,Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla",
      reply: "Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla, Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla"
    },
    {
      name: "John",
      country: "The USA",
      roomType: "Deluxe Room",
      stayDuration: "2 Nights, 15 Nov,2024",
      rating: 9,
      comment: "Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla, Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla,Lorem ipsum dolor sit amet. Qui dolor quod et quia aliquam sit facilis adipisci rem consectetur sunt est Quis nulla"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Reviews</h2>
      </div>

      {/* Rating Overview */}
      <div className="flex gap-24">
        {/* Left side - Rating score and bars */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#FF385C] text-white text-2xl font-semibold rounded px-3 py-1.5">
              8.7
            </div>
            <div>
              <div className="text-sm text-gray-600">Excellent</div>
              <div className="text-xs text-gray-500">6,963 reviews</div>
            </div>
          </div>

          {/* Rating bars */}
          <div className="space-y-2.5">
            {ratings.map((rating) => (
              <RatingBar key={rating.label} {...rating} />
            ))}
          </div>
        </div>

        {/* Right side - Categories */}
        <div className="flex-1">
          <h3 className="text-sm text-gray-500 mb-6">Categories:</h3>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryScore key={category.label} {...category} />
            ))}
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="h-px bg-gray-200" />

      {/* Comments Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-medium text-gray-900">Comments</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <Select defaultValue="excellent">
              <SelectTrigger className="w-[180px] bg-gray-50 border-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Review Items */}
        <div className="space-y-12">
          {reviews.map((review, index) => (
            <ReviewItem key={index} {...review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100">
            4
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 