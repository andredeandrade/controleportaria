'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterOccurrenceButtonProps = {
  fullWidth?: boolean
}

export function RegisterOccurrenceButton({ fullWidth = false }: RegisterOccurrenceButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/ocorrencias/registrar')
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
