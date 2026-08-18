'use client'

import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type AccessRegisterButtonProps = {
  fullWidth?: boolean
  size?: 'medium' | 'large'
}

export function AccessRegisterButton({
  fullWidth = false,
  size = 'medium',
}: AccessRegisterButtonProps) {
  const router = useRouter()

  const handleNavigateToRegister = () => {
    router.push('/acessos/registrar')
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size={size}
      fullWidth={fullWidth}
      onClick={handleNavigateToRegister}
    >
      Registrar Acesso
    </Button>
  )
}
