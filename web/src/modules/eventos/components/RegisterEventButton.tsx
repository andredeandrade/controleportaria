'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterEventButtonProps = {
  fullWidth?: boolean
}

export function RegisterEventButton({ fullWidth = false }: RegisterEventButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/eventos/cadastrar')
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
      Cadastrar
    </Button>
  )
}
