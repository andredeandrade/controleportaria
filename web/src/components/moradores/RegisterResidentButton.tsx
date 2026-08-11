'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

type RegisterResidentButtonProps = {
  fullWidth?: boolean
}

export function RegisterResidentButton({ fullWidth = false }: RegisterResidentButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth={fullWidth}
      startIcon={<AddRoundedIcon />}
      onClick={() => {
        router.push('/moradores/cadastrar')
      }}
    >
      Cadastrar Novo Morador
    </Button>
  )
}
