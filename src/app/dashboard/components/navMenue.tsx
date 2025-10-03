"use client";
import Image from "next/image";
import Logo from "../../../../public/img/Vora Logo.png";
import { Button } from "@/components/ui/button";
import { logoutAction } from "../actions/logout";
import { useAuth } from "@/app/(auth)";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavMenue() {
  const { setIsLoggedIn } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      setIsLoggedIn(false);
      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sectionList = [
    {
      icon: "i-fluent:home-24-filled h-6 w-6",
      label: "داشبورد",
      href: "/dashboard",
    },
    {
      icon: "i-fluent:task-list-square-24-regular h-6 w-6",
      label: "سفارشات",
      href: "/dashboard/orders",
    },
    {
      icon: "i-fluent:receipt-money-24-regular h-6 w-6",
      label: "لیست پرداختی ها",
      href: "/dashboard/payments",
    },
    {
      icon: "i-fluent:slide-text-person-24-regular h-6 w-6",
      label: "اطلاعات پاسپورت",
      href: "/dashboard/passport-info",
    },
    {
      icon: "i-fluent:contact-card-ribbon-24-regular h-6 w-6",
      label: "درخواست ویزا",
      href: "/dashboard/visa-request",
    },
  ];

  return (
    <div className="w-1/7 fixed right-0 top-0 h-screen bg-white hidden md:block">
      <div className="py-14 flex flex-col w-full h-full justify-center items-center">
        <Link href="/">
          <Image src={Logo} alt="Vora Logo" className="h-20 w-20" />
        </Link>

        <div className="flex flex-col gap-2 mt-14 px-4 w-full">
          <ul className="flex flex-col gap-2 w-full">
            {sectionList.map((item) => {
              let isActive = false;

              if (item.href === "/dashboard") {
                isActive = pathname === "/dashboard";
              } else {
                isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full transition-all duration-300 ${
                      isActive ? "bg-gray-900 text-white" : ""
                    }`}
                  >
                    <span className={`${item.icon} flex-shrink-0`}></span>
                    <span className="font-300">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto mb-4 px-4 w-full">
          <Link href="/dashboard/profile">
            <Button variant="ghost" className="w-full justify-start">
              <span className="i-fluent:person-24-regular h-6 w-6 flex-shrink-0"></span>
              <span className="font-300">تنظیمات و پروفایل کاربر</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <span className="i-fluent:sign-out-24-regular h-6 w-6 flex-shrink-0"></span>
            <span className="font-300">خروج از اکانت</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { NavMenue };
