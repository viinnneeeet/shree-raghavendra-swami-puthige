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
  onPageChange, // 👈 function to call when changing page
}) {
  // fallback to client-side if pagination not provided
  const clientMode = !pagination;

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = pagination?.perPage || 5;
  const totalPages =
    pagination?.totalPages || Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    if (clientMode) {
      const start = (currentPage - 1) * rowsPerPage;
      return data.slice(start, start + rowsPerPage);
    }
    return data; // server mode: data already paginated
  }, [data, currentPage, rowsPerPage, clientMode]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      if (clientMode) setCurrentPage(page);
      else onPageChange?.(page); // trigger API refetch
    }
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const left = Math.max(2, (pagination?.currentPage || currentPage) - delta);
    const right = Math.min(
      totalPages - 1,
      (pagination?.currentPage || currentPage) + delta
    );

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
            Array.from({ length: rowsPerPage }).map((_, i) => (
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

      {/* Pagination controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-end items-center pt-4 gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
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
                variant={page === activePage ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(page)}>
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
