'use client'

import type { CreateIncidentRequest, Incident } from '@/app/api/incidents/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IncidentsServiceError, registerIncident } from '@/services/ocorrencias/service'

export function useCreateOccurrence() {
  const queryClient = useQueryClient()

  return useMutation<Incident, IncidentsServiceError, CreateIncidentRequest>({
    mutationFn: registerIncident,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })
}
