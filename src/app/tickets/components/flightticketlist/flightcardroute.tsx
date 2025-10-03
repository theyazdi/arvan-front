interface FlightCardRouteProps {
    departureTime: string;
    departureCity: string;
    arrivalTime: string;
    arrivalCity: string;
  }
function FlightCardRoute({
    departureTime,
    departureCity,
    arrivalTime,
    arrivalCity,
  }: FlightCardRouteProps) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center flex-1">
          <span className="font-bold">{departureTime}</span>
          <span className="font-300">{departureCity}</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="font-bold">{arrivalTime}</span>
          <span className="font-300">{arrivalCity}</span>
        </div>
      </div>
    );
  }
  
  export { FlightCardRoute };