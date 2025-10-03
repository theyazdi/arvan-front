import Image from "next/image";
import Image1 from "../../../../public/img/contactusres.png";
import Image2 from "../../../../public/img/Frame 10000028945.png";

export function ContactHeroImage() {
  return (
    <div className="w-full max-w-sm md:max-w-none mx-auto">
      <Image
        src={Image1}
        alt="VORA Support Hero"
        className="rounded-lg w-full aspect-square md:hidden object-contain"
      />
      <Image
        src={Image2}
        alt="VORA Support Hero"
        className="rounded-full w-full hidden md:block"
      />
    </div>
  );
}
