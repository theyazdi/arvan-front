// components/price-summary/PaymentMethodSelector.tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React from "react";

export interface PaymentMethodSelectorProps {
  selectedPayment: string;
  onChange: (val: string) => void;
}

function PaymentMethodSelector({ selectedPayment, onChange }: PaymentMethodSelectorProps) {
  return (
    <div>
      <div className="w-full h-px bg-gray-2 my-4"></div>
      <div className="flex items-center gap-2">
        <span className="i-fluent:money-24-regular w-6 h-6 mt-2"></span>
        <span className="text-xl font-bold">روش های پرداخت</span>
      </div>
      <div className="mt-5">
        <RadioGroup
          value={selectedPayment}
          onValueChange={onChange}
          className="flex flex-col space-y-3"
          dir="rtl"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="بانک سامان" id="saman" />
            <Label htmlFor="saman" className="text-sm">
              درگاه بانک سامان
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="بانک ملی" id="meli" />
            <Label htmlFor="meli" className="text-sm">
              درگاه بانک ملی
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
export {PaymentMethodSelector}
