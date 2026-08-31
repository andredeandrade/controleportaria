export type EventGuest = {
  id: string
  name: string
  document: string | null
  checkInAt: string | null
  checkOutAt: string | null
}

export type EventVehicle = {
  id: string
  plate: string | null
  brandModel: string | null
  driverName: string | null
  color: string | null
  checkInAt: string
  checkOutAt: string | null
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
  vehicles: EventVehicle[]
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
    id?: string
    name: string
    document?: string
  }[]
  observations?: string
}

export type CreateEventVehicleRequest = {
  plate: string
  brandModel?: string
  driverName?: string
  color?: string
}
