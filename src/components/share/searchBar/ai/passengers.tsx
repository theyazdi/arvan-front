import React, { useEffect, useState } from "react";

import { useWizard } from "@/hooks";
import StepContainer from "./stepContainer";
import TravelersContent from "../share/travelers/travelersContent";

function Passengers() {
  const { data, setStepData } = useWizard();

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const setPassengers = () => {
    const totalTravelers = adultCount + childCount + infantCount;
    const effectiveAdultCount = totalTravelers === 0 ? 1 : adultCount;

    setStepData("adultCount", effectiveAdultCount);
    setStepData("childCount", childCount);
    setStepData("infantCount", infantCount);
  };

  useEffect(() => {
    setPassengers();
  }, [adultCount, childCount, infantCount]);

  return (
    <StepContainer title="چند نفر هستید؟">
      <div className="md:flex hidden items-center gap-4">
        <TravelersContent
          adultCount={adultCount}
          setAdultCount={(count: number) => setAdultCount(count)}
          childCount={childCount}
          setChildCount={(count: number) => setChildCount(count)}
          infantCount={infantCount}
          setInfantCount={(count: number) => setInfantCount(count)}
          layout="horizontal"
          spacing="wide"
        />
      </div>
      <div className="md:hidden">
        <TravelersContent
          adultCount={adultCount}
          setAdultCount={(count: number) => setAdultCount(count)}
          childCount={childCount}
          setChildCount={(count: number) => setChildCount(count)}
          infantCount={infantCount}
          setInfantCount={(count: number) => setInfantCount(count)}
          layout="vertical"
          spacing="normal"
        />
      </div>
    </StepContainer>
  );
}

export default Passengers;
