'use client'

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

import type { Event, EventVehicle } from '@/app/api/events/types'
import { EventAddVehicleDialog } from '@/modules/eventos/components/EventAddVehicleDialog'
import { useCheckOutEventVehicle } from '@/modules/eventos/hooks/useCheckOutEventVehicle'
import { useDeleteEventVehicle } from '@/modules/eventos/hooks/useDeleteEventVehicle'
import { Table } from '@/modules/table/components/Table'
import { TableBody } from '@/modules/table/components/TableBody'
import { TableCell } from '@/modules/table/components/TableCell'
import { TableHead } from '@/modules/table/components/TableHead'
import { TableHeadCell } from '@/modules/table/components/TableHeadCell'
import { TableRow } from '@/modules/table/components/TableRow'
import { useAppSnackbar } from '@/providers'
import { MobileListCard } from '@/styles/MobileList.styles'

const COLUMN_COUNT = 7

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

type EventVehiclesCardProps = {
  event: Event
}

export function EventVehiclesCard({ event }: EventVehiclesCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [addVehicleOpen, setAddVehicleOpen] = useState(false)
  const { showSuccess, showError } = useAppSnackbar()
  const checkOutMutation = useCheckOutEventVehicle()
  const deleteMutation = useDeleteEventVehicle()

  const vehiclesCount = event.vehicles.length

  const handleCheckOut = async (vehicleId: string) => {
    try {
      await checkOutMutation.mutateAsync({ eventId: event.id, vehicleId })
      showSuccess('Saída do veículo registrada.')
    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Não foi possível registrar a saída do veículo.',
      )
    }
  }

  const handleDelete = async (vehicleId: string) => {
    try {
      await deleteMutation.mutateAsync({ eventId: event.id, vehicleId })
      showSuccess('Veículo removido.')
    } catch (error) {
      showError(error instanceof Error ? error.message : 'Não foi possível remover o veículo.')
    }
  }

  const renderStatus = (vehicle: EventVehicle) => {
    if (!vehicle.checkOutAt) {
      return <Chip size="small" color="success" label="No local" />
    }

    return (
      <Typography variant="body2" color="text.secondary">
        {`Saída ${formatTime(vehicle.checkOutAt)}`}
      </Typography>
    )
  }

  const renderAction = (vehicle: EventVehicle, fullWidth: boolean) => {
    if (!vehicle.checkOutAt) {
      return (
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          fullWidth={fullWidth}
          disabled={checkOutMutation.isPending}
          onClick={() => void handleCheckOut(vehicle.id)}
        >
          Registrar saída
        </Button>
      )
    }

    if (fullWidth) {
      return (
        <Button
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          disabled={deleteMutation.isPending}
          startIcon={<DeleteOutlineRoundedIcon fontSize="small" />}
          onClick={() => void handleDelete(vehicle.id)}
        >
          Remover
        </Button>
      )
    }

    return (
      <IconButton
        aria-label="Remover veículo"
        color="error"
        size="small"
        disabled={deleteMutation.isPending}
        onClick={() => void handleDelete(vehicle.id)}
      >
        <DeleteOutlineRoundedIcon fontSize="small" />
      </IconButton>
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
              <DirectionsCarRoundedIcon color="primary" fontSize="small" />
              <Typography variant="h4">Veículos no Evento</Typography>
            </Stack>

            {!isMobile ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => setAddVehicleOpen(true)}
              >
                + Adicionar veículo
              </Button>
            ) : null}
          </Stack>

          {vehiclesCount === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum veículo registrado. Use &quot;Adicionar veículo&quot; quando um carro entrar
              para o evento.
            </Typography>
          ) : isMobile ? (
            <Stack spacing={1.5}>
              {event.vehicles.map((vehicle, index) => (
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

                    <Typography variant="caption" color="text.secondary">
                      {`Entrada ${formatTime(vehicle.checkInAt)}`}
                    </Typography>

                    {renderAction(vehicle, true)}
                  </Stack>
                </MobileListCard>
              ))}
            </Stack>
          ) : (
            <Table>
              <TableHead>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Placa</TableHeadCell>
                <TableHeadCell>Modelo</TableHeadCell>
                <TableHeadCell>Condutor</TableHeadCell>
                <TableHeadCell>Entrada</TableHeadCell>
                <TableHeadCell>Saída</TableHeadCell>
                <TableHeadCell align="right">Ação</TableHeadCell>
              </TableHead>
              <TableBody
                isEmpty={false}
                emptyState={
                  <Typography variant="body2" color="text.secondary">
                    Nenhum veículo registrado.
                  </Typography>
                }
                colSpan={COLUMN_COUNT}
              >
                {event.vehicles.map((vehicle, index) => (
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
                      <Typography variant="body2" color="text.primary">
                        {vehicle.driverName ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.primary">
                        {formatTime(vehicle.checkInAt)}
                      </Typography>
                    </TableCell>
                    <TableCell>{renderStatus(vehicle)}</TableCell>
                    <TableCell align="right">{renderAction(vehicle, false)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {isMobile ? (
            <Button variant="contained" color="primary" fullWidth onClick={() => setAddVehicleOpen(true)}>
              + Adicionar veículo
            </Button>
          ) : null}
        </Stack>
      </CardContent>

      <EventAddVehicleDialog
        open={addVehicleOpen}
        onClose={() => setAddVehicleOpen(false)}
        eventId={event.id}
      />
    </MuiCard>
  )
}
