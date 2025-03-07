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
import { DT } from '@/components/data-table/dt';
import { DTPagination } from '@/components/data-table/dt-pagination';
import { DTFilter } from '@/components/data-table/dt-filter';
import { DTFacetedFilter } from '@/components/data-table/dt-faceted-filter';
import { statuses } from '../_constants/data';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
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

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="mb-4 flex flex-1 items-center space-x-2">
        <DTFilter
          table={table}
          placeholder="Filter tokens..."
          columnName="token_name"
        />

        {table.getColumn('status') && (
          <DTFacetedFilter
            column={table.getColumn('status')}
            options={statuses}
            title="Status"
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <ScrollArea className="mb-4 overflow-hidden rounded-sm border">
        <DT columns={columns} table={table} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div>
        <DTPagination table={table} />
      </div>
    </>
  );
}
