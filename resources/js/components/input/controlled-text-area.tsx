import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import InputError from '../input-error';

type Props<T extends FieldValues> = {
  name: Path<T>;
} & React.ComponentProps<'textarea'>;

const ControlledTextArea = <T extends FieldValues>({
  name,
  ...props
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Textarea {...field} {...props} />
          {error && <InputError message={error.message} />}
        </>
      )}
    />
  );
};

export default ControlledTextArea;
