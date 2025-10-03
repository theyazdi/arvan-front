interface FlightTimeProps {
  time: string;
  city: string;
}

function FlightTime({ time, city }: FlightTimeProps) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <span className="text-2xl font-bold">{time}</span>
      <span className="text-xs">{city}</span>
    </div>
  );
}

export {FlightTime}