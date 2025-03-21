import { Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '../ui/button';

interface DTRowActionProps<TData> {
  row: Row<TData>;
  onUpdate: (value: TData) => void;
  onDelete: (value: TData) => void;
}

const DTRowAction = <TData,>({
  row,
  onUpdate,
  onDelete,
}: DTRowActionProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="bg-accent-foreground/5 rounded-sm">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onUpdate(row.original)}>
          <Edit />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(row.original)}
          variant="destructive"
        >
          <Trash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DTRowAction;
