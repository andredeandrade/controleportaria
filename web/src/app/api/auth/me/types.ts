export enum UserRole {
  ADMIN = 'ADMIN',
  PORTARIA = 'PORTARIA',
}

export type AuthenticatedUser = {
  id: string
  condominiumId: string
  email: string
  name: string
  role: UserRole
}

export type AuthMeResponse = {
  user: AuthenticatedUser
}
