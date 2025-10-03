interface RatingStarsProps {
  rating: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="i-fluent:star-24-filled w-3 h-3 md:w-5 md:h-5 text-yellow-500"></span>);
    } else {
      stars.push(<span key={i} className="i-fluent:star-24-regular w-3 h-3 md:w-5 md:h-5 text-gray-400"></span>);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
}; 