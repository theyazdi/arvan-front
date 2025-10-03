import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import defaultAvatar from "../../../../public/img/Blog Avatar 1.png";

interface BlogCardProps {
  backgroundImage: string;
  category?: string;
  title: string;
  authorName: string;
  date: string;
  avatar?: string | StaticImport;
  link?: string | StaticImport;
}

function BlogCard({
  backgroundImage,
  category = "پرواز بین المللی",
  title,
  authorName,
  date,
  avatar = defaultAvatar,
  link,
}: BlogCardProps) {
  return (
    <div
      className="w-[280px] h-[380px] md:w-[338px] md:h-[450px] relative rounded-2xl md:rounded-3xl cursor-pointer overflow-hidden group flex-shrink-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
      <div className="relative flex flex-col justify-between h-full p-4 md:px-8 md:py-4">
        <div className="flex justify-end">
          <span className="text-xs md:text-sm bg-gray-200 md:bg-white text-gray-700 md:text-gray-800 rounded-full px-3 py-1 md:ml-4">
            {category}
          </span>
        </div>
        <div className="flex flex-col gap-2 md:gap-2 mt-auto">
          <h3 className="text-lg md:text-[20px] font-bold text-white text-right leading-tight md:px-4">
            <a href={`${link}`}>{title}</a>
          </h3>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src={avatar}
                alt={`${authorName}'s avatar`}
                width={24}
                height={24}
                className="md:w-8 md:h-8 rounded-full"
              />
              <span className="text-xs md:text-sm text-white">نام نویسنده</span>
            </div>
            <span className="text-xs md:text-sm text-white">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export {BlogCard} ;
