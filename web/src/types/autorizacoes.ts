import type { PersonTypeValue } from '@/components/form/PersonTypeSelect'

export type AuthorizationRecord = {
  id: string
  authorizedName: string
  personType: string
  personTypeLabel: string
  document: string
  validFromDate: string
  validToDate: string
  unit: string
  authorizedBy: string
}

export type AuthorizationsPaginationState = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const PERSON_TYPE_LABEL: Record<PersonTypeValue, string> = {
  morador: 'Morador',
  visitante: 'Visitante',
  prestador_servico: 'Prestador de servico',
  colaborador: 'Colaborador',
}
