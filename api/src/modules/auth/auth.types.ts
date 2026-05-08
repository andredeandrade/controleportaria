import type { UserRole } from '../../lib/jwt.js'

export interface RegisterInput {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
  name: string
}
