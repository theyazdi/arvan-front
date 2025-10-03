"use client";

import { SectionHeader } from "../common/SectionHeader";

interface RuleItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const RuleItem: React.FC<RuleItemProps> = ({ icon, title, items }) => (
  <div>
    <SectionHeader 
      icon={icon}
      title={title}
      className="text-gray-600"
    />
    <ul className="space-y-2 text-gray-600">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export const RulesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-x-6 text-right" dir="rtl">
   
      <div className="space-y-6 md:space-y-8 text-right">
        <div>
          <h4 className="text-sm md:text-base font-bold mb-2 flex flex-row items-center gap-2 text-right">
            <span className="i-fluent:clock-24-regular w-4 h-4 md:w-5 md:h-5"></span>
            ورود
          </h4>
          <div className="text-xs md:text-sm text-gray-600">از ساعت ۱۵:۰۰</div>
        </div>
        <hr className="my-4 md:my-6 border-gray-200" />
        <div className="mt-6 md:mt-10">
          <h4 className="text-sm md:text-base font-bold mb-2 flex flex-row items-center gap-2 text-right">
            <span className="i-fluent:clock-24-regular w-4 h-4 md:w-5 md:h-5"></span>
            خروج
          </h4>
          <div className="text-xs md:text-sm text-gray-600">تا ساعت ۱۱:۰۰</div>
        </div>
      </div>
      
      <div className="space-y-6 md:space-y-8 text-right">
        <div>
          <h4 className="text-sm md:text-base font-bold mb-2 flex flex-row items-center gap-2 text-right">
            <span className="i-fluent:calendar-clock-24-regular w-4 h-4 md:w-5 md:h-5"></span>
            سیاست‌های لغو/پیش‌پرداخت
          </h4>
          <div className="text-xs md:text-sm text-gray-600">سیاست‌های لغو و پیش‌پرداخت بسته به نوع اقامتگاه متفاوت است. لطفا هنگام انتخاب، شرایط هر گزینه را بررسی کنید.</div>
        </div>
        <hr className="my-4 md:my-6 border-gray-200" />
        <div>
          <h4 className="text-sm md:text-base font-bold mb-2 flex flex-row items-center gap-2 text-right">
            <span className="i-fluent:bed-24-regular w-4 h-4 md:w-5 md:h-5"></span>
            کودکان و تخت‌ها
          </h4>
          <div className="text-xs md:text-sm text-gray-600 space-y-2">
            <div>کودکان در هر سنی مجاز به ورود هستند.</div>
            <div>کودکان ۴ سال و بالاتر به عنوان بزرگسال در این ملک محاسبه می‌شوند.</div>
            <div>برای دیدن قیمت‌ها و اطلاعات صحیح در مورد ظرفیت، لطفا تعداد کودکان در گروه خود و سن آن‌ها را به جستجوی خود اضافه کنید.</div>
          </div>
        </div>
      </div>
    
      <div className="space-y-6 md:space-y-8 text-right lg:col-span-1 md:col-span-2 lg:col-span-1">
        <div>
          <h4 className="text-sm md:text-base font-bold mb-2 flex flex-row items-center gap-2 text-right">
            <span className="i-fluent:people-team-24-regular w-4 h-4 md:w-5 md:h-5"></span>
            گروه‌ها
          </h4>
          <div className="text-xs md:text-sm text-gray-600">هنگام رزرو بیش از ۹ اتاق، سیاست‌ها و هزینه‌های اضافی متفاوتی ممکن است اعمال شود.</div>
        </div>
        <hr className="my-4 md:my-6 border-gray-200" />
        <div>
          <h4 className="text-sm md:text-base font-bold mb-2 text-right">محدودیت سنی</h4>
          <div className="text-xs md:text-sm text-gray-600">حداقل سن برای چک‌این ۱۸ سال است.</div>
        </div>
        <hr className="my-4 md:my-6 border-gray-200" />
        <div>
          <h4 className="text-sm md:text-base font-bold mb-2 flex flex-row items-center gap-2 text-right">
            <span className="i-fluent:animal-cat-24-regular w-4 h-4 md:w-5 md:h-5"></span>
            حیوانات خانگی
          </h4>
          <div className="text-xs md:text-sm text-gray-600">ورود حیوانات خانگی مجاز نیست.</div>
        </div>
      </div>
    </div>
  );
}; 