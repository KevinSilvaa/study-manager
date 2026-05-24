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

export default function Checkbox({ id, name, ...props }: CheckboxProps) {
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
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            value={field.value}
            onBlur={field.onBlur}
            disabled={field.disabled}
          />

          {props.label && <FieldLabel htmlFor={id}>{props.label}</FieldLabel>}
        </Field>
      )}
    />
  );
}
