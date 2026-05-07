import { TextField, TextFieldProps } from '@mui/material'

export type AuthTextFieldProps = TextFieldProps

export default function AuthTextField(props: AuthTextFieldProps) {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiInputLabel-root': { color: 'rgba(226, 232, 240, 0.72)' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#E2E8F0' },
        '& .MuiInputBase-input': { color: '#F8FAFC' },
        '& .MuiInputBase-input:-webkit-autofill': {
          WebkitTextFillColor: '#F8FAFC',
          WebkitBoxShadow: '0 0 0 100px transparent inset',
          caretColor: '#F8FAFC',
          borderRadius: 0,
          transition: 'background-color 9999s ease-out 0s',
        },
        '& .MuiInputBase-input:-webkit-autofill:hover': {
          WebkitTextFillColor: '#F8FAFC',
          WebkitBoxShadow: '0 0 0 100px transparent inset',
        },
        '& .MuiInputBase-input:-webkit-autofill:focus': {
          WebkitTextFillColor: '#F8FAFC',
          WebkitBoxShadow: '0 0 0 100px transparent inset',
        },
        '& .MuiInput-underline:before': { borderBottomColor: 'rgba(226, 232, 240, 0.38)' },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'rgba(226, 232, 240, 0.68)',
        },
        '& .MuiInput-underline:after': { borderBottomColor: '#E2E8F0' },
        '& .MuiFormHelperText-root': { mx: 0, color: '#FCA5A5' },
      }}
    />
  )
}
