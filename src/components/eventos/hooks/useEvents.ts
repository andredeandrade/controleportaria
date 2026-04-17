'use client'

import { useState } from 'react'

export type EventRecord = {
  id: string
  title: string
  date: string
  time: string
  unit: string
  responsibleName: string
  guestsCount: number
}

const eventRecords: EventRecord[] = [
  {
    id: '1',
    title: 'Aniversário no salão',
    date: '18/04/2026',
    time: '19:00 às 23:00',
    unit: 'Bloco A - 101',
    responsibleName: 'Carlos Souza',
    guestsCount: 35,
  },
  {
    id: '2',
    title: 'Mudança programada',
    date: '19/04/2026',
    time: '08:00 às 12:00',
    unit: 'Torre 2 - 403',
    responsibleName: 'Fernanda Lima',
    guestsCount: 6,
  },
  {
    id: '3',
    title: 'Reunião familiar',
    date: '20/04/2026',
    time: '16:00 às 21:00',
    unit: 'Bloco C - 204',
    responsibleName: 'Patrícia Gomes',
    guestsCount: 12,
  },
]

export function useEvents() {
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredRecords = normalizedSearchTerm
    ? eventRecords.filter((record) => {
        const searchableValue = [
          record.title,
          record.date,
          record.time,
          record.unit,
          record.responsibleName,
          String(record.guestsCount),
        ]
          .join(' ')
          .toLowerCase()

        return searchableValue.includes(normalizedSearchTerm)
      })
    : eventRecords

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return {
    records: filteredRecords,
    searchTerm,
    handleSearchChange,
  }
}
