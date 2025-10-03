import React from 'react';

interface HotelListHeaderProps {
    totalCount: number;
    viewMode: "list" | "grid";
    onViewModeChange: (newMode: "list" | "grid") => void;
}

const HotelListHeader: React.FC<HotelListHeaderProps> = ({
    totalCount,
    viewMode,
    onViewModeChange
}) => {
    return (
        <div className="hidden md:flex items-center justify-between p-4 rounded-lg">
            <h3 className="text-sm text-gray-500">{totalCount} مورد یافت شد</h3>
            <div className="flex items-center w-fit border border-gray-300 rounded-full overflow-hidden">
            <button
                    className={`px-6 py-2 text-sm transition-colors duration-200 rounded-full ${
                        viewMode === "list"
                            ? "bg-white text-black"
                            : "bg-transparent text-black"
                    }`}
                    onClick={() => onViewModeChange("list")}
                    type="button"
                >
                    لیست
                </button>
                <button
                    className={`px-6 py-2 text-sm transition-colors duration-200 rounded-full ${
                        viewMode === "grid"
                            ? "bg-white text-black"
                            : "bg-transparent text-black"
                    }`}
                    onClick={() => onViewModeChange("grid")}
                    type="button"
                >
                    مشبک
                </button>
                
            </div>
        </div>
    );
};

export { HotelListHeader }; 