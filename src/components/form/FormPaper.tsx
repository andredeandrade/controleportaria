import MuiPaper from '@mui/material/Paper'
import type { PaperProps as MuiPaperProps } from '@mui/material/Paper'
import type { SxProps, Theme } from '@mui/material/styles'

const defaultFormPaperSx: SxProps<Theme> = {
  p: 3,
  borderRadius: 1,
  minHeight: 220,
  bgcolor: 'rgba(15, 23, 42, 0.1)',
  boxShadow: 'none',
}

type FormPaperProps = MuiPaperProps

export function FormPaper({ sx, ...props }: FormPaperProps) {
  return (
    <MuiPaper
      {...props}
      sx={sx ? ([defaultFormPaperSx, sx] as SxProps<Theme>) : defaultFormPaperSx}
    />
  )
}
