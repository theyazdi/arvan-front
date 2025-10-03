const ProgressLine = () => {
  return (
    <div className="flex items-center w-[214px]">
      <div className="relative flex items-center">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 border border-red-500 rounded-full"></div>
      </div>

      <div className="w-full h-[1.5px] bg-red-300 rounded-full"></div>
      <div className="relative flex items-center">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export { ProgressLine };
