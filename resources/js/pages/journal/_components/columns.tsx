'use client';

import { DTColumnHeader } from '@/components/data-table/dt-column-header';
import DTRowAction from '@/components/data-table/dt-row-actions';
import { Badge } from '@/components/ui/badge';
import { JournalResponse } from '@/types/journal';
import { ColumnDef } from '@tanstack/react-table';
import { CircleHelp, Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
    cell: ({ row }) => {
      const riskReward = row.getValue('risk_reward_ratio');

      return (
        riskReward ?? (
          <div className="text-center">
            <CircleHelp size={15} strokeWidth={2} strokeOpacity={0.5} />
          </div>
        )
      );
    },
  },
  {
    accessorKey: 'trade_duration',
    header: ({ column }) => (
      <DTColumnHeader column={column} title="Durations" />
    ),
    cell: ({ row }) => {
      const duration = row.getValue('trade_duration');
      return duration ? (
        `${duration} hours`
      ) : (
        <div className="text-center">
          <CircleHelp size={15} strokeWidth={2} strokeOpacity={0.5} />
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DTColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      let variant = '';

      switch (row.getValue('status')) {
        case 'loss':
          variant = 'destructive';
          break;
        case 'win':
          variant = 'success';
          break;
        case 'be':
          variant = 'warning';
          break;
        default:
          variant = 'default';
          break;
      }

      return (
        <Badge
          className="capitalize"
          variant={
            variant as
              | 'default'
              | 'destructive'
              | 'secondary'
              | 'outline'
              | null
              | undefined
          }
        >
          {row.getValue('status')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => {
      const PopInfo = ({ description }: { description: string }) => {
        return (
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <Info className="w-4" opacity={0.5} />
            </PopoverTrigger>
            <PopoverContent>{description}</PopoverContent>
          </Popover>
        );
      };

      return (
        <div className="flex w-40 items-center gap-2">
          <p className="line-clamp-1">{row.getValue('reason')}</p>
          <PopInfo description={row.getValue('reason')} />
        </div>
      );
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
