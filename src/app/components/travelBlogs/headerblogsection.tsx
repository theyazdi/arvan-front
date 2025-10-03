function HeaderBlogSection() {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex items-center justify-center gap-6">
        <span className="hidden md:block i-fluent:document-one-page-sparkle-24-filled mt-2 h-8 w-8"></span>
        <h2 className="text-2xl font-bold text-right md:text-center">بلاگ های مورد نیاز برای سفر</h2>
      </div>
      <p className="md:hidden text-gray-600 text-right max-w-md">
        از آنجایی که بسیاری از طراحان و برنامه نویسان برای تکمیل پروژه های خود و نشان دادن طرح تکمیل شده، نیاز به متنهای تستی و آزمایشی دارند.
      </p>
      <p className="hidden md:block text-center">
        ما برای شما مجموعه ای از موضوعات مهم و ضروری برای سفر را تهیه کردیم تا اطلاعات شما در این زمینه بالاتر رود.
        <br />
      </p>
    </div>
  );
}

export { HeaderBlogSection };
