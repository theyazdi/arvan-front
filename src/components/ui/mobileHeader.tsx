"use client";
import React from "react";
import Image from "next/image";
import VoraLogo from "../../../public/img/Vora Logo.png";

const MobileHeader = () => {
  return (
   <div className="md:hidden flex flex-col items-start justify-center py-7 px-4">
          <Image src={VoraLogo} alt="Vora Logo" className="h-12 w-auto" />

      <h1 className="text-4xl font-bold text-right leading-relaxed mb-2 mt-4">
      بهترین سفر های خود را با ما تجربه کنید
      </h1>
    </div>
  );
};

export { MobileHeader };
