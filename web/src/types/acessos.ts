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
  people: Array<{
    id: string
    name: string
    isOpen: boolean
  }>
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
  const peopleToDisplay = item.isOpen ? item.people.filter((person) => person.isOpen) : item.people
  const firstPerson = peopleToDisplay[0] ?? item.people[0]
  const name =
    peopleToDisplay
      .map((person) => person.name.trim())
      .filter((personName) => personName.length > 0)
      .join(', ') ||
    item.people
      .map((person) => person.name.trim())
      .filter((personName) => personName.length > 0)
      .join(', ') ||
    '-'

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
    people: item.people.map((person) => ({
      id: person.id,
      name: person.name,
      isOpen: person.isOpen,
    })),
  }
}
