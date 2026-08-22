'use client'

import { useAccessListContext } from '@/components/acessos/context/AccessListContext'
import { ListSearchField } from '@/components/table/ListSearchField'

export function AccessListSearch() {
  const { searchTerm, handleSearchChange } = useAccessListContext()

  return (
    <ListSearchField
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Buscar por nome, documento ou placa..."
      fullWidth
      sx={{
        maxWidth: { xs: '100%', sm: 420 },
      }}
    />
  )
}
