"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FlightPaginationProps {
  currentPage: number;
  totalPages: number;
  createPageUrl: (pageNum: number) => string | undefined;
}

const FlightPagination = ({ currentPage, totalPages, createPageUrl }: FlightPaginationProps) => {
  
  const getPaginationRange = () => {
    const range = [];
    const displayCount = 3; // Number of page links to show
    const sideCount = Math.floor((displayCount - 1) / 2);
    
    let start = Math.max(currentPage - sideCount, 1);
    let end = Math.min(start + displayCount - 1, totalPages);

    // Adjust start if end hits the totalPages limit early
    if (end === totalPages) {
      start = Math.max(totalPages - displayCount + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="mt-5 rtl:space-x-reverse">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href={createPageUrl(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            size="default"
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : undefined}
          />
        </PaginationItem>

        {getPaginationRange().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink 
              href={createPageUrl(pageNum)}
              isActive={currentPage === pageNum}
              size="icon"
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            href={createPageUrl(currentPage + 1)}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            size="default"
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { FlightPagination }; 