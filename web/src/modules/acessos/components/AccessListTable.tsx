'use client'

import { AccessListTableRow } from '@/modules/acessos/components/AccessListTableRow'
import { AccessListTableRowLoader } from '@/modules/acessos/components/AccessListTableRowLoader'
import { useAccessListContext } from '@/modules/acessos/context/AccessListContext'
import { ListErrorState } from '@/modules/table/components/ListErrorState'
import { Table } from '@/modules/table/components/Table'
import { TableBody } from '@/modules/table/components/TableBody'
import { TableCell } from '@/modules/table/components/TableCell'
import { TableHead } from '@/modules/table/components/TableHead'
import { TableHeadCell } from '@/modules/table/components/TableHeadCell'
import { TableRow } from '@/modules/table/components/TableRow'

const SKELETON_ROW_COUNT = 5

export function AccessListTable() {
  const {
    records,
    showExitActions: showActions,
    handleOpenExitConfirmation: onRegisterExit,
    isLoading,
    isError,
    errorMessage,
    refetch: onRetry,
  } = useAccessListContext()

  const columnCount = showActions ? 6 : 5

  return (
    <Table>
      <TableHead>
        <TableHeadCell>Nome</TableHeadCell>
        <TableHeadCell>Locomoção</TableHeadCell>
        <TableHeadCell>Placa</TableHeadCell>
        <TableHeadCell>Entrada</TableHeadCell>
        <TableHeadCell>Saída</TableHeadCell>
        {showActions ? <TableHeadCell /> : null}
      </TableHead>
      <TableBody
        isEmpty={!isError && !isLoading && records.length === 0}
        emptyMessage="Nenhuma movimentação de entrada encontrada."
        colSpan={columnCount}
      >
        {isError ? (
          <TableRow>
            <TableCell colSpan={columnCount}>
              <ListErrorState message={errorMessage} onRetry={onRetry} />
            </TableCell>
          </TableRow>
        ) : isLoading ? (
          Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
            <AccessListTableRowLoader key={index} showActions={showActions} />
          ))
        ) : (
          records.map((record) => (
            <AccessListTableRow
              key={record.id}
              record={record}
              showActions={showActions}
              onRegisterExit={onRegisterExit}
            />
          ))
        )}
      </TableBody>
    </Table>
  )
}
