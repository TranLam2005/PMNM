"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getPaginationRange({
  currentPage,
  pageCount,
  siblingCount = 1,
}: {
  currentPage: number;
  pageCount: number;
  siblingCount?: number;
}): (number | "...")[] {
  if (!pageCount) {
    return [currentPage];
  }
  const totalPageNumbers = siblingCount * 2 + 5;
  if (pageCount <= totalPageNumbers) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < pageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = pageCount;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftRange, "...", lastPageIndex];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => lastPageIndex - (3 + 2 * siblingCount) + 1 + i
    );
    return [firstPageIndex, "...", ...rightRange];
  }

  if (showLeftDots && showRightDots) {
    const middlRange = Array.from({ length: 2 * siblingCount + 1 }, (_, i) => leftSiblingIndex + i);
    return [firstPageIndex, "...", ...middlRange, "...", lastPageIndex];
  }
  return [];
}

export interface PaginationBarProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  dataLength: number;
  onPageChange: (newPageIndex: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({
  pageIndex,
  pageCount,
  pageSize,
  pageSizeOptions,
  dataLength,
  onPageChange,
  onPageSizeChange,
}) => {
  const pagination = getPaginationRange({
    currentPage: pageIndex + 1,
    pageCount,
  });

  const handlePrevious = () => {
    if (pageIndex > 0) {
      onPageChange(pageIndex - 1);
    }
  };

  const handleNext = () => {
    // allow next if data.length === pageSize (assuming there's more)
    if (dataLength >= pageSize) {
      onPageChange(pageIndex + 1);
    }
  };


  return (
    <div className="flex items-center justify-between p-4 border rounded-md bg-white shadow-sm">
      {/* Page Size Selector */}
      <div className="md:flex items-center space-x-2 text-sm text-gray-700 hidden">
        <span>Số dòng hiển thị</span>
        <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handlePrevious} disabled={pageIndex === 0}>
          &lt; Previous
        </Button>

        {pagination.map((item, index) =>
          item === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              …
            </span>
          ) : (
            <Button
              key={index}
              variant={item === pageIndex + 1 ? "default" : "ghost"}
              size="sm"
              onClick={() => onPageChange((item as number) - 1)}
            >
              {item}
            </Button>
          )
        )}

        <Button variant="ghost" size="sm" onClick={handleNext} disabled={dataLength < pageSize}>
          Next &gt;
        </Button>
      </div>
    </div>
  );
};
