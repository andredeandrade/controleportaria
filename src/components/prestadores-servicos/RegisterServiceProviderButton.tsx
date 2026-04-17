'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterServiceProviderButtonProps = {
  fullWidth?: boolean
}

export function RegisterServiceProviderButton({
  fullWidth = false,
}: RegisterServiceProviderButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/prestadores-servicos/cadastrar')
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
