export type DashboardSummaryPeriod = 'day' | 'week' | 'month'

export interface GetDashboardSummaryInput {
  condominiumId: string
  period?: DashboardSummaryPeriod
  startDate?: Date
  endDate?: Date
}

export interface DashboardSummaryResponse {
  totalResidents: number
  totalVisitors: number
  totalServiceProviders: number
  totalEvents: number
  totalIncidents: number
  totalAuthorizations: number
  totalActiveAccesses: number
  totalAccessesToday: number
}

export interface PaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<TItem> {
  items: TItem[]
  pagination: PaginationMeta
}

export type AccessReportStatus = 'all' | 'open' | 'closed'

export interface ListAccessReportInput {
  condominiumId: string
  page: number
  pageSize: number
  status?: AccessReportStatus
  startDate?: Date
  endDate?: Date
  resident?: string
  visitor?: string
  serviceProvider?: string
  responsibleUserId?: string
}

export interface AccessReportItem {
  id: string
  people: Array<{
    id: string
    category: string
    name: string
    document: string | null
  }>
  company: string | null
  locomotion: string | null
  color: string | null
  plate: string | null
  brandModel: string | null
  observations: string | null
  checkOutObservations: string | null
  checkInAt: Date
  checkOutAt: Date | null
  checkedInByUserId: string | null
  checkedOutByUserId: string | null
  createdAt: Date
  updatedAt: Date
  isOpen: boolean
}

export interface ListVisitorsReportInput {
  condominiumId: string
  page: number
  pageSize: number
  name?: string
  document?: string
  startDate?: Date
  endDate?: Date
}

export interface VisitorReportItem {
  id: string
  fullName: string
  document: string
  phone: string | null
  email: string | null
  unit: string
  authorizedBy: string
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ListServiceProvidersReportInput {
  condominiumId: string
  page: number
  pageSize: number
  name?: string
  document?: string
  category?: string
  startDate?: Date
  endDate?: Date
}

export interface ServiceProviderReportItem {
  id: string
  companyName: string
  responsibleName: string
  document: string
  phone: string | null
  email: string | null
  serviceType: string
  unit: string | null
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ListIncidentsReportInput {
  condominiumId: string
  page: number
  pageSize: number
  status?: string
  priority?: string
  responsibleUserId?: string
  startDate?: Date
  endDate?: Date
}

export interface IncidentReportItem {
  id: string
  occurrenceType: string
  date: string
  time: string
  report: string
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ListResidentsReportInput {
  condominiumId: string
  page: number
  pageSize: number
  startDate?: Date
  endDate?: Date
}

export type ResidentReportRelation = 'proprietario' | 'inquilino' | 'dependente'

export interface ResidentReportItem {
  id: string
  fullName: string
  unit: string
  relation: ResidentReportRelation
  email: string | null
  phone: string | null
  document: string | null
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ListEventsReportInput {
  condominiumId: string
  page: number
  pageSize: number
  startDate?: Date
  endDate?: Date
}

export interface EventReportItem {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string | null
  unit: string
  space: string | null
  responsibleName: string
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ListAuthorizationsReportInput {
  condominiumId: string
  page: number
  pageSize: number
  startDate?: Date
  endDate?: Date
}

export interface AuthorizationReportItem {
  id: string
  authorizedName: string
  personType: string
  document: string
  phone: string | null
  company: string | null
  unit: string
  authorizedBy: string
  validFromDate: string
  validFromTime: string
  validToDate: string
  validToTime: string
  observations: string | null
  createdByUserId: string | null
  createdAt: Date
  updatedAt: Date
}
