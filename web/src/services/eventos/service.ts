import type {
  CreateEventRequest,
  Event,
  EventsListResponse,
  UpdateEventRequest,
} from '@/app/api/events/types'
import { getApiErrorMessage, safeReadJson } from '@/services/shared/http'
import type {
  GetEventApiResponseBody,
  ListEventsApiResponseBody,
  RegisterEventApiResponseBody,
  UpdateEventApiResponseBody,
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

export async function getEvent(id: string): Promise<Event> {
  const response = await fetch(`/api/events/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  const payload = (await safeReadJson(response)) as GetEventApiResponseBody

  if (!response.ok) {
    throw new EventsServiceError(getApiErrorMessage(payload, 'Não foi possível carregar o evento.'))
  }

  if (!payload?.id) {
    throw new EventsServiceError('Resposta inválida ao carregar evento.')
  }

  return payload as Event
}

export async function updateEvent(id: string, payload: UpdateEventRequest): Promise<Event> {
  const response = await fetch(`/api/events/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseBody = (await safeReadJson(response)) as UpdateEventApiResponseBody

  if (!response.ok) {
    throw new EventsServiceError(
      getApiErrorMessage(responseBody, 'Não foi possível atualizar o evento.'),
    )
  }

  if (!responseBody?.id) {
    throw new EventsServiceError('Resposta inválida ao atualizar evento.')
  }

  return responseBody as Event
}

export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch('/api/events', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  if (!response.ok) {
    const payload = await safeReadJson(response)
    throw new EventsServiceError(getApiErrorMessage(payload, 'Não foi possível excluir o evento.'))
  }
}
