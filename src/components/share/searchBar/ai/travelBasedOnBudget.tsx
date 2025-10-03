import { useWizard } from "@/hooks";
import FightSearchBar from "./fightSearchBar";
import Passengers from "./passengers";
import TravelDateSelector from "./travelDateSelector";
import WizardLayout from "./WizardLayout";

interface TravelBasedOnBudgetProps {
  resetSelection?: () => void;
}

function TravelBasedOnBudget({ resetSelection }: TravelBasedOnBudgetProps) {
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
      "1": <Passengers />,
      "2": <TravelDateSelector />,
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

export default TravelBasedOnBudget;
