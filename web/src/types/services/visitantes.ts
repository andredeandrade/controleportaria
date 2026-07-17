import type { Visitor, VisitorsListResponse } from '@/app/api/visitors/types'

export type ListVisitorsApiResponseBody =
  | ({ message?: string } & Partial<VisitorsListResponse>)
  | null

export type RegisterVisitorApiResponseBody = ({ message?: string } & Partial<Visitor>) | null
