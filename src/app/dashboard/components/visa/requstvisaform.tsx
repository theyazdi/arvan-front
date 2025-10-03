"use client"
import { useWizard } from "@/hooks";
import { VisaInfo } from "./visainfo";

interface RequstVisaFormProps {
  token: string;
  passengerList: boolean;
  setPassengerList: () => void;
  getData: () => void;
}

function RequstVisaForm({
  token,
  passengerList,
  setPassengerList,
  getData,
}: RequstVisaFormProps) {
  const { nextStep } = useWizard();

  return (
    <div>
      <VisaInfo
        token={token}
        nextStep={nextStep}
        passengerList={passengerList}
        setPassengerList={setPassengerList}
        getData={getData}
      />
    </div>
  );
}

export { RequstVisaForm };
