export interface EventGuestInput {
  name: string
  document?: string
}

export interface CreateEventInput {
  condominiumId: string
  title: string
  date: string
  startTime: string
  endTime?: string
  unit: string
  responsibleName: string
  guests: EventGuestInput[]
  observations?: string
  createdByUserId: string
}

export interface UpdateEventInput {
  title?: string
  date?: string
  startTime?: string
  endTime?: string | null
  unit?: string
  responsibleName?: string
  guests?: EventGuestInput[]
  observations?: string | null
}

export interface ListEventsInput {
  condominiumId: string
  page: number
  pageSize: number
  search?: string
}

export interface EventGuestResponse {
  id: string
  name: string
  document: string | null
}

export interface EventResponse {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string | null
  unit: string
  responsibleName: string
  guests: EventGuestResponse[]
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}
