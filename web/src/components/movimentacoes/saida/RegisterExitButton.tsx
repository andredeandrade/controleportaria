'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterExitButtonProps = {
  fullWidth?: boolean
}

export function RegisterExitButton({ fullWidth = false }: RegisterExitButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/movimentacoes/saida/registrar')
  }

  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      onClick={handleNavigateToRegister}
      sx={{
        bgcolor: '#16A34A',
        color: '#FFFFFF',
        fontWeight: 700,
        boxShadow: 'none',
        '&:hover': {
          bgcolor: '#15803D',
          boxShadow: 'none',
        },
      }}
    >
      Registrar
    </Button>
  )
}
