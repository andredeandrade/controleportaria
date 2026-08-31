import { decryptText, encryptText } from '../../lib/crypto.js'
import { HttpError } from '../../lib/http-error.js'
import { prisma } from '../../lib/prisma.js'
import type {
  CreateEventInput,
  CreateEventVehicleInput,
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
): Array<{ id?: string; name: string; document: string | null }> {
  const normalizedGuests = (guests ?? [])
    .map((guest) => ({
      id: guest.id,
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
  space: string | null
  responsibleName: string
  guests: Array<{ id?: string; name: string; document: string | null }>
  observations: string | null
} {
  const title = input.title.trim()
  const date = validateDate(input.date)
  const startTime = validateTime(input.startTime, 'Hora inicial')
  const endTime = normalizeOptionalText(input.endTime)
  const unit = input.unit.trim()
  const space = normalizeOptionalText(input.space)
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
    space,
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
  space?: string | null
  responsibleName?: string
  guests?: Array<{ id?: string; name: string; document: string | null }>
  observations?: string | null
} {
  const data: {
    title?: string
    date?: string
    startTime?: string
    endTime?: string | null
    unit?: string
    space?: string | null
    responsibleName?: string
    guests?: Array<{ id?: string; name: string; document: string | null }>
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

  if (input.space !== undefined) {
    data.space = normalizeOptionalText(input.space)
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
  space: string | null
  responsibleName: string
  observationsEncrypted: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
  guests: Array<{
    id: string
    name: string
    documentEncrypted: string | null
    checkInAt: Date | null
    checkOutAt: Date | null
  }>
  vehicles: Array<{
    id: string
    plateEncrypted: string | null
    brandModel: string | null
    driverName: string | null
    color: string | null
    checkInAt: Date
    checkOutAt: Date | null
  }>
}): EventResponse {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    unit: event.unit,
    space: event.space,
    responsibleName: event.responsibleName,
    guests: event.guests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      document: guest.documentEncrypted ? decryptText(guest.documentEncrypted) : null,
      checkInAt: guest.checkInAt,
      checkOutAt: guest.checkOutAt,
    })),
    vehicles: event.vehicles.map((vehicle) => ({
      id: vehicle.id,
      plate: vehicle.plateEncrypted ? decryptText(vehicle.plateEncrypted) : null,
      brandModel: vehicle.brandModel,
      driverName: vehicle.driverName,
      color: vehicle.color,
      checkInAt: vehicle.checkInAt,
      checkOutAt: vehicle.checkOutAt,
    })),
    observations: event.observationsEncrypted ? decryptText(event.observationsEncrypted) : null,
    createdByUserId: event.createdByUserId,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  }
}

async function loadEventOrThrow(eventId: string, condominiumId: string) {
  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      condominiumId,
    },
    include: {
      guests: true,
      vehicles: true,
    },
  })

  if (!event) {
    throw new HttpError(404, 'Evento não encontrado.')
  }

  return event
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
        space: validated.space,
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
        vehicles: true,
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
          vehicles: true,
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
        vehicles: true,
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
        guests: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!existingEvent) {
      throw new HttpError(404, 'Evento não encontrado.')
    }

    const validated = validateUpdateInput(input)

    let guestsWrite:
      | {
          update: Array<{ where: { id: string }; data: { name: string; documentEncrypted: string | null } }>
          create: Array<{ name: string; documentEncrypted: string | null }>
          deleteMany?: { id: { in: string[] } }
        }
      | undefined

    if (validated.guests) {
      const existingGuestIds = new Set(existingEvent.guests.map((guest) => guest.id))
      const payloadGuestIds = new Set(
        validated.guests
          .map((guest) => guest.id)
          .filter((guestId): guestId is string => Boolean(guestId) && existingGuestIds.has(guestId as string)),
      )

      const guestsToUpdate = validated.guests.filter(
        (guest): guest is { id: string; name: string; document: string | null } =>
          Boolean(guest.id) && existingGuestIds.has(guest.id as string),
      )
      const guestsToCreate = validated.guests.filter(
        (guest) => !guest.id || !existingGuestIds.has(guest.id),
      )
      const guestIdsToDelete = existingEvent.guests
        .map((guest) => guest.id)
        .filter((guestId) => !payloadGuestIds.has(guestId))

      guestsWrite = {
        update: guestsToUpdate.map((guest) => ({
          where: { id: guest.id },
          data: {
            name: guest.name,
            documentEncrypted: guest.document ? encryptText(guest.document) : null,
          },
        })),
        create: guestsToCreate.map((guest) => ({
          name: guest.name,
          documentEncrypted: guest.document ? encryptText(guest.document) : null,
        })),
        ...(guestIdsToDelete.length > 0
          ? { deleteMany: { id: { in: guestIdsToDelete } } }
          : {}),
      }
    }

    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: validated.title,
        date: validated.date,
        startTime: validated.startTime,
        endTime: validated.endTime,
        unit: validated.unit,
        space: validated.space,
        responsibleName: validated.responsibleName,
        observationsEncrypted:
          validated.observations === undefined
            ? undefined
            : validated.observations
              ? encryptText(validated.observations)
              : null,
        ...(guestsWrite
          ? {
              guests: guestsWrite,
            }
          : {}),
      },
      include: {
        guests: true,
        vehicles: true,
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

  async checkInGuest(
    eventId: string,
    guestId: string,
    condominiumId: string,
    userId: string,
  ): Promise<EventResponse> {
    const trimmedEventId = eventId.trim()
    const trimmedGuestId = guestId.trim()

    if (!trimmedEventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    if (!trimmedGuestId) {
      throw new HttpError(400, 'ID do convidado é obrigatório.')
    }

    const event = await loadEventOrThrow(trimmedEventId, condominiumId)
    const guest = event.guests.find((item) => item.id === trimmedGuestId)

    if (!guest) {
      throw new HttpError(404, 'Convidado não encontrado.')
    }

    if (guest.checkInAt) {
      throw new HttpError(400, 'Convidado já registrou entrada.')
    }

    await prisma.eventGuest.update({
      where: { id: trimmedGuestId },
      data: {
        checkInAt: new Date(),
        checkedInByUserId: userId,
      },
    })

    return toResponse(await loadEventOrThrow(trimmedEventId, condominiumId))
  },

  async checkOutGuest(
    eventId: string,
    guestId: string,
    condominiumId: string,
    userId: string,
  ): Promise<EventResponse> {
    const trimmedEventId = eventId.trim()
    const trimmedGuestId = guestId.trim()

    if (!trimmedEventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    if (!trimmedGuestId) {
      throw new HttpError(400, 'ID do convidado é obrigatório.')
    }

    const event = await loadEventOrThrow(trimmedEventId, condominiumId)
    const guest = event.guests.find((item) => item.id === trimmedGuestId)

    if (!guest) {
      throw new HttpError(404, 'Convidado não encontrado.')
    }

    if (!guest.checkInAt) {
      throw new HttpError(400, 'Convidado ainda não registrou entrada.')
    }

    if (guest.checkOutAt) {
      throw new HttpError(400, 'Convidado já registrou saída.')
    }

    await prisma.eventGuest.update({
      where: { id: trimmedGuestId },
      data: {
        checkOutAt: new Date(),
        checkedOutByUserId: userId,
      },
    })

    return toResponse(await loadEventOrThrow(trimmedEventId, condominiumId))
  },

  async createVehicle(
    eventId: string,
    condominiumId: string,
    userId: string,
    input: CreateEventVehicleInput,
  ): Promise<EventResponse> {
    const trimmedEventId = eventId.trim()

    if (!trimmedEventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    await loadEventOrThrow(trimmedEventId, condominiumId)

    const plate = input.plate.trim()

    if (!plate) {
      throw new HttpError(400, 'Placa do veículo é obrigatória.')
    }

    const brandModel = normalizeOptionalText(input.brandModel)
    const driverName = normalizeOptionalText(input.driverName)
    const color = normalizeOptionalText(input.color)

    await prisma.eventVehicle.create({
      data: {
        eventId: trimmedEventId,
        plateEncrypted: encryptText(plate),
        brandModel,
        driverName,
        color,
        checkInAt: new Date(),
        checkedInByUserId: userId,
      },
    })

    return toResponse(await loadEventOrThrow(trimmedEventId, condominiumId))
  },

  async checkOutVehicle(
    eventId: string,
    vehicleId: string,
    condominiumId: string,
    userId: string,
  ): Promise<EventResponse> {
    const trimmedEventId = eventId.trim()
    const trimmedVehicleId = vehicleId.trim()

    if (!trimmedEventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    if (!trimmedVehicleId) {
      throw new HttpError(400, 'ID do veículo é obrigatório.')
    }

    const event = await loadEventOrThrow(trimmedEventId, condominiumId)
    const vehicle = event.vehicles.find((item) => item.id === trimmedVehicleId)

    if (!vehicle) {
      throw new HttpError(404, 'Veículo não encontrado.')
    }

    if (vehicle.checkOutAt) {
      throw new HttpError(400, 'Veículo já registrou saída.')
    }

    await prisma.eventVehicle.update({
      where: { id: trimmedVehicleId },
      data: {
        checkOutAt: new Date(),
        checkedOutByUserId: userId,
      },
    })

    return toResponse(await loadEventOrThrow(trimmedEventId, condominiumId))
  },

  async deleteVehicle(
    eventId: string,
    vehicleId: string,
    condominiumId: string,
  ): Promise<EventResponse> {
    const trimmedEventId = eventId.trim()
    const trimmedVehicleId = vehicleId.trim()

    if (!trimmedEventId) {
      throw new HttpError(400, 'ID do evento é obrigatório.')
    }

    if (!trimmedVehicleId) {
      throw new HttpError(400, 'ID do veículo é obrigatório.')
    }

    const event = await loadEventOrThrow(trimmedEventId, condominiumId)
    const vehicle = event.vehicles.find((item) => item.id === trimmedVehicleId)

    if (!vehicle) {
      throw new HttpError(404, 'Veículo não encontrado.')
    }

    await prisma.eventVehicle.delete({
      where: { id: trimmedVehicleId },
    })

    return toResponse(await loadEventOrThrow(trimmedEventId, condominiumId))
  },
}
