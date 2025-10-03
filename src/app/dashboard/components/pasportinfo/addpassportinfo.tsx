"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  Button,
} from "@/components/ui/";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_BASE_URL } from "@/lib";

countries.registerLocale(enLocale);
const countryList = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  code,
  name,
}));

export interface PasportInfoFormData {
  passanger_name: string;
  passportFamilyName: string;
  birthday: string;
  sexuality: "male" | "female";
  passport_number: string;
  passport_expiration_date: string;
  passport_country: string;
}

const schema = z.object({
  passanger_name: z.string().min(1),
  passportFamilyName: z.string().min(1),
  birthday: z.string().min(1),
  sexuality: z.enum(["male", "female"]),
  passport_number: z.string().min(1),
  passport_expiration_date: z.string().min(1),
  passport_country: z.string().min(1),
});

interface AddPassportInfoProps {
  mode: "add" | "edit";
  getData: () => void;
  token: string;
  id?: number;
}

function AddPassportInfo({ mode, getData, token, id }: AddPassportInfoProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PasportInfoFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: PasportInfoFormData) => {
    try {
      const addTransFormedData = {
        passport_first_name: data.passanger_name,
        passport_last_name: data.passportFamilyName,
        birthday: data.birthday,
        sexuality: data.sexuality.toUpperCase(),
        passport_number: data.passport_number,
        passport_expiration_date: data.passport_expiration_date,
        passport_country: data.passport_country,
      };
      if (mode === "add") {
        const response = await fetch(`${API_BASE_URL}/panel/passport-info/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addTransFormedData),
        });
        if (response.status === 201) {
          getData();
        }
      }
      if (mode === "edit") {
        const transFormedData = {
          id: id,
          ...addTransFormedData,
        };
        const response = await fetch(
          `${API_BASE_URL}/panel/passport-info/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(transFormedData),
          }
        );
        if (response.ok) {
          getData?.();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === "add" ? (
          <Button className="flex items-center gap-2 mt-4" size={"sm"}>
            <span className="i-fluent:add-20-regular"></span>
            اضافه کردن پاسپورت جدید
          </Button>
        ) : (
          <Button className="flex items-center gap-2 w-8 h-8 p-2" size={"icon"}>
            <span className="i-fluent:edit-20-regular"></span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-right">
            {mode === "add"
              ? "اضافه کردن پاسپورت جدید"
              : "ویرایش اطلاعات پاسپورت"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            {/* General Information Box */}
            <div className="w-1/2 p-4 border border-gray-200 rounded-lg min-h-[340px] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold">اطلاعات کلی</h3>
                <p className="text-gray-5 text-sm mt-1">
                  اطلاعات کلی مسافر را وارد کنید.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <Input
                  placeholder="نام"
                  {...register("passanger_name")}
                  errorMessage={errors.passanger_name?.message}
                />
                <Input
                  placeholder="نام خانوادگی"
                  {...register("passportFamilyName")}
                  errorMessage={errors.passportFamilyName?.message}
                />
                <Input
                  placeholder="تاریخ تولد"
                  {...register("birthday")}
                  errorMessage={errors.birthday?.message}
                />
                <Controller
                  control={control}
                  name="sexuality"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                      <span className="i-fluent:chevron-down-20-regular"></span>
                        <div className="flex flex-col text-xs text-gray-600">
                          جنسیت
                          <SelectValue placeholder="انتخاب کنید" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">مرد</SelectItem>
                        <SelectItem value="female">زن</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Passport Information Box */}
            <div className="w-1/2 p-4 border border-gray-200 rounded-lg min-h-[340px] flex flex-col ">
              <div>
                <h3 className="text-sm font-semibold">اطلاعات پاسپورت</h3>
                <p className="text-gray-5 text-sm mt-1">
                  اطلاعات مربوط به پاسپورت را وارد کنید.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <Input
                  placeholder="شماره پاسپورت"
                  {...register("passport_number")}
                  errorMessage={errors.passport_number?.message}
                />
                <Input
                  placeholder="تاریخ انقضای پاسپورت"
                  {...register("passport_expiration_date")}
                  errorMessage={errors.passport_expiration_date?.message}
                />
                <Controller
                  name="passport_country"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1">
                      <span className="i-fluent:chevron-down-20-regular"></span>
                        <div className="flex flex-col text-xs text-gray-600">
                          کشور 
                          <SelectValue placeholder="انتخاب کشور" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {countryList.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Submit button bottom-left */}
          <div className="mt-4">
            <Button size="sm" type="submit" className="flex items-center gap-2">
              <span className="i-fluent:save-24-regular"></span>
              {mode === "add" ? "افزودن مسافر" : "اعمال تغییرات"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { AddPassportInfo };
