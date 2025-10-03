import { useWizard } from "@/hooks";
import FightSearchBar from "./fightSearchBar";
import Budget from "./budget";
import Passengers from "./passengers";
import TravelModelSelector from "./travelModelSelector";
import StayOptionPicker from "./stayOptionPicker";
import TravelDateSelector from "./travelDateSelector";
import WizardLayout from "./WizardLayout";

interface CalculateExpensesProps {
  resetSelection: () => void;
}

function CalculateExpenses({ resetSelection }: CalculateExpensesProps) {
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    data,
    resetWizard,
  } = useWizard();

  const handleBackClick = () => {
    if (currentStep === 0) {
      if (resetSelection) {
        resetSelection();
      }
      resetWizard();
    } else {
      prevStep();
    }
  };

  const handleSearch = async () => {
    try {
      // Here you can implement the API call to send data to backend
      // Example API call:
      // const response = await fetch('/api/travel-search', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const selectWizardFromContentMap = () => {
    const wizardFromContentMap: Record<string, React.ReactNode> = {
      "0": <FightSearchBar />,
      "1": <Budget />,
      "2": <Passengers />,
      "3": <TravelModelSelector />,
      "4": <StayOptionPicker />,
      "5": <TravelDateSelector />,
    };
    return wizardFromContentMap[currentStep.toString()];
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      goToStep={goToStep}
      onBack={handleBackClick}
      onNext={isLastStep ? handleSearch : nextStep}
      isLastStep={isLastStep}
      isFirstStep={currentStep === 0}
    >
      {selectWizardFromContentMap()}
    </WizardLayout>
  );
}

export default CalculateExpenses;
