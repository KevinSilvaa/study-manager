"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox as NativeCheckbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "../ui/field";

type CheckboxProps = {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
};

export default function Checkbox({ id, name, label, ...props }: CheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal">
          <NativeCheckbox
            {...props}
            id={id}
            name={name}
            checked={field.value}
            onChange={field.onChange}
            value={field.value}
            onBlur={field.onBlur}
            disabled={field.disabled}
          />

          <FieldLabel htmlFor={id}>{label}</FieldLabel>
        </Field>
      )}
    />
  );
}
