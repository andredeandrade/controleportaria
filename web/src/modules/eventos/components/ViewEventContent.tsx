'use client'

import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { EventDetailsCard } from '@/modules/eventos/components/EventDetailsCard'
import { EventGuestsCard } from '@/modules/eventos/components/EventGuestsCard'
import { EventObservationsCard } from '@/modules/eventos/components/EventObservationsCard'
import { EventVehiclesCard } from '@/modules/eventos/components/EventVehiclesCard'
import { useEvent } from '@/modules/eventos/hooks/useEvent'
import { BackToPreviousPageButton } from '@/modules/navigation/components/BackToPreviousPageButton'
import { ListErrorState } from '@/modules/table/components/ListErrorState'

type ViewEventContentProps = {
  eventId: string
}

export function ViewEventContent({ eventId }: ViewEventContentProps) {
  const { event, isLoading, isError, errorMessage, refetch } = useEvent(eventId)

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (isError || !event) {
    return (
      <ListErrorState
        title="Não foi possível carregar o evento."
        message={errorMessage}
        onRetry={refetch}
      />
    )
  }

  return (
    <Stack spacing={{ xs: 5, sm: 6 }} py={{ xs: 3, sm: 5 }}>
      <Stack spacing={{ xs: 2.5, sm: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <BackToPreviousPageButton
            ariaLabel="Voltar para a pagina anterior"
            fallbackHref="/eventos"
          />

          <Typography variant="h2" fontWeight={700} color="text.primary">
            Visualização do Evento
          </Typography>
        </Stack>

        <Typography variant="body2" color="primary.main">
          {event.title}
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        <EventDetailsCard event={event} />
        <EventGuestsCard event={event} />
        <EventVehiclesCard event={event} />
        <EventObservationsCard event={event} />
      </Stack>
    </Stack>
  )
}
