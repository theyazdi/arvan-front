import { Button } from "@/components/ui/index";


interface SearchSummaryMobileProps {
  origin: string;
  destination: string;
  date: string;
  adults: string;
  onClick?: () => void;
}

function SearchSummaryMobile({
  origin,
  destination,
  date,
  adults,
  onClick,
}: SearchSummaryMobileProps) {
  function formatPersianDate(date: Date) {
    const weekday = date.toLocaleDateString("fa-IR", { weekday: "long" });
    const day = date.toLocaleDateString("fa-IR", { day: "2-digit" });
    const month = date.toLocaleDateString("fa-IR", { month: "long" });
    const year = date.toLocaleDateString("fa-IR", { year: "numeric" });

    return `${weekday} ${day} ${month} ${year}`;
  }
  return (
    <div className="md:hidden py-3 px-4 rounded-xl flex flex-col w-full bg-white">
      <div className="flex items-center gap-20">
        <p className="text-sm font-medium text-[#212121]">{origin}</p>
        <div className="flex items-center gap-2">
          <span className="i-fluent:arrow-swap-24-regular"></span>
          <p className="text-sm font-medium text-[#212121]">{destination}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex items-center gap-2">
          <span className="text-[#212121] text-sm font-300">سفر رفت</span>
          <span className="text-sm font-medium text-[#212121]">
            {formatPersianDate(new Date(date))}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        <p className="text-sm font-300 text-[#212121]">برای</p>
        <span className="font-bold">{adults}</span>
        <p className="text-sm font-300 text-[#212121]">برزگسال</p>
      </div>
      <div className="flex items-end justify-end mt-3">
        <Button
          variant={"outline"}
          className="!px-3 !py-4 rounded-xl"
          onClick={onClick}
        >
          <span className="i-fluent:edit-24-regular"></span>
        </Button>
      </div>
    </div>
  );
}

export { SearchSummaryMobile };
