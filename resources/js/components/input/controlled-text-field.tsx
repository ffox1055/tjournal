import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import InputError from '../input-error';

type Props<T extends FieldValues> = {
  name: Path<T>;
} & React.ComponentProps<'input'>;

const ControlledTextField = <T extends FieldValues>({
  name,
  ...props
}: Props<T>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Input
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
