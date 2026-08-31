'use client'

import type { Event } from '@/app/api/events/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventsServiceError, checkInEventGuest } from '@/services/eventos/service'

export function useCheckInEventGuest() {
  const queryClient = useQueryClient()

  return useMutation<Event, EventsServiceError, { eventId: string; guestId: string }>({
    mutationFn: (payload) => checkInEventGuest(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
