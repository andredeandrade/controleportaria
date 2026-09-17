'use client'

import type { Event, RegisterEventAccessRequest } from '@/app/api/events/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EventsServiceError, registerEventAccess } from '@/services/eventos/service'

export function useRegisterEventAccess() {
  const queryClient = useQueryClient()

  return useMutation<
    Event,
    EventsServiceError,
    { eventId: string; payload: RegisterEventAccessRequest }
  >({
    mutationFn: ({ eventId, payload }) => registerEventAccess(eventId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
