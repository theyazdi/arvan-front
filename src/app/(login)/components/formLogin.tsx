import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login } from "../actions/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)/authProvider";
import { useState } from "react";
type FormLogin = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

function FormLogin() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormLogin>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (data: FormLogin) => {
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await Login(data);
      
      if (response.success) {
        setIsLoggedIn(true);
        reset();
        router.push("/dashboard");
      } else {
        const message = typeof response.message === 'string' 
          ? response.message 
          : (response.message as any)?.detail || "خطا در ورود";
        setErrorMessage(message);
      }
    } catch (error) {
      setErrorMessage("خطا در ورود. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="mt-3 sm:mt-4 flex flex-col gap-2 h-[280px] sm:h-[300px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && (
        <div className="text-red-500 text-xs sm:text-sm text-center p-2 bg-red-50 rounded">
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col gap-2 flex-grow">
        <Input
          size="lg"
          placeholder="ایمیل"
          label="ایمیل خود را وارد کنید"
          {...register("email")}
          errorMessage={errors?.email?.message}
        />
        <Input
          size="lg"
          placeholder="رمز عبور"
          label="رمز عبور خود را وارد کنید"
          {...register("password")}
          errorMessage={errors?.password?.message}
          type="password"
        />
      </div>
      <div className="flex justify-end items-center mt-auto">
        <Button 
          size="sm" 
          className="px-6 sm:px-10 py-2 sm:py-3 text-sm sm:text-base" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "در حال ورود..." : "ورود"}
        </Button>
      </div>
    </form>
  );
}
export { FormLogin };
