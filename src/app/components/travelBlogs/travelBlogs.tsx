import React from "react";
import {HeaderBlogSection , BlogCard} from "@/app/components"

const blogData = [
  {
    backgroundImage: "/img/flightBuy.jpg",
    category: "پرواز بین‌المللی",
    title: "چطور بلیط هواپیمای ارزان‌ بخریم؟",
    authorName: "بلاگ آرون",
    date: "۱۴۰۴/۰۶/۰۸",
    avatar: "/img/Blog Avatar 1.png",
    link: "https://arvantravels.com/blog/چطور-بلیط-هواپیمای-ارزان-بخریم/",
  },
  {
    backgroundImage: "/img/oman.jpg",
    category: "پرواز بین‌المللی",
    title: "جاهای دیدنی عمان کجاست؟",
    authorName: "بلاگ آرون",
    date: "۱۴۰۴/۰۶/۱۰",
    avatar: "/img/Blog Avatar 1.png",
    link: "https://arvantravels.com/blog/جاهای-دیدنی-عمان/",
  },
  {
    backgroundImage: "/img/euro.jpg",
    category: "پرواز بین‌المللی",
    title: "ارزانترین کشور اروپایی برای سفر",
    authorName: "بلاگ آرون",
    date: "۱۴۰۴/۰۵/۱۶",
    avatar: "/img/Blog Avatar 1.png",
    link: "https://arvantravels.com/blog/ارزانترین-کشور-اروپایی-برای-سفر/",
  },
];

function TravelBlogs() {
  return (
    <div className="container mx-auto px-4">
      <HeaderBlogSection />
      {/* Mobile Layout */}
      <div className="md:hidden w-full py-8 -mx-4">
        <div className="max-w-md mx-auto">
          <div className="flex gap-4 mt-8 overflow-x-auto scrollbar-hide pb-4">
            {blogData.map((blog, index) => (
              <BlogCard
                key={index}
                backgroundImage={blog.backgroundImage}
                category={blog.category}
                title={blog.title}
                authorName={blog.authorName}
                date={blog.date}
                avatar={blog.avatar}
                link={blog.link}
              />
            ))}
          </div>
          <a href="https://arvantravels.com/blog/">
          <button className="w-full mt-6 bg-gray-700 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            <span className="i-fluent:arrow-up-left-24-filled text-white"></span>
            همه بلاگ ها
          </button>
          </a>
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-6 mt-8 items-center justify-center">
          {blogData.map((blog, index) => (
            <BlogCard
              key={index}
              backgroundImage={blog.backgroundImage}
              category={blog.category}
              title={blog.title}
              authorName={blog.authorName}
              date={blog.date}
              avatar={blog.avatar}
              link={blog.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { TravelBlogs };
