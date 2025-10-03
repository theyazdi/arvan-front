"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useAuth } from "@/app/(auth)";
import { AddPassport, PassengerDataInfo } from "./addPassport";
import { API_BASE_URL } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { RemovePassengerInfo } from "./removepassengerinfo";

interface PassengerData {
  passportName: string;
  passportFamilyName: string;
  birthday: string;
  gender: "MALE" | "FEMALE";
  passportCountry: string;
  passportNumber: string;
  passportIssueDate: string;
  email?: string;
  phone?: string;
}

interface PassengersFormData {
  adults: PassengerData[];
}

interface PassengerFormSectionProps {
  index: number;
  isPrimary?: boolean;
  token?: string;
  selectedPassportNumbers?: (string | null)[];
  onSelectPassportNumber?: (passportNumber: string | null) => void;
}

function PassengerFormSection({
  index,
  isPrimary,
  token,
  selectedPassportNumbers,
  onSelectPassportNumber,
}: PassengerFormSectionProps) {
  const { isLoggedIn } = useAuth();
  const {
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<PassengersFormData>();
  const [PassportList, setPassportList] = React.useState<PassengerDataInfo[]>(
    []
  );
  const [selectedPassport, setSelectedPassport] =
    React.useState<PassengerDataInfo | null>(null);
  useEffect(() => {
    const getPassportInfo = async () => {
      if (!token) return;
      const res = await fetch(`${API_BASE_URL}/panel/passport-info/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPassportList(data);
    };
    getPassportInfo();
  }, [token]);

  const handleSelectPassport = (p: PassengerDataInfo) => {
    setValue(`adults.${index}.passportName`, p.passanger_first_name);
    setValue(`adults.${index}.passportFamilyName`, p.passanger_last_name);
    setValue(`adults.${index}.passportCountry`, p.passport_country);
    setValue(`adults.${index}.birthday`, p.birthday);
    setValue(`adults.${index}.gender`, p.sexuality);
    if (isPrimary) {
      setValue(`adults.${index}.email`, p.email || "");
      setValue(`adults.${index}.phone`, p.phone || "");
    }
    setSelectedPassport(p);
    if (onSelectPassportNumber) {
      onSelectPassportNumber(p.passport_number);
    }
  };

  const handleRemovePassport = () => {
    setSelectedPassport(null);
    if (onSelectPassportNumber) {
      onSelectPassportNumber(null);
    }

    setValue(`adults.${index}.passportName`, "");
    setValue(`adults.${index}.passportFamilyName`, "");
    setValue(`adults.${index}.passportCountry`, "");
    setValue(`adults.${index}.birthday`, "");
    setValue(`adults.${index}.gender`, "MALE");
    if (isPrimary) {
      setValue(`adults.${index}.email`, "");
      setValue(`adults.${index}.phone`, "");
    }
  };

  countries.registerLocale(enLocale);
  const countryList = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => ({
    code,
    name,
  }));

  const inputBaseName = `adults.${index}` as const;

  return (
    <div className=" p-4 mt-4 border border-gray-2 rounded-xl">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full md:w-auto md:gap-2 ">
          <h3 className="md:text-lg text-base">اطلاعات مسافر {index + 1}</h3>
          <p className="md:text-sm text-xs text-[#757575]">
            {isPrimary ? "مسافر اصلی" : ""}
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col md:items-center justify-between">
        <p className="text-[#757575] mt-1 md:text-base text-sm flex-shrink-0">
          اطلاعات کلی درباره مسافر را اضافه کنید
        </p>
        {isLoggedIn &&
          (selectedPassport ? (
            <Button
              variant="link"
              className="underline !md:block !hidden"
              onClick={handleRemovePassport}
            >
              حذف اطلاعات
            </Button>
          ) : (
            <AddPassport
              passports={Array.isArray(PassportList) ? PassportList : []}
              onSelect={handleSelectPassport}
              selectedPassport={selectedPassport}
              selectedPassportNumbers={selectedPassportNumbers}
            />
          ))}
      </div>

      {selectedPassport ? (
        <div className="md:p-4 px-2 py-4 my-4 flex flex-col gap-3">
          <div>
            <p className="font-bold">
              {selectedPassport.passanger_first_name}
              {selectedPassport.passanger_last_name}
            </p>
          </div>
          <div>
            <div className="flex md:flex-row flex-col-reverse items-center md:gap-6 gap-2 w-full">
              <div className="flex flex-col md:gap-1 gap-2 w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">تاریخ تولد</span>
                  <span className="text-sm text-gray">
                    {selectedPassport.birthday}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">شماره پاسپورت</span>
                  <span className="text-sm text-gray">
                    {selectedPassport.passport_number}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:gap-1 gap-2 w-full">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">جنسیت</span>
                  <span className="text-gray text-sm">
                    {selectedPassport.sexuality}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium">کشور</span>
                  <span className="text-gray text-sm">
                    {selectedPassport.passport_country}
                  </span>
                </div>
              </div>
            </div>
            {selectedPassport && (
              <RemovePassengerInfo removePassport={handleRemovePassport} />
            )}
          </div>
          {isPrimary && (
            <div className="grid md:grid-cols-2 gap-4 w-full md:mt-3 mt-2">
              <div className="flex flex-col gap-2">
                <Input
                  className="text-sm w-full"
                  size="lg"
                  placeholder="ایمیل"
                  {...register(`${inputBaseName}.email`)}
                  errorMessage={errors["adults"]?.[index]?.email?.message}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="tel"
                  className="text-sm w-full text-right"
                  size="lg"
                  placeholder="شماره تماس"
                  {...register(`${inputBaseName}.phone`)}
                  errorMessage={errors["adults"]?.[index]?.phone?.message}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full md:mt-4 mt-2">
          <div className="grid md:grid-cols-2 md:gap-4 gap-2 w-full">
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="نام"
                {...register(`${inputBaseName}.passportName`)}
                errorMessage={errors["adults"]?.[index]?.passportName?.message}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="نام خانوادگی"
                {...register(`${inputBaseName}.passportFamilyName`)}
                errorMessage={
                  errors["adults"]?.[index]?.passportFamilyName?.message
                }
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-4 gap-2 w-full">
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="1372/06/08 تاریخ تولد"
                {...register(`${inputBaseName}.birthday`)}
                errorMessage={errors["adults"]?.[index]?.birthday?.message}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name={`${inputBaseName}.gender`}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger asChild>
                      <div className="flex items-center justify-between">
                        <span className="i-fluent:chevron-down-24-regular w-6 h-6"></span>
                        <div className="flex flex-col gap-1 items-center">
                          <span className="text-xs text-[#757575]">جنسیت</span>
                          <SelectValue placeholder="Select" />
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="MALE">مرد</SelectItem>
                        <SelectItem value="FEMALE">زن</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-4 gap-2 w-full">
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name={`${inputBaseName}.passportCountry`}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger asChild>
                      <div className="flex items-center justify-between">
                        <span className="i-fluent:chevron-down-24-regular h-6 w-6"></span>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-[#757575]">کشور</span>
                          <SelectValue placeholder="Select" />
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {countryList.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                    {errors.adults?.[index]?.passportCountry?.message && (
                      <span className="text-red-500 text-xs">
                        {errors.adults?.[index]?.passportCountry?.message}
                      </span>
                    )}
                  </Select>
                )}
              />
            </div>
          </div>
          {isPrimary === true && (
            <div className="flex flex-col ">
              <div className="grid md:grid-cols-2 md:gap-4 gap-2 w-full md:mt-3 mt-2">
                <div className="flex flex-col gap-2">
                  <Input
                    className="text-sm w-full"
                    size="lg"
                    placeholder="ایمیل"
                    {...register(`${inputBaseName}.email`)}
                    errorMessage={errors["adults"]?.[index]?.email?.message}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    type="tel"
                    className="text-sm w-full text-right"
                    size="lg"
                    placeholder="شماره تماس"
                    {...register(`${inputBaseName}.phone`)}
                    errorMessage={errors["adults"]?.[index]?.phone?.message}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { PassengerFormSection };
