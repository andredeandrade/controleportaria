'use client'

import { useState } from 'react'

export type AccessRecord = {
  id: string
  name: string
  category: string
  locomotion: string
  plate: string
  entryAt: string
  hasExited: boolean
}

export type AccessListViewMode = 'active' | 'history'

type UseAccessListParams = {
  viewMode: AccessListViewMode
}

const accessRecords: AccessRecord[] = [
  {
    id: '1',
    name: 'Maria Souza',
    category: 'Prestador de servico',
    locomotion: 'Carro',
    plate: 'ABC-1D23',
    entryAt: '15/04/2026 08:15',
    hasExited: false,
  },
  {
    id: '2',
    name: 'Carlos Lima',
    category: 'Visitante',
    locomotion: 'A pe',
    plate: '-',
    entryAt: '15/04/2026 09:40',
    hasExited: true,
  },
  {
    id: '3',
    name: 'Juliana Rocha',
    category: 'Colaborador',
    locomotion: 'Moto',
    plate: 'FGH-4J56',
    entryAt: '15/04/2026 10:05',
    hasExited: false,
  },
]

export function useAccessList({ viewMode }: UseAccessListParams) {
  const [selectedRecord, setSelectedRecord] = useState<AccessRecord | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const recordsByStatus = accessRecords.filter((record) => {
    if (viewMode === 'history') {
      return record.hasExited
    }

    return !record.hasExited
  })

  const filteredRecords = normalizedSearchTerm
    ? recordsByStatus.filter((record) => {
        const searchableValue = [
          record.name,
          record.category,
          record.locomotion,
          record.plate,
          record.entryAt,
        ]
          .join(' ')
          .toLowerCase()

        return searchableValue.includes(normalizedSearchTerm)
      })
    : recordsByStatus

  const handleOpenExitConfirmation = (record: AccessRecord) => {
    setSelectedRecord(record)
  }

  const handleCloseExitConfirmation = () => {
    setSelectedRecord(null)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return {
    records: filteredRecords,
    selectedRecord,
    searchTerm,
    handleSearchChange,
    handleOpenExitConfirmation,
    handleCloseExitConfirmation,
  }
}
