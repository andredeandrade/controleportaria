import type { Request, Response } from 'express'
import { HttpError } from '../../lib/http-error.js'
import { eventsService } from './events.service.js'
import type { EventGuestInput, UpdateEventInput } from './events.types.js'

function getBodyAsRecord(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== 'object') {
    throw new HttpError(400, 'Corpo da requisição inválido.')
  }

  return body as Record<string, unknown>
}

function readOptionalString(value: unknown): string | undefined {
  if (value === undefined) {
    return undefined
  }

  if (value === null) {
    return ''
  }

  return String(value)
}

function parseGuests(value: unknown): EventGuestInput[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map((guest) => {
    if (!guest || typeof guest !== 'object') {
      return { name: '', document: '' }
    }

    const guestRecord = guest as Record<string, unknown>

    return {
      name: String(guestRecord['name'] ?? ''),
      document: readOptionalString(guestRecord['document']),
    }
  })
}

function parseUpdateInput(body: Record<string, unknown>): UpdateEventInput {
  const input: UpdateEventInput = {}

  if ('title' in body) {
    input.title = String(body['title'] ?? '')
  }

  if ('date' in body) {
    input.date = String(body['date'] ?? '')
  }

  if ('startTime' in body) {
    input.startTime = String(body['startTime'] ?? '')
  }

  if ('endTime' in body) {
    input.endTime = readOptionalString(body['endTime']) ?? null
  }

  if ('unit' in body) {
    input.unit = String(body['unit'] ?? '')
  }

  if ('responsibleName' in body) {
    input.responsibleName = String(body['responsibleName'] ?? '')
  }

  if ('guests' in body) {
    input.guests = parseGuests(body['guests'])
  }

  if ('observations' in body) {
    input.observations = readOptionalString(body['observations']) ?? null
  }

  return input
}

export const eventsController = {
  async create(req: Request, res: Response) {
    if (!req.authUser) {
      throw new HttpError(401, 'Não autenticado.')
    }

    const body = getBodyAsRecord(req.body)

    const event = await eventsService.create({
      condominiumId: req.authUser.condominiumId,
      title: String(body['title'] ?? ''),
      date: String(body['date'] ?? ''),
      startTime: String(body['startTime'] ?? ''),
      endTime: readOptionalString(body['endTime']),
      unit: String(body['unit'] ?? ''),
      responsibleName: String(body['responsibleName'] ?? ''),
      guests: parseGuests(body['guests']),
      observations: readOptionalString(body['observations']),
      createdByUserId: req.authUser.id,
    })

    res.status(201).json(event)
  },

  async list(req: Request, res: Response) {
    if (!req.authUser) {
      throw new HttpError(401, 'Não autenticado.')
    }

    const result = await eventsService.list({
      condominiumId: req.authUser.condominiumId,
      page: Number(req.query['page'] ?? 1),
      pageSize: Number(req.query['pageSize'] ?? 10),
      search: req.query['search'] ? String(req.query['search']) : undefined,
    })

    res.json(result)
  },

  async getById(req: Request, res: Response) {
    if (!req.authUser) {
      throw new HttpError(401, 'Não autenticado.')
    }

    const event = await eventsService.getById(
      String(req.params['id'] ?? ''),
      req.authUser.condominiumId,
    )

    res.json(event)
  },

  async update(req: Request, res: Response) {
    if (!req.authUser) {
      throw new HttpError(401, 'Não autenticado.')
    }

    const body = getBodyAsRecord(req.body)

    const event = await eventsService.update(
      String(req.params['id'] ?? ''),
      parseUpdateInput(body),
      req.authUser.condominiumId,
    )

    res.json(event)
  },

  async remove(req: Request, res: Response) {
    if (!req.authUser) {
      throw new HttpError(401, 'Não autenticado.')
    }

    await eventsService.remove(String(req.params['id'] ?? ''), req.authUser.condominiumId)

    res.status(204).send()
  },
}
