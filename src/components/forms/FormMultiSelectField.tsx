import { Controller } from 'react-hook-form'
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'
import {
  Box,
  Checkbox,
  Chip,
  ListItemText,
  MenuItem,
  TextField,
} from '@mui/material'

type FormMultiSelectFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  options: string[]
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>
  helperText?: string
}

export function FormMultiSelectField<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  options,
  rules,
  helperText,
}: FormMultiSelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const value = Array.isArray(field.value) ? field.value : []

        return (
          <TextField
            select
            fullWidth
            label={label}
            value={value}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message ?? helperText}
            slotProps={{
              select: {
                multiple: true,
                renderValue: (selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((item) => (
                      <Chip key={item} label={item} size="small" />
                    ))}
                  </Box>
                ),
              },
            }}
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={(value as string[]).includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </TextField>
        )
      }}
    />
  )
}
