'use client'

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

import type { Event, EventGuest } from '@/app/api/events/types'
import { useCheckInEventGuest } from '@/modules/eventos/hooks/useCheckInEventGuest'
import { useCheckOutEventGuest } from '@/modules/eventos/hooks/useCheckOutEventGuest'
import { Table } from '@/modules/table/components/Table'
import { TableBody } from '@/modules/table/components/TableBody'
import { TableCell } from '@/modules/table/components/TableCell'
import { TableHead } from '@/modules/table/components/TableHead'
import { TableHeadCell } from '@/modules/table/components/TableHeadCell'
import { TableRow } from '@/modules/table/components/TableRow'
import { ListSearchField } from '@/modules/table/components/ListSearchField'
import { useAppSnackbar } from '@/providers'
import { MobileListCard } from '@/styles/MobileList.styles'

const COLUMN_COUNT = 5

type GuestStatus = 'aguardando' | 'dentro' | 'saiu'

function getGuestStatus(guest: EventGuest): GuestStatus {
  if (!guest.checkInAt) {
    return 'aguardando'
  }

  if (!guest.checkOutAt) {
    return 'dentro'
  }

  return 'saiu'
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function matchesSearch(guest: EventGuest, searchTerm: string): boolean {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  if (!normalizedSearch) {
    return true
  }

  const name = guest.name.toLowerCase()
  const document = guest.document?.toLowerCase() ?? ''

  return name.includes(normalizedSearch) || document.includes(normalizedSearch)
}

type EventGuestsCardProps = {
  event: Event
}

export function EventGuestsCard({ event }: EventGuestsCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchTerm, setSearchTerm] = useState('')
  const { showSuccess, showError } = useAppSnackbar()
  const checkInMutation = useCheckInEventGuest()
  const checkOutMutation = useCheckOutEventGuest()

  const guestsCount = event.guests.length
  const filteredGuests = event.guests.filter((guest) => matchesSearch(guest, searchTerm))

  const presentCount = event.guests.filter(
    (guest) => guest.checkInAt && !guest.checkOutAt,
  ).length
  const departedCount = event.guests.filter((guest) => guest.checkOutAt).length
  const waitingCount = event.guests.filter((guest) => !guest.checkInAt).length

  const emptyMessage =
    guestsCount === 0
      ? 'Nenhum convidado cadastrado para este evento.'
      : 'Nenhum convidado corresponde à busca.'

  const handleCheckIn = async (guestId: string) => {
    try {
      await checkInMutation.mutateAsync({ eventId: event.id, guestId })
      showSuccess('Entrada registrada.')
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Não foi possível registrar a entrada.')
    }
  }

  const handleCheckOut = async (guestId: string) => {
    try {
      await checkOutMutation.mutateAsync({ eventId: event.id, guestId })
      showSuccess('Saída registrada.')
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Não foi possível registrar a saída.')
    }
  }

  const renderStatus = (guest: EventGuest, status: GuestStatus) => {
    if (status === 'aguardando') {
      return <Chip size="small" color="warning" label="Aguardando" />
    }

    if (status === 'dentro') {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <CheckCircleRoundedIcon color="success" fontSize="small" />
          <Typography variant="body2" color="text.primary">
            {`Entrada ${formatTime(guest.checkInAt as string)}`}
          </Typography>
        </Stack>
      )
    }

    return (
      <Typography variant="body2" color="text.secondary">
        {`Entrada ${formatTime(guest.checkInAt as string)} → Saída ${formatTime(guest.checkOutAt as string)}`}
      </Typography>
    )
  }

  const renderAction = (guest: EventGuest, status: GuestStatus, fullWidth: boolean) => {
    if (status === 'aguardando') {
      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth={fullWidth}
          disabled={checkInMutation.isPending}
          onClick={() => void handleCheckIn(guest.id)}
        >
          Registrar entrada
        </Button>
      )
    }

    if (status === 'dentro') {
      return (
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          fullWidth={fullWidth}
          disabled={checkOutMutation.isPending}
          onClick={() => void handleCheckOut(guest.id)}
        >
          Registrar saída
        </Button>
      )
    }

    return (
      <Typography variant="body2" color="text.disabled">
        Concluído
      </Typography>
    )
  }

  return (
    <MuiCard>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            rowGap={2}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <GroupsRoundedIcon color="primary" fontSize="small" />
              <Typography variant="h4">Controle de Acesso de Convidados</Typography>
              <Chip size="small" color="success" label={`${guestsCount} na lista`} />
            </Stack>

            <ListSearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar convidado..."
              sx={{ width: { xs: '100%', sm: 260 } }}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {`${presentCount} presentes · ${departedCount} saídas registradas · ${waitingCount} aguardando`}
          </Typography>

          {isMobile ? (
            filteredGuests.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {filteredGuests.map((guest, index) => {
                  const status = getGuestStatus(guest)

                  return (
                    <MobileListCard key={guest.id} variant="outlined">
                      <Stack spacing={2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Typography variant="caption" color="text.disabled">
                              {index + 1}
                            </Typography>
                            <Stack spacing={0.25}>
                              <Typography variant="body2" fontWeight={700} color="text.primary">
                                {guest.name}
                              </Typography>
                              <Typography variant="caption" color="text.disabled">
                                {guest.document ?? '—'}
                              </Typography>
                            </Stack>
                          </Stack>

                          {status === 'aguardando' ? renderStatus(guest, status) : null}
                        </Stack>

                        {status !== 'aguardando' ? renderStatus(guest, status) : null}

                        {renderAction(guest, status, true)}
                      </Stack>
                    </MobileListCard>
                  )
                })}
              </Stack>
            )
          ) : (
            <Table>
              <TableHead>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Nome</TableHeadCell>
                <TableHeadCell>Documento</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell align="right">Ação</TableHeadCell>
              </TableHead>
              <TableBody
                isEmpty={filteredGuests.length === 0}
                emptyState={
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                }
                colSpan={COLUMN_COUNT}
              >
                {filteredGuests.map((guest, index) => {
                  const status = getGuestStatus(guest)

                  return (
                    <TableRow key={guest.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.primary">
                          {guest.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.primary">
                          {guest.document ?? '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>{renderStatus(guest, status)}</TableCell>
                      <TableCell align="right">{renderAction(guest, status, false)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </Stack>
      </CardContent>
    </MuiCard>
  )
}
