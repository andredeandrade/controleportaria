import { decryptText } from '../../lib/crypto.js'
import { HttpError } from '../../lib/http-error.js'
import { prisma } from '../../lib/prisma.js'
import type {
  AccessReportItem,
  AccessReportStatus,
  DashboardSummaryPeriod,
  DashboardSummaryResponse,
  GetDashboardSummaryInput,
  IncidentReportItem,
  ListAccessReportInput,
  ListIncidentsReportInput,
  ListServiceProvidersReportInput,
  ListVisitorsReportInput,
  PaginatedResponse,
  ServiceProviderReportItem,
  VisitorReportItem,
} from './reports.types.js'

const PAGE_MIN = 1
const PAGE_SIZE_MIN = 1
const PAGE_SIZE_MAX = 100

function getTodayRange(): { startOfDay: Date; endOfDay: Date } {
  const now = new Date()

  const startOfDay = new Date(now)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)

  return { startOfDay, endOfDay }
}

function getStartOfWeek(date: Date): Date {
  const baseDate = new Date(date)
  const day = baseDate.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day

  baseDate.setDate(baseDate.getDate() + diffToMonday)
  baseDate.setHours(0, 0, 0, 0)

  return baseDate
}

function getPeriodRange(period: DashboardSummaryPeriod): { startDate: Date; endDate: Date } {
  const now = new Date()

  if (period === 'day') {
    const { startOfDay, endOfDay } = getTodayRange()
    return { startDate: startOfDay, endDate: endOfDay }
  }

  if (period === 'week') {
    const startDate = getStartOfWeek(now)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 6)
    endDate.setHours(23, 59, 59, 999)

    return { startDate, endDate }
  }

  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
  startDate.setHours(0, 0, 0, 0)

  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  endDate.setHours(23, 59, 59, 999)

  return { startDate, endDate }
}

function normalizeFilter(value: string | undefined): string | undefined {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
}

function parsePagination(
  page: number,
  pageSize: number,
): { page: number; pageSize: number; skip: number } {
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
  }
}

function toDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function toAccessReportItem(accessRecord: {
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
}): AccessReportItem {
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

function toVisitorReportItem(visitor: {
  id: string
  fullName: string
  documentEncrypted: string
  phoneEncrypted: string | null
  emailEncrypted: string | null
  unit: string
  authorizedBy: string
  observationsEncrypted: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}): VisitorReportItem {
  return {
    id: visitor.id,
    fullName: visitor.fullName,
    document: decryptText(visitor.documentEncrypted),
    phone: visitor.phoneEncrypted ? decryptText(visitor.phoneEncrypted) : null,
    email: visitor.emailEncrypted ? decryptText(visitor.emailEncrypted) : null,
    unit: visitor.unit,
    authorizedBy: visitor.authorizedBy,
    observations: visitor.observationsEncrypted ? decryptText(visitor.observationsEncrypted) : null,
    createdByUserId: visitor.createdByUserId,
    createdAt: visitor.createdAt,
    updatedAt: visitor.updatedAt,
  }
}

function toServiceProviderReportItem(serviceProvider: {
  id: string
  companyName: string
  responsibleName: string
  documentEncrypted: string
  phoneEncrypted: string | null
  emailEncrypted: string | null
  serviceType: string
  unit: string | null
  observationsEncrypted: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}): ServiceProviderReportItem {
  return {
    id: serviceProvider.id,
    companyName: serviceProvider.companyName,
    responsibleName: serviceProvider.responsibleName,
    document: decryptText(serviceProvider.documentEncrypted),
    phone: serviceProvider.phoneEncrypted ? decryptText(serviceProvider.phoneEncrypted) : null,
    email: serviceProvider.emailEncrypted ? decryptText(serviceProvider.emailEncrypted) : null,
    serviceType: serviceProvider.serviceType,
    unit: serviceProvider.unit,
    observations: serviceProvider.observationsEncrypted
      ? decryptText(serviceProvider.observationsEncrypted)
      : null,
    createdByUserId: serviceProvider.createdByUserId,
    createdAt: serviceProvider.createdAt,
    updatedAt: serviceProvider.updatedAt,
  }
}

function toIncidentReportItem(incident: {
  id: string
  occurrenceType: string
  date: string
  time: string
  reportEncrypted: string
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}): IncidentReportItem {
  return {
    id: incident.id,
    occurrenceType: incident.occurrenceType,
    date: incident.date,
    time: incident.time,
    report: decryptText(incident.reportEncrypted),
    createdByUserId: incident.createdByUserId,
    createdAt: incident.createdAt,
    updatedAt: incident.updatedAt,
  }
}

function toPaginatedResponse<TItem>(
  items: TItem[],
  page: number,
  pageSize: number,
  total: number,
): PaginatedResponse<TItem> {
  return {
    items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    },
  }
}

function validateAccessStatus(status: AccessReportStatus | undefined): AccessReportStatus {
  if (status === undefined) {
    return 'all'
  }

  if (status !== 'all' && status !== 'open' && status !== 'closed') {
    throw new HttpError(400, 'Status inválido. Use all, open ou closed.')
  }

  return status
}

export const reportsService = {
  async getDashboardSummary(input: GetDashboardSummaryInput): Promise<DashboardSummaryResponse> {
    const { condominiumId, period, startDate, endDate } = input
    const { startOfDay, endOfDay } = getTodayRange()
    const customRange = startDate && endDate ? { startDate, endDate } : null
    const periodRange = customRange ?? (period ? getPeriodRange(period) : null)

    const entityDateFilter = periodRange
      ? {
          createdAt: {
            gte: periodRange.startDate,
            lte: periodRange.endDate,
          },
        }
      : {}

    const accessDateFilter = periodRange
      ? {
          checkInAt: {
            gte: periodRange.startDate,
            lte: periodRange.endDate,
          },
        }
      : {}

    const [
      totalResidents,
      totalVisitors,
      totalServiceProviders,
      totalEvents,
      totalIncidents,
      totalAuthorizations,
      totalActiveAccesses,
      totalAccessesToday,
    ] = await prisma.$transaction([
      prisma.resident.count({ where: { condominiumId, ...entityDateFilter } }),
      prisma.visitor.count({ where: { condominiumId, ...entityDateFilter } }),
      prisma.serviceProvider.count({ where: { condominiumId, ...entityDateFilter } }),
      prisma.event.count({ where: { condominiumId, ...entityDateFilter } }),
      prisma.incident.count({ where: { condominiumId, ...entityDateFilter } }),
      prisma.authorization.count({ where: { condominiumId, ...entityDateFilter } }),
      prisma.accessRecord.count({
        where: {
          condominiumId,
          ...accessDateFilter,
          checkOutAt: null,
        },
      }),
      prisma.accessRecord.count({
        where: {
          condominiumId,
          checkInAt: {
            gte: periodRange ? periodRange.startDate : startOfDay,
            lte: periodRange ? periodRange.endDate : endOfDay,
          },
        },
      }),
    ])

    return {
      totalResidents,
      totalVisitors,
      totalServiceProviders,
      totalEvents,
      totalIncidents,
      totalAuthorizations,
      totalActiveAccesses,
      totalAccessesToday,
    }
  },

  async listAccessReport(
    input: ListAccessReportInput,
  ): Promise<PaginatedResponse<AccessReportItem>> {
    const { page, pageSize, skip } = parsePagination(input.page, input.pageSize)
    const status = validateAccessStatus(input.status)

    const resident = normalizeFilter(input.resident)
    const visitor = normalizeFilter(input.visitor)
    const serviceProvider = normalizeFilter(input.serviceProvider)
    const responsibleUserId = normalizeFilter(input.responsibleUserId)

    const peopleFilters = [
      ...(resident
        ? [
            {
              people: {
                some: {
                  category: 'morador',
                  name: { contains: resident, mode: 'insensitive' as const },
                },
              },
            },
          ]
        : []),
      ...(visitor
        ? [
            {
              people: {
                some: {
                  category: 'visitante',
                  name: { contains: visitor, mode: 'insensitive' as const },
                },
              },
            },
          ]
        : []),
      ...(serviceProvider
        ? [
            {
              people: {
                some: {
                  category: 'prestador_servico',
                  name: { contains: serviceProvider, mode: 'insensitive' as const },
                },
              },
            },
          ]
        : []),
    ]

    const where = {
      condominiumId: input.condominiumId,
      ...(status === 'open' ? { checkOutAt: null } : {}),
      ...(status === 'closed' ? { checkOutAt: { not: null } } : {}),
      ...(input.startDate && input.endDate
        ? {
            checkInAt: {
              gte: input.startDate,
              lte: input.endDate,
            },
          }
        : {}),
      ...(responsibleUserId
        ? {
            OR: [
              { checkedInByUserId: responsibleUserId },
              { checkedOutByUserId: responsibleUserId },
            ],
          }
        : {}),
      ...(peopleFilters.length > 0 ? { AND: peopleFilters } : {}),
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

    return toPaginatedResponse(
      items.map((item) => toAccessReportItem(item)),
      page,
      pageSize,
      total,
    )
  },

  async listVisitorsReport(
    input: ListVisitorsReportInput,
  ): Promise<PaginatedResponse<VisitorReportItem>> {
    const { page, pageSize, skip } = parsePagination(input.page, input.pageSize)
    const name = normalizeFilter(input.name)
    const document = normalizeFilter(input.document)

    const where = {
      condominiumId: input.condominiumId,
      ...(name ? { fullName: { contains: name, mode: 'insensitive' as const } } : {}),
      ...(input.startDate && input.endDate
        ? {
            createdAt: {
              gte: input.startDate,
              lte: input.endDate,
            },
          }
        : {}),
    }

    if (!document) {
      const [items, total] = await prisma.$transaction([
        prisma.visitor.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.visitor.count({ where }),
      ])

      return toPaginatedResponse(
        items.map((item) => toVisitorReportItem(item)),
        page,
        pageSize,
        total,
      )
    }

    const allItems = await prisma.visitor.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const loweredDocument = document.toLowerCase()
    const filteredItems = allItems.filter((item) =>
      decryptText(item.documentEncrypted).toLowerCase().includes(loweredDocument),
    )

    const pagedItems = filteredItems.slice(skip, skip + pageSize)

    return toPaginatedResponse(
      pagedItems.map((item) => toVisitorReportItem(item)),
      page,
      pageSize,
      filteredItems.length,
    )
  },

  async listServiceProvidersReport(
    input: ListServiceProvidersReportInput,
  ): Promise<PaginatedResponse<ServiceProviderReportItem>> {
    const { page, pageSize, skip } = parsePagination(input.page, input.pageSize)
    const name = normalizeFilter(input.name)
    const document = normalizeFilter(input.document)
    const category = normalizeFilter(input.category)

    const where = {
      condominiumId: input.condominiumId,
      ...(name
        ? {
            OR: [
              { companyName: { contains: name, mode: 'insensitive' as const } },
              { responsibleName: { contains: name, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(category ? { serviceType: { contains: category, mode: 'insensitive' as const } } : {}),
      ...(input.startDate && input.endDate
        ? {
            createdAt: {
              gte: input.startDate,
              lte: input.endDate,
            },
          }
        : {}),
    }

    if (!document) {
      const [items, total] = await prisma.$transaction([
        prisma.serviceProvider.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.serviceProvider.count({ where }),
      ])

      return toPaginatedResponse(
        items.map((item) => toServiceProviderReportItem(item)),
        page,
        pageSize,
        total,
      )
    }

    const allItems = await prisma.serviceProvider.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const loweredDocument = document.toLowerCase()
    const filteredItems = allItems.filter((item) =>
      decryptText(item.documentEncrypted).toLowerCase().includes(loweredDocument),
    )

    const pagedItems = filteredItems.slice(skip, skip + pageSize)

    return toPaginatedResponse(
      pagedItems.map((item) => toServiceProviderReportItem(item)),
      page,
      pageSize,
      filteredItems.length,
    )
  },

  async listIncidentsReport(
    input: ListIncidentsReportInput,
  ): Promise<PaginatedResponse<IncidentReportItem>> {
    if (normalizeFilter(input.status)) {
      throw new HttpError(400, 'Filtro status não suportado no modelo atual de ocorrências.')
    }

    if (normalizeFilter(input.priority)) {
      throw new HttpError(400, 'Filtro priority não suportado no modelo atual de ocorrências.')
    }

    const { page, pageSize, skip } = parsePagination(input.page, input.pageSize)
    const responsibleUserId = normalizeFilter(input.responsibleUserId)

    const where = {
      condominiumId: input.condominiumId,
      ...(responsibleUserId ? { createdByUserId: responsibleUserId } : {}),
      ...(input.startDate && input.endDate
        ? {
            date: {
              gte: toDateString(input.startDate),
              lte: toDateString(input.endDate),
            },
          }
        : {}),
    }

    const [items, total] = await prisma.$transaction([
      prisma.incident.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ date: 'desc' }, { time: 'desc' }, { createdAt: 'desc' }],
      }),
      prisma.incident.count({ where }),
    ])

    return toPaginatedResponse(
      items.map((item) => toIncidentReportItem(item)),
      page,
      pageSize,
      total,
    )
  },
}
