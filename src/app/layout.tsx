import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@unocss/reset/normalize.css";
import "@unocss/reset/sanitize/sanitize.css";
import "@unocss/reset/sanitize/assets.css";
import { AuthProvider } from "./(auth)/authProvider";
import { cookies } from "next/headers";

const yekanBakh = localFont({
  src: [
    {
      path: "../../public/font/woff2/YekanBakh-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakh-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
});

const yekanBakhFaNum = localFont({
  src: [
    {
      path: "../../public/font/woff2/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/font/woff2/YekanBakhFaNum-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh-fa-num",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آرون تراول",
  description: "آژانس هواپیمایی آرون",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("arvan_access")?.value;
  const refreshToken = cookieStore.get("arvan_refresh")?.value;
  
  return (
    <html lang="fa" suppressHydrationWarning={true}>
      <body
        className={`bg-gray-1 ${yekanBakh.variable} ${yekanBakhFaNum.variable}`}

      >
        <AuthProvider token={token} refreshToken={refreshToken}>{children}</AuthProvider>
      </body>
    </html>
  );
}
