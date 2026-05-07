'use client'

import { useState } from 'react'

type ResidentVehicle = {
  type: string
  plate: string
}

export type ResidentRecord = {
  id: string
  name: string
  unit: string
  relation: string
  phone: string
  vehicles: ResidentVehicle[]
}

const residentRecords: ResidentRecord[] = [
  {
    id: '1',
    name: 'Andressa Martins',
    unit: 'Bloco A - 101',
    relation: 'Proprietário',
    phone: '(11) 99876-1234',
    vehicles: [
      { type: 'Carro', plate: 'BRA-2E19' },
      { type: 'Moto', plate: 'QWE-4R56' },
    ],
  },
  {
    id: '2',
    name: 'Fábio Almeida',
    unit: 'Bloco C - 304',
    relation: 'Inquilino',
    phone: '(11) 98765-4321',
    vehicles: [{ type: 'Carro', plate: 'XYZ-9K87' }],
  },
  {
    id: '3',
    name: 'Camila Rocha',
    unit: 'Torre 2 - 1203',
    relation: 'Dependente',
    phone: '(11) 97654-8899',
    vehicles: [],
  },
]

export function useResidents() {
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredRecords = normalizedSearchTerm
    ? residentRecords.filter((record) => {
        const vehiclesSummary = record.vehicles
          .map((vehicle) => `${vehicle.type} ${vehicle.plate}`)
          .join(' ')

        const searchableValue = [
          record.name,
          record.unit,
          record.relation,
          record.phone,
          vehiclesSummary,
        ]
          .join(' ')
          .toLowerCase()

        return searchableValue.includes(normalizedSearchTerm)
      })
    : residentRecords

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return {
    records: filteredRecords,
    searchTerm,
    handleSearchChange,
  }
}
