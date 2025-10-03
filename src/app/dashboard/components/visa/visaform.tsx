"use client"
import {
  Input,
  SelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui";
import React, { useEffect } from "react";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  Controller,
  UseFormReset,
} from "react-hook-form";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { VisaInfoFormData } from "./visainfo";
import { useVisa } from "@/hooks";

countries.registerLocale(enLocale);
const countryList = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  code,
  name,
}));

interface VisaFormProps {
  register: UseFormRegister<VisaInfoFormData>;
  control: Control<VisaInfoFormData>;
  errors: FieldErrors<VisaInfoFormData>;
  reset: UseFormReset<VisaInfoFormData>;
}

function VisaForm({ register, control, errors, reset }: VisaFormProps) {
  const { selectedPassenger } = useVisa();

  useEffect(() => {
    if (selectedPassenger) {
      reset({
        passport_first_name: selectedPassenger.passanger_first_name || "",
        passport_last_name: selectedPassenger.passanger_last_name || "",
        birthday: selectedPassenger.birthday || "",
        passport_number: selectedPassenger.passport_number || "",
        sexuality: selectedPassenger.sexuality || "",
        passport_country: selectedPassenger.passport_country || "",
      });
    }
  }, [selectedPassenger, reset]);

  return (
    <div className="flex flex-col gap-3 mt-3">
      <Input
        placeholder="نام"
        {...register("passport_first_name")}
        errorMessage={errors.passport_first_name?.message}
      />
      <Input
        placeholder="نام خانوادگی"
        {...register("passport_last_name")}
        errorMessage={errors.passport_last_name?.message}
      />
      <Input
        placeholder="تولد"
        {...register("birthday")}
        errorMessage={errors.birthday?.message}
      />
      <Input
        placeholder="شماره پاسپورت"
        {...register("passport_number")}
        errorMessage={errors.passport_number?.message}
      />
      <Controller
        control={control}
        name="sexuality"
        defaultValue={selectedPassenger?.sexuality || "MALE"}
        render={({ field: { value, onChange } }) => (
          <Select
            onValueChange={onChange}
            value={value || selectedPassenger?.sexuality || "انتخاب کنید"}
          >
            <SelectTrigger asChild dir="rtl">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#757575]">جنسیت</span>
                  <SelectValue placeholder="Select">
                    {value || selectedPassenger?.sexuality || "Select"}
                  </SelectValue>
                </div>
                <span className="i-fluent:chevron-down-20-regular"></span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">other</SelectItem>
            </SelectContent>
            {errors.sexuality && (
              <span className="text-red-5 text-sm">
                {errors.sexuality?.message}
              </span>
            )}
          </Select>
        )}
      />
      <Controller
        name="passport_country"
        control={control}
        defaultValue={selectedPassenger?.passport_country || ""}
        render={({ field: { value, onChange } }) => (
          <Select
            onValueChange={onChange}
            value={value || selectedPassenger?.passport_country || ""}
          >
            <SelectTrigger asChild dir="rtl">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#757575]">
                  کشور
                  </span>
                  <SelectValue placeholder="انتخاب کنید">
                    {value || selectedPassenger?.passport_country || "انتخاب کنید"}
                  </SelectValue>
                </div>
                <span className="i-fluent:chevron-down-20-regular"></span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {countryList.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
            {errors.passport_country && (
              <span className="text-red-5 text-sm">
                {errors.passport_country?.message}
              </span>
            )}
          </Select>
        )}
      />
    </div>
  );
}

export { VisaForm };
