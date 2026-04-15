'use client'

import { useState } from 'react'

export type EntryMovementRecord = {
  id: string
  name: string
  category: string
  locomotion: string
  plate: string
  entryAt: string
}

const entryMovementRecords: EntryMovementRecord[] = [
  {
    id: '1',
    name: 'Maria Souza',
    category: 'Prestador de servico',
    locomotion: 'Carro',
    plate: 'ABC-1D23',
    entryAt: '15/04/2026 08:15',
  },
  {
    id: '2',
    name: 'Carlos Lima',
    category: 'Visitante',
    locomotion: 'A pe',
    plate: '-',
    entryAt: '15/04/2026 09:40',
  },
  {
    id: '3',
    name: 'Juliana Rocha',
    category: 'Colaborador',
    locomotion: 'Moto',
    plate: 'FGH-4J56',
    entryAt: '15/04/2026 10:05',
  },
]

export function useEntryMovements() {
  const [selectedRecord, setSelectedRecord] = useState<EntryMovementRecord | null>(null)

  const handleOpenExitConfirmation = (record: EntryMovementRecord) => {
    setSelectedRecord(record)
  }

  const handleCloseExitConfirmation = () => {
    setSelectedRecord(null)
  }

  return {
    records: entryMovementRecords,
    selectedRecord,
    handleOpenExitConfirmation,
    handleCloseExitConfirmation,
  }
}
