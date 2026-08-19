'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

type ListErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ListErrorState({ message, onRetry }: ListErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={onRetry}>
          Tentar novamente
        </Button>
      }
    >
      {message}
    </Alert>
  )
}
