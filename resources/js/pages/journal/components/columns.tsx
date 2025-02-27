'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Journal } from '@/types/journal';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Journal>[] = [
    {
        accessorKey: 'token_name',
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-2">
                    Token
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        <ArrowUpDown />
                    </Button>
                </div>
            );
        },
    },
    {
        accessorKey: 'trading_date',
        header: 'Date',
    },
    {
        accessorKey: 'risk_reward_ratio',
        header: 'Risk/Reward',
    },
    {
        accessorKey: 'trade_duration',
        header: 'Duration',
        cell: ({ row }) => {
            const duration = row.getValue('trade_duration');

            return `${duration} Hours`;
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
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
        header: 'Actions',
        cell: ({ row }) => {
            console.log(row.original);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText('123000')}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
