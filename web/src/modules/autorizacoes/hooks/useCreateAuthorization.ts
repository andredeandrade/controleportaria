'use client'

import type { Authorization, CreateAuthorizationRequest } from '@/app/api/authorizations/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AuthorizationsServiceError, registerAuthorization } from '@/services/autorizacoes/service'

export function useCreateAuthorization() {
  const queryClient = useQueryClient()

  return useMutation<Authorization, AuthorizationsServiceError, CreateAuthorizationRequest>({
    mutationFn: registerAuthorization,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['authorizations'] })
    },
  })
}
