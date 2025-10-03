import {
  CreateAccount,
  SignupUserInfo,
  SignupWizardLayout,
  FormData,
  SignupPassword,
} from "@/app/(login)";
import { useWizard } from "@/hooks";
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { signupAction } from "../actions/signup";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)";
interface SignupSectionProps {
  setShowTabBar: Dispatch<SetStateAction<boolean>>;
}

interface SignupData {
  email: string;
  name: string;
  phone_number: string;
  password: string;
  password2: string;
}

function SignupSection({ setShowTabBar }: SignupSectionProps) {
  const { currentStep, nextStep, prevStep, setStepData, data } = useWizard();
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { setIsLoggedIn} = useAuth()

  const handleFirstStepNext = () => {
    setShowTabBar(false);
    nextStep();
  };

  const handleBackToSignup = () => {
    setShowTabBar(true);
    prevStep();
  };

  const handleFormSubmit = (data: FormData) => {
    if (currentStep === 1) {
      const transformedData = {
        email: data.email,
        name: data.name,
        phone_number: data.phoneNumber,
        password: "",
        password2: "",
      };
      setStepData("userInfo", transformedData);
      nextStep();
    }
  };

  const handleCreateAccount = async (passwordData: {
    password: string;
    password2: string;
  }) => {
    const signupData: SignupData = {
      ...data.userInfo,
      password: passwordData.password,
      password2: passwordData.password2,
    };
    const response = await signupAction(signupData);
    
    if (response.success) {
      setIsLoggedIn(true)
      router.push("/dashboard");
    }
  };

  const selectedStepMap = (selectedStep: number) => {
    const stepMap: Record<string, React.ReactNode> = {
      "0": <CreateAccount onClick={handleFirstStepNext} />,
      "1": <SignupUserInfo onSubmit={handleFormSubmit} formRef={formRef} />,
      "2": <SignupPassword onSubmit={handleCreateAccount} formRef={formRef} />,
    };
    return stepMap[selectedStep.toString()];
  };

  return (
    <SignupWizardLayout
      currentStep={currentStep}
      totalSteps={3}
      handleBackToSignup={handleBackToSignup}
      handleCreateAccount={() => formRef.current?.requestSubmit()}
      formRef={formRef}
    >
      {selectedStepMap(currentStep)}
    </SignupWizardLayout>
  );
}

export { SignupSection };
