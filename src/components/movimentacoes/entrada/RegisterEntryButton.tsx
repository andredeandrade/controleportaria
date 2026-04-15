'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterEntryButtonProps = {
  fullWidth?: boolean
}

export function RegisterEntryButton({ fullWidth = false }: RegisterEntryButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/movimentacoes/entrada/registrar')
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
