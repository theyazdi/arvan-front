import { Button } from "@/components/ui";

export type TabBarPage = "ورود" | "ثبت نام";

interface TabBarProps {
  activeTab: TabBarPage;
  setActiveTab: (tab: TabBarPage) => void;
}

function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 w-full relative">
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200"></div>

      <Button
        variant="link"
        className={`relative pb-2 mb-2 font-bold text-black text-sm sm:text-base ${
          activeTab === "ورود"
            ? "after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-black"
            : ""
        }`}
        onClick={() => setActiveTab("ورود")}
      >
        ورود
      </Button>

      <Button
        variant="link"
        className={`relative pb-2 mb-2 font-bold text-black text-sm sm:text-base ${
          activeTab === "ثبت نام"
            ? "after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-black"
            : ""
        }`}
        onClick={() => setActiveTab("ثبت نام")}
      >
        ثبت نام
      </Button>
    </div>
  );
}

export { TabBar };
