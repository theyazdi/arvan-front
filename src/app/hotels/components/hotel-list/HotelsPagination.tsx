import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface HotelsPaginationProps {
    page: number;
    totalPages: number;
    createPageUrl: (pageNum: number) => string | undefined;
}

const HotelsPagination: React.FC<HotelsPaginationProps> = ({
    page,
    totalPages,
    createPageUrl,
}) => {
    const getPaginationRange = () => {
        const delta = 1;
        const left = page - delta;
        const right = page + delta;
        const range = [];
        const rangeWithDots: (number | string)[] = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                range.push(i);
            }
        }

        let last: number | null = null;
        for (const num of range) {
            if (last !== null) {
                if (num - last > 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(num);
            last = num;
        }

        return rangeWithDots;
    };


    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination className="mt-5 rtl:space-x-reverse">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={page > 1 ? createPageUrl(page - 1) : undefined}
                        aria-disabled={page === 1}
                        tabIndex={page === 1 ? -1 : undefined}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {getPaginationRange().map((pageNum, index) => (
                    <PaginationItem key={typeof pageNum === 'number' ? pageNum : `ellipsis-${index}`}>
                        {pageNum === '...' ? (
                            <span className="px-4 py-2">...</span>
                        ) : (
                            <PaginationLink
                                href={createPageUrl(pageNum as number)}
                                isActive={page === pageNum}
                                size="icon"
                            >
                                {pageNum}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        href={page < totalPages ? createPageUrl(page + 1) : undefined}
                        aria-disabled={page === totalPages}
                        tabIndex={page === totalPages ? -1 : undefined}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export { HotelsPagination }; 