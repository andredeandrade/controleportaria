'use client'

import type { AuthMeResponse, AuthenticatedUser } from '@/app/api/auth/me/types'
import { useQuery } from '@tanstack/react-query'

class AuthMeError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AuthMeError'
    this.status = status
  }
}

async function fetchAuthenticatedUser(): Promise<AuthMeResponse> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  const responseBody = (await response.json().catch(() => null)) as {
    message?: string
    user?: AuthenticatedUser
  } | null

  if (!response.ok) {
    throw new AuthMeError(
      responseBody?.message ?? 'Não foi possível carregar o usuário.',
      response.status,
    )
  }

  if (!responseBody?.user) {
    throw new AuthMeError('Resposta inválida ao carregar usuário autenticado.', 500)
  }

  return { user: responseBody.user }
}

export function useAuthenticatedUser() {
  return useQuery<AuthenticatedUser, AuthMeError>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const data = await fetchAuthenticatedUser()
      return data.user
    },
  })
}
