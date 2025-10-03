import React, { ReactNode } from "react";
import { NavMenue } from "./components";


function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
    <NavMenue />
    <div className="md:w-6/7 md:mr-[16.666667%] mx-5">{children}</div>
  </div>
  );
}

export default Layout;
