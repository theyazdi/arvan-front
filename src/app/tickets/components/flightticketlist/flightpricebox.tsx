"use client";
import { Button } from "@/components/ui";
import { useRouter, useSearchParams } from "next/navigation";

interface FlightPriceBoxProps {
  price: number | string;
  offerId: string;
  remainingSeats: number;
}

function FlightPriceBox({
  price,
  offerId,
  remainingSeats,
}: FlightPriceBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSelectFlight = () => {
    const params = new URLSearchParams(searchParams);
    params.set("offerId", offerId);
    router.push(`/details?${params.toString()}`);
  };

  const pricePerSeat = (Number(price) / 10).toFixed(0);
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-xl font-bold">
        {Number(pricePerSeat).toLocaleString("fa-IR")} تومان
      </span>
      <Button className="py-3 px-16 rounded-2xl" onClick={handleSelectFlight}>
        انتخاب بلیط
      </Button>
      {remainingSeats !== undefined && (
        <span className="text-xs">{remainingSeats} صندلی باقیمانده</span>
      )}
    </div>
  );
}

export { FlightPriceBox };
