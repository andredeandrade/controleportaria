'use client'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import type { Event, EventVehicle } from '@/app/api/events/types'
import { useCan } from '@/hooks/useCan'
import { EventCheckOutDialog, type EventCheckOutTarget } from '@/modules/eventos/components/EventCheckOutDialog'
import { EventVehicleMovementBadge } from '@/modules/eventos/components/EventVehicleMovementBadge'
import { MobileFieldLabel } from '@/styles/MobileList.styles'

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

type EventVehicleDetailsDialogProps = {
  event: Event
  vehicle: EventVehicle | null
  onClose: () => void
}

export function EventVehicleDetailsDialog({
  event,
  vehicle,
  onClose,
}: EventVehicleDetailsDialogProps) {
  const [checkOutTarget, setCheckOutTarget] = useState<EventCheckOutTarget | null>(null)
  const canRegisterAccess = useCan('events', 'registerAccess')

  if (!vehicle) {
    return null
  }

  return (
    <>
      <Dialog open={Boolean(vehicle)} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}
        >
          Dados do veículo
          <IconButton aria-label="Fechar" onClick={onClose} size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5}>
            <Stack spacing={0.5}>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {vehicle.plate ?? '—'}
              </Typography>
              {vehicle.brandModel ? (
                <Typography variant="caption" color="text.disabled">
                  {vehicle.brandModel}
                </Typography>
              ) : null}
              <EventVehicleMovementBadge movementType={vehicle.movementType} />
            </Stack>

            <Divider sx={{ borderColor: 'divider' }} />

            <Grid container spacing={2}>
              <Grid size={6}>
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Motorista</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {vehicle.driverName ?? '—'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={6}>
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Documento</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {vehicle.driverDocument ?? '—'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={6}>
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Entrada</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {formatTime(vehicle.checkInAt)}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={6}>
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Saída</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {vehicle.checkOutAt ? formatTime(vehicle.checkOutAt) : '—'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            {vehicle.occupants.length > 0 ? (
              <>
                <Divider sx={{ borderColor: 'divider' }} />
                <Stack spacing={0.75}>
                  <MobileFieldLabel variant="caption">Ocupantes</MobileFieldLabel>
                  {vehicle.occupants.map((occupant) => (
                    <Typography key={occupant.id} variant="body2" color="text.primary">
                      {occupant.name}
                      <Typography component="span" variant="caption" color="text.disabled">
                        {occupant.via === 'entry' ? ' · entrada' : ' · saída reservada'}
                      </Typography>
                    </Typography>
                  ))}
                </Stack>
              </>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Fechar
          </Button>

          {canRegisterAccess && vehicle.isOpen ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCheckOutTarget({ type: 'vehicle', vehicleId: vehicle.id })}
            >
              Registrar saída
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>

      <EventCheckOutDialog event={event} target={checkOutTarget} onClose={() => setCheckOutTarget(null)} />
    </>
  )
}
