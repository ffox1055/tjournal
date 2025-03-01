'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState } from 'react';
import FormInput from './form-input';
import { DT } from '@/components/data-table/dt';
import { DTPagination } from '@/components/data-table/dt-pagination';
import { DTFilter } from '@/components/data-table/dt-filter';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <DTFilter table={table} placeholder="Filter tokens..." columnName="token_name" />
        <FormInput />
      </div>
      <ScrollArea className="overflow-hidden rounded-sm border">
        <DT columns={columns} table={table} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="py-4">
        <DTPagination table={table} />
      </div>
    </>
  );
}
