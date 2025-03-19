import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import InputError from '../input-error';
import useLoadingStore from '@/store/loading-store';

type Props<T extends FieldValues> = {
  name: Path<T>;
} & React.ComponentProps<'input'>;

const ControlledTextField = <T extends FieldValues>({
  name,
  ...props
}: Props<T>) => {
  const { isFormLoading } = useLoadingStore();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Input
            disabled={isFormLoading}
            {...props}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={value ?? ''}
          />
          {error && <InputError message={error.message} />}
        </>
      )}
    />
  );
};

export default ControlledTextField;
