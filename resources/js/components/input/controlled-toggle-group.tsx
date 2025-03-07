import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Option } from '@/types';

interface Props<T extends FieldValues> {
  name: Path<T>;
  options?: Option[];
}

const ControlledToggleGroup = <T extends FieldValues>({
  name,
  options,
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={(value) => onChange(value)}
        >
          {options?.map((opt) => {
            return (
              <ToggleGroupItem key={opt.value} value={opt.value}>
                {opt.label}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      )}
    />
  );
};

export default ControlledToggleGroup;
