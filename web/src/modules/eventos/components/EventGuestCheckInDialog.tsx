'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { EventGuest } from '@/app/api/events/types'
import { useCheckInEventGuest } from '@/modules/eventos/hooks/useCheckInEventGuest'
import { TextField, TextFieldLabel, TextFieldStack } from '@/modules/form'
import { useAppSnackbar } from '@/providers'

type EventGuestCheckInDialogProps = {
  open: boolean
  onClose: () => void
  eventId: string
  guest: EventGuest
}

export function EventGuestCheckInDialog({
  open,
  onClose,
  eventId,
  guest,
}: EventGuestCheckInDialogProps) {
  const { showSuccess } = useAppSnackbar()
  const checkInMutation = useCheckInEventGuest()

  const [document, setDocument] = useState('')
  const [plate, setPlate] = useState('')
  const [brandModel, setBrandModel] = useState('')
  const [color, setColor] = useState('')

  const requiresDocument = !guest.document

  const resetFields = () => {
    setDocument('')
    setPlate('')
    setBrandModel('')
    setColor('')
  }

  const handleClose = () => {
    resetFields()
    checkInMutation.reset()
    onClose()
  }

  const handleSubmit = async () => {
    const hasVehicleData = Boolean(plate.trim() || brandModel.trim() || color.trim())

    try {
      await checkInMutation.mutateAsync({
        eventId,
        guestId: guest.id,
        document: requiresDocument ? document.trim() : undefined,
        vehicle: hasVehicleData
          ? {
              plate: plate.trim() || undefined,
              brandModel: brandModel.trim() || undefined,
              color: color.trim() || undefined,
            }
          : undefined,
      })

      showSuccess('Entrada registrada.')
      resetFields()
      onClose()
    } catch {
      // O erro é exibido no próprio diálogo.
    }
  }

  const isSubmitDisabled =
    (requiresDocument && !document.trim()) || checkInMutation.isPending

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Registrar entrada</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {guest.name}
        </Typography>

        {requiresDocument ? (
          <TextFieldStack>
            <TextFieldLabel required>CPF</TextFieldLabel>
            <TextField
              required
              value={document}
              onChange={(event) => setDocument(event.target.value)}
              disabled={checkInMutation.isPending}
              placeholder="000.000.000-00"
            />
          </TextFieldStack>
        ) : null}

        <Divider sx={{ my: 2, borderColor: 'divider' }} />

        <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ mb: 1.5 }}>
          Dados do veículo (opcional)
        </Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TextFieldStack>
              <TextFieldLabel>Placa</TextFieldLabel>
              <TextField
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
                disabled={checkInMutation.isPending}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={12}>
            <TextFieldStack>
              <TextFieldLabel>Marca/Modelo</TextFieldLabel>
              <TextField
                value={brandModel}
                onChange={(event) => setBrandModel(event.target.value)}
                disabled={checkInMutation.isPending}
              />
            </TextFieldStack>
          </Grid>

          <Grid size={12}>
            <TextFieldStack>
              <TextFieldLabel>Cor</TextFieldLabel>
              <TextField
                value={color}
                onChange={(event) => setColor(event.target.value)}
                disabled={checkInMutation.isPending}
              />
            </TextFieldStack>
          </Grid>
        </Grid>

        {checkInMutation.isError ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {checkInMutation.error instanceof Error
              ? checkInMutation.error.message
              : 'Não foi possível registrar a entrada.'}
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={handleClose}
          color="inherit"
          variant="outlined"
          disabled={checkInMutation.isPending}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => void handleSubmit()}
          disabled={isSubmitDisabled}
        >
          {checkInMutation.isPending ? 'Registrando...' : 'Registrar entrada'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
