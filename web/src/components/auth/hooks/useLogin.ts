'use client'

import type { AuthenticatedUser } from '@/app/api/auth/me/types'
import { useMutation } from '@tanstack/react-query'

type LoginPayload = {
  email: string
  password: string
  condominiumSlug?: string
}

type LoginResponse = {
  user: AuthenticatedUser
}

class LoginError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}

async function performLogin(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseBody = (await response.json().catch(() => null)) as {
    message?: string
    user?: AuthenticatedUser
  } | null

  if (!response.ok) {
    throw new LoginError(responseBody?.message ?? 'Falha ao autenticar.')
  }

  if (!responseBody?.user) {
    throw new LoginError('Resposta inválida de autenticação.')
  }

  return { user: responseBody.user }
}

export function useLogin() {
  return useMutation<LoginResponse, LoginError, LoginPayload>({
    mutationFn: performLogin,
  })
}
