import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import EventIcon from '@mui/icons-material/Event'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import type { SvgIconComponent } from '@mui/icons-material'

import type { ReportModuleKey } from '@/types/relatorios'

type AccessPerson = {
  name: string
  category: string
}

type AccessItem = {
  checkInAt: string
  checkOutAt: string | null
  people: AccessPerson[]
  company: string | null
  locomotion: string | null
  plate: string | null
}

type VisitorItem = {
  fullName: string
  document: string
  unit: string
  authorizedBy: string
  createdAt: string
}

type ServiceProviderItem = {
  companyName: string
  responsibleName: string
  document: string
  serviceType: string
  unit: string | null
  createdAt: string
}

type IncidentItem = {
  date: string
  time: string
  occurrenceType: string
  report: string
}

type ResidentItem = {
  fullName: string
  unit: string
  relation: string
  document: string | null
  phone: string | null
}

type AuthorizationItem = {
  authorizedName: string
  personType: string
  document: string
  unit: string
  authorizedBy: string
  validFromDate: string
  validToDate: string
}

type EventItem = {
  title: string
  date: string
  startTime: string | null
  unit: string | null
  space: string | null
  responsibleName: string | null
}

function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return '—'
  const d = new Date(isoDate)
  return d.toLocaleDateString('pt-BR')
}

/**
 * Formata uma data pura 'YYYY-MM-DD' (sem componente de horário) para 'DD/MM/AAAA'
 * sem passar por `Date`, evitando o deslocamento de fuso horário que `new Date('YYYY-MM-DD')`
 * introduz (é interpretada como UTC e pode exibir o dia anterior em fusos negativos como o do Brasil).
 */
function formatPlainDate(plainDate: string | null | undefined): string {
  if (!plainDate) return '—'
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(plainDate)
  if (!match) return plainDate
  const [, year, month, day] = match
  return `${day}/${month}/${year}`
}

function formatDateTime(isoDate: string | null | undefined): string {
  if (!isoDate) return '—'
  const d = new Date(isoDate)
  return `${d.toLocaleDateString('pt-BR')} ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
}

export type ReportModuleDef = {
  key: ReportModuleKey
  label: string
  descricao: string
  icon: SvgIconComponent
  color: string
  route: string
  bffPath: string
  columns: string[]
  mapRow: (item: unknown) => string[]
}

export const REPORT_MODULES: Record<ReportModuleKey, ReportModuleDef> = {
  acessos: {
    key: 'acessos',
    label: 'Registro de acessos',
    descricao: 'Histórico completo de entradas e saídas pela portaria.',
    icon: AccessTimeIcon,
    color: 'success.main',
    route: '/acessos',
    bffPath: '/api/reports/accesses',
    columns: ['Entrada', 'Saída', 'Pessoas', 'Empresa', 'Locomoção', 'Placa'],
    mapRow: (raw) => {
      const item = raw as AccessItem
      return [
        formatDateTime(item.checkInAt),
        item.checkOutAt ? formatDateTime(item.checkOutAt) : 'Em aberto',
        item.people.map((p) => p.name).join(', '),
        item.company ?? '—',
        item.locomotion ?? '—',
        item.plate ?? '—',
      ]
    },
  },
  moradores: {
    key: 'moradores',
    label: 'Registro de moradores',
    descricao: 'Cadastro completo dos moradores do condomínio.',
    icon: HomeIcon,
    color: 'primary.main',
    route: '/moradores',
    bffPath: '/api/reports/residents',
    columns: ['Nome', 'Unidade', 'Tipo', 'CPF/RG', 'Telefone'],
    mapRow: (raw) => {
      const item = raw as ResidentItem
      return [item.fullName, item.unit, item.relation, item.document ?? '—', item.phone ?? '—']
    },
  },
  visitantes: {
    key: 'visitantes',
    label: 'Registro de visitantes',
    descricao: 'Cadastro de visitantes registrados no sistema.',
    icon: PeopleIcon,
    color: 'info.main',
    route: '/visitantes',
    bffPath: '/api/reports/visitors',
    columns: ['Nome', 'CPF', 'Unidade', 'Autorizado por', 'Cadastrado em'],
    mapRow: (raw) => {
      const item = raw as VisitorItem
      return [
        item.fullName,
        item.document,
        item.unit,
        item.authorizedBy,
        formatDate(item.createdAt),
      ]
    },
  },
  prestadores: {
    key: 'prestadores',
    label: 'Registro de prestadores de serviço',
    descricao: 'Cadastro de prestadores de serviço e empresas terceirizadas.',
    icon: BusinessCenterIcon,
    color: 'warning.main',
    route: '/prestadores-servicos',
    bffPath: '/api/reports/service-providers',
    columns: ['Empresa', 'Responsável', 'CPF', 'Serviço', 'Unidade', 'Cadastrado em'],
    mapRow: (raw) => {
      const item = raw as ServiceProviderItem
      return [
        item.companyName,
        item.responsibleName,
        item.document,
        item.serviceType,
        item.unit ?? '—',
        formatDate(item.createdAt),
      ]
    },
  },
  eventos: {
    key: 'eventos',
    label: 'Registro de eventos',
    descricao: 'Eventos e reservas de espaços cadastrados no condomínio.',
    icon: EventIcon,
    color: 'secondary.main',
    route: '/eventos',
    bffPath: '/api/reports/events',
    columns: ['Título', 'Data', 'Horário', 'Unidade', 'Espaço', 'Responsável'],
    mapRow: (raw) => {
      const item = raw as EventItem
      return [
        item.title,
        formatPlainDate(item.date),
        item.startTime ?? '—',
        item.unit ?? '—',
        item.space ?? '—',
        item.responsibleName ?? '—',
      ]
    },
  },
  ocorrencias: {
    key: 'ocorrencias',
    label: 'Registro de ocorrências',
    descricao: 'Ocorrências e incidentes registrados na portaria.',
    icon: ReportProblemIcon,
    color: 'error.main',
    route: '/ocorrencias',
    bffPath: '/api/reports/incidents',
    columns: ['Data', 'Hora', 'Tipo', 'Relato'],
    mapRow: (raw) => {
      const item = raw as IncidentItem
      return [
        item.date,
        item.time,
        item.occurrenceType,
        item.report.slice(0, 120) + (item.report.length > 120 ? '...' : ''),
      ]
    },
  },
  autorizacoes: {
    key: 'autorizacoes',
    label: 'Registro de autorizações',
    descricao: 'Autorizações de entrada emitidas para visitantes e prestadores.',
    icon: AssignmentIndIcon,
    color: 'secondary.main',
    route: '/autorizacoes',
    bffPath: '/api/reports/authorizations',
    columns: ['Nome', 'Tipo', 'CPF', 'Unidade', 'Autorizado por', 'Válido de', 'Válido até'],
    mapRow: (raw) => {
      const item = raw as AuthorizationItem
      return [
        item.authorizedName,
        item.personType,
        item.document,
        item.unit,
        item.authorizedBy,
        item.validFromDate,
        item.validToDate,
      ]
    },
  },
}
