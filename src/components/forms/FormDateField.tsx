import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import { FormTextField } from './FormTextField'

type FormDateFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>
}

export function FormDateField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  rules,
}: FormDateFieldProps<TFieldValues>) {
  return (
    <FormTextField
      control={control}
      name={name}
      label={label}
      type="date"
      rules={rules}
      slotProps={{ inputLabel: { shrink: true } }}
    />
  )
}
