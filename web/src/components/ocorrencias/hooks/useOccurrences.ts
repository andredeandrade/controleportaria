// Hook para buscar e filtrar ocorrências
'use client'

import { useState, useMemo } from 'react'

export type OccurrenceRecord = {
  id: string
  occurrenceType: string
  date: string
  time: string
  report: string
  responsible: string
}

const MOCK_OCCURRENCES: OccurrenceRecord[] = [
  {
    id: '1',
    occurrenceType: 'Falta de energia',
    date: '16/04/2026',
    time: '14:30',
    report: 'Faltou energia em todo o bloco A.',
    responsible: 'João Silva',
  },
  {
    id: '2',
    occurrenceType: 'Vandalismo',
    date: '15/04/2026',
    time: '22:10',
    report: 'Pichação no muro externo.',
    responsible: 'Maria Souza',
  },
  {
    id: '3',
    occurrenceType: 'Emergencia medica',
    date: '14/04/2026',
    time: '09:45',
    report: 'Morador passou mal na academia.',
    responsible: 'Carlos Lima',
  },
]

export function useOccurrences() {
  const [searchTerm, setSearchTerm] = useState('')

  const records = useMemo(() => {
    if (!searchTerm) return MOCK_OCCURRENCES
    const lower = searchTerm.toLowerCase()
    return MOCK_OCCURRENCES.filter(
      (o) =>
        o.occurrenceType.toLowerCase().includes(lower) ||
        o.date.includes(lower) ||
        o.time.includes(lower) ||
        o.report.toLowerCase().includes(lower) ||
        o.responsible.toLowerCase().includes(lower),
    )
  }, [searchTerm])

  function handleSearchChange(value: string) {
    setSearchTerm(value)
  }

  return { records, searchTerm, handleSearchChange }
}
