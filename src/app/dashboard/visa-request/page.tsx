import React from "react";
import { VisaRequest } from "../components";
import { cookies } from "next/headers";
import { VisaProvider } from "@/hooks";

async function page() {
  const token = (await cookies()).get("arvan_access")?.value;
  return (
    <div>
      <VisaProvider>
        <VisaRequest token={token || ""} />
      </VisaProvider>
    </div>
  );
}

export default page;
