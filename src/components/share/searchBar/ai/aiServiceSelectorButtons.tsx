import { Button } from "@/components/ui/button";
import React from "react";
import { ServiceType } from "./aiServiceSelector";
import StepContainer from "./stepContainer";

interface AiServiceSelectorButtonsProps {
  handleServiceSelect: (service: ServiceType) => void;
}

function AiServiceSelectorButtons({
  handleServiceSelect,
}: AiServiceSelectorButtonsProps) {
  return (
    <StepContainer title="از کدام ویژگی هوشمند استفاده میکنید؟">
      <div className="flex flex-col md:flex-row items-center w-full gap-4">
        <Button
          size={"lg"}
          variant={"outline"}
          className="md:w-40 w-full rounded-lg py-4 px-15 font-medium"
          onClick={() => handleServiceSelect("travelAssist")}
        >
          برنامه ریز سفر
        </Button>
        <Button
          size={"lg"}
          variant={"outline"}
          className="md:w-40 w-full rounded-lg py-4 px-15 font-medium"
          onClick={() => handleServiceSelect("travelBug")}
        >
          سفر بر اساس بودجه
        </Button>
        <Button
          size={"lg"}
          variant={"outline"}
          className="md:w-40 w-full rounded-lg py-4 px-15 font-medium"
          onClick={() => handleServiceSelect("travelCalculate")}
        >
          محاسبه قیمت
        </Button>
      </div>
    </StepContainer>
  );
}

export default AiServiceSelectorButtons;
