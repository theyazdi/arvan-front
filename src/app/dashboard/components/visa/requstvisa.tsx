"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@/components/ui/";
import { RequstVisaForm } from "@/app/dashboard/components";
import { useVisa, WizardProvider } from "@/hooks";
import { useState } from "react";
import { API_BASE_URL } from "@/lib";

interface RequestvisaProps {
  token: string;
  getData: () => void;
}

function Requestvisa({ token, getData }: RequestvisaProps) {
  const [passengerList, setPassengerList] = useState(false);
  const { setVisaRequests } = useVisa();
  const getPassportData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/panel/passport-info/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setVisaRequests(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="flex items-center gap-2"
            onClick={() => getPassportData()}
          >
            <span className="i-fluent:layer-diagonal-person-24-regular"></span>
            درخواست ویزا
          </Button>
        </DialogTrigger>
        <DialogContent >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-right">درخواست ویزا امارات</DialogTitle>
          </DialogHeader>
          <WizardProvider totalSteps={2}>
            <RequstVisaForm
              getData={getData}
              token={token}
              passengerList={passengerList}
              setPassengerList={() => setPassengerList(!passengerList)}
            />
          </WizardProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { Requestvisa };
