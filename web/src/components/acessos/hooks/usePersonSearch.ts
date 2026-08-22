'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { Resident } from '@/app/api/residents/types'
import type { ServiceProvider } from '@/app/api/service-providers/types'
import type { Visitor } from '@/app/api/visitors/types'
import type { AccessPersonTypeValue, LocomotionValue } from '@/components/form'
import { listResidents } from '@/services/moradores/service'
import { listServiceProviders } from '@/services/prestadores-servicos/service'
import { listVisitors } from '@/services/visitantes/service'

export type PersonSearchOption = {
  id: string
  category: AccessPersonTypeValue
  name: string
  document: string
  unit: string
  locomotion: LocomotionValue | null
  companyName: string | null
}

function mapResident(resident: Resident): PersonSearchOption {
  return {
    id: resident.id,
    category: 'morador',
    name: resident.fullName,
    document: resident.document ?? '',
    unit: resident.unit,
    locomotion: resident.vehicles[0]?.type ?? null,
    companyName: null,
  }
}

function mapVisitor(visitor: Visitor): PersonSearchOption {
  return {
    id: visitor.id,
    category: 'visitante',
    name: visitor.fullName,
    document: visitor.document ?? '',
    unit: visitor.unit,
    locomotion: null,
    companyName: null,
  }
}

function mapServiceProvider(serviceProvider: ServiceProvider): PersonSearchOption {
  return {
    id: serviceProvider.id,
    category: 'prestador_servico',
    name: serviceProvider.responsibleName,
    document: serviceProvider.document ?? '',
    unit: serviceProvider.unit ?? '',
    locomotion: null,
    companyName: serviceProvider.companyName,
  }
}

/**
 * Busca cadastros (morador/visitante/prestador de servico) por nome/unidade,
 * conforme a categoria escolhida, para autopreenchimento no formulario de
 * registro de acesso.
 */
export function usePersonSearch(category: AccessPersonTypeValue | '', searchTerm: string) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim())
    }, 350)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [searchTerm])

  const isEnabled = category !== '' && debouncedSearchTerm.length >= 2

  const searchQuery = useQuery({
    queryKey: ['person-search', category, debouncedSearchTerm],
    queryFn: async () => {
      if (category === 'morador') {
        const response = await listResidents(1, 10, debouncedSearchTerm)
        return response.items.map(mapResident)
      }

      if (category === 'visitante') {
        const response = await listVisitors(1, 10, debouncedSearchTerm)
        return response.items.map(mapVisitor)
      }

      const response = await listServiceProviders(1, 10, debouncedSearchTerm)
      return response.items.map(mapServiceProvider)
    },
    enabled: isEnabled,
    placeholderData: keepPreviousData,
  })

  return {
    options: searchQuery.data ?? [],
    isFetching: searchQuery.isFetching,
    isError: searchQuery.isError,
  }
}
