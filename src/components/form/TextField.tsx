import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import type { SxProps, Theme } from '@mui/material/styles'

type TextFieldProps = MuiTextFieldProps
const defaultBorderColor = '#94A3B8'

const defaultTextFieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#FFFFFF',
    color: 'grey.900',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: defaultBorderColor,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: defaultBorderColor,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: defaultBorderColor,
      borderWidth: 1,
    },
  },
}

export function TextField({ sx, fullWidth = true, size = 'small', ...props }: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      fullWidth={fullWidth}
      size={size}
      sx={sx ? ([defaultTextFieldSx, sx] as SxProps<Theme>) : defaultTextFieldSx}
    />
  )
}