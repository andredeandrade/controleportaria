'use client'

import { useMutation } from '@tanstack/react-query'
import { LoginServiceError, login } from '@/services/auth/service'
import type { LoginPayload, LoginResponse } from '@/types/services/auth'

export function useLogin() {
  return useMutation<LoginResponse, LoginServiceError, LoginPayload>({
    mutationFn: login,
  })
}
