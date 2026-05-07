'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterAuthorizationButtonProps = {
  fullWidth?: boolean
}

export function RegisterAuthorizationButton({
  fullWidth = false,
}: RegisterAuthorizationButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/autorizacoes/cadastrar')
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
