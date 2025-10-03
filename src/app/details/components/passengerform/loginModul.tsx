"use client";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/(auth)";
import { Login } from "@/app/(login)";

interface PassengerForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface LoginModulProps { 
  open: boolean;
  setOpen: (open: boolean) => void;
}

function LoginModul({ open, setOpen }: LoginModulProps) {
  const { setIsLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: PassengerForm) => {
    const response = await Login(data);
    if (response.success) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="flex items-center md:gap-4 justify-between">
      <p className="text-sm">برای استفاده از پاس‌بوک شخصی </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild >
          <Button variant={"link"} className="text-[#4765B6]">
          ورود به سامانه
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ورود به اکانت خود</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant={"outline"}
                className="w-full flex items-center gap-2 justify-start rounded-lg"
              >
                
              ورود با گوگل
              </Button>
              <Button
                variant={"outline"}
                className="w-full flex items-center gap-2 justify-start rounded-lg"
              >
                
                ورود با فیسبوک
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <hr className="w-full border-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="email">لطفا ایمیل خود را وارد کنید</Label>
              <Input
                className="text-sm"
                type="email"
                id="email"
                placeholder="ایمیل"
                {...register("email")}
              />
              <span className="text-red-500 text-sm">
                {errors.email?.message}
              </span>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label htmlFor="Password">پسورد خود را وارد کنید</Label>
              <Input
                className="text-sm"
                type="Password"
                id="Password"
                placeholder="پسورد"
                {...register("password")}
              />
              <span className="text-red-500 text-sm">
                {errors.password?.message}
              </span>
            </div>
            <DialogFooter>
              <Button type="submit" className="px-14 py-3 rounded-lg">
                ورود
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { LoginModul };
