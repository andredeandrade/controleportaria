'use client'

import type { CreateServiceProviderRequest, ServiceProvider } from '@/app/api/service-providers/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateServiceProvider, ServiceProvidersServiceError } from '@/services/prestadores-servicos/service'

export function useUpdateServiceProvider(id: string) {
  const queryClient = useQueryClient()

  return useMutation<ServiceProvider, ServiceProvidersServiceError, CreateServiceProviderRequest>({
    mutationFn: (payload) => updateServiceProvider(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['service-providers'] })
    },
  })
}
