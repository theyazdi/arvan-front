"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@/components/ui";
import { API_BASE_URL } from "@/lib";
import { useState } from "react";
interface DeletePassportInfoProps {
  id: number;
  token: string;
  getData: () => void;
}

function DeletePassportInfo({ id, token, getData }: DeletePassportInfoProps) {
  const [open, setOpen] = useState(false);
  const DeletePassportInfo = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/panel/passport-info/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setOpen(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"icon"} className="w-8 h-8 p-2">
            <span className="i-fluent:delete-20-regular"></span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">پاک کردن پاسپورت</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            آیا مطمئن هستید که می‌خواهید اطلاعات این مسافر را حذف کنید؟
          </DialogDescription>
          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button
                variant={"destructive"}
                size={"sm"}
                className="w-4/5"
                onClick={DeletePassportInfo}
              >
                بله، پاک شود.
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-1/5"
                onClick={() => setOpen(false)}
              >
                لغو
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { DeletePassportInfo };
