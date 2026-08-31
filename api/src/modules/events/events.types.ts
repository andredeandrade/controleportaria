export interface EventGuestInput {
  id?: string
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
  space?: string
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
  space?: string | null
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
  checkInAt: Date | null
  checkOutAt: Date | null
}

export interface EventVehicleResponse {
  id: string
  plate: string | null
  brandModel: string | null
  driverName: string | null
  color: string | null
  checkInAt: Date
  checkOutAt: Date | null
}

export interface CreateEventVehicleInput {
  plate: string
  brandModel?: string
  driverName?: string
  color?: string
}

export interface EventResponse {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string | null
  unit: string
  space: string | null
  responsibleName: string
  guests: EventGuestResponse[]
  vehicles: EventVehicleResponse[]
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}
