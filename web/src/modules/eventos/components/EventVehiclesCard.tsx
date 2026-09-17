'use client'

import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
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

import type { Event, EventVehicle, EventVehicleMovementType } from '@/app/api/events/types'
import { useCan } from '@/hooks/useCan'
import {
  EventCheckOutDialog,
  type EventCheckOutTarget,
} from '@/modules/eventos/components/EventCheckOutDialog'
import { EventVehicleDetailsDialog } from '@/modules/eventos/components/EventVehicleDetailsDialog'
import { EventVehicleMovementBadge } from '@/modules/eventos/components/EventVehicleMovementBadge'
import { Table } from '@/modules/table/components/Table'
import { TableBody } from '@/modules/table/components/TableBody'
import { TableCell } from '@/modules/table/components/TableCell'
import { TableHead } from '@/modules/table/components/TableHead'
import { TableHeadCell } from '@/modules/table/components/TableHeadCell'
import { TableRow } from '@/modules/table/components/TableRow'
import { ListSearchField } from '@/modules/table/components/ListSearchField'
import { MobileListCard } from '@/styles/MobileList.styles'

const COLUMN_COUNT = 6

type MovementFilter = 'todos' | EventVehicleMovementType

const MOVEMENT_FILTER_LABEL: Record<MovementFilter, string> = {
  todos: 'Todos',
  CONVIDADO: 'Convidado',
  DESEMBARQUE: 'Desembarque',
  BUSCA: 'Busca de convidado',
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function matchesSearch(vehicle: EventVehicle, searchTerm: string): boolean {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  if (!normalizedSearch) {
    return true
  }

  const plate = vehicle.plate?.toLowerCase() ?? ''
  const brandModel = vehicle.brandModel?.toLowerCase() ?? ''
  const driverName = vehicle.driverName?.toLowerCase() ?? ''

  return (
    plate.includes(normalizedSearch) ||
    brandModel.includes(normalizedSearch) ||
    driverName.includes(normalizedSearch)
  )
}

type EventVehiclesCardProps = {
  event: Event
}

export function EventVehiclesCard({ event }: EventVehiclesCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchTerm, setSearchTerm] = useState('')
  const [movementFilter, setMovementFilter] = useState<MovementFilter>('todos')
  const [onlyOpen, setOnlyOpen] = useState(false)
  const [viewedVehicleId, setViewedVehicleId] = useState<string | null>(null)
  const [checkOutTarget, setCheckOutTarget] = useState<EventCheckOutTarget | null>(null)
  const canRegisterAccess = useCan('events', 'registerAccess')

  const vehiclesCount = event.vehicles.length
  const openCount = event.vehicles.filter((vehicle) => vehicle.isOpen).length

  const filteredVehicles = event.vehicles.filter((vehicle) => {
    if (!matchesSearch(vehicle, searchTerm)) {
      return false
    }

    if (movementFilter !== 'todos' && vehicle.movementType !== movementFilter) {
      return false
    }

    if (onlyOpen && !vehicle.isOpen) {
      return false
    }

    return true
  })

  const viewedVehicle = event.vehicles.find((vehicle) => vehicle.id === viewedVehicleId) ?? null

  const emptyMessage =
    vehiclesCount === 0
      ? 'Nenhum veículo registrado. Veículos entram no evento pela tela "Registrar acesso".'
      : 'Nenhum veículo corresponde ao filtro selecionado.'

  const renderStatus = (vehicle: EventVehicle) => {
    if (vehicle.isOpen) {
      return <Chip size="small" color="success" label="No local" />
    }

    return (
      <Typography variant="body2" color="text.secondary">
        {`Saída ${formatTime(vehicle.checkOutAt as string)}`}
      </Typography>
    )
  }

  const renderAction = (vehicle: EventVehicle) => (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      <Tooltip title="Visualizar">
        <IconButton
          aria-label={`Visualizar veículo ${vehicle.plate ?? ''}`}
          size="small"
          onClick={() => setViewedVehicleId(vehicle.id)}
        >
          <VisibilityRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      {canRegisterAccess && vehicle.isOpen ? (
        <Tooltip title="Registrar saída">
          <IconButton
            aria-label={`Registrar saída do veículo ${vehicle.plate ?? ''}`}
            size="small"
            color="warning"
            onClick={() => setCheckOutTarget({ type: 'vehicle', vehicleId: vehicle.id })}
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
              <DirectionsCarRoundedIcon color="primary" fontSize="small" />
              <Typography variant="h4">Veículos no Evento</Typography>
              <Chip size="small" color="success" label={`${vehiclesCount} registrados`} />
            </Stack>

            <ListSearchField
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar por placa, modelo ou motorista..."
              sx={{ width: { xs: '100%', sm: 260 } }}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {`${openCount} no local · ${vehiclesCount - openCount} com saída registrada`}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            {(['todos', 'CONVIDADO', 'DESEMBARQUE', 'BUSCA'] as MovementFilter[]).map((filter) => (
              <Chip
                key={filter}
                label={MOVEMENT_FILTER_LABEL[filter]}
                size="small"
                color={movementFilter === filter ? 'primary' : 'default'}
                variant={movementFilter === filter ? 'filled' : 'outlined'}
                onClick={() => setMovementFilter(filter)}
              />
            ))}

            <Chip
              label="Somente no local"
              size="small"
              color={onlyOpen ? 'primary' : 'default'}
              variant={onlyOpen ? 'filled' : 'outlined'}
              onClick={() => setOnlyOpen((current) => !current)}
            />
          </Stack>

          {isMobile ? (
            filteredVehicles.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {filteredVehicles.map((vehicle, index) => (
                  <MobileListCard key={vehicle.id} variant="outlined">
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                          <Typography variant="caption" color="text.disabled">
                            {index + 1}
                          </Typography>
                          <Stack spacing={0.25}>
                            <Typography variant="body2" fontWeight={700} color="text.primary">
                              {vehicle.plate ?? '—'}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {vehicle.brandModel ?? '—'}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {vehicle.driverName ?? '—'}
                            </Typography>
                          </Stack>
                        </Stack>

                        {renderStatus(vehicle)}
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" rowGap={1}>
                        <EventVehicleMovementBadge movementType={vehicle.movementType} />
                        <Typography variant="caption" color="text.secondary">
                          {`Entrada ${formatTime(vehicle.checkInAt)}`}
                        </Typography>
                      </Stack>

                      {renderAction(vehicle)}
                    </Stack>
                  </MobileListCard>
                ))}
              </Stack>
            )
          ) : (
            <Table>
              <TableHead>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Placa</TableHeadCell>
                <TableHeadCell>Modelo</TableHeadCell>
                <TableHeadCell>Movimentação</TableHeadCell>
                <TableHeadCell>Situação</TableHeadCell>
                <TableHeadCell align="right">Ação</TableHeadCell>
              </TableHead>
              <TableBody
                isEmpty={filteredVehicles.length === 0}
                emptyState={
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                }
                colSpan={COLUMN_COUNT}
              >
                {filteredVehicles.map((vehicle, index) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">
                        {vehicle.plate ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">
                        {vehicle.brandModel ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <EventVehicleMovementBadge movementType={vehicle.movementType} />
                    </TableCell>
                    <TableCell>{renderStatus(vehicle)}</TableCell>
                    <TableCell align="right">{renderAction(vehicle)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Stack>
      </CardContent>

      <EventVehicleDetailsDialog
        event={event}
        vehicle={viewedVehicle}
        onClose={() => setViewedVehicleId(null)}
      />

      <EventCheckOutDialog event={event} target={checkOutTarget} onClose={() => setCheckOutTarget(null)} />
    </MuiCard>
  )
}
