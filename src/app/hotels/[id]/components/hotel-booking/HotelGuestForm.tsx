"use client";
import React, { useEffect, useState } from "react";
import { LoginModul } from "@/app/details/components/passengerform/loginModul";
import { AddPassport, PassengerDataInfo } from "@/app/details/components/passengerform/addPassport";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/app/(auth)/authProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui";
import { Controller, useFormContext } from "react-hook-form";
import { API_BASE_URL } from "@/lib/fetch";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

interface GuestData {
  passportName: string;
  passportFamilyName: string;
  birthday: string;
  gender: "MALE" | "FEMALE" | "";
  passportCountry: string;
  passportNumber: string;
  nationalCode: string;
  email?: string;
  phone?: string;
}

interface RoomData {
  guests: GuestData[];
}

export interface HotelGuestFormData {
  rooms: RoomData[];
}

const hotelGuestFormSchema = z
  .object({
    rooms: z.array(
      z.object({
        guests: z.array(
          z.object({
            passportName: z.string().min(1, "نام در گذرنامه الزامی است"),
            passportFamilyName: z.string().min(1, "نام خانوادگی در گذرنامه الزامی است"),
            birthday: z.string().min(1, "تاریخ تولد الزامی است"),
            gender: z.enum(["MALE", "FEMALE", ""]).refine((val) => val !== "", "جنسیت الزامی است"),
            passportCountry: z.string().min(1, "کشور الزامی است"),
            passportNumber: z.string().min(1, "شماره پاسپورت الزامی است"),
            nationalCode: z.string().min(1, "کد ملی الزامی است"),
            email: z.string().email("ایمیل معتبر وارد کنید").optional(),
            phone: z.string().optional(),
          })
        ),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.rooms.length > 0 && data.rooms[0].guests.length > 0) {
      const firstGuest = data.rooms[0].guests[0];
      if (!firstGuest.phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "شماره تماس برای مسافر اصلی الزامی است",
          path: ["rooms", 0, "guests", 0, "phone"],
        });
      }
      if (!firstGuest.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ایمیل برای مسافر اصلی الزامی است",
          path: ["rooms", 0, "guests", 0, "email"],
        });
      }
      if (!firstGuest.passportNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "شماره پاسپورت برای مسافر اصلی الزامی است",
          path: ["rooms", 0, "guests", 0, "passportNumber"],
        });
      }
      if (!firstGuest.passportCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "کشور برای مسافر اصلی الزامی است",
          path: ["rooms", 0, "guests", 0, "nationality"],
        });
      }
    }
  });

interface HotelGuestFormProps {
  onSubmit: () => void;
  setFormMethods?: (methods: any) => void;
  adults: number;
  children: number;
  rooms: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function GuestFormSection({ roomIndex, guestIndex, isPrimary, token }: { roomIndex: number; guestIndex: number; isPrimary: boolean; token?: string }) {
  const { isLoggedIn } = useAuth();
  const {
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext<HotelGuestFormData>();
  const [passportList, setPassportList] = React.useState<PassengerDataInfo[]>([]);
  const [selectedPassport, setSelectedPassport] = React.useState<PassengerDataInfo | null>(null);

  useEffect(() => {
    const getPassportInfo = async () => {
      if (!token) return;
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const res = await fetch(`${API_BASE_URL}/panel/passport-info/`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();

          setPassportList(data);
        } else {

          setPassportList([]);
        }
              } catch (error) {
          setPassportList([]);
        }
    };
    getPassportInfo();
  }, [token]);

  const handleSelectPassport = (p: PassengerDataInfo) => {
    if (p.passanger_first_name) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportName`, p.passanger_first_name);
    }
    if (p.passanger_last_name) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportFamilyName`, p.passanger_last_name);
    }
    if (p.passport_country) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportCountry`, p.passport_country);
    }
    if (p.birthday) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.birthday`, p.birthday);
    }
    if (p.sexuality) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.gender`, p.sexuality);
    }
    if (p.passport_number) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportNumber`, p.passport_number);
    }

    if (isPrimary) {
      if (p.email) {
        setValue(`rooms.${roomIndex}.guests.${guestIndex}.email`, p.email);
      }
      if (p.phone) {
        setValue(`rooms.${roomIndex}.guests.${guestIndex}.phone`, p.phone);
      }
    }
    setSelectedPassport(p);
  };

  const handleRemovePassport = () => {
    setSelectedPassport(null);
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportName`, "");
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportFamilyName`, "");
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportCountry`, "");
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.birthday`, "");
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.gender`, "");
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.passportNumber`, "");
    setValue(`rooms.${roomIndex}.guests.${guestIndex}.nationalCode`, "");
    if (isPrimary) {
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.email`, "");
      setValue(`rooms.${roomIndex}.guests.${guestIndex}.phone`, "");
    }
  };

  countries.registerLocale(enLocale);
  const countryList = Object.entries(
    countries.getNames("en", { select: "official" })
  ).map(([code, name]) => ({
    code,
    name,
  }));

  const inputBaseName = `rooms.${roomIndex}.guests.${guestIndex}` as const;

  return (
    <div className="p-3 md:p-4 mt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        <div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h3 className="text-base md:text-lg">اطلاعات مسافر {guestIndex + 1}</h3>
            <p className="text-xs md:text-sm text-[#757575]">
              {isPrimary ? "مسافر اصلی" : ""}
            </p>
          </div>
          <p className="text-xs md:text-sm text-[#757575] mt-1">
            اطلاعات کلی درباره مسافر را اضافه کنید
          </p>
        </div>
        {isLoggedIn && token &&
          (selectedPassport ? (
            <Button
              variant="link"
              className="underline"
              onClick={handleRemovePassport}
            >
              حذف اطلاعات
            </Button>
          ) : (
            <AddPassport
              passports={Array.isArray(passportList) ? passportList : []}
              onSelect={handleSelectPassport}
              selectedPassport={selectedPassport}
              selectedPassportNumbers={[]}
            />
          ))}
      </div>
      {selectedPassport ? (
        <div className="p-4 my-4 flex flex-col gap-3">
          <div>
            <p className="font-bold">
              {selectedPassport.passanger_first_name} {selectedPassport.passanger_last_name}
            </p>
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="flex flex-col gap-1 w-full">
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
            <div className="flex flex-col gap-1 w-full">
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
          {isPrimary && (
            <div className="grid grid-cols-2 gap-4 w-full mt-3">
              <div className="flex flex-col gap-2">
                <Input
                  className="text-sm w-full"
                  size="lg"
                  placeholder="ایمیل"
                  {...register(`${inputBaseName}.email`)}
                  errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.email?.message}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="tel"
                  className="text-sm w-full"
                  size="lg"
                  placeholder="شماره تماس"
                  {...register(`${inputBaseName}.phone`)}
                  errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.phone?.message}
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 w-full mt-3">
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="شماره پاسپورت"
                {...register(`${inputBaseName}.passportNumber`)}
                errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.passportNumber?.message}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:gap-2 w-full mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="نام در گذرنامه"
                {...register(`${inputBaseName}.passportName`)}
                errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.passportName?.message}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="نام خانوادگی در گذرنامه"
                {...register(`${inputBaseName}.passportFamilyName`)}
                errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.passportFamilyName?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Input
                className="text-sm w-full"
                size="lg"
                placeholder="تاریخ تولد"
                {...register(`${inputBaseName}.birthday`)}
                errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.birthday?.message}
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
                          <SelectValue placeholder="انتخاب کنید" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
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
                          <SelectValue placeholder="انتخاب کنید" />
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
                    {errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.passportCountry?.message && (
                      <span className="text-red-500 text-xs">
                        {errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.passportCountry?.message}
                      </span>
                    )}
                  </Select>
                )}
              />
            </div>
          </div>
          {isPrimary === true && (
            <div className="flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full mt-3">
                <div className="flex flex-col gap-2">
                  <Input
                    className="text-sm w-full"
                    size="lg"
                    placeholder="ایمیل"
                    {...register(`${inputBaseName}.email`)}
                    errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.email?.message}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    type="tel"
                    className="text-sm w-full"
                    size="lg"
                    placeholder="شماره تماس"
                    {...register(`${inputBaseName}.phone`)}
                    errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.phone?.message}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full mt-3">
                <div className="flex flex-col gap-2">
                  <Input
                    className="text-sm w-full"
                    size="lg"
                    placeholder="شماره پاسپورت"
                    {...register(`${inputBaseName}.passportNumber`)}
                    errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.passportNumber?.message}
                  />
                </div>
                <div className="flex flex-col gap-2">
                                  <Input
                  className="text-sm w-full"
                  size="lg"
                  placeholder="کد ملی"
                  {...register(`${inputBaseName}.nationalCode`)}
                  errorMessage={errors.rooms?.[roomIndex]?.guests?.[guestIndex]?.nationalCode?.message}
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

export function HotelGuestForm({
  onSubmit,
  setFormMethods,
  adults,
  children,
  rooms,
  open,
  setOpen,
}: Omit<HotelGuestFormProps, 'token'>) {
  const { isLoggedIn, token } = useAuth();
  
  const methods = useForm<HotelGuestFormData>({
    resolver: zodResolver(hotelGuestFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (setFormMethods) {
      setFormMethods(methods);
    }
  }, [methods, setFormMethods]);

  const { fields, append, replace } = useFieldArray({
    control: methods.control,
    name: "rooms",
  });

  useEffect(() => {
    const generatedRooms = Array.from({ length: rooms }, (_, roomIndex) => ({
      guests: Array.from({ length: Math.max(adults, 1) }, () => ({
        passportName: "",
        passportFamilyName: "",
        birthday: "",
        gender: "" as "MALE" | "FEMALE" | "",
        passportCountry: "",
        passportNumber: "",
        nationalCode: "",
        email: "",
        phone: "",
      })),
    }));
    replace(generatedRooms);
  }, [rooms, adults, replace]);

  const addGuestToRoom = (roomIndex: number) => {
    const currentRoom = methods.getValues(`rooms.${roomIndex}`);
    const updatedGuests = [...currentRoom.guests, {
      passportName: "",
      passportFamilyName: "",
      birthday: "",
      gender: "" as "MALE" | "FEMALE" | "",
      passportCountry: "",
      passportNumber: "",
      nationalCode: "",
      email: "",
      phone: "",
    }];
    methods.setValue(`rooms.${roomIndex}.guests`, updatedGuests);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
        <h3 className="text-base md:text-lg font-medium">مسافرها</h3>
        {!isLoggedIn && <LoginModul open={open} setOpen={setOpen} />}
      </div>
      
      <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-lg">
        <p className="text-xs md:text-sm text-gray-700 mb-2">
          کاربر گرامی، لطفا در هنگام وارد کردن اطلاعات به نکات زیر توجه داشته باشید
        </p>
        <ul className="text-xs md:text-sm text-gray-600 space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-1">•</span>
            <span>
              لطفا از صحت اطلاعات وارد شده (شماره موبایل و ایمیل) خود اطمینان حاصل فرمائید تا در مواقع ضروری با شما تماس گرفته شود. در صورت عدم صحت اطلاعات وارد شده عواقب ناشی از آن متوجه مشتری است.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-1">•</span>
            <span>
              بعد از رزرواسیون امکان تغییر نام مسافرین وجود ندارد.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {fields.map((roomField, roomIndex) => (
              <div key={roomField.id} className="border border-gray-200 rounded-lg p-4 md:p-6">
                <h4 className="text-base md:text-lg font-medium mb-3 md:mb-4">
                  مسافرین اتاق {roomIndex === 0 ? "اول" : "دوم"}
                </h4>
                
                {methods.watch(`rooms.${roomIndex}.guests`)?.map((_, guestIndex) => (
                  <GuestFormSection
                    key={guestIndex}
                    roomIndex={roomIndex}
                    guestIndex={guestIndex}
                    isPrimary={guestIndex === 0}
                    token={token}
                  />
                ))}
                
                <div className="flex justify-end mt-3 md:mt-4">
                  <Button
                    type="button"
                    className="bg-black text-white hover:bg-black/90 transition text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold"
                    onClick={() => addGuestToRoom(roomIndex)}
                  >
                    اضافه کردن مسافر جدید
                  </Button>
                </div>
              </div>
            ))}
          </form>
        </FormProvider>
      </div>
    </div>
  );
} 