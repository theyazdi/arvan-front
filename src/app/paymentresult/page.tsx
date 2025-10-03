import { SecondaryNavbar } from "@/components/ui/secondary-navbar";
import Image from "next/image";
import pass from "../../../public/img/Successful Illustrations.png";
import fail from "../../../public/img/Illustration=Dot Confetti, Component=Successful Illustrations.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function PaymentResult({
  searchParams,
}: {
  searchParams: Promise<{
    successful: boolean;
    PaygateTranId: string;
    InvoiceId: string;
  }>;
}) {
  const params = await searchParams;
  const successful = params.successful;
  const PaygateTranId = params.PaygateTranId;
  const InvoiceId = params.InvoiceId;

  return (
    <>
      <SecondaryNavbar />
      <div className="container mx-auto">
        {successful.toString().toLocaleLowerCase() === "true" ? (
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-12 items-center">
              <Image src={pass} alt="pass" />
              <div className="flex flex-col gap-4 items-center">
                <p className="text-2xl font-medium">
                  پرداخت شما با موفقیت انجام شد
                </p>
                <p className="text-sm text-gray-500">
                  شماره پیگیری : {PaygateTranId}
                </p>
                <div className="flex items-center gap-4">
                  <Link href={"/"}>
                    <Button
                      variant={"outline"}
                      className="text-sm font-medium flex items-center gap-2 justify-start w-[200px] "
                      size={"lg"}
                    >
                      <span className="i-fluent:home-24-regular"></span>
                      رفتن به صفحه خانه
                    </Button>
                  </Link>
                  <Link href={"/dashboard"}>
                    <Button
                      variant={"outline"}
                      className="text-sm font-medium flex items-center gap-2 justify-start w-[200px] "
                      size={"lg"}
                    >
                      <span className="i-fluent:person-24-regular"></span>
                      ورود به پنل کاربری
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-12 items-center">
              <Image src={fail} alt="fail" />
              <div className="flex flex-col gap-4 items-center">
                <p className="text-2xl font-medium">پرداخت با مشکل مواجه شد</p>
                <p className="text-sm text-gray-500">
                  شماره پیگیری : {PaygateTranId}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={"/"}>
                  <Button
                    variant={"outline"}
                    className="text-sm font-medium flex items-center gap-2 justify-start w-[200px] "
                    size={"lg"}
                  >
                    <span className="i-fluent:home-24-regular"></span>
                    رفتن به صفحه خانه
                  </Button>
                </Link>
                <Link href={"/tickets"}>
                  <Button
                    variant={"outline"}
                    className="text-sm font-medium flex items-center gap-2 justify-start w-[200px] "
                    size={"lg"}
                  >
                    <span className="i-fluent:arrow-undo-24-regular"></span>
                    جستجو دوباره پرواز
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PaymentResult;
