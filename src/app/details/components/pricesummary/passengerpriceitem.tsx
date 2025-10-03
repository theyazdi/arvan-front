// components/price-summary/PassengerPriceItem.tsx
import React from "react";

interface Props {
  index: number;
  base: number;
  total: number;
  renderPayment?: () => React.ReactNode;
}

function PassengerPriceItem({
  index,
  base,
  total,
}: Props) {
  const taxes = Number((total - base).toFixed(2)).toLocaleString("fa-IR");

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">مسافر {index + 1}: بزرگسال</h3>
      <div className="flex items-center justify-between">
        <span>پرواز</span>
        <span className="text-sm">{base.toLocaleString("fa-IR")} تومان</span>
      </div>
      <div className="flex items-center justify-between">
        <span>مالیات‌ها، هزینه‌ها و شارژها</span>
        <span className="text-sm">{taxes} تومان</span>
      </div>
      
    </div>
  );
}

export {PassengerPriceItem}