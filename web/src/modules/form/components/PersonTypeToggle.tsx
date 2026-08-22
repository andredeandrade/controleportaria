import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const ACCESS_PERSON_TYPE_OPTIONS = [
  { label: 'Morador', value: 'morador' },
  { label: 'Visitante', value: 'visitante' },
  { label: 'Prestador de servico', value: 'prestador_servico' },
] as const

export type AccessPersonTypeValue = (typeof ACCESS_PERSON_TYPE_OPTIONS)[number]['value']

type PersonTypeToggleProps = {
  value: AccessPersonTypeValue | ''
  onChange: (value: AccessPersonTypeValue) => void
  error?: boolean
  helperText?: string
}

export function PersonTypeToggle({ value, onChange, error, helperText }: PersonTypeToggleProps) {
  return (
    <Stack spacing={1.25}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        {ACCESS_PERSON_TYPE_OPTIONS.map((option) => {
          const isSelected = value === option.value

          return (
            <Button
              key={option.value}
              size="small"
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'inherit'}
              onClick={() => onChange(option.value)}
              sx={
                isSelected
                  ? undefined
                  : { color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }
              }
            >
              {option.label}
            </Button>
          )
        })}
      </Stack>
      {error && helperText ? (
        <Typography variant="caption" color="error.main">
          {helperText}
        </Typography>
      ) : null}
    </Stack>
  )
}
