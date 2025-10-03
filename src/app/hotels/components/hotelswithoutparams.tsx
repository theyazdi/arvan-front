import Image from "next/image";
import HeaderImage from "../../../../public/img/Framehotels.png";
import MobileHeaderImage from "../../../../public/img/hotels.png";
import { HotelSearchSection } from "./hotelsearchsection";
import { SmartTravel } from "@/app/aboutus";
import { Faq } from "@/app/components";
import VoraLogo from "../../../../public/img/1.png";

function HotelsWithoutParams() {
  return (
    <div className="flex flex-col md:items-center mt-10 w-full">
      <Image src={HeaderImage} alt="HeaderImage" className="hidden md:block mx-auto"/>
      <Image src={MobileHeaderImage} alt="HeaderImage" className="block md:hidden mx-auto"/>
      <HotelSearchSection />
      <div className="mt-16 md:mt-40 flex flex-col gap-6 md:gap-10 w-full">
        <SmartTravel
          title="رزرو هتل و اقامتگاه"
          icon="i-fluent:building-16-filled"
          type="hotel"
          subtitle="رزرو هتل و اقامتگاه با بهترین قیمت‌ها و متناسب با بودجه و سلیقه‌تان، تنها در چند کلیک انجام می‌شود."
        />
      </div>

      <div className="mt-16 md:mt-40 w-full max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">
          <div className="flex-1 p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <Image src={VoraLogo} alt="VORA" width={80} height={40} className="hidden md:block" />
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-right w-full">
                تجربه سفری دلنشین با ما
              </h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 md:mb-8 leading-relaxed text-right">
              سفری که از دل خواسته‌هاتان شروع می‌شود و با آرامش، هیجان و خاطراتی
              به‌یادماندنی ادامه پیدا می‌کند.ما فقط سفر نمی‌سازیم، لحظه‌هایی
              می‌سازیم که همیشه دلتان برایشان تنگ می‌شود
            </p>
            <div className="flex flex-col items-center gap-3 md:grid md:grid-cols-2 md:gap-4">
              <div className="bg-gray-100 p-3 md:p-4 text-center rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-gray-800">
                  بیش از ۱۰۰،۰۰۰
                </div>
                <div className="text-gray-600 text-xs md:text-sm">هتل</div>
              </div>
              <div className="bg-gray-100 p-3 md:p-4 text-center rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-gray-800">
                  بیش از ۱۰۰،۰۰۰
                </div>
                <div className="text-gray-600 text-xs md:text-sm">اقامتگاه</div>
              </div>
              <div className="bg-gray-100 p-3 md:p-4 text-center rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-gray-800">
                  بیش از ۲۰ سال
                </div>
                <div className="text-gray-600 text-xs md:text-sm">سابقه</div>
              </div>
              <div className="bg-gray-100 p-3 md:p-4 text-center rounded-lg">
                <div className="text-lg md:text-2xl font-bold text-gray-800">۲۳۱</div>
                <div className="text-gray-600 text-xs md:text-sm">کشور</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full md:w-auto">
            <Image
              src="/img/Frame45.png"
              alt="Travel Experience"
              width={600}
              height={400}
              className="rounded-lg md:rounded-full w-full max-w-sm md:max-w-md mx-auto aspect-square md:aspect-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-40 w-full">
        <Faq type="hotels" />
      </div>
    </div>
  );
}

export { HotelsWithoutParams };
