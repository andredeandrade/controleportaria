import type { Resident, ResidentsListResponse } from '@/app/api/residents/types'

export type ListResidentsApiResponseBody =
  | ({ message?: string } & Partial<ResidentsListResponse>)
  | null

export type RegisterResidentApiResponseBody = ({ message?: string } & Partial<Resident>) | null
