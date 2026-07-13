export type LoginRequestBody = {
  email?: unknown
  password?: unknown
  condominiumSlug?: unknown
}

export type LoginApiResponse = {
  token: string
  user: {
    id: string
    condominiumId: string
    name: string
    email: string
    role: 'ADMIN' | 'PORTARIA'
  }
}

export type CondominiumIdResponse = {
  id: string
}
