'use client'

import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { RegisterEventButton } from '@/modules/eventos/components/RegisterEventButton'
import { useEventListContext } from '@/modules/eventos/context/EventListContext'
import { EventsMobileListLoader } from '@/modules/eventos/mobile/EventsMobileListLoader'
import { ListEmptyState } from '@/modules/table/components/ListEmptyState'
import { ListErrorState } from '@/modules/table/components/ListErrorState'
import { MobileFieldLabel, MobileListCard } from '@/styles/MobileList.styles'

const SKELETON_CARD_COUNT = 5

export function EventsMobileList() {
  const {
    records,
    isLoading,
    isError,
    errorMessage,
    refetch: onRetry,
    handleClearFilters,
    handleOpenDeleteConfirmation,
  } = useEventListContext()

  return (
    <Stack spacing={3}>
      {isError ? (
        <ListErrorState
          title="Não foi possível carregar os eventos."
          message={errorMessage}
          onRetry={onRetry}
        />
      ) : isLoading ? (
        Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
          <EventsMobileListLoader key={index} />
        ))
      ) : records.length === 0 ? (
        <ListEmptyState
          title="Nenhum evento encontrado."
          description="Nenhum registro corresponde à busca realizada. Ajuste os critérios ou agende um novo evento."
          actions={
            <>
              <Button variant="outlined" onClick={handleClearFilters}>
                Limpar busca
              </Button>
              <RegisterEventButton />
            </>
          }
        />
      ) : (
        records.map((record) => (
          <MobileListCard key={record.id} variant="outlined" sx={{ p: 5 }}>
            <Stack spacing={5}>
              <Stack spacing={0.25}>
                <Typography variant="body1" fontWeight={700} color="text.primary">
                  {record.title}
                </Typography>
                {record.space ? (
                  <Typography variant="caption" color="text.disabled">
                    {record.space}
                  </Typography>
                ) : null}
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Data</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.date}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Horário</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.time}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Unidade</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.unit}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Responsável</MobileFieldLabel>
                <Typography variant="body2" color="text.primary">
                  {record.responsibleName}
                </Typography>
              </Stack>

              <Stack spacing={0.25}>
                <MobileFieldLabel variant="caption">Convidados</MobileFieldLabel>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <GroupsRoundedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.primary">
                    {record.guestsCount}
                  </Typography>
                </Stack>
              </Stack>

              <Divider sx={{ borderColor: 'divider' }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityRoundedIcon fontSize="small" />}
                  >
                    Visualizar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditRoundedIcon fontSize="small" />}
                  >
                    Editar
                  </Button>
                </Stack>
                <IconButton
                  size="small"
                  aria-label="Excluir evento"
                  onClick={() => handleOpenDeleteConfirmation(record)}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </MobileListCard>
        ))
      )}
    </Stack>
  )
}
