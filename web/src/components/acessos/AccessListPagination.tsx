'use client'

import { useAccessListContext } from '@/components/acessos/context/AccessListContext'
import { ListPagination } from '@/components/table/ListPagination'

export function AccessListPagination() {
  const { pagination, handlePageChange, isLoading, isFetching } = useAccessListContext()

  return (
    <ListPagination
      pagination={pagination}
      onPageChange={handlePageChange}
      disabled={isLoading || isFetching}
    />
  )
}
