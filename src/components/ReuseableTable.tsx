import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const Skeleton = ({ className }) => (
  <div className={cn('animate-pulse bg-muted rounded-md', className)} />
);

export default function ReusableTable({
  columns = [],
  data = [],
  actions,
  isLoading = false,
  pagination, // { total, currentPage, totalPages, perPage }
  onPageChange, // function (page, limit)
}) {
  const clientMode = !pagination;

  // Internal state
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(pagination?.perPage || 5);

  const totalPages = pagination?.totalPages || Math.ceil(data.length / limit);

  const paginatedData = useMemo(() => {
    if (clientMode) {
      const start = (currentPage - 1) * limit;
      return data.slice(start, start + limit);
    }
    return data; // server mode already paginated
  }, [data, currentPage, limit, clientMode]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      if (clientMode) setCurrentPage(page);
      else onPageChange?.(page, limit); // trigger API refetch with current limit
    }
  };

  const handleLimitChange = (newLimit) => {
    const numericLimit = Number(newLimit);
    setLimit(numericLimit);
    if (clientMode) {
      setCurrentPage(1); // reset to first page
    } else {
      onPageChange?.(1, numericLimit); // refetch from first page
    }
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const activePage = pagination?.currentPage || currentPage;
    const left = Math.max(2, activePage - delta);
    const right = Math.min(totalPages - 1, activePage + delta);

    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push('...');
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const paginationRange = useMemo(getPaginationRange, [
    pagination?.currentPage,
    currentPage,
    totalPages,
  ]);

  const activePage = pagination?.currentPage || currentPage;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: limit }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                {columns.map((col, j) => (
                  <TableCell key={`${col.key}-${j}`}>
                    <Skeleton className="h-4 w-3/4" />
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : paginatedData.length ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(row)}</TableCell>}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                <div className="text-center text-muted-foreground py-4">
                  No data available
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-border/60 mt-4 gap-4 p-4">
          {/* Left: rows per page + info */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                Rows per page:
              </span>
              <Select
                value={limit.toString()}
                onValueChange={handleLimitChange}>
                <SelectTrigger className="w-[90px] h-8 border-border/70 text-foreground">
                  <SelectValue placeholder="Select limit">
                    {limit} rows
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <span className="hidden sm:inline">
              Showing {(activePage - 1) * limit + 1}–
              {Math.min(activePage * limit, pagination?.total || data.length)}{' '}
              of {pagination?.total || data.length}
            </span>
          </div>

          {/* Right: pagination buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg text-sm"
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}>
              Previous
            </Button>

            {paginationRange.map((page, index) =>
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-muted-foreground select-none">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={page === activePage ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'rounded-lg w-8 h-8 p-0 text-sm',
                    page === activePage
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-foreground hover:bg-muted/60'
                  )}
                  onClick={() => handlePageChange(page)}>
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              className="rounded-lg text-sm"
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
