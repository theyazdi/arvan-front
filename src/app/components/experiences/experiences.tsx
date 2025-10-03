import { ExperiencesCard } from "./experiencescard";

function Experiences() {
  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-6">
          <span className="i-fluent:sparkle-32-filled mt-5"></span>
          <h2 className="text-4xl font-bold">بهترین تجربیات در انتظار شما</h2>
        </div>
        <p className="text-center">
          دیگر نیازی به جست‌وجوی طولانی در میان تورها نیست؛ همه چیز را از صفر تا صد به ما بسپارید.
          <br />
                  </p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <ExperiencesCard image="/img/Frame 1000002118.png" />
        <ExperiencesCard image="/img/Frame 187.png" />
        <ExperiencesCard image="/img/Frame 1000002119.png" />
      </div>
    </div>
  );
}

export { Experiences };
