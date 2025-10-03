import { AddPassportInfo } from "@/app/dashboard/components";

interface PassportEmptyStateProps {
  token: string;
  getData: () => void;
}

function PassportEmptyState({ token, getData }: PassportEmptyStateProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold">اطلاعات پاسپورت</h3>
      <div className="mt-8">
        <p className="text-gray-5 text-xl  leading-15">
        لورم ایپسوم، متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده  از طراحان گرافیک است.
        </p>

        <AddPassportInfo
          mode="add"
          token={token}
          getData={getData}
        />
      </div>
    </div>
  );
}

export { PassportEmptyState };
