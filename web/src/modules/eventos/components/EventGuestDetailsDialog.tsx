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

import type { Event, EventGuest } from '@/app/api/events/types'
import { useCan } from '@/hooks/useCan'
import { EventCheckOutDialog, type EventCheckOutTarget } from '@/modules/eventos/components/EventCheckOutDialog'
import { EventGuestCheckInDialog } from '@/modules/eventos/components/EventGuestCheckInDialog'
import { EventGuestStatusChip, getEventGuestStatus } from '@/modules/eventos/components/EventGuestStatusChip'
import { MobileFieldLabel } from '@/styles/MobileList.styles'

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

type EventGuestDetailsDialogProps = {
  event: Event
  guest: EventGuest | null
  onClose: () => void
}

export function EventGuestDetailsDialog({ event, guest, onClose }: EventGuestDetailsDialogProps) {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [checkOutTarget, setCheckOutTarget] = useState<EventCheckOutTarget | null>(null)
  const canRegisterAccess = useCan('events', 'registerAccess')

  if (!guest) {
    return null
  }

  const status = getEventGuestStatus(guest.checkInAt, guest.checkOutAt)

  return (
    <>
      <Dialog open={Boolean(guest)} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}
        >
          Dados do convidado
          <IconButton aria-label="Fechar" onClick={onClose} size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5}>
            <Stack spacing={0.5}>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {guest.name}
              </Typography>
              {guest.document ? (
                <Typography variant="caption" color="text.disabled">
                  {guest.document}
                </Typography>
              ) : null}
              <EventGuestStatusChip
                checkInAt={guest.checkInAt}
                checkOutAt={guest.checkOutAt}
                isAdHoc={guest.isAdHoc}
                showAdHocBadge
              />
            </Stack>

            <Divider sx={{ borderColor: 'divider' }} />

            <Grid container spacing={2}>
              <Grid size={6}>
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Entrada</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {guest.checkInAt ? formatTime(guest.checkInAt) : '—'}
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={6}>
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Saída</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {guest.checkOutAt ? formatTime(guest.checkOutAt) : '—'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            {guest.entryVehicle ? (
              <>
                <Divider sx={{ borderColor: 'divider' }} />
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Veículo de entrada</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {guest.entryVehicle.plate ?? '—'}
                    {guest.entryVehicle.brandModel ? ` · ${guest.entryVehicle.brandModel}` : ''}
                  </Typography>
                </Stack>
              </>
            ) : null}

            {guest.exitVehicle ? (
              <>
                <Divider sx={{ borderColor: 'divider' }} />
                <Stack spacing={0.25}>
                  <MobileFieldLabel variant="caption">Veículo de saída</MobileFieldLabel>
                  <Typography variant="body2" color="text.primary">
                    {guest.exitVehicle.plate ?? '—'}
                    {guest.exitVehicle.brandModel ? ` · ${guest.exitVehicle.brandModel}` : ''}
                  </Typography>
                </Stack>
              </>
            ) : null}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Fechar
          </Button>

          {canRegisterAccess && status === 'aguardando' ? (
            <Button variant="contained" color="primary" onClick={() => setCheckInOpen(true)}>
              Registrar entrada
            </Button>
          ) : null}

          {canRegisterAccess && status === 'presente' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCheckOutTarget({ type: 'guest', guestId: guest.id })}
            >
              Registrar saída
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>

      <EventGuestCheckInDialog
        open={checkInOpen}
        onClose={() => setCheckInOpen(false)}
        eventId={event.id}
        guest={guest}
      />

      <EventCheckOutDialog event={event} target={checkOutTarget} onClose={() => setCheckOutTarget(null)} />
    </>
  )
}
