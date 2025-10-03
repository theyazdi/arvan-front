import React from "react";

interface FlightTimelineMobileProps {
  orientation?: "horizontal" | "vertical";
}

function FlightTimelineMobile({ orientation = "horizontal" }: FlightTimelineMobileProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`relative ${isHorizontal ? "w-[156px] h-1" : "h-[156px] w-1"} 
      bg-[#3759B3] rounded-full`}
    >
      {/* Start Point */}
      <div
        className={`absolute ${isHorizontal ? "top-1/2 -translate-y-1/2 left-0" : "left-1/2 -translate-x-1/2 top-0"}`}
      >
        <div className="w-4 h-4 bg-[#3759B3] rounded-sm"></div>
      </div>

      {/* End Point */}
      <div
        className={`absolute ${isHorizontal ? "top-1/2 -translate-y-1/2 right-0" : "left-1/2 -translate-x-1/2 bottom-0"}`}
      >
        <div className="w-4 h-4 bg-[#3759B3] rounded-full"></div>
      </div>
    </div>
  );
}

export { FlightTimelineMobile };
