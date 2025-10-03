import { Button, Dialog, DialogContent, DialogTitle } from "@/components/ui";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Logo from "../../../../public/img/Vora Logo.png";
import LogoSm from "../../../../public/img/Vora Logo-sm.png";
import Link from "next/link";

function AiServiceSectionMobile() {
  return (
    <Dialog>
    <DialogTrigger asChild className="md:hidden">
      <Button className="flex items-center gap-2 bg-[#33363B] rounded-xl">
      <span className="i-fluent:sparkle-24-regular"></span>
        ویژگی های هوشمند
      </Button>
    </DialogTrigger>
    <DialogContent className="p-8">
      <DialogTitle className="flex flex-col gap-3 items-start">
      <span className="i-fluent:search-sparkle-24-regular h-12 w-12"></span>
        <p className="text-right text-sm text-[#757575]">
          لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
          استفاده از طراحان گرافیک است.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-6 bg-[#FAFAFA] p-2 rounded-xl">
            <div className="flex flex-col gap-2 items-start">
              <h3 className="text-sm font-bold">برآورد هزینه سفر</h3>
              <p className="text-sm text-[#757575] font-400">
                لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
              </p>
            </div>
            <Link href={""}>
              <Button size={"icon"} className="bg-[#33363B] p-2 w-8 h-8">
                <span className="i-fluent:arrow-up-left-24-regular"></span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-6 bg-[#FAFAFA] p-2 rounded-xl">
            <div className="flex flex-col gap-2 items-start">
              <h3 className="text-sm font-bold">رزرو پرواز</h3>
              <p className="text-sm text-[#757575] font-400">
                لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
              </p>
            </div>
            <Link href={""}>
              <Button size={"icon"} className="bg-[#33363B] p-2 w-8 h-8">
                <span className="i-fluent:arrow-up-left-24-regular"></span>
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-6 bg-[#FAFAFA] p-2 rounded-xl">
            <div className="flex flex-col gap-2 items-start">
              <h3 className="text-sm font-bold">رزرو اقامتگاه</h3>
              <p className="text-sm text-[#757575] font-400">
                لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.
              </p>
            </div>
            <Link href={""}>
              <Button size={"icon"} className="bg-[#33363B] p-2 w-8 h-8">
                <span className="i-fluent:arrow-up-left-24-regular"></span>
              </Button>
            </Link>
          </div>
        </div>
      </DialogTitle>
    </DialogContent>
  </Dialog>
  )
}

export {AiServiceSectionMobile} 