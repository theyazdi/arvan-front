import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    password2: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

interface FormData {
  password: string;
  password2: string;
}

interface SignupPasswordProps {
  onSubmit: (data: FormData) => void;
  formRef?: any;
}

function SignupPassword({ onSubmit, formRef }: SignupPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div>
      <form
        action=""
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <Input
          size="lg"
          placeholder="رمز عبور"
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <Input
          size="lg"
          placeholder="تکرار رمز عبور"
          {...register("password2")}
          errorMessage={errors.password2?.message}
        />
      </form>
    </div>
  );
}

export { SignupPassword };
