import Image from "next/image";
import Image1 from "../../../../public/img/Frame 1000002118.png";
import Image2 from "../../../../public/img/Frame 187.png";
import Image3 from "../../../../public/img/Frame 1000002119.png";

function SmartTravel({
  title,
  icon,
  type = "default",
  subtitle,
}: {
  title: string;
  icon: string;
  type?: "hotel" | "default" | "aboutus";
  subtitle?: string;
}) {
  const getContent = () => {
    if (type === "hotel") {
      return [
        {
          title: "تنوع گسترده اقامتگاه‌ها",
          image: Image1,
          description:
            "آرون تراول مجموعه‌ای متنوع از هتل‌ها و اقامتگاه‌ها را به شما ارائه میدهد. و در نهایت بهترین هتل را متناسب با بودجه تان پیشنهاد می دهد.",
        },
        {
          title: "رزرو سریع و آسان",
          image: Image2,
          description:
            "فرآیند رزرو کاملاً آنلاین و هوشمندانه طراحی شده است؛ با چند کلیک ساده، هتل خود را بدون دردسر و نگرانی رزرو میکنیم.",
        },
        {
          title: "قیمت‌های رقابتی و شفاف",
          image: Image3,
          description:
            "با شفافیت کامل در قیمت‌گذاری به شما اطمینان می‌دهدیم که دقیقاً همان مبلغ اعلام‌شده را پرداخت می‌کنید.",
        },
      ];
    }
    if (type === "aboutus") {
      return [
        {
          title: "خرید بلیط",
          image: Image1,
          description:
            "در آرون تراول، بلیط هواپیما بر اساس بودجه شما پیشنهاد می‌شود. ما کمک می‌کنیم بهترین پرواز ممکن را با کمترین قیمت متناسب با توان مالی‌تان پیدا و خریداری کنید.",
        },
        {
          title: "انتخاب مقصد",
          image: Image2,
          description:
            "مقصد سفر شما متناسب با بودجه، علاقه‌مندی و زمان دلخواهتان پیشنهاد می‌شود. به‌سادگی بودجه موردنظرتان را وارد کنید تا بهترین گزینه‌های اقتصادی و جذاب در اختیارتان قرار گیرد.",
        },
        {
          title: "انتخاب اقامتگاه",
          image: Image3,
          description:
            "آرون تراول با توجه به بودجه و سلیقه شما، بهترین اقامتگاه‌ها را پیشنهاد می‌دهد. از هتل‌های لوکس تا پلن های اقتصادی، همه چیز برای راحتی و رضایت شما تنظیم شده است.",
        },
      ];
    }
    return [
      {
        title: "صرفه جویی در زمان",
        image: Image1,
        description:
          "نیازی به جست‌وجو در سایت های مختلف، بررسی قیمت‌ها یا مقایسه تورها نیست. با وارد کردن بودجه، در کمتر از یک دقیقه برنامه سفر کامل خود را دریافت کنید. ما همه اطلاعات لازم را به‌صورت یک‌جا، دقیق و آماده در اختیار شما می‌گذاریم.",
      },
      {
        title: "سفر بر اساس بودجه واقعی شما",
        image: Image2,
        description:
          "شما فقط بودجه سفر خود را وارد می‌کنید و ما بهترین گزینه‌ها را مطابق توان مالی‌تان پیشنهاد می‌دهیم. برنامه سفر به‌گونه‌ای تنظیم می‌شود که هیچ هزینه اضافی و غیرضروری شامل حال شما نشود.",
      },
      {
        title: "داشتن پلن های مختلف برای سفر",
        image: Image3,
        description:
          "ما پلن‌های متنوع سفر را متناسب با بودجه، سلیقه و مدت زمان سفر شما ارائه می‌دهیم. هر پلن شامل ترکیبی از مقصد، اقامت و فعالیت‌های ویژه است که سفرتان را خاص و به یادماندنی  می‌کند.",
      },
    ];
  };

  const content = getContent();

  return (
    <div className="flex flex-col gap-8 md:gap-10 md:items-center items-start px-5 w-full">
      <div className="flex flex-col gap-4 md:items-center">
        <div className="flex items-start gap-4 md:gap-6">
          <span className={`${icon} w-8 h-8 md:w-12 md:h-12 hidden md:block`}></span>
          <h3 className="md:text-4xl text-xl font-bold">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-right md:text-center break-words leading-relaxed max-w-4xl text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 md:w-2/3 w-full">
        {content.map((item, index) => (
          <div
            key={index}
            className="p-4 md:p-6 md:rounded-full rounded-lg bg-white flex items-center gap-4"
          >
            <div className="flex md:flex-row flex-col md:items-center items-start gap-4">
              <Image
                src={item.image}
                alt=""
                width={160}
                height={160}
                className="md:w-20 md:h-20 w-14 h-14"
              />
              <div className="flex flex-col gap-1">
                <h3 className="md:text-lg text-sm font-bold">{item.title}</h3>
                <p className="font-300 md:text-base text-xs">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { SmartTravel };
