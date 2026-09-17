'use client'

import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

import type { Event, EventGuest, EventVehicleMovementType } from '@/app/api/events/types'
import { useCheckOutEventGuest } from '@/modules/eventos/hooks/useCheckOutEventGuest'
import { useCheckOutEventVehicle } from '@/modules/eventos/hooks/useCheckOutEventVehicle'
import { useAppSnackbar } from '@/providers'

export type EventCheckOutTarget =
  | { type: 'guest'; guestId: string }
  | { type: 'vehicle'; vehicleId: string }

function getCascadeGuests(
  event: Event,
  vehicleId: string,
  movementType: EventVehicleMovementType,
): EventGuest[] {
  if (movementType === 'CONVIDADO') {
    return event.guests.filter((guest) => guest.entryVehicle?.id === vehicleId && !guest.checkOutAt)
  }

  if (movementType === 'DESEMBARQUE') {
    return []
  }

  return event.guests.filter((guest) => guest.exitVehicle?.id === vehicleId && !guest.checkOutAt)
}

type EventCheckOutDialogProps = {
  event: Event
  target: EventCheckOutTarget | null
  onClose: () => void
}

export function EventCheckOutDialog({ event, target, onClose }: EventCheckOutDialogProps) {
  const { showSuccess, showError } = useAppSnackbar()
  const checkOutGuestMutation = useCheckOutEventGuest()
  const checkOutVehicleMutation = useCheckOutEventVehicle()
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([])

  const vehicle =
    target?.type === 'vehicle' ? event.vehicles.find((item) => item.id === target.vehicleId) : undefined

  const cascadeGuests =
    target?.type === 'vehicle' && vehicle
      ? getCascadeGuests(event, vehicle.id, vehicle.movementType)
      : []

  const cascadeVehicleId = vehicle?.id ?? null

  useEffect(() => {
    if (cascadeVehicleId) {
      setSelectedGuestIds(getCascadeGuestsForEffect())
    }

    function getCascadeGuestsForEffect() {
      const currentVehicle = event.vehicles.find((item) => item.id === cascadeVehicleId)

      if (!currentVehicle) {
        return []
      }

      return getCascadeGuests(event, currentVehicle.id, currentVehicle.movementType).map(
        (guest) => guest.id,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cascadeVehicleId])

  if (!target) {
    return null
  }

  const isPending = checkOutGuestMutation.isPending || checkOutVehicleMutation.isPending
  const mutationError = checkOutGuestMutation.error ?? checkOutVehicleMutation.error

  const handleClose = () => {
    checkOutGuestMutation.reset()
    checkOutVehicleMutation.reset()
    onClose()
  }

  const toggleGuestSelection = (guestId: string) => {
    setSelectedGuestIds((current) =>
      current.includes(guestId) ? current.filter((id) => id !== guestId) : [...current, guestId],
    )
  }

  const handleConfirm = async () => {
    try {
      if (target.type === 'guest') {
        await checkOutGuestMutation.mutateAsync({ eventId: event.id, guestId: target.guestId })
      } else {
        await checkOutVehicleMutation.mutateAsync({
          eventId: event.id,
          vehicleId: target.vehicleId,
          guestIds: selectedGuestIds.length ? selectedGuestIds : undefined,
        })
      }

      showSuccess('Saída registrada.')
      onClose()
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Não foi possível registrar a saída.')
    }
  }

  return (
    <Dialog open={Boolean(target)} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Registrar saída</DialogTitle>
      <DialogContent>
        {target.type === 'guest' ? (
          <DialogContentText>Confirma o registro de saída deste convidado?</DialogContentText>
        ) : (
          <Stack spacing={2}>
            <DialogContentText>
              {`Confirma o registro de saída do veículo ${vehicle?.plate ?? ''}?`}
            </DialogContentText>

            {cascadeGuests.length > 0 ? (
              <Stack spacing={1}>
                <Typography variant="body2" fontWeight={700} color="text.primary">
                  Convidados neste veículo
                </Typography>
                {cascadeGuests.map((guest) => (
                  <FormControlLabel
                    key={guest.id}
                    control={
                      <Checkbox
                        checked={selectedGuestIds.includes(guest.id)}
                        onChange={() => toggleGuestSelection(guest.id)}
                        disabled={isPending}
                      />
                    }
                    label={guest.name}
                  />
                ))}
                <Typography variant="caption" color="text.secondary">
                  Desmarque os convidados que não saíram junto com o veículo.
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        )}

        {mutationError ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {mutationError instanceof Error
              ? mutationError.message
              : 'Não foi possível registrar a saída.'}
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={handleClose} color="inherit" variant="outlined" disabled={isPending}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => void handleConfirm()}
          disabled={isPending}
        >
          {isPending ? 'Registrando...' : 'Registrar saída'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
