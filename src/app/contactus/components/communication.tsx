import Image from "next/image";
import Map from "../../../../public/img/new_map.png";

function Communication() {
  return (
    <div className="flex flex-col gap-8 md:gap-10 items-center justify-center">
      <div className="flex flex-col gap-4 items-start md:items-center w-full">
        <div className="flex gap-4 md:gap-6 items-center">
          <span className="i-fluent:headset-28-filled w-8 h-8 md:w-12 md:h-12 hidden md:block"></span>
          <h3 className="text-2xl md:text-4xl font-bold">راه های ارتباطی با ما</h3>
        </div>
        <p className="text-right md:text-center text-sm md:text-base">
از طریق شماره تلفن، ایمیل یا پیام در شبکه‌های اجتماعی آماده راهنمایی شما عزیزان هستیم.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="flex flex-col gap-4 md:gap-5 w-full md:w-auto">
          <div className="flex flex-col gap-2 items-start bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="i-fluent:call-28-filled h-5 w-5 md:h-6 md:w-6"></span>
              <span className="font-bold text-lg md:text-xl">شماره تماس</span>
            </div>
            <span className="text-sm md:text-base">۰۲۱۸۸۹۹۹۸۸۹</span>
          </div>
          <div className="flex flex-col gap-2 items-start bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="i-fluent:mail-28-filled h-5 w-5 md:h-6 md:w-6"></span>
              <span className="font-bold text-lg md:text-xl">ایمیل</span>
            </div>
            <span className="text-sm md:text-base">Support@vora.com</span>
          </div>
          <div className="flex flex-col gap-2 items-start bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="i-fluent:chat-bubbles-question-16-filled h-5 w-5 md:h-6 md:w-6"></span>
              <span className="font-bold text-lg md:text-xl">پشتیبانی آنلاین</span>
            </div>
            <span className="text-sm md:text-base">+۹۸۹۱۲۶۵۶۵۷۸۹</span>
          </div>
          <div className="flex flex-col gap-2 items-start bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="i-fluent:location-24-filled h-5 w-5 md:h-6 md:w-6"></span>
              <span className="font-bold text-lg md:text-xl">آدرس</span>
            </div>
            <span className="text-sm md:text-base">خیابان سعادت آباد- بلوار سرو غربی- بعد ا خیابان مروارید- پلاک33- ساختمان سرو سبز- طبقه 4 واحد 19</span>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <Image src={Map} alt="map" className="w-full md:w-200 h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export { Communication };

