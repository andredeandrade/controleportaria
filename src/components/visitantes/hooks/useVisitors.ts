'use client'

import { useState } from 'react'

export type VisitorRecord = {
  id: string
  name: string
  document: string
  unit: string
  authorizedBy: string
  phone: string
}

const visitorRecords: VisitorRecord[] = [
  {
    id: '1',
    name: 'Maria Souza',
    document: '123.456.789-00',
    unit: 'Bloco A - 101',
    authorizedBy: 'Carlos Souza',
    phone: '(11) 99876-1234',
  },
  {
    id: '2',
    name: 'João Oliveira',
    document: '987.654.321-00',
    unit: 'Torre 2 - 403',
    authorizedBy: 'Fernanda Lima',
    phone: '(11) 97654-8877',
  },
  {
    id: '3',
    name: 'Patrícia Gomes',
    document: 'MG-12.345.678',
    unit: 'Bloco C - 204',
    authorizedBy: 'Rafael Gomes',
    phone: '(11) 96543-2211',
  },
]

export function useVisitors() {
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredRecords = normalizedSearchTerm
    ? visitorRecords.filter((record) => {
        const searchableValue = [
          record.name,
          record.document,
          record.unit,
          record.authorizedBy,
          record.phone,
        ]
          .join(' ')
          .toLowerCase()

        return searchableValue.includes(normalizedSearchTerm)
      })
    : visitorRecords

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return {
    records: filteredRecords,
    searchTerm,
    handleSearchChange,
  }
}
