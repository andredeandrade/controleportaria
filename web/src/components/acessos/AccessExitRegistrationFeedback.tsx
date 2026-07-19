'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'

import { ConfirmExitButton, ExitDialogActions } from '@/components/acessos/styles/AccessStyles'

type ExitRegistrationTarget = {
  name: string
  entryAt: string
} | null

type AccessExitRegistrationFeedbackProps = {
  target: ExitRegistrationTarget
  onConfirm: () => Promise<void>
  isPending: boolean
  errorMessage: string | null
  onClose: () => void
}

export function AccessExitRegistrationFeedback({
  target,
  onConfirm,
  isPending,
  errorMessage,
  onClose,
}: AccessExitRegistrationFeedbackProps) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleConfirm = async () => {
    if (!target) {
      return
    }

    try {
      await onConfirm()
      onClose()
      setIsSuccessOpen(true)
    } catch {
      // O erro e exibido no proprio dialogo.
    }
  }

  const handleSuccessClose = () => {
    setIsSuccessOpen(false)
  }

  return (
    <>
      <Dialog open={Boolean(target)} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Confirmar saída</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {target
              ? `Deseja confirmar a saída de ${target.name}, registrado em ${target.entryAt}?`
              : ''}
          </DialogContentText>

          {errorMessage ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}
        </DialogContent>
        <ExitDialogActions>
          <Button onClick={onClose} color="inherit" disabled={isPending}>
            Cancelar
          </Button>
          <ConfirmExitButton
            onClick={() => void handleConfirm()}
            variant="contained"
            disabled={isPending}
          >
            {isPending ? 'Confirmando...' : 'Confirmar saida'}
          </ConfirmExitButton>
        </ExitDialogActions>
      </Dialog>

      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={3000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSuccessClose} severity="success" variant="filled">
          Saída registrada com sucesso.
        </Alert>
      </Snackbar>
    </>
  )
}
