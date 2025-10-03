"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components/ui/";
import { useState } from "react";

interface RemovePassengerInfoProps {
  removePassport: () => void;
}

function RemovePassengerInfo({ removePassport }: RemovePassengerInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full mt-3 md:hidden rounded-xl">
        <Button variant={"outline"}>برداشتن اطلاعات</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-lg font-bold text-right">
          حذف اطلاعات
        </DialogHeader>
        <DialogTitle className="text-base text-right">
          آیا مطمعن هستید که میخواهید اطلاعات وارد شده را پاک کنید؟
        </DialogTitle>
        <div className="flex flex-col gap-3 w-full">
          <Button variant={"destructive"} onClick={removePassport}>
            بله، حدف شود
          </Button>
          <Button variant={"ghost"} onClick={() => setIsOpen(false)}>
            لغو
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { RemovePassengerInfo };
