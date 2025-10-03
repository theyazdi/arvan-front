import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui";

function MostPopular() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="bg-[#E2E4E4] flex items-center gap-2 text-sm font-medium"
        >
          <span className="i-fluent:clover-24-regular"></span>
          نمایش بر اساس محبوب ترین ها
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right text-lg font-bold text-[#212121]">
            نمایش بر اساس محبوب ترین ها
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-4 items-start">
            <Button variant={"outline"} className="flex items-center gap-2 w-full justify-start font-medium">
                <span className="i-fluent:clover-24-regular h-5 w-5"></span>
                محبوب ترین
            </Button>
            <Button variant={"outline"} className="flex items-center gap-2 w-full justify-start font-medium">
                <span className="i-fluent:sparkle-24-regular h-5 w-5"></span>
                بهترین ارزش
            </Button>
            <Button variant={"outline"} className="flex items-center gap-2 w-full justify-start font-medium">
                <span className="i-fluent:timeline-24-regular h-5 w-5"></span>
                سریع ترین
            </Button>
            <Button variant={"outline"} className="flex items-center gap-2 w-full justify-start font-medium">
                <span className="i-fluent:receipt-money-24-regular h-5 w-5"></span>
                قیمت
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { MostPopular };
