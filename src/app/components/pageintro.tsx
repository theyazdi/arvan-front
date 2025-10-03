import Image from "next/image";
import React from "react";
import HeaderImage from "../../../public/img/Frame 1000002894.png";

function PageIntro() {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex flex-col md:gap-6 gap-4">
        <h2 className="md:text-5xl text-3xl font-bold leading-normal">
          سفر رویایی خود را متناسب <br /> با بودجه‌ ات بساز.
        </h2>
        <p className="md:text-lg text-base text-[#212121]">
          <br /> با چند کلیک، یک سفر کامل، اختصاصی و به‌صرفه برای شما طراحی
          می‌کنیم.{" "}
        </p>
      </div>
      <Image
        src={HeaderImage}
        alt="headerImage"
        width={519}
        height={360}
        className="md:block hidden"
      />
    </div>
  );
}

export { PageIntro };
