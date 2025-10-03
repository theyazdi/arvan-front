import { cookies } from "next/headers";
import { Dashboard } from "./components";

async function DashboardPage() {
  const token = (await cookies()).get("arvan_access")?.value;
  return (
    <div className="">
      <Dashboard />
    </div>
  );
}

export default DashboardPage;
