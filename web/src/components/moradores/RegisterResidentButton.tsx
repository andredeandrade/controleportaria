'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterResidentButtonProps = {
  fullWidth?: boolean
}

export function RegisterResidentButton({ fullWidth = false }: RegisterResidentButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/moradores/cadastrar')
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
