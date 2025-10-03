"use client"
import {
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
  Select,
} from "@/components/ui";

import {
  Control,
  UseFormRegister,
  FieldErrors,
  Controller,
} from "react-hook-form";
import { VisaInfoFormData } from "./visainfo";

interface VisaTypeProps {
  register: UseFormRegister<VisaInfoFormData>;
  control: Control<VisaInfoFormData>;
  errors: FieldErrors<VisaInfoFormData>;
}

function VisType({ control, errors }: VisaTypeProps) {
  return (
    <div className="border-gray-3 rounded-2xl p-4 border">
      <h3 className="text-sm">نوع ویزا درخواستی</h3>
      <p className="text-sm text-gray-5 mb-2">
      ویزا مورد نظر را انتخاب کنید
      </p>
      <Controller
        control={control}
        name="visa_type"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value} dir="rtl">
            <SelectTrigger asChild>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#757575]">نوع ویزا</span>
                  <SelectValue placeholder="انتخاب کنید" />
                </div>
                <span className="i-fluent:chevron-down-20-regular"></span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tourist">Tourist</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="student">Student </SelectItem>
            </SelectContent>
            {errors.visa_type && (
              <span className="text-red-5 text-sm">
                {errors.visa_type?.message}
              </span>
            )}
          </Select>
        )}
      />
    </div>
  );
}

export { VisType };
