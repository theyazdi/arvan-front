"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CaretDownFilled,
  CalendarClock24Regular,
  Money24Regular,
  Calculator24Regular,
  Call24Filled,
  Info24Filled,
  DocumentOnePageMultipleSparkle24Filled,
} from "@fluentui/react-icons";
import { useAuth } from "@/app/(auth)";
import Logo from "../../../public/img/Vora Logo.png";

const SecondaryNavbar = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full flex justify-center p-4">
      <div className="bg-gradient-to-r from-white via-gray-100 to-gray-200 rounded-full px-6 py-4 max-w-7xl w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image src={Logo} alt="Vora Logo" className="md:h-14 h-24 w-auto" />
          </Link>
          <div className="hidden md:flex gap-8 ">
            <Link href="/" className="text-black font-medium">
              خانه
            </Link>
            <Link href="/tickets" className="text-black font-medium">
              پرواز
            </Link>
            <Link href="/hotels" className="text-black font-medium">
              هتل و اقامتگاه
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-black font-medium">
                سفرهوشمند <CaretDownFilled className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 rounded-2xl w-[220px]">
                <DropdownMenuItem className="text-base py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                  <CalendarClock24Regular className="w-7 h-7" />
                  برنامه‌ریز سفر
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                  <Money24Regular className="w-7 h-7" />
                  سفر اقتصادی
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg hover:border-black hover:bg-gray-100 transition-all">
                  <Calculator24Regular className="w-7 h-7" />
                  محاسبه‌گر قیمت
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-black font-medium">
                درباره ما <CaretDownFilled className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 rounded-2xl w-[220px]">
                <DropdownMenuItem className="text-base py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                  <Call24Filled className="w-6 h-6" />
                  <Link href="/contactus">تماس با ما</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                  <Info24Filled className="w-6 h-6" />
                  <Link href="/aboutus">درباره ما</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg hover:border-black hover:bg-gray-100 transition-all">
                  <DocumentOnePageMultipleSparkle24Filled className="w-6 h-6" />
                  <Link href="/blog/">بلاگ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="!hidden md:!block bg-white border-gray-200 text-black hover:bg-gray-50"
          onClick={() => router.push(isLoggedIn ? "/dashboard" : "/login")}
        >
          <span className="flex items-center justify-center h-full">
            {isLoggedIn ? "پنل کاربری" : "ورود / ثبت نام"}
          </span>
        </Button>
      </div>
      </div>
    </div>
  );
};

export { SecondaryNavbar };
