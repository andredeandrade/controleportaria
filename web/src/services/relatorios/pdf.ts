import { fetchReportPage } from './service'
import { getApiErrorMessage, safeReadJson } from '@/services/shared/http'
import { ReportsServiceError } from './service'

// --- tipos mínimos para geração dos PDFs ---

interface AccessPerson {
  name: string
  category: string
}

interface AccessItem {
  checkInAt: string
  checkOutAt: string | null
  people: AccessPerson[]
  company: string | null
  locomotion: string | null
  plate: string | null
}

interface VisitorItem {
  fullName: string
  document: string
  unit: string
  authorizedBy: string
  createdAt: string
}

interface ServiceProviderItem {
  companyName: string
  responsibleName: string
  document: string
  serviceType: string
  unit: string | null
  createdAt: string
}

interface IncidentItem {
  date: string
  time: string
  occurrenceType: string
  report: string
}

interface ResidentItem {
  fullName: string
  unit: string
  relation: string
  document: string | null
  phone: string | null
}

interface AuthorizationItem {
  authorizedName: string
  personType: string
  document: string
  unit: string
  authorizedBy: string
  validFromDate: string
  validToDate: string
}

// --- helpers ---

function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '—'
  const d = new Date(isoDate)
  return d.toLocaleDateString('pt-BR')
}

function formatDateTime(isoDate: string | null | undefined): string {
  if (!isoDate) return '—'
  const d = new Date(isoDate)
  return `${d.toLocaleDateString('pt-BR')} ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

async function fetchAllPages<T>(path: string, params?: URLSearchParams): Promise<T[]> {
  const allItems: T[] = []
  let page = 1
  const pageSize = 100

  do {
    const p = new URLSearchParams(params)
    p.set('page', String(page))
    p.set('pageSize', String(pageSize))

    const result = await fetchReportPage<T>(path, p)
    allItems.push(...result.items)

    if (page >= result.pagination.totalPages) break
    page++
  } while (true)

  return allItems
}

async function fetchResidentsAll(): Promise<ResidentItem[]> {
  const allItems: ResidentItem[] = []
  let page = 1
  const pageSize = 100

  do {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
    const response = await fetch(`/api/residents?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
    const payload = (await safeReadJson(response)) as {
      items?: ResidentItem[]
      pagination?: { totalPages: number }
    }

    if (!response.ok) {
      throw new ReportsServiceError(
        getApiErrorMessage(payload, 'Não foi possível carregar moradores.'),
      )
    }

    allItems.push(...(payload.items ?? []))
    if (page >= (payload.pagination?.totalPages ?? 1)) break
    page++
  } while (true)

  return allItems
}

async function fetchAuthorizationsAll(): Promise<AuthorizationItem[]> {
  const allItems: AuthorizationItem[] = []
  let page = 1
  const pageSize = 100

  do {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
    const response = await fetch(`/api/authorizations?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
    const payload = (await safeReadJson(response)) as {
      items?: AuthorizationItem[]
      pagination?: { totalPages: number }
    }

    if (!response.ok) {
      throw new ReportsServiceError(
        getApiErrorMessage(payload, 'Não foi possível carregar autorizações.'),
      )
    }

    allItems.push(...(payload.items ?? []))
    if (page >= (payload.pagination?.totalPages ?? 1)) break
    page++
  } while (true)

  return allItems
}

// --- geração de PDF ---

async function buildPdf(title: string, columns: string[], rows: string[][]): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF({ orientation: 'landscape' })

  doc.setFontSize(14)
  doc.text(title, 14, 16)
  doc.setFontSize(9)
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22)

  autoTable(doc, {
    startY: 28,
    head: [columns],
    body: rows,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235] },
  })

  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}

// --- exportadores públicos ---

export async function exportAcessosPdf(): Promise<void> {
  const items = await fetchAllPages<AccessItem>('/api/reports/accesses')

  const rows = items.map((a) => [
    formatDateTime(a.checkInAt),
    a.checkOutAt ? formatDateTime(a.checkOutAt) : 'Em aberto',
    a.people.map((p) => p.name).join(', '),
    a.company ?? '—',
    a.locomotion ?? '—',
    a.plate ?? '—',
  ])

  await buildPdf(
    'Registro de Acessos',
    ['Entrada', 'Saída', 'Pessoas', 'Empresa', 'Locomoção', 'Placa'],
    rows,
  )
}

export async function exportVisitantesPdf(): Promise<void> {
  const items = await fetchAllPages<VisitorItem>('/api/reports/visitors')

  const rows = items.map((v) => [
    v.fullName,
    v.document,
    v.unit,
    v.authorizedBy,
    formatDate(v.createdAt),
  ])

  await buildPdf(
    'Registro de Visitantes',
    ['Nome', 'CPF', 'Unidade', 'Autorizado por', 'Cadastrado em'],
    rows,
  )
}

export async function exportPrestadoresPdf(): Promise<void> {
  const items = await fetchAllPages<ServiceProviderItem>('/api/reports/service-providers')

  const rows = items.map((p) => [
    p.companyName,
    p.responsibleName,
    p.document,
    p.serviceType,
    p.unit ?? '—',
    formatDate(p.createdAt),
  ])

  await buildPdf(
    'Registro de Prestadores de Serviço',
    ['Empresa', 'Responsável', 'CPF', 'Serviço', 'Unidade', 'Cadastrado em'],
    rows,
  )
}

export async function exportOcorrenciasPdf(): Promise<void> {
  const items = await fetchAllPages<IncidentItem>('/api/reports/incidents')

  const rows = items.map((o) => [
    o.date,
    o.time,
    o.occurrenceType,
    o.report.slice(0, 120) + (o.report.length > 120 ? '...' : ''),
  ])

  await buildPdf('Registro de Ocorrências', ['Data', 'Hora', 'Tipo', 'Relato'], rows)
}

export async function exportMoradoresPdf(): Promise<void> {
  const items = await fetchResidentsAll()

  const rows = items.map((m) => [m.fullName, m.unit, m.relation, m.document ?? '—', m.phone ?? '—'])

  await buildPdf('Registro de Moradores', ['Nome', 'Unidade', 'Tipo', 'CPF/RG', 'Telefone'], rows)
}

export async function exportAutorizacoesPdf(): Promise<void> {
  const items = await fetchAuthorizationsAll()

  const rows = items.map((a) => [
    a.authorizedName,
    a.personType,
    a.document,
    a.unit,
    a.authorizedBy,
    a.validFromDate,
    a.validToDate,
  ])

  await buildPdf(
    'Registro de Autorizações',
    ['Nome', 'Tipo', 'CPF', 'Unidade', 'Autorizado por', 'Válido de', 'Válido até'],
    rows,
  )
}
