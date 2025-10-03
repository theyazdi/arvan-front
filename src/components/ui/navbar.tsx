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
// import Logo from "../../../public/img/Vora Logo.png"
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CaretDownFilled,
  CalendarClock24Regular,
  Money24Regular,
  Calculator24Regular,
} from "@fluentui/react-icons";
import { useAuth } from "@/app/(auth)";
import Logo from "../../../public/img/Vora Logo.png";

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  return (
    <div className="py-4 px-8 justify-between items-center hidden md:flex">
      <div className="flex items-center gap-4">
       <Link href="/">
       <Image src={Logo} alt="Vora Logo" className="h-16 w-auto" />
       </Link>

        <div className="flex gap-8 pr-10 flex-row">
          <Link
            href="/"
            className=" hover:border-b hover:border-b-black focus:border-b"
          >
            خانه
          </Link>

          <Link
            href="/hotels"
            className=" hover:border-b hover:border-b-black focus:border-b"
          >
            هتل و اقامتگاه
          </Link>

          <Link
            href="/tickets"
            className=" hover:border-b hover:border-b-black focus:border-b"
          >
            پرواز
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="hover:border-b hover:border-b-black flex items-center gap-1">
              سفر هوشمند
              <CaretDownFilled className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 rounded-2xl w-[240px]">
              <DropdownMenuItem className="text-lg py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                <CalendarClock24Regular className="w-7 h-7" />
                برنامه‌ریز سفر
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                <Money24Regular className="w-7 h-7" />
                سفر اقتصادی
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                <Calculator24Regular className="w-7 h-7" />
                محاسبه‌گر قیمت
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="hover:border-b hover:border-b-black flex items-center gap-1">
              درباره ما
              <CaretDownFilled className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 rounded-2xl w-[240px]">
              <DropdownMenuItem className="text-lg py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                <span className="i-fluent:call-24-filled w-6 h-6"></span>
                <Link href={"/contactus"}>تماس با ما</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                <span className="i-fluent:info-24-filled w-6 h-6"></span>
                <Link href={"/aboutus"}>درباره ما</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg py-2 px-2 flex flex-row-reverse items-center gap-3 border rounded-lg mb-2 hover:border-black hover:bg-gray-100 transition-all">
                <span className="i-fluent:document-one-page-multiple-sparkle-24-filled w-6 h-6"></span>
                <Link href="blog/">بلاگ</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Button
        variant="outline"
        size={"sm"}
        onClick={() => router.push(isLoggedIn ? "/dashboard" : "/login")}
      >
        {isLoggedIn ? "پنل کاربری" : "ورود / ثبت نام"}
      </Button>
    </div>
  );
};

export { Navbar };
