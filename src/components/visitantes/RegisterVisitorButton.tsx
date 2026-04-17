'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterVisitorButtonProps = {
  fullWidth?: boolean
}

export function RegisterVisitorButton({ fullWidth = false }: RegisterVisitorButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/visitantes/cadastrar')
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
