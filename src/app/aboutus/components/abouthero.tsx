import Image from "next/image";
import Image1 from "../../../../public/img/hero-about.png";
import Image2 from "../../../../public/img/aboutmeres.png";

export function AboutHero() {
  return (
    <section className="container mx-auto flex flex-col items-center mb-10 mt-7">
      <div className="w-full max-w-sm md:max-w-none mx-auto">
        <Image
          src={Image2}
          alt="About Vora Hero"
          className="rounded-lg w-full aspect-square md:hidden object-contain"
        />
        <Image
          src={Image1}
          alt="About Vora Hero"
          className="w-full hidden md:block"
        />
      </div>
    </section>
  );
}
