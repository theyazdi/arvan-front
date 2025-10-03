import { cookies } from "next/headers";
import { Payment } from "../components";

async function page() {
  const token = (await cookies()).get("arvan_access")?.value;

  return (
    <div>
      <Payment token={token || ""} />
    </div>
  );
}

export default page;
