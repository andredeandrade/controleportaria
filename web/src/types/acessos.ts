import type { AccessRecord } from '@/app/api/access-records/types'

export type AccessListViewMode = 'active' | 'history'

export type AccessRecordListItem = {
  id: string
  name: string
  category: string
  locomotion: string
  plate: string
  entryAt: string
  hasExited: boolean
}

export type AccessRecordsPaginationState = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export const ACCESS_PERSON_CATEGORY_LABEL: Record<string, string> = {
  morador: 'Morador',
  visitante: 'Visitante',
  prestador_servico: 'Prestador de servico',
  colaborador: 'Colaborador',
}

export const ACCESS_LOCOMOTION_LABEL: Record<string, string> = {
  a_pe: 'A pe',
  carro: 'Carro',
  moto: 'Moto',
  bicicleta: 'Bicicleta',
  caminhao: 'Caminhao',
  outro: 'Outro',
}

export function formatAccessRecord(item: AccessRecord): AccessRecordListItem {
  const firstPerson = item.people[0]
  const extraPeopleCount = Math.max(0, item.people.length - 1)
  const name =
    extraPeopleCount > 0 && firstPerson
      ? `${firstPerson.name} +${extraPeopleCount}`
      : (firstPerson?.name ?? '-')

  const categoryRaw = firstPerson?.category ?? ''
  const category = (ACCESS_PERSON_CATEGORY_LABEL[categoryRaw] ?? categoryRaw) || '-'

  const locomotionRaw = item.locomotion ?? ''
  const locomotion = (ACCESS_LOCOMOTION_LABEL[locomotionRaw] ?? locomotionRaw) || '-'

  const checkInDate = new Date(item.checkInAt)
  const entryAt = Number.isNaN(checkInDate.getTime())
    ? item.checkInAt
    : new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(checkInDate)

  return {
    id: item.id,
    name,
    category,
    locomotion,
    plate: item.plate?.trim() ? item.plate : '-',
    entryAt,
    hasExited: !item.isOpen,
  }
}
