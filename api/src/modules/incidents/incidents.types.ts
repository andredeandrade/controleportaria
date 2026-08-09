export interface CreateIncidentInput {
  condominiumId: string
  occurrenceType: string
  date: string
  time: string
  report: string
  createdByUserId: string
}

export interface UpdateIncidentInput {
  occurrenceType?: string
  date?: string
  time?: string
  report?: string | null
}

export interface ListIncidentsInput {
  condominiumId: string
  page: number
  pageSize: number
  search?: string
}

export interface IncidentResponse {
  id: string
  occurrenceType: string
  date: string
  time: string
  report: string
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}
