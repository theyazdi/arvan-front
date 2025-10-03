import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@/components/ui/";
import { API_BASE_URL } from "@/lib";

interface VisaPaymentInfoProps {
  id: number;
  token: string;
}

function VisaPaymentInfo({ id, token }: VisaPaymentInfoProps) {
  const getData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/panel/visa-request/${id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} onClick={getData}>
            <span className="i-fluent:eye-24-regular"></span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Information</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-lg mt-5 flex flex-col gap-3">
            <div className="flex items-center ">
              <div className="flex flex-col w-1/2">
                <h4 className="text-sm">Invoice For</h4>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:airplane-24-regular"></span>
                  <p className="text-sm font-300 text-gray-5">
                    Airplane Ticket
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <h4 className="text-sm">Reservation ID</h4>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:slide-text-sparkle-24-regular"></span>
                  <p className="text-sm font-300 text-gray-5">123456789</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col w-1/2">
                <h4 className="text-sm">State</h4>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:checkmark-24-regular"></span>
                  <p className="text-sm font-300 text-gray-5">Paid</p>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <h4 className="text-sm">Date Of Payment</h4>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:calendar-ltr-24-regular"></span>
                  <p className="text-sm font-300 text-gray-5">2024/11/19</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col w-1/2">
                <h4 className="text-sm">Gateway</h4>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:money-hand-24-regular"></span>
                  <p className="text-sm font-300 text-gray-5">PayPal</p>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <h4 className="text-sm">Invoice ID</h4>
                <div className="flex items-center gap-2">
                  <span className="i-fluent:receipt-sparkles-24-regular"></span>
                  <p className="text-sm font-300 text-gray-5">123456789</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 border rounded-lg p-4">
            <h3 className="text-sm">Payment Details</h3>
            <p className="text-sm font-300 text-gray-5">
              Details of the made payment.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { VisaPaymentInfo };
