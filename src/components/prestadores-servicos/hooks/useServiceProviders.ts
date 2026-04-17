'use client'

import { useState } from 'react'

export type ServiceProviderRecord = {
  id: string
  companyName: string
  responsibleName: string
  document: string
  serviceType: string
  phone: string
}

const serviceProviderRecords: ServiceProviderRecord[] = [
  {
    id: '1',
    companyName: 'Alpha Manutenção Predial',
    responsibleName: 'Roberto Almeida',
    document: '12.345.678/0001-90',
    serviceType: 'Manutenção elétrica',
    phone: '(11) 99887-6655',
  },
  {
    id: '2',
    companyName: 'LimpaMax Serviços',
    responsibleName: 'Juliana Costa',
    document: '98.765.432/0001-10',
    serviceType: 'Limpeza técnica',
    phone: '(11) 97766-5544',
  },
  {
    id: '3',
    companyName: 'Refrigeração Central',
    responsibleName: 'Marcelo Nunes',
    document: '45.678.123/0001-55',
    serviceType: 'Climatização',
    phone: '(11) 96655-4433',
  },
]

export function useServiceProviders() {
  const [searchTerm, setSearchTerm] = useState('')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredRecords = normalizedSearchTerm
    ? serviceProviderRecords.filter((record) => {
        const searchableValue = [
          record.companyName,
          record.responsibleName,
          record.document,
          record.serviceType,
          record.phone,
        ]
          .join(' ')
          .toLowerCase()

        return searchableValue.includes(normalizedSearchTerm)
      })
    : serviceProviderRecords

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return {
    records: filteredRecords,
    searchTerm,
    handleSearchChange,
  }
}