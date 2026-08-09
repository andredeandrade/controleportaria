'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type AccessRegisterButtonProps = {
  fullWidth?: boolean
}

export function AccessRegisterButton({ fullWidth = false }: AccessRegisterButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/acessos/registrar')
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
