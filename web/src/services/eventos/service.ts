import type { CreateEventRequest, Event, EventsListResponse } from '@/app/api/events/types'
import { getApiErrorMessage, safeReadJson } from '@/services/shared/http'
import type {
  ListEventsApiResponseBody,
  RegisterEventApiResponseBody,
} from '@/types/services/eventos'

export class EventsServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EventsServiceError'
  }
}

export async function listEvents(
  page: number,
  pageSize: number,
  search: string,
): Promise<EventsListResponse> {
  const query = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  if (search.trim()) {
    query.set('search', search.trim())
  }

  const response = await fetch(`/api/events?${query.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  const payload = (await safeReadJson(response)) as ListEventsApiResponseBody

  if (!response.ok) {
    throw new EventsServiceError(
      getApiErrorMessage(payload, 'Nao foi possivel carregar os eventos.'),
    )
  }

  if (!payload?.items || !payload.pagination) {
    throw new EventsServiceError('Resposta invalida ao carregar eventos.')
  }

  return payload as EventsListResponse
}

export async function registerEvent(payload: CreateEventRequest): Promise<Event> {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseBody = (await safeReadJson(response)) as RegisterEventApiResponseBody

  if (!response.ok) {
    throw new EventsServiceError(
      getApiErrorMessage(responseBody, 'Nao foi possivel cadastrar o evento.'),
    )
  }

  if (!responseBody?.id) {
    throw new EventsServiceError('Resposta invalida ao cadastrar evento.')
  }

  return responseBody as Event
}
