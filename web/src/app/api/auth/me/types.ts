export type AuthenticatedUser = {
  id: string
  condominiumId: string
  email: string
  name: string
  role: 'ADMIN' | 'PORTARIA'
}

export type AuthMeResponse = {
  user: AuthenticatedUser
}
