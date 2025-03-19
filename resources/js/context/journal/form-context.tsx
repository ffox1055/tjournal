import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Schema, schema, defaultValues } from '@/types/journal/schema';

export function FormContext({ children }: { children: React.ReactNode }) {
  const method = useForm<Schema>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues,
  });

  return <FormProvider {...method}>{children}</FormProvider>;
}
