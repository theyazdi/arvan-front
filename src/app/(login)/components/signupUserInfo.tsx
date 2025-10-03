import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
});

export type FormData = {
  phoneNumber: string;
  name: string;
  email: string;
};

interface SignupUserInfoProps {
  onSubmit: (data: FormData) => void;
  formRef?: any; 
}

function SignupUserInfo({ onSubmit, formRef }: SignupUserInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormData) => {
    const completeData = {
      ...data,
    };
    onSubmit(completeData);
    reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-2 mt-4 w-full max-w-full"
    >
      <div className="flex flex-col gap-2 w-full mx-h-14">
        <Input
          size={"lg"}
          placeholder="نام و نام خانودگی"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <Input
          size={"lg"}
          placeholder="ایمیل"
          {...register("email")}
          errorMessage={errors.email?.message}
        />

        <Input
          size={"lg"}
          placeholder="شماره تماس"
          className="w-full"
          {...register("phoneNumber")}
          errorMessage={errors.phoneNumber?.message}
        />
      </div>
    </form>
  );
}

export { SignupUserInfo };
