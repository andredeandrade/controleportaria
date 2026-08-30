import type { Event, EventsListResponse } from '@/app/api/events/types'

export type ListEventsApiResponseBody = ({ message?: string } & Partial<EventsListResponse>) | null

export type RegisterEventApiResponseBody = ({ message?: string } & Partial<Event>) | null

export type GetEventApiResponseBody = ({ message?: string } & Partial<Event>) | null

export type UpdateEventApiResponseBody = ({ message?: string } & Partial<Event>) | null
