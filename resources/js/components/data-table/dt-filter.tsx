import { Input } from '@/components/ui/input';
import { Table as TanStackTable } from '@tanstack/react-table';

interface DTFilterProps<TData> {
    table: TanStackTable<TData>;
    placeholder: string;
    columnName: string;
}

export function DTFilter<TData>({
    table,
    placeholder,
    columnName,
}: DTFilterProps<TData>) {
    return (
        <Input
            placeholder={placeholder}
            className="max-w-sm"
            value={
                (table.getColumn(columnName)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
                table.getColumn(columnName)?.setFilterValue(event.target.value)
            }
        />
    );
}
