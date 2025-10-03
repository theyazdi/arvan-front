import Image from "next/image";

function ExperiencesCard({ image }: { image: string }) {
  return (
    <div className="bg-white rounded-full flex items-center gap-4 p-6 w-3/5">
      <Image src={image} alt="image" width={80} height={80} />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold">تایتل معرفی</h3>
        <p className="font-300">
          از آنجایی که بسیاری از طراحان و برنامه‌نویسان برای تکمیل پروژه‌های خود
          و نشان دادن طرح تکمیل شده، نیاز به متن‌های تستی و آزمایشی دارند، و از
          آنجایی که تایپ متن‌های آزمایشی می‌تواند زمان بسیار زیادی از طراح بگیرد
          و زمان را هدر بدهد.
        </p>
      </div>
    </div>
  );
}

export { ExperiencesCard };
