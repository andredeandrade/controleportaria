import { decryptText, encryptText } from '../../lib/crypto.js'
import { HttpError } from '../../lib/http-error.js'
import { prisma } from '../../lib/prisma.js'
import type {
  CreateEventInput,
  EventGuestInput,
  EventResponse,
  ListEventsInput,
  UpdateEventInput,
} from './events.types.js'

const PAGE_MIN = 1
const PAGE_SIZE_MIN = 1
const PAGE_SIZE_MAX = 100

function normalizeOptionalText(value: string | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : null
}

function validateDate(date: string): string {
  const normalized = date.trim()

  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new HttpError(400, 'Data do evento inválida.')
  }

  return normalized
}

function validateTime(time: string, fieldLabel: string): string {
  const normalized = time.trim()

  if (!/^\d{2}:\d{2}$/.test(normalized)) {
    throw new HttpError(400, `${fieldLabel} inválida.`)
  }

  return normalized
}

function validateGuests(
  guests: EventGuestInput[] | undefined,
): Array<{ name: string; document: string | null }> {
  const normalizedGuests = (guests ?? [])
    .map((guest) => ({
      name: guest.name.trim(),
      document: normalizeOptionalText(guest.document),
    }))
    .filter((guest) => guest.name.length > 0 || guest.document)

  if (normalizedGuests.length === 0) {
    throw new HttpError(400, 'Informe ao menos um convidado.')
  }

  normalizedGuests.forEach((guest, index) => {
    if (guest.name.length < 3) {
      throw new HttpError(400, `Nome do convidado ${index + 1} deve ter ao menos 3 caracteres.`)
    }
  })

  return normalizedGuests
}

function validateCreateInput(input: CreateEventInput): {
  title: string
  date: string
  startTime: string
  endTime: string | null
  unit: string
  responsibleName: string
  guests: Array<{ name: string; document: string | null }>
  observations: string | null
} {
  const title = input.title.trim()
  const date = validateDate(input.date)
  const startTime = validateTime(input.startTime, 'Hora inicial')
  const endTime = normalizeOptionalText(input.endTime)
  const unit = input.unit.trim()
  const responsibleName = input.responsibleName.trim()
  const guests = validateGuests(input.guests)
  const observations = normalizeOptionalText(input.observations)

  if (title.length < 3) {
    throw new HttpError(400, 'Nome do evento deve ter ao menos 3 caracteres.')
  }

  if (endTime) {
    validateTime(endTime, 'Hora final')

    if (endTime < startTime) {
      throw new HttpError(400, 'Hora final deve ser maior ou igual à hora inicial.')
    }
  }

  if (!unit) {
    throw new HttpError(400, 'Unidade é obrigatória.')
  }

  if (responsibleName.length < 3) {
    throw new HttpError(400, 'Responsável deve ter ao menos 3 caracteres.')
  }

  return {
    title,
    date,
    startTime,
    endTime,
    unit,
    responsibleName,
    guests,
    observations,
  }
}

function validateUpdateInput(input: UpdateEventInput): {
  title?: string
  date?: string
  startTime?: string
  endTime?: string | null
  unit?: string
  responsibleName?: string
  guests?: Array<{ name: string; document: string | null }>
  observations?: string | null
} {
  const data: {
    title?: string
    date?: string
    startTime?: string
    endTime?: string | null
    unit?: string
    responsibleName?: string
    guests?: Array<{ name: string; document: string | null }>
    observations?: string | null
  } = {}

  if (input.title !== undefined) {
    const title = input.title.trim()

    if (title.length < 3) {
      throw new HttpError(400, 'Nome do evento deve ter ao menos 3 caracteres.')
    }

    data.title = title
  }

  if (input.date !== undefined) {
    data.date = validateDate(input.date)
  }

  if (input.startTime !== undefined) {
    data.startTime = validateTime(input.startTime, 'Hora inicial')
  }

  if (input.endTime !== undefined) {
    const endTime = normalizeOptionalText(input.endTime)

    if (endTime) {
      data.endTime = validateTime(endTime, 'Hora final')
    } else {
      data.endTime = null
    }
  }

  if (input.unit !== undefined) {
    const unit = input.unit.trim()

    if (!unit) {
      throw new HttpError(400, 'Unidade é obrigatória.')
    }

    data.unit = unit
  }

  if (input.responsibleName !== undefined) {
    const responsibleName = input.responsibleName.trim()

    if (responsibleName.length < 3) {
      throw new HttpError(400, 'Responsável deve ter ao menos 3 caracteres.')
    }

    data.responsibleName = responsibleName
  }

  if (input.guests !== undefined) {
    data.guests = validateGuests(input.guests)
  }

  if (input.observations !== undefined) {
    data.observations = normalizeOptionalText(input.observations)
  }

  if (
    data.startTime !== undefined &&
    data.endTime !== undefined &&
    data.endTime !== null &&
    data.endTime < data.startTime
  ) {
    throw new HttpError(400, 'Hora final deve ser maior ou igual à hora inicial.')
  }

  if (Object.keys(data).length === 0) {
    throw new HttpError(400, 'Nenhum campo válido para atualização foi enviado.')
  }

  return data
}

function parsePagination(input: ListEventsInput): {
  page: number
  pageSize: number
  skip: number
  search: string | undefined
} {
  const page = Number(input.page)
  const pageSize = Number(input.pageSize)

  if (!Number.isInteger(page) || page < PAGE_MIN) {
    throw new HttpError(400, 'Parâmetro page inválido.')
  }

  if (!Number.isInteger(pageSize) || pageSize < PAGE_SIZE_MIN || pageSize > PAGE_SIZE_MAX) {
    throw new HttpError(
      400,
      `Parâmetro pageSize inválido. Use entre ${PAGE_SIZE_MIN} e ${PAGE_SIZE_MAX}.`,
    )
  }

  const search = input.search?.trim() || undefined

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    search,
  }
}

function toResponse(event: {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string | null
  unit: string
  responsibleName: string
  observationsEncrypted: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
  guests: Array<{
    id: string
    name: string
    documentEncrypted: string | null
  }>
}): EventResponse {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    unit: event.unit,
    responsibleName: event.responsibleName,
    guests: event.guests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      document: guest.documentEncrypted ? decryptText(guest.documentEncrypted) : null,
    })),
    observations: event.observationsEncrypted ? decryptText(event.observationsEncrypted) : null,
    createdByUserId: event.createdByUserId,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  }
}

export const eventsService = {
  async create(input: CreateEventInput): Promise<EventResponse> {
    const validated = validateCreateInput(input)

    const event = await prisma.event.create({
      data: {
        condominiumId: input.condominiumId,
        title: validated.title,
        date: validated.date,
        startTime: validated.startTime,
        endTime: validated.endTime,
        unit: validated.unit,
        responsibleName: validated.responsibleName,
        observationsEncrypted: validated.observations ? encryptText(validated.observations) : null,
        createdByUserId: input.createdByUserId,
        guests: {
          create: validated.guests.map((guest) => ({
            name: guest.name,
            documentEncrypted: guest.document ? encryptText(guest.document) : null,
          })),
        },
      },
      include: {
        guests: true,
      },
    })

    return toResponse(event)
  },

  async list(input: ListEventsInput) {
    const { page, pageSize, skip, search } = parsePagination(input)

    const where = {
      condominiumId: input.condominiumId,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { date: { contains: search, mode: 'insensitive' as const } },
              { unit: { contains: search, mode: 'insensitive' as const } },
              { responsibleName: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    }

    const [items, total] = await prisma.$transaction([
      prisma.event.findMany({
        where,
        include: {
          guests: true,
        },
        skip,
        take: pageSize,
        orderBy: [{ date: 'desc' }, { startTime: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.event.count({ where }),
    ])

    return {
      items: items.map((event) => toResponse(event)),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    }
  },

  async getById(id: string, condominiumId: string): Promise<EventResponse> {
    const eventId = id.trim()

    if (!eventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        condominiumId,
      },
      include: {
        guests: true,
      },
    })

    if (!event) {
      throw new HttpError(404, 'Evento não encontrado.')
    }

    return toResponse(event)
  },

  async update(id: string, input: UpdateEventInput, condominiumId: string): Promise<EventResponse> {
    const eventId = id.trim()

    if (!eventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    const existingEvent = await prisma.event.findFirst({
      where: {
        id: eventId,
        condominiumId,
      },
      select: {
        id: true,
      },
    })

    if (!existingEvent) {
      throw new HttpError(404, 'Evento não encontrado.')
    }

    const validated = validateUpdateInput(input)

    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: validated.title,
        date: validated.date,
        startTime: validated.startTime,
        endTime: validated.endTime,
        unit: validated.unit,
        responsibleName: validated.responsibleName,
        observationsEncrypted:
          validated.observations === undefined
            ? undefined
            : validated.observations
              ? encryptText(validated.observations)
              : null,
        ...(validated.guests
          ? {
              guests: {
                deleteMany: {},
                create: validated.guests.map((guest) => ({
                  name: guest.name,
                  documentEncrypted: guest.document ? encryptText(guest.document) : null,
                })),
              },
            }
          : {}),
      },
      include: {
        guests: true,
      },
    })

    return toResponse(event)
  },

  async remove(id: string, condominiumId: string): Promise<void> {
    const eventId = id.trim()

    if (!eventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        condominiumId,
      },
      select: {
        id: true,
      },
    })

    if (!event) {
      throw new HttpError(404, 'Evento não encontrado.')
    }

    await prisma.event.delete({
      where: { id: eventId },
    })
  },
}
