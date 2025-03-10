import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import InputError from '../input-error';
import useLoadingStore from '@/store/loading-store';

type Props<T extends FieldValues> = {
  name: Path<T>;
} & React.ComponentProps<'input'>;

const ControlledInputFile = <T extends FieldValues>({
  name,
  ...props
}: Props<T>) => {
  const { control } = useFormContext();
  const { isFormLoading } = useLoadingStore();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <>
          <Input
            disabled={isFormLoading}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              onChange(e.target.files?.[0]);
            }}
            {...props}
          />
          {error && <InputError message={error.message} />}
        </>
      )}
    />
  );
};

export default ControlledInputFile;
