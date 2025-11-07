"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";
import { CellConfig, ColumnConfig } from "./registry";
import { getNestedValue, normalizeValue } from "./cells/helper";
import { AutoCellRenderer } from "./AutoCellRender";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { PaginationBar } from "./pagination/PaginationBar";
import { Wrapper } from "../wrapper";
import React from "react";

export interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (newIndex: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

interface AutoTableProps<T> {
  columns: ColumnConfig[];
  data: T[];
  pagination?: PaginationProps;
  onAction?: (action: string, row: T) => void;
  onChange?: (row: T, accessorKey: keyof T, value: T[keyof T]) => void;
}

export function AutoTable<T extends object>({
  columns,
  data,
  pagination,
  onAction,
  onChange,
}: AutoTableProps<T>) {
  const visibleColumns = columns.filter((col) => col.visible !== false); // get all visbible columns
  const tableColumns: ColumnDef<T>[] = visibleColumns.map((col) => {
    const base: ColumnDef<T> = {
      accessorKey: col.accessorKey,
      header: col.header,
      meta: col.meta,
    };
    if (col.cell) {
      base.cell = ({ row }) => {
        const value = getNestedValue(row.original, col.accessorKey);
        const normalizedValue = normalizeValue(value);
        return (
          <AutoCellRenderer<T>
            config={col.cell as CellConfig}
            value={value}
            row={row.original}
            normalizedValue={normalizedValue}
            onAction={onAction}
            onChange={onChange}
            accessorKey={col.accessorKey as keyof T}
          />
        );
      };
    }
    return base;
  });
  const paginationState: PaginationState = {
    pageIndex: pagination?.pageIndex ?? 0,
    pageSize: pagination?.pageSize ?? 10,
  };
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      pagination: paginationState,
    },
    manualPagination: true,
    pageCount: pagination ? Math.ceil(pagination.totalCount / pagination.pageSize) : 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      {/* Mobile / Tablet view (visible below lg) */}
      <div className="md:hidden w-full flex flex-col items-center justify-center">
        {table.getRowModel().rows.map((row: Row<T>) => {
          const cells = row.getVisibleCells();
          const leading = cells
            .filter((c) => c.column.columnDef.meta?.mobileHeaderSlot === "leading")
            .sort(
              (a, b) =>
                (a.column.columnDef.meta?.mobileOrder ?? 0) -
                (b.column.columnDef.meta?.mobileOrder ?? 0)
            );
          const trailing = cells.filter(
            (c) => c.column.columnDef.meta?.mobileHeaderSlot === "trailing"
          );
          const body = cells
            .filter(
              (c) =>
                !c.column.columnDef.meta?.hideOnMobile && !c.column.columnDef.meta?.mobileHeaderSlot
            )
            .sort(
              (a, b) =>
                (a.column.columnDef.meta?.mobileOrder ?? 0) -
                (b.column.columnDef.meta?.mobileOrder ?? 0)
            );

          return (
            <Wrapper className="text-black w-full" key={row.id}>
              {(leading.length > 0 || trailing.length > 0) && (
                <div className="w-full flex items-center justify-between gap-2">
                  <div className="flex items-center gap-5">
                    {leading.map((c) => (
                      <span key={c.id}>{flexRender(c.column.columnDef.cell, c.getContext())}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5">
                    {trailing.map((c) => (
                      <span key={c.id}>{flexRender(c.column.columnDef.cell, c.getContext())}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 w-full grid grid-cols-2 gap-y-1">
                {body.map((c) => {
                  const label =
                    typeof c.column.columnDef.header === "string"
                      ? c.column.columnDef.header
                      : undefined;
                  const showLabelOnMobile: boolean =
                    !c.column.columnDef.meta?.hideHeaderMobile && Boolean(label);
                  return (
                    <React.Fragment key={c.id}>
                      {showLabelOnMobile && <div className="text-sm text-zinc-500">{label}</div>}
                      <div className="text-right font-medium truncate">
                        {flexRender(c.column.columnDef.cell, c.getContext())}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </Wrapper>
          );
        })}
        {/* Mobile Pagination */}
        {pagination && (
          <div className="w-full mt-2">
            <PaginationBar
              pageIndex={pagination.pageIndex}
              pageCount={Math.ceil(pagination.totalCount / pagination.pageSize)}
              pageSize={pagination.pageSize}
              pageSizeOptions={[10, 20, 50, 100]}
              dataLength={data.length}
              onPageChange={pagination.onPageChange}
              onPageSizeChange={pagination.onPageSizeChange}
            />
          </div>
        )}
      </div>
      {/* Desktop view (lg and up) */}
      <div className="w-full hidden lg:block rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-[#DAEAFF]">
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="max-w-[200px] truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {pagination && (
          <PaginationBar
            pageIndex={pagination.pageIndex}
            pageCount={Math.ceil(pagination.totalCount / pagination.pageSize)}
            pageSize={pagination.pageSize}
            pageSizeOptions={[10, 20, 50, 100]}
            dataLength={data.length}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
          />
        )}
      </div>
    </div>
  );
}
