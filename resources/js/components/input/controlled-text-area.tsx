import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

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
      render={({ field }) => <Textarea {...field} {...props} />}
    />
  );
};

export default ControlledTextArea;
