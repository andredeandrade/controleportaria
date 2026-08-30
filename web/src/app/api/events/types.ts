export type EventGuest = {
  id: string
  name: string
  document: string | null
}

export type Event = {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string | null
  unit: string
  space: string | null
  responsibleName: string
  guests: EventGuest[]
  observations: string | null
  createdByUserId: string | null
  createdAt: string
  updatedAt: string
}

export type EventsListResponse = {
  items: Event[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export type CreateEventRequest = {
  title: string
  date: string
  startTime: string
  endTime?: string
  unit: string
  space?: string
  responsibleName: string
  guests: {
    name: string
    document?: string
  }[]
  observations?: string
}

export type UpdateEventRequest = {
  title?: string
  date?: string
  startTime?: string
  endTime?: string
  unit?: string
  space?: string
  responsibleName?: string
  guests?: {
    name: string
    document?: string
  }[]
  observations?: string
}
