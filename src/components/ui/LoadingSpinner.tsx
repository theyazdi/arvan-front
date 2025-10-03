
const LoadingSpinner: React.FC = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-5">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-gray-500 rounded-full animate-spin"></div>
        <span className="text-gray-500"> در حال بارگذاری...</span>
      </div>
    );
  };
  
  export  {LoadingSpinner};