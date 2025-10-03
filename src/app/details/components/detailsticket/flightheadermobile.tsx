import { Button } from "@/components/ui";

interface FlightHeaderProps {
  origin: string;
  destination: string;
}

function FlightHeaderMobile({ origin, destination }: FlightHeaderProps) {
  return (
    <>
      <p className="text-xs font-bold text-center">پرواز رفت</p>
      <hr className="mt-2 mb-6" />
      <div className="flex items-center gap-2">
        <span className="i-fluent:arrow-right-24-regular h-5 w-5"></span>
        <p className="font-bold">
          پرواز رفت از {origin} به {destination}
        </p>
      </div>
      <Button
        variant="outline"
        className="flex items-center gap-2 mt-3 py-3 px-4 text-xs rounded-xl"
      >
        <span className="i-fluent:edit-24-regular"></span>
        ویرایش پرواز
      </Button>
    </>
  );
}

export { FlightHeaderMobile };
