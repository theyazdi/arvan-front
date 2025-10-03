import { Button } from "@/components/ui";

interface SearchSummaryProps {
  from: string;
  date: string;
  passengers: string;
  onClick?: () => void;
}

function SearchSummary({
  date,
  from,
  passengers,
  onClick,
}: SearchSummaryProps) {

  
  return (
    <div
      className="md:flex hidden items-center bg-white rounded-xl shadow justify-between md:px-12 px-4 py-4 md:w-[1062px] w-full mx-auto"
      dir="rtl"
    >
      <div className="flex items-center md:gap-16 gap-4">
        <div className="flex items-center gap-2">
          <span className="i-fluent:airplane-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
          <p>{from}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="i-fluent:calendar-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
          <p>{new Date(date).toLocaleDateString("fa-IR")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="i-fluent:person-24-regular w-6 h-6 text-[#EA443F] mt-1"></span>
          <p>{passengers}</p>
        </div>
      </div>
      <Button size={"lg"} className="px-15" onClick={onClick}>
        تغییر جستجو
      </Button>
    </div>
  );
}

export { SearchSummary };
