'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Button from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'

type RegisterEventButtonProps = {
  fullWidth?: boolean
  size?: 'medium' | 'large'
  sx?: SxProps<Theme>
}

export function RegisterEventButton({
  fullWidth = false,
  size = 'medium',
  sx,
}: RegisterEventButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/eventos/cadastrar')
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
      Agendar evento
    </Button>
  )
}
