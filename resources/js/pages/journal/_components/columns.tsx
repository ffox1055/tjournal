'use client';

import { DTColumnHeader } from '@/components/data-table/dt-column-header';
import DTRowAction from '@/components/data-table/dt-row-actions';
import { JournalResponse } from '@/types/journal';
import { ColumnDef } from '@tanstack/react-table';

interface GetColumnProps {
  onUpdate: (journal: JournalResponse) => void;
  onDelete: (journal: JournalResponse) => void;
}

export const getColumns = ({
  onUpdate,
  onDelete,
}: GetColumnProps): ColumnDef<JournalResponse>[] => [
  {
    accessorKey: 'token_name',
    header: ({ column }) => {
      return <DTColumnHeader column={column} title="Token" />;
    },
  },
  {
    accessorKey: 'trading_date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('trading_date'));

      // Function to get the ordinal suffix (st, nd, rd, th)
      const getOrdinalSuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th'; // Covers 4th to 20th
        const suffixes = ['st', 'nd', 'rd'];
        return suffixes[(day % 10) - 1] || 'th';
      };

      const day = date.getDate();
      const month = date.toLocaleString('en-GB', { month: 'long' });
      const year = date.getFullYear();
      const formattedDate = `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;

      return formattedDate;
    },
  },
  {
    accessorKey: 'risk_reward_ratio',
    header: 'Risk/Reward',
  },
  {
    accessorKey: 'trade_duration',
    header: ({ column }) => (
      <DTColumnHeader column={column} title="Durations" />
    ),
    cell: ({ row }) => {
      const duration = row.getValue('trade_duration');
      return `${duration ? `${duration} hours` : '-'}`;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DTColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      return `${row.getValue('status') ? row.getValue('status') : '-'}`;
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => {
      return <div className="line-clamp-1 w-40">{row.getValue('reason')}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="border-border border-l pl-2">
        <DTRowAction row={row} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    ),
    size: 50,
  },
];
