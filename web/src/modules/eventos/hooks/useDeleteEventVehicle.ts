'use client'

import type { Event } from '@/app/api/events/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventsServiceError, deleteEventVehicle } from '@/services/eventos/service'

export function useDeleteEventVehicle() {
  const queryClient = useQueryClient()

  return useMutation<Event, EventsServiceError, { eventId: string; vehicleId: string }>({
    mutationFn: (payload) => deleteEventVehicle(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
