import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import InputError from '../input-error';
import useLoadingStore from '@/store/loading-store';

type Props<T extends FieldValues> = {
  name: Path<T>;
} & React.ComponentProps<'textarea'>;

const ControlledTextArea = <T extends FieldValues>({
  name,
  ...props
}: Props<T>) => {
  const { control } = useFormContext();
  const { isFormLoading } = useLoadingStore();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Textarea {...field} {...props} disabled={isFormLoading} />
          {error && <InputError message={error.message} />}
        </>
      )}
    />
  );
};

export default ControlledTextArea;
