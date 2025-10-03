import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@/components/ui/";

function VisaRules() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <span className="i-fluent:text-bullet-list-square-warning-24-regular"></span>
            اطلاعات درباره قوانین ویزا
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-right">
              راهنمای انتخاب ویزا
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <div className="text-right leading-loose text-sm">
              <p>
                اگر قصد سفر به دبی را دارید، انواع مختلف ویزاهای توریستی وجود
                دارد که بسته به شرایط شما، نیازهای مختلف سفر را برآورده می‌کند:
              </p>
              <ul className="list-disc pr-4">
                <li>ویزای توریستی ورود تک، معتبر برای ۳۰ روز یا ۶۰ روز</li>
                <li>ویزای توریستی ورود چندگانه، معتبر برای ۳۰ روز یا ۶۰ روز</li>
                <li>ویزای توریستی ورود چندگانه بلندمدت، معتبر برای پنج سال</li>
                <li>ویزای ترانزیت، یکی برای ۴۸ ساعت و دیگری برای ۹۶ ساعت</li>
                <li>
                  ویزای ورود در بدو ورود، که یا برای ۳۰ روز یا ۹۰ روز بسته به
                  ملیت شما صادر می‌شود
                </li>
                <li>ویزای ورود در بدو ورود برای هندی‌ها با شرایط خاص</li>
                <li>eVisa برای ساکنان کشورهای شآرونی همکاری خلیج فارس</li>
              </ul>
              <p className="mt-3">
                برای اقامت بیش از حد مجاز، جریمه‌هایی وجود دارد که مبلغ آن ۵۰
                درهم در روز است و از ۱۰ روز پس از انقضای ویزا محاسبه خواهد شد.
              </p>
              <p>
                قبل از درخواست هر نوع ویزای توریستی، الزامات خاص نوع ویزای
                انتخابی خود را بررسی کرده و اطمینان حاصل کنید که تمام مدارک لازم
                آماده است.
              </p>
              <p>
                همچنین ممکن است بتوانید ویزای توریستی را از طریق وب‌سایت رسمی
                GDRFA یا مرکز خدمات امیر تمدید کنید.
              </p>
              <p>
                برای اطلاعات دقیق و به‌روز، لطفاً به وب‌سایت رسمی GDRFA مراجعه
                کنید.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <h3 className="text-xl font-bold">پست‌های مشابه</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center px-5 py-3 bg-gray-100 rounded-xl gap-6">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-bold">بلاگ ویزا امارات</h4>
                      <p className="text-sm">
                        لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                        بلکه روزنامه...
                      </p>
                    </div>
                    <Button size={"icon"}>
                      <span className="i-fluent:arrow-up-left-24-regular"></span>
                    </Button>
                  </div>
                  <div className="flex items-center px-5 py-3 bg-gray-100 rounded-xl">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-bold">بلاگ ویزا امارات</h4>
                      <p className="text-sm">
                        لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون
                        بلکه روزنامه...
                      </p>
                    </div>
                    <Button size={"icon"}>
                      <span className="i-fluent:arrow-up-left-24-regular"></span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { VisaRules };
