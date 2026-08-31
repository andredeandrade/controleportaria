'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteIncident, IncidentsServiceError } from '@/services/ocorrencias/service'

export function useDeleteOccurrence() {
  const queryClient = useQueryClient()

  return useMutation<void, IncidentsServiceError, string>({
    mutationFn: deleteIncident,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })
}
