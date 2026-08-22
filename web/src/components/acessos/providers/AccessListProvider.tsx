'use client'

import { useState, type ReactNode } from 'react'

import {
  AccessListContext,
  type AccessListContextValue,
} from '@/components/acessos/context/AccessListContext'
import { type AccessRecord, useAccessList } from '@/components/acessos/hooks/useAccessList'
import { useCheckOutAccessRecord } from '@/components/acessos/hooks/useCheckOutAccessRecord'
import { useListSelection } from '@/components/table/hooks/useListSelection'
import type { AccessListViewMode } from '@/types/acessos'

type AccessListProviderProps = {
  initialViewMode?: AccessListViewMode
  children: ReactNode
}

export function AccessListProvider({
  initialViewMode = 'all',
  children,
}: AccessListProviderProps) {
  const [viewMode, setViewMode] = useState<AccessListViewMode>(initialViewMode)
  const query = useAccessList({ viewMode })
  const selection = useListSelection<AccessRecord>()
  const checkOutMutation = useCheckOutAccessRecord()

  const showExitActions = true

  const handleConfirmExit = async (personIds?: string[], observations?: string) => {
    if (!selection.selectedItem) {
      return
    }

    await checkOutMutation.mutateAsync({
      id: selection.selectedItem.id,
      personIds,
      observations,
    })
  }

  // O value não é memoizado propositalmente: records/isFetching mudam a cada
  // fetch e os handlers vêm de hooks que já recriam suas referências a cada
  // render, então um useMemo aqui não evitaria nenhum recálculo real.
  const value: AccessListContextValue = {
    ...query,
    viewMode,
    setViewMode,
    showExitActions,
    selectedRecord: selection.selectedItem,
    handleOpenExitConfirmation: selection.selectItem,
    handleCloseExitConfirmation: selection.clearSelection,
    handleConfirmExit,
    isCheckOutPending: checkOutMutation.isPending,
    checkOutErrorMessage: checkOutMutation.isError ? checkOutMutation.error.message : null,
  }

  return <AccessListContext.Provider value={value}>{children}</AccessListContext.Provider>
}
