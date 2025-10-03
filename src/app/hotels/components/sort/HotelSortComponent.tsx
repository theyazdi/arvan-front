"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface HotelSearchParams {
  category?: string;
  brand?: string;
  quantity?: string;
  selected_product?: string;
  sort_by?: string;
}

interface HotelSortProps {
  searchParams: HotelSearchParams;
}

const HotelSortComponent = ({ searchParams }: HotelSortProps) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const category = searchParams.category || "";
  const brand = searchParams.brand || "";
  const quantity = searchParams.quantity || "1";
  const selectedProduct = searchParams.selected_product || "";
  const activeSort = searchParams.sort_by || "Most Popular";

  const formData = {
    category,
    brand,
    quantity,
    selected_product: selectedProduct,
  };

  const sortOptions = [
    { label: "با کیفیت‌ترین", icon: <span className="i-fluent:star-emphasis-24-regular"></span>, value: "Most Popular" },
    { label: "امتیاز مهمانان", icon: <span className="i-fluent:star-emphasis-24-regular"></span>, value: "Guest Rating" },
    { label: "ارزان‌ترین", icon: <span className="i-fluent:money-24-regular"></span>, value: "Price: Low to High" },
    { label: "گران‌ترین", icon: <span className="i-fluent:number-symbol-square-24-regular"></span>, value: "Price: High to Low" },
  ];

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-lg my-0 w-full min-w-[270px] max-w-[340px]">
        <div className="flex flex-row-reverse items-center justify-between mb-4">
          <span className="text-base font-semibold">مرتب سازی</span>
          <span className="i-fluent:arrow-sort-24-regular"></span>
        </div>
        <div className="mt-2">
          <div className="h-14 w-full rounded-xl bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full min-w-[260px] max-w-[340px]">
      <div className="flex flex-row gap-2 items-center mb-4">
        <span className="i-fluent:arrow-sort-24-regular"></span>
        <span className="text-base font-semibold">مرتب سازی</span>
      </div>
      <form action="/hotels" method="GET">
        {Object.entries(formData).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <Select
          name="sort_by"
          defaultValue={activeSort}
          open={open}
          onOpenChange={setOpen}
        >
          <SelectTrigger className="w-full h-14 rounded-xl border border-gray-200 bg-white px-5 text-base font-medium flex flex-row-reverse items-center justify-between">
            <span className="flex flex-row-reverse items-center gap-2">
              <SelectValue placeholder="انتخاب مرتب‌سازی" />
            </span>
            <span className="mr-2">
              {open ? <span className="i-fluent:chevron-up-24-regular"></span> : <span className="i-fluent:chevron-down-24-regular"></span>}
            </span>
          </SelectTrigger>
          <SelectContent className="w-full rounded-xl border border-gray-200 bg-white">
            {sortOptions.map((option, idx) => (
              <SelectItem key={idx} value={option.value} className="text-base flex flex-row-reverse items-center justify-start">
                <span className="mr-2">{option.label}</span>
                <span>{option.icon}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};

export { HotelSortComponent }; 