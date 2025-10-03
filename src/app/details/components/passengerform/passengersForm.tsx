"use client";
import React, { useEffect, useState } from "react";
import { LoginModul } from "./loginModul";
import { PassengerFormSection } from "./passengerFormSection";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/app/(auth)/authProvider";
import { Button } from "@/components/ui";
interface PassengerData {
  passportName: string;
  passportFamilyName: string;
  birthday: string;
  gender: "MALE" | "FEMALE";
  passportCountry: string;
  email?: string;
  phone?: string;
}

export interface PassengersFormData {
  adults: PassengerData[];
}

const passengersFormSchema = z
  .object({
    adults: z.array(
      z.object({
        passportName: z.string().min(1),
        passportFamilyName: z.string().min(1),
        birthday: z.string().min(1),
        gender: z.enum(["MALE", "FEMALE"]),
        passportCountry: z.string().min(1),
        email: z.string().email().optional().or(z.literal("")),
        phone: z.string().min(1).optional().or(z.literal("")),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.adults.length > 0) {
      const firstPassenger = data.adults[0];
      if (!firstPassenger.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email is required for the primary passenger",
          path: ["adults", 0, "email"],
        });
      }
      if (!firstPassenger.phone) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone is required for the primary passenger",
          path: ["adults", 0, "phone"],
        });
      }
    }
  });

interface PassengersFormProps {
  onSubmit: () => void;
  setFormMethods?: (methods: any) => void;
  travellers: [];
  open: boolean;
  setOpen: (open: boolean) => void;
  token?: string;
}

function PassengersForm({
  onSubmit,
  setFormMethods,
  travellers,
  open,
  setOpen,
  token,
}: PassengersFormProps) {
  const { isLoggedIn } = useAuth();
  const methods = useForm<PassengersFormData>({
    resolver: zodResolver(passengersFormSchema),
    mode: "onChange",
    defaultValues: {
      adults: [],
    },
  });

  // Track selected passport numbers for each passenger
  const [selectedPassportNumbers, setSelectedPassportNumbers] = useState<
    (string | null)[]
  >([]);

  useEffect(() => {
    if (setFormMethods) {
      setFormMethods(methods);
    }
  }, [methods, setFormMethods]);

  const { fields, append, replace } = useFieldArray({
    control: methods.control,
    name: "adults",
  });

  useEffect(() => {
    const generatedFields = Array.from({ length: travellers.length }, () => ({
      passportName: "",
      passportFamilyName: "",
      birthday: "",
      gender: "MALE" as "MALE" | "FEMALE",
      passportCountry: "",
      email: "",
      phone: "",
    }));
    replace(generatedFields);
    setSelectedPassportNumbers(Array(travellers.length).fill(null));
  }, [travellers.length, replace]);

  // Callback to update selected passport number for a passenger
  const handleSelectPassportNumber = (
    index: number,
    passportNumber: string | null
  ) => {
    setSelectedPassportNumbers((prev) => {
      const updated = [...prev];
      updated[index] = passportNumber;
      return updated;
    });
  };

  return (
    <div>
      <div className="flex flex-col bg-white p-2 rounded-xl">
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <h3 className="text-lg font-medium">مسافرها</h3>
          {!isLoggedIn && <LoginModul open={open} setOpen={setOpen} />}
        </div>
        <div className="flex flex-col gap-8">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              {fields.map((field, index) => (
                <PassengerFormSection
                  key={field.id}
                  index={index}
                  isPrimary={index === 0}
                  token={token}
                  selectedPassportNumbers={selectedPassportNumbers}
                  onSelectPassportNumber={(passportNumber) =>
                    handleSelectPassportNumber(index, passportNumber)
                  }
                />
              ))}
            </form>
          </FormProvider>
        </div>
      </div>
      <Button
        onClick={() => methods.handleSubmit(onSubmit)()}
        className="w-full my-13 bg-[#212121] md:hidden h-12 rounded-xl"
      >
        ادامه و مرحله بعد
      </Button>
    </div>
  );
}

export { PassengersForm };
