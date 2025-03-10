import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import InputError from '../input-error';

type Props<T extends FieldValues> = {
  name: Path<T>;
};

const ControlledDatePikcer = <T extends FieldValues>({ name }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Popover>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !value && 'text-muted-foreground',
                )}
              >
                <CalendarIcon />
                {value ? format(value, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={value} onSelect={onChange} />
            </PopoverContent>
            {error && <InputError message={error.message} />}
          </>
        )}
      />
    </Popover>
  );
};

export default ControlledDatePikcer;
