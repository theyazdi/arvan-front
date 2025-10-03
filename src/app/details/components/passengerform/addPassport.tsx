"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import React, { useState } from "react";

export interface PassengerDataInfo {
  passanger_first_name: string;
  passanger_last_name: string;
  birthday: string;
  sexuality: "MALE" | "FEMALE";
  passport_country: string;
  passport_expiration_date: string;
  passport_number: string;
  email?: string;
  phone?: string;
}

interface AddPassportProps {
  passports: PassengerDataInfo[];
  onSelect: (p: PassengerDataInfo) => void;
  selectedPassport?: PassengerDataInfo | null;
  selectedPassportNumbers?: (string | null)[];
}

export function AddPassport({
  passports,
  onSelect,
  selectedPassport,
  selectedPassportNumbers,
}: AddPassportProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (passport: PassengerDataInfo) => {
    onSelect(passport);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="md:text-gray-500 md:underline text-white bg-[#33363B] md:bg-white mt-4 md:mt-0 rounded-xl"
        >
          <span className="hidden md:block">انتخاب از دفترچه مسافرها</span>
          <span className="md:hidden text-xs">انتخاب از لیست مسافران</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[628px]">
        <DialogHeader>
          <DialogTitle>افزودن مسافر</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {passports.length === 0 ? (
            <p className="text-sm text-gray-500">هیچ پاسپورتی پیدا نشد.</p>
          ) : (
            passports.map((passport, index) => (
              <div
                key={index}
                className="p-3 border border-gray-2 rounded-2xl flex items-center gap-4"
              >
                <Button
                  variant={"outline"}
                  className="rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => handleSelect(passport)}
                  disabled={
                    selectedPassportNumbers?.includes(
                      passport.passport_number
                    ) &&
                    selectedPassport?.passport_number !==
                      passport.passport_number
                  }
                >
                  {selectedPassportNumbers?.includes(
                    passport.passport_number
                  ) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </Button>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-lg font-bold">
                      {passport.passanger_first_name}{" "}
                      {passport.passanger_last_name}
                    </p>
                    <p className="text-sm">{passport.sexuality}</p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm font-medium">شماره پاسپورت</p>
                    <p className="text-sm">{passport.passport_number}</p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm font-medium">تاریخ تولد</p>
                    <p className="text-sm">{passport.birthday}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
