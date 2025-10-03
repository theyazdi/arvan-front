import { useWizard } from "@/hooks";
import StepContainer from "./stepContainer";
import {
  Dismiss12Filled,
  SelectAllOn16Regular,
  BuildingSkyscraper16Regular,
  Home16Regular,
} from "@fluentui/react-icons";
import { Button } from "@/components/ui/button";

type StayOptionType = "hotel" | "accommodation" | "noDifference" | "noStay";

function StayOptionPicker() {
  const { data, setStepData } = useWizard();
  const options: {
    label: string;
    value: StayOptionType;
    icon: React.ReactNode;
  }[] = [
    { label: "هتل", value: "hotel", icon: <BuildingSkyscraper16Regular /> },
    { label: "اقامتگاه", value: "accommodation", icon: <Home16Regular /> },
    {
      label: "فرقی ندارد",
      value: "noDifference",
      icon: <SelectAllOn16Regular />,
    },
    { label: "محل اقامت پیشنهاد نده", value: "noStay", icon: <Dismiss12Filled /> },
  ];
  return (
    <StepContainer title="چه مدل اقامتی را ترجیح میدهید؟">
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
      </div>
    </StepContainer>
  );
}

export default StayOptionPicker;
