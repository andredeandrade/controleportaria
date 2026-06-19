import { decryptText, encryptText } from '../../lib/crypto.js'
import { HttpError } from '../../lib/http-error.js'
import { prisma } from '../../lib/prisma.js'
import type {
  AccessRecordListStatus,
  AccessRecordPersonInput,
  AccessRecordResponse,
  CheckInAccessRecordInput,
  CheckOutAccessRecordInput,
  ListAccessRecordsInput,
} from './access-records.types.js'

const PAGE_MIN = 1
const PAGE_SIZE_MIN = 1
const PAGE_SIZE_MAX = 100

const PERSON_CATEGORIES = new Set<string>([
  'morador',
  'visitante',
  'prestador_servico',
  'colaborador',
])
const LOCOMOTION_OPTIONS = new Set<string>([
  'a_pe',
  'carro',
  'moto',
  'bicicleta',
  'caminhao',
  'outro',
])
const COLOR_OPTIONS = new Set<string>([
  'branco',
  'preto',
  'prata',
  'cinza',
  'azul',
  'vermelho',
  'verde',
  'amarelo',
  'outra_cor',
])

function normalizeOptionalText(value: string | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null
  }

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : null
}

function validatePeople(people: AccessRecordPersonInput[] | undefined): AccessRecordPersonInput[] {
  if (!Array.isArray(people) || people.length === 0) {
    throw new HttpError(400, 'Informe ao menos uma pessoa no registro.')
  }

  return people.map((person, index) => {
    const category = String(person.category ?? '').trim()
    const name = String(person.name ?? '').trim()
    const document = normalizeOptionalText(person.document)

    if (!PERSON_CATEGORIES.has(category)) {
      throw new HttpError(400, `Categoria da pessoa ${index + 1} inválida.`)
    }

    if (name.length < 3) {
      throw new HttpError(400, `Nome da pessoa ${index + 1} deve ter ao menos 3 caracteres.`)
    }

    if (document && document.length < 5) {
      throw new HttpError(400, `Documento da pessoa ${index + 1} inválido.`)
    }

    return {
      category,
      name,
      document: document ?? undefined,
    }
  })
}

function validateLocomotion(locomotion: string | null | undefined): string | null {
  const normalized = normalizeOptionalText(locomotion)

  if (!normalized) {
    return null
  }

  if (!LOCOMOTION_OPTIONS.has(normalized)) {
    throw new HttpError(400, 'Locomoção inválida.')
  }

  return normalized
}

function validateColor(color: string | null | undefined): string | null {
  const normalized = normalizeOptionalText(color)

  if (!normalized) {
    return null
  }

  if (!COLOR_OPTIONS.has(normalized)) {
    throw new HttpError(400, 'Cor inválida.')
  }

  return normalized
}

function validateStatus(status: AccessRecordListStatus | undefined): AccessRecordListStatus {
  if (status === undefined) {
    return 'all'
  }

  if (status !== 'all' && status !== 'open' && status !== 'closed') {
    throw new HttpError(400, 'Status inválido. Use all, open ou closed.')
  }

  return status
}

function parsePagination(input: ListAccessRecordsInput): {
  page: number
  pageSize: number
  skip: number
  search: string | undefined
  status: AccessRecordListStatus
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

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    search: input.search?.trim() || undefined,
    status: validateStatus(input.status),
  }
}

function toResponse(accessRecord: {
  id: string
  company: string | null
  locomotion: string | null
  color: string | null
  plateEncrypted: string | null
  brandModel: string | null
  observationsEncrypted: string | null
  checkOutObservationsEncrypted: string | null
  checkInAt: Date
  checkOutAt: Date | null
  checkedInByUserId: string | null
  checkedOutByUserId: string | null
  createdAt: Date
  updatedAt: Date
  people: Array<{
    id: string
    category: string
    name: string
    documentEncrypted: string | null
  }>
}): AccessRecordResponse {
  return {
    id: accessRecord.id,
    people: accessRecord.people.map((person) => ({
      id: person.id,
      category: person.category,
      name: person.name,
      document: person.documentEncrypted ? decryptText(person.documentEncrypted) : null,
    })),
    company: accessRecord.company,
    locomotion: accessRecord.locomotion,
    color: accessRecord.color,
    plate: accessRecord.plateEncrypted ? decryptText(accessRecord.plateEncrypted) : null,
    brandModel: accessRecord.brandModel,
    observations: accessRecord.observationsEncrypted
      ? decryptText(accessRecord.observationsEncrypted)
      : null,
    checkOutObservations: accessRecord.checkOutObservationsEncrypted
      ? decryptText(accessRecord.checkOutObservationsEncrypted)
      : null,
    checkInAt: accessRecord.checkInAt,
    checkOutAt: accessRecord.checkOutAt,
    checkedInByUserId: accessRecord.checkedInByUserId,
    checkedOutByUserId: accessRecord.checkedOutByUserId,
    createdAt: accessRecord.createdAt,
    updatedAt: accessRecord.updatedAt,
    isOpen: accessRecord.checkOutAt === null,
  }
}

export const accessRecordsService = {
  async checkIn(input: CheckInAccessRecordInput): Promise<AccessRecordResponse> {
    const people = validatePeople(input.people)
    const company = normalizeOptionalText(input.company)
    const locomotion = validateLocomotion(input.locomotion)
    const color = validateColor(input.color)
    const plate = normalizeOptionalText(input.plate)
    const brandModel = normalizeOptionalText(input.brandModel)
    const observations = normalizeOptionalText(input.observations)

    const accessRecord = await prisma.accessRecord.create({
      data: {
        condominiumId: input.condominiumId,
        company,
        locomotion,
        color,
        plateEncrypted: plate ? encryptText(plate) : null,
        brandModel,
        observationsEncrypted: observations ? encryptText(observations) : null,
        checkedInByUserId: input.checkedInByUserId,
        people: {
          create: people.map((person) => ({
            category: person.category,
            name: person.name,
            documentEncrypted: person.document ? encryptText(person.document) : null,
          })),
        },
      },
      include: {
        people: true,
      },
    })

    return toResponse(accessRecord)
  },

  async checkOut(
    id: string,
    input: CheckOutAccessRecordInput,
    condominiumId: string,
  ): Promise<AccessRecordResponse> {
    const accessRecordId = id.trim()

    if (!accessRecordId) {
      throw new HttpError(400, 'ID do registro de acesso é obrigatório.')
    }

    const existing = await prisma.accessRecord.findFirst({
      where: {
        id: accessRecordId,
        condominiumId,
      },
      include: {
        people: true,
      },
    })

    if (!existing) {
      throw new HttpError(404, 'Registro de acesso não encontrado.')
    }

    if (existing.checkOutAt) {
      throw new HttpError(400, 'Este registro já possui saída registrada.')
    }

    const checkOutObservations = normalizeOptionalText(input.observations)

    const accessRecord = await prisma.accessRecord.update({
      where: {
        id: accessRecordId,
      },
      data: {
        checkOutAt: new Date(),
        checkedOutByUserId: input.checkedOutByUserId,
        checkOutObservationsEncrypted: checkOutObservations
          ? encryptText(checkOutObservations)
          : null,
      },
      include: {
        people: true,
      },
    })

    return toResponse(accessRecord)
  },

  async list(input: ListAccessRecordsInput) {
    const { page, pageSize, skip, search, status } = parsePagination(input)

    const where = {
      condominiumId: input.condominiumId,
      ...(status === 'open' ? { checkOutAt: null } : {}),
      ...(status === 'closed' ? { checkOutAt: { not: null } } : {}),
      ...(search
        ? {
            OR: [
              { company: { contains: search, mode: 'insensitive' as const } },
              { locomotion: { contains: search, mode: 'insensitive' as const } },
              { color: { contains: search, mode: 'insensitive' as const } },
              { brandModel: { contains: search, mode: 'insensitive' as const } },
              {
                people: {
                  some: {
                    OR: [
                      { name: { contains: search, mode: 'insensitive' as const } },
                      { category: { contains: search, mode: 'insensitive' as const } },
                    ],
                  },
                },
              },
            ],
          }
        : {}),
    }

    const [items, total] = await prisma.$transaction([
      prisma.accessRecord.findMany({
        where,
        include: {
          people: true,
        },
        skip,
        take: pageSize,
        orderBy: [{ checkInAt: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.accessRecord.count({ where }),
    ])

    return {
      items: items.map((item) => toResponse(item)),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    }
  },

  async getById(id: string, condominiumId: string): Promise<AccessRecordResponse> {
    const accessRecordId = id.trim()

    if (!accessRecordId) {
      throw new HttpError(400, 'ID do registro de acesso é obrigatório.')
    }

    const accessRecord = await prisma.accessRecord.findFirst({
      where: {
        id: accessRecordId,
        condominiumId,
      },
      include: {
        people: true,
      },
    })

    if (!accessRecord) {
      throw new HttpError(404, 'Registro de acesso não encontrado.')
    }

    return toResponse(accessRecord)
  },
}
