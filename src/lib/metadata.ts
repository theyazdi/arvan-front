import { Metadata } from "next";

export const siteConfig = {
  name: "آرون تراول",
  description: "آژانس هواپیمایی آرون",
  url: "https://arun-travel.com",
};

export const pageMetadata: Record<string, Metadata> = {
  "/": {
    title: "آرون تراول",
    description: "آژانس هواپیمایی آرون - برنامه‌ریزی هوشمند سفر",
  },
  "/hotels": {
    title: "رزرو هتل - آرون تراول",
    description: "رزرو هتل با بهترین قیمت و کیفیت - آرون تراول",
  },
  "/tickets": {
    title: "بلیط هواپیما - آرون تراول", 
    description: "خرید بلیط هواپیما با بهترین قیمت - آرون تراول",
  },
  "/contactus": {
    title: "تماس با ما - آرون تراول",
    description: "تماس با تیم پشتیبانی آرون تراول - پشتیبانی 24 ساعته",
  },
  "/aboutus": {
    title: "درباره ما - آرون تراول",
    description: "درباره آرون تراول - آژانس هواپیمایی معتبر",
  },
  "/blog": {
    title: "وبلاگ سفر - آرون تراول",
    description: "مقالات و راهنمای سفر - آرون تراول",
  },
};

export function generatePageMetadata(pathname: string, customTitle?: string, customDescription?: string): Metadata {
  const baseMetadata = pageMetadata[pathname] || pageMetadata["/"];
  const title = customTitle || baseMetadata.title || siteConfig.name;
  const description = customDescription || baseMetadata.description || siteConfig.description;
  
  return {
    title,
    description,
    openGraph: {
      title: title as string,
      description: description as string,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: title as string,
      description: description as string,
    },
  };
}
