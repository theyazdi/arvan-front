import { Person24Regular } from "@fluentui/react-icons";

interface TravelersHeaderProps {
  totalTravelers: number;
  isOpen: boolean;
  spacing?: "normal" | "wide";
}

function TravelersHeader({
  totalTravelers,
  isOpen,
  spacing = "normal",
}: TravelersHeaderProps) {
  const isWide = spacing === "wide";

  return (
    <div className="flex items-start gap-2 cursor-pointer px-2 md:px-0">
      <Person24Regular
        className={`${isOpen ? "text-red-500" : "text-gray-500"} ${
          isWide ? "border-2 border-red-500 rounded-full p-1" : ""
        }`}
        fontSize={24}
        color={isWide ? "#EA443F" : isOpen ? "#EA443F" : "#6B7280"}
      />
      <div>
        <p className="font-bold text-gray-800">مسافرها</p>
        <p className="text-sm mt-1 text-gray-500">
          {totalTravelers === 0 || totalTravelers === 1
            ? "۱ مسافر"
            : `${totalTravelers} مسافر`}
        </p>
      </div>
    </div>
  );
}

export default TravelersHeader;
