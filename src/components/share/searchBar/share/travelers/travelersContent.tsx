import { Person24Regular } from "@fluentui/react-icons";
import Counter from "./counter";
interface TravelersContentProps {
  adultCount: number;
  setAdultCount: (count: number) => void;
  childCount: number;
  setChildCount: (count: number) => void;
  infantCount: number;
  setInfantCount: (count: number) => void;
  className?: string;
  layout?: "vertical" | "horizontal";
  spacing?: "normal" | "wide";
}

function TravelersContent({
  adultCount,
  setAdultCount,
  childCount,
  setChildCount,
  infantCount,
  setInfantCount,
  className = "",
  layout = "vertical",
  spacing = "normal",
}: TravelersContentProps) {
  const isVertical = layout === "vertical";
  const totalTravelers = adultCount + childCount + infantCount;

  // If no travelers are selected, show 1 for adults, otherwise show the actual count
  const displayAdultCount = totalTravelers === 0 ? 1 : adultCount;

  const handleAdultIncrement = () => {
    if (totalTravelers === 0) {
      // If no travelers selected, set adult to 1
      setAdultCount(1);
    } else {
      setAdultCount(adultCount + 1);
    }
  };

  const handleAdultDecrement = () => {
    if (totalTravelers === 0) {
      // If no travelers selected, set adult to 0
      setAdultCount(0);
    } else {
      setAdultCount(Math.max(0, adultCount - 1));
    }
  };

  return (
    <div
      className={`flex  ${
        isVertical ? "flex-col" : "flex-row"
      } gap-2 ${className}`}
    >
      <Counter
        lable="بزرگسال"
        subLable="بزرگتر از 16 سال"
        icon={<Person24Regular />}
        count={displayAdultCount}
        onIncrement={handleAdultIncrement}
        onDecrement={handleAdultDecrement}
        spacing={spacing}
      />
      {isVertical ? (
        <hr className="w-full my-3" />
      ) : (
        <div className="h-auto w-[1px] bg-gray-200 mx-3"></div>
      )}
      <Counter
        lable="کودک"
        subLable="بین 2 تا 16 سال"
        icon={<Person24Regular color="#EA443F" />}
        count={childCount}
        onIncrement={() => setChildCount(childCount + 1)}
        onDecrement={() => setChildCount(Math.max(0, childCount - 1))}
        spacing={spacing}
      />
      {isVertical ? (
        <hr className="w-full my-3" />
      ) : (
        <div className="h-auto w-[1px] bg-gray-200 mx-3"></div>
      )}
      <Counter
        lable="نوزاد"
        subLable="کوچکتر از 2 سال"
        icon={<Person24Regular color="#EA443F" />}
        count={infantCount}
        onIncrement={() => setInfantCount(infantCount + 1)}
        onDecrement={() => setInfantCount(Math.max(0, infantCount - 1))}
        spacing={spacing}
      />
    </div>
  );
}

export default TravelersContent;
