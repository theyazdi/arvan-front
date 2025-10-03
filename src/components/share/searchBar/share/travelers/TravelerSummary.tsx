interface TravelerSummaryProps {
  adultCount: number;
  childCount: number;
  infantCount: number;
}

export function TravelerSummary({
  adultCount,
  childCount,
  infantCount,
}: TravelerSummaryProps) {
  return (
    <div className="flex items-center gap-2 h-full" >
      
      {adultCount > 0 && (
        
        <p className="text-sm font-bold">{adultCount} بزرگسال</p>
      )}
      {childCount > 0 && (
        <p className="text-sm font-bold">{childCount} کودک</p>
      )}
      {infantCount > 0 && (
        <p className="text-sm font-bold">{infantCount} نوزاد</p>
      )}
    </div>
  );
}
