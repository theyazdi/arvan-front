import { Button } from "@/components/ui";

interface FlightCardFooterProps {
  price: number | string;
  onSelect: () => void;
  isPending: boolean;
}
function FlightCardFooter({
  price,
  onSelect,
  isPending,
}: FlightCardFooterProps) {
  const pricePerSeat = (Number(price) / 10).toFixed(0);
  return (
    <div className="flex items-center justify-between">
      <p className="text-xl font-bold">
        {Number(pricePerSeat).toLocaleString("fa-IR")} تومان
      </p>
      <Button
        onClick={onSelect}
        className="py-3 px-9 rounded-2xl bg-[#33363B] disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "در حال انتقال..." : "انتخاب پرواز"}
      </Button>
    </div>
  );
}

export { FlightCardFooter };