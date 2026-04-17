'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'

import {
  ConfirmExitButton,
  ExitDialogActions,
} from '@/components/movimentacoes/styles/EntryMovements.styles'

type ExitRegistrationTarget = {
  name: string
  entryAt: string
} | null

type ExitRegistrationFeedbackProps = {
  target: ExitRegistrationTarget
  onClose: () => void
}

export function ExitRegistrationFeedback({ target, onClose }: ExitRegistrationFeedbackProps) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleConfirm = () => {
    if (!target) {
      return
    }

    onClose()
    setIsSuccessOpen(true)
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
        </DialogContent>
        <ExitDialogActions>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <ConfirmExitButton onClick={handleConfirm} variant="contained">
            Confirmar saída
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
