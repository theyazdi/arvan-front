"use client";

interface FinalPriceProps {
  grandTotal: number;
}

function FinalPriceSummaryMobile({ grandTotal }: FinalPriceProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">قیمت نهایی</h3>
      <span className="text-xl font-bold">
        {grandTotal.toLocaleString("fa-IR")} تومان
      </span>
    </div>
  );
}

export { FinalPriceSummaryMobile };