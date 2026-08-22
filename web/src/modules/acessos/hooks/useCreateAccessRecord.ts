'use client'

import type { AccessRecord, CreateAccessRecordRequest } from '@/app/api/access-records/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AccessRecordsServiceError, registerAccessRecord } from '@/services/acessos/service'

export function useCreateAccessRecord() {
  const queryClient = useQueryClient()

  return useMutation<AccessRecord, AccessRecordsServiceError, CreateAccessRecordRequest>({
    mutationFn: registerAccessRecord,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['access-records'] })
    },
  })
}
