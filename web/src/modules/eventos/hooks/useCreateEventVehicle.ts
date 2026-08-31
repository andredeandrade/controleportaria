'use client'

import type { CreateEventVehicleRequest, Event } from '@/app/api/events/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventsServiceError, createEventVehicle } from '@/services/eventos/service'

export function useCreateEventVehicle() {
  const queryClient = useQueryClient()

  return useMutation<
    Event,
    EventsServiceError,
    { eventId: string } & CreateEventVehicleRequest
  >({
    mutationFn: (payload) => createEventVehicle(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
