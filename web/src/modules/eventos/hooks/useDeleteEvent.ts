'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteEvent, EventsServiceError } from '@/services/eventos/service'

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation<void, EventsServiceError, string>({
    mutationFn: deleteEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
