// Hook para buscar e filtrar autorizações
'use client'

import { useState, useMemo } from 'react'

export type AuthorizationRecord = {
  id: string
  authorizedName: string
  document: string
  validFromDate: string
  validToDate: string
}

const MOCK_AUTHORIZATIONS: AuthorizationRecord[] = [
  {
    id: '1',
    authorizedName: 'João da Silva',
    document: '123.456.789-00',
    validFromDate: '01/04/2026',
    validToDate: '30/06/2026',
  },
  {
    id: '2',
    authorizedName: 'Carlos Limpeza Pro',
    document: '12.345.678/0001-90',
    validFromDate: '15/03/2026',
    validToDate: '15/03/2027',
  },
  {
    id: '3',
    authorizedName: 'Ana Pedrosa',
    document: '987.654.321-11',
    validFromDate: '10/02/2026',
    validToDate: '10/05/2026',
  },
]

export function useAuthorizations() {
  const [searchTerm, setSearchTerm] = useState('')

  const records = useMemo(() => {
    if (!searchTerm) return MOCK_AUTHORIZATIONS
    const lower = searchTerm.toLowerCase()
    return MOCK_AUTHORIZATIONS.filter(
      (a) => a.authorizedName.toLowerCase().includes(lower) || a.document.includes(lower),
    )
  }, [searchTerm])

  function handleSearchChange(value: string) {
    setSearchTerm(value)
  }

  return { records, searchTerm, handleSearchChange }
}
