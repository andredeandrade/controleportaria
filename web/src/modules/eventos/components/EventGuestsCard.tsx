'use client'

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

import type { Event, EventGuest } from '@/app/api/events/types'
import { useCan } from '@/hooks/useCan'
import { EventAddGuestDialog } from '@/modules/eventos/components/EventAddGuestDialog'
import {
  EventCheckOutDialog,
  type EventCheckOutTarget,
} from '@/modules/eventos/components/EventCheckOutDialog'
import { EventGuestCheckInDialog } from '@/modules/eventos/components/EventGuestCheckInDialog'
import { EventGuestDetailsDialog } from '@/modules/eventos/components/EventGuestDetailsDialog'
import {
  EventGuestStatusChip,
  getEventGuestStatus,
  type EventGuestStatus,
} from '@/modules/eventos/components/EventGuestStatusChip'
import { Table } from '@/modules/table/components/Table'
import { TableBody } from '@/modules/table/components/TableBody'
import { TableCell } from '@/modules/table/components/TableCell'
import { TableHead } from '@/modules/table/components/TableHead'
import { TableHeadCell } from '@/modules/table/components/TableHeadCell'
import { TableRow } from '@/modules/table/components/TableRow'
import { ListSearchField } from '@/modules/table/components/ListSearchField'
import { MobileListCard } from '@/styles/MobileList.styles'

const COLUMN_COUNT = 5

type GuestFilter = 'todos' | EventGuestStatus

const FILTER_LABEL: Record<GuestFilter, string> = {
  todos: 'Todos',
  aguardando: 'Aguardando',
  presente: 'Presentes',
  saiu: 'Saíram',
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
  const [statusFilter, setStatusFilter] = useState<GuestFilter>('todos')
  const [addGuestOpen, setAddGuestOpen] = useState(false)
  const [viewedGuestId, setViewedGuestId] = useState<string | null>(null)
  const [checkInGuestId, setCheckInGuestId] = useState<string | null>(null)
  const [checkOutTarget, setCheckOutTarget] = useState<EventCheckOutTarget | null>(null)
  const canAddGuest = useCan('events', 'addGuest')
  const canRegisterAccess = useCan('events', 'registerAccess')

  const guestsCount = event.guests.length
  const presentCount = event.guests.filter((guest) => getEventGuestStatus(guest.checkInAt, guest.checkOutAt) === 'presente').length
  const departedCount = event.guests.filter((guest) => getEventGuestStatus(guest.checkInAt, guest.checkOutAt) === 'saiu').length
  const waitingCount = event.guests.filter((guest) => getEventGuestStatus(guest.checkInAt, guest.checkOutAt) === 'aguardando').length

  const filteredGuests = event.guests.filter((guest) => {
    if (!matchesSearch(guest, searchTerm)) {
      return false
    }

    if (statusFilter === 'todos') {
      return true
    }

    return getEventGuestStatus(guest.checkInAt, guest.checkOutAt) === statusFilter
  })

  const viewedGuest = event.guests.find((guest) => guest.id === viewedGuestId) ?? null
  const checkInGuest = event.guests.find((guest) => guest.id === checkInGuestId) ?? null

  const emptyMessage =
    guestsCount === 0
      ? 'Nenhum convidado cadastrado para este evento.'
      : 'Nenhum convidado corresponde ao filtro selecionado.'

  const renderAction = (guest: EventGuest, status: EventGuestStatus) => (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title="Visualizar">
        <IconButton
          aria-label={`Visualizar ${guest.name}`}
          size="small"
          onClick={() => setViewedGuestId(guest.id)}
        >
          <VisibilityRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {canRegisterAccess && status === 'aguardando' ? (
        <Tooltip title="Registrar entrada">
          <IconButton
            aria-label={`Registrar entrada de ${guest.name}`}
            size="small"
            color="success"
            onClick={() => setCheckInGuestId(guest.id)}
          >
            <LoginRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}

      {canRegisterAccess && status === 'presente' ? (
        <Tooltip title="Registrar saída">
          <IconButton
            aria-label={`Registrar saída de ${guest.name}`}
            size="small"
            color="warning"
            onClick={() => setCheckOutTarget({ type: 'guest', guestId: guest.id })}
          >
            <LogoutRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}
    </Stack>
  )

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

            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" rowGap={2}>
              <ListSearchField
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Buscar por nome ou documento..."
                sx={{ width: { xs: '100%', sm: 260 } }}
              />

              {!isMobile && canAddGuest ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setAddGuestOpen(true)}
                >
                  + Adicionar convidado
                </Button>
              ) : null}
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {`${presentCount} presentes · ${departedCount} saídas registradas · ${waitingCount} aguardando`}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {(['todos', 'aguardando', 'presente', 'saiu'] as GuestFilter[]).map((filter) => {
              const count =
                filter === 'todos'
                  ? guestsCount
                  : filter === 'aguardando'
                    ? waitingCount
                    : filter === 'presente'
                      ? presentCount
                      : departedCount

              return (
                <Chip
                  key={filter}
                  label={`${FILTER_LABEL[filter]} (${count})`}
                  size="small"
                  color={statusFilter === filter ? 'primary' : 'default'}
                  variant={statusFilter === filter ? 'filled' : 'outlined'}
                  onClick={() => setStatusFilter(filter)}
                />
              )
            })}
          </Stack>

          {isMobile ? (
            filteredGuests.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {filteredGuests.map((guest, index) => {
                  const status = getEventGuestStatus(guest.checkInAt, guest.checkOutAt)

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

                          <EventGuestStatusChip
                            checkInAt={guest.checkInAt}
                            checkOutAt={guest.checkOutAt}
                          />
                        </Stack>

                        {renderAction(guest, status)}
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
                  const status = getEventGuestStatus(guest.checkInAt, guest.checkOutAt)

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
                      <TableCell>
                        <EventGuestStatusChip
                          checkInAt={guest.checkInAt}
                          checkOutAt={guest.checkOutAt}
                        />
                      </TableCell>
                      <TableCell align="right">{renderAction(guest, status)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}

          {isMobile && canAddGuest ? (
            <Button variant="contained" color="primary" fullWidth onClick={() => setAddGuestOpen(true)}>
              + Adicionar convidado
            </Button>
          ) : null}
        </Stack>
      </CardContent>

      <EventAddGuestDialog
        open={addGuestOpen}
        onClose={() => setAddGuestOpen(false)}
        eventId={event.id}
      />

      <EventGuestDetailsDialog event={event} guest={viewedGuest} onClose={() => setViewedGuestId(null)} />

      {checkInGuest ? (
        <EventGuestCheckInDialog
          open={Boolean(checkInGuest)}
          onClose={() => setCheckInGuestId(null)}
          eventId={event.id}
          guest={checkInGuest}
        />
      ) : null}

      <EventCheckOutDialog event={event} target={checkOutTarget} onClose={() => setCheckOutTarget(null)} />
    </MuiCard>
  )
}
