'use client'

import type { CreateIncidentRequest, Incident } from '@/app/api/incidents/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IncidentsServiceError, updateIncident } from '@/services/ocorrencias/service'

export function useUpdateOccurrence(id: string) {
  const queryClient = useQueryClient()

  return useMutation<Incident, IncidentsServiceError, CreateIncidentRequest>({
    mutationFn: (payload) => updateIncident(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })
}
