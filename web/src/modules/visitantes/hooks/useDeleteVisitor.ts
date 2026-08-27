'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteVisitor, VisitorsServiceError } from '@/services/visitantes/service'

export function useDeleteVisitor() {
  const queryClient = useQueryClient()

  return useMutation<void, VisitorsServiceError, string>({
    mutationFn: deleteVisitor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}
