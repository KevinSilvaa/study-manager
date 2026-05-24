"use client";

import { Controller, useFormContext } from "react-hook-form";

import { Input as NativeInput } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "../ui/field";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  id: string;
  name: string;
};

export function Input({ label, id, name, ...props }: InputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field className="flex flex-col gap-1.5">
          <FieldLabel htmlFor={id}>{label}</FieldLabel>

          <NativeInput
            {...props}
            ref={field.ref}
            name={name}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            id={id}
          />

          {error && <FieldDescription className="text-destructive text-xs">{error.message}</FieldDescription>}
        </Field>
      )}
    />
  );
}
