'use client'

import { useState } from 'react'

export type ExitMovementRecord = {
  id: string
  name: string
  category: string
  locomotion: string
  plate: string
  exitAt: string
}

const exitMovementRecords: ExitMovementRecord[] = [
  {
    id: '1',
    name: 'Maria Souza',
    category: 'Prestador de servico',
    locomotion: 'Carro',
    plate: 'ABC-1D23',
    exitAt: '15/04/2026 12:20',
  },
  {
    id: '2',
    name: 'Carlos Lima',
    category: 'Visitante',
    locomotion: 'A pe',
    plate: '-',
    exitAt: '15/04/2026 11:05',
  },
  {
    id: '3',
    name: 'Juliana Rocha',
    category: 'Colaborador',
    locomotion: 'Moto',
    plate: 'FGH-4J56',
    exitAt: '15/04/2026 18:10',
  },
]

export function useExitMovements() {
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredRecords = normalizedSearchTerm
    ? exitMovementRecords.filter((record) => {
        const searchableValue = [
          record.name,
          record.category,
          record.locomotion,
          record.plate,
          record.exitAt,
        ]
          .join(' ')
          .toLowerCase()

        return searchableValue.includes(normalizedSearchTerm)
      })
    : exitMovementRecords

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return {
    records: filteredRecords,
    searchTerm,
    handleSearchChange,
  }
}
