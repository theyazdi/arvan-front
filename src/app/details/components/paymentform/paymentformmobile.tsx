import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethodSelectorProps } from "../pricesummary/paymentmethodselector";
function PaymentFormMobile({
  selectedPayment,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="p-2 flex flex-col gap-4 bg-white rounded-xl w-full">
      <p className="font-bold text-lg">انتخاب روش پرداخت</p>
      <div className="flex flex-col gap-3 w-full">
        <RadioGroup
          value={selectedPayment}
          onValueChange={onChange}
          className="flex flex-col space-y-2 w-full"
          dir="rtl"
        >
          <div className="flex items-center gap-2 border border-gray rounded-xl w-full px-2 py-4">
            <RadioGroupItem value="بانک سامان" id="saman" />
            <Label htmlFor="saman" className="text-sm flex-1">
              درگاه بانک سامان
            </Label>
          </div>
          <div className="flex items-center gap-2 border border-gray rounded-xl w-full px-2 py-4">
            <RadioGroupItem value="بانک ملی" id="meli" />
            <Label htmlFor="meli" className="text-sm flex-1">
              درگاه بانک ملی
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export { PaymentFormMobile };
