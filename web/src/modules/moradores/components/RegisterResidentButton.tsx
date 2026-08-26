'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

type RegisterResidentButtonProps = {
  fullWidth?: boolean
  size?: 'medium' | 'large'
  sx?: SxProps<Theme>
}

export function RegisterResidentButton({
  fullWidth = false,
  size = 'medium',
  sx,
}: RegisterResidentButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/moradores/cadastrar')
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size={size}
      fullWidth={fullWidth}
      startIcon={<AddRoundedIcon fontSize="small" />}
      onClick={handleNavigateToRegister}
      sx={sx}
    >
      Adicionar morador
    </Button>
  )
}
