import React from "react";
import StepContainer from "./stepContainer";
import { Button } from "@/components/ui";
import { useWizard } from "@/hooks";
import {
  Airplane16Regular,
  VehicleSubway16Regular,
  SelectAllOn16Regular,
  Dismiss12Filled,
  VehicleCar16Regular,
} from "@fluentui/react-icons";
type TravelModelType = "flight" | "train" | "noDifference" | "personal";

function TravelModelSelector() {
  const { data, setStepData } = useWizard();

  const options: {
    label: string;
    value: TravelModelType;
    icon: React.ReactNode;
  }[] = [
    { label: "هواپیما", value: "flight", icon: <Airplane16Regular /> },
    { label: "قطار", value: "train", icon: <VehicleSubway16Regular /> },
    { label: "وسیله شخصی", value: "personal", icon: <VehicleCar16Regular /> },
    {
      label: "فرقی ندارد",
      value: "noDifference",
      icon: <Dismiss12Filled />,
    },
  ];

  return (
    <StepContainer title="چه وسیله ای را برای سفر ترجیح میدهید؟">
      <div className="flex flex-col md:flex-row gap-4">
        {options.map(({ label, value, icon }) => (
          <Button
            key={value}
            className={`rounded-lg md:py-4 px-4 py-6 font-medium flex justify-start md:w-[210px] w-full transition-all 
              ${
                data.travelModel === value
                  ? "bg-gray-900 text-white hover:bg-gray-900 hover:text-white"
                  : "bg-white border border-gray-300"
              }`}
            size={"lg"}
            variant={"outline"}
            onClick={() => setStepData("travelModel", value)}
          >
            {icon}
            {label}
          </Button>
        ))}
        <div className="md:hidden flex items-center gap-4 w-full">
          <span className="i-fluent:info-24-filled h-12 w-12"></span>
          <p className="text-xs text-[#212121]">
            با انتخاب وسیله نقلیه شخصی، در بسته‌های ارائه شده، بلیت‌های حمل و
            نقل وجود نخواهد داشت.
          </p>
        </div>
      </div>
    </StepContainer>
  );
}

export default TravelModelSelector;
