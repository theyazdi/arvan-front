interface HotelSearchSummaryProps {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  onClick: () => void;
}

function HotelSearchSummary({ city, checkIn, checkOut, rooms, onClick }: HotelSearchSummaryProps) {
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">هتل در {city}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">از {checkIn} تا {checkOut}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">{rooms}</span>
      </div>
      <button
        onClick={onClick}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <i className="i-fluent:dismiss-16-regular text-gray-600"></i>
      </button>
    </div>
  );
}

export { HotelSearchSummary }; 