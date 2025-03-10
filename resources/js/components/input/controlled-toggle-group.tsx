import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Option } from '@/types';
import InputError from '../input-error';
import useLoadingStore from '@/store/loading-store';

interface Props<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
  className?: string;
}

const ControlledToggleGroup = <T extends FieldValues>({
  name,
  options,
  className,
}: Props<T>) => {
  const { isFormLoading } = useLoadingStore();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <ToggleGroup
            disabled={isFormLoading}
            variant="outline"
            className={className}
            type="single"
            value={value}
            onValueChange={(value) => {
              return onChange(value);
            }}
          >
            {options?.map((opt) => {
              return (
                <ToggleGroupItem key={opt.value} value={opt.value}>
                  {opt.label}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
          <div>{error && <InputError message={error.message} />}</div>
        </>
      )}
    />
  );
};

export default ControlledToggleGroup;
