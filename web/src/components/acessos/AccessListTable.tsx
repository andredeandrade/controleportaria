'use client'

import { AccessListTableRow } from '@/components/acessos/AccessListTableRow'
import { AccessListTableRowLoader } from '@/components/acessos/AccessListTableRowLoader'
import { useAccessListContext } from '@/components/acessos/context/AccessListContext'
import { ListErrorState } from '@/components/table/ListErrorState'
import { Table } from '@/components/table/Table'
import { TableBody } from '@/components/table/TableBody'
import { TableCell } from '@/components/table/TableCell'
import { TableHead } from '@/components/table/TableHead'
import { TableHeadCell } from '@/components/table/TableHeadCell'
import { TableRow } from '@/components/table/TableRow'

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
