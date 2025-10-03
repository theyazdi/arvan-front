import { Button } from "@/components/ui";

interface HeaderProps {
  flightDeparture: {
    destination: string;
    from: string;
    model: "پرواز رفت" | "پرواز برگشت";
  };
}

function HeaderFlighTicket({ flightDeparture }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-2xl font-bold">
          پرواز {flightDeparture.from} به {flightDeparture.destination} ({flightDeparture.model})
        </p>
        <span className="i-fluent:chevron-down-24-filled h-5 w-5"></span>
      </div>
      <h3 className="mt-5 font-medium">جزئیات پرواز</h3>
    </>
  );
}

export {HeaderFlighTicket}