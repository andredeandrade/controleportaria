'use client'

import type { Authorization, CreateAuthorizationRequest } from '@/app/api/authorizations/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAuthorization, AuthorizationsServiceError } from '@/services/autorizacoes/service'

export function useUpdateAuthorization(id: string) {
  const queryClient = useQueryClient()

  return useMutation<Authorization, AuthorizationsServiceError, CreateAuthorizationRequest>({
    mutationFn: (payload) => updateAuthorization(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authorizations'] })
    },
  })
}
