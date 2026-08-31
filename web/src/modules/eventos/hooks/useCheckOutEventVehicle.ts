'use client'

import type { Event } from '@/app/api/events/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventsServiceError, checkOutEventVehicle } from '@/services/eventos/service'

export function useCheckOutEventVehicle() {
  const queryClient = useQueryClient()

  return useMutation<Event, EventsServiceError, { eventId: string; vehicleId: string }>({
    mutationFn: (payload) => checkOutEventVehicle(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
