import React from "react";

function VerticalProgrec() {
  return (
    <div className="flex flex-col relative">
      <div className="absolute -top-3 -right-1 w-3 h-3 border border-red-500 rounded-full"></div>
      <div className="w-1 h-51 bg-red-500 rounded-full"></div>
      <div className="absolute -bottom-3 -right-1 w-3 h-3 border bg-red-500 rounded-full"></div>
    </div>
  );
}

export { VerticalProgrec };
