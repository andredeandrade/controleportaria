'use client'

import { AccessListTableRow } from '@/components/acessos/AccessListTableRow'
import { AccessListTableRowLoader } from '@/components/acessos/AccessListTableRowLoader'
import type { AccessRecord } from '@/components/acessos/hooks/useAccessList'
import { ListErrorState } from '@/components/table/ListErrorState'
import { Table } from '@/components/table/Table'
import { TableBody } from '@/components/table/TableBody'
import { TableCell } from '@/components/table/TableCell'
import { TableHead } from '@/components/table/TableHead'
import { TableHeadCell } from '@/components/table/TableHeadCell'
import { TableRow } from '@/components/table/TableRow'

const SKELETON_ROW_COUNT = 5
const DEFAULT_ERROR_MESSAGE = 'Erro ao carregar registros de acesso.'

type AccessListTableProps = {
  records: AccessRecord[]
  showActions: boolean
  onRegisterExit: (record: AccessRecord) => void
  isLoading?: boolean
  isError?: boolean
  errorMessage?: string
  onRetry?: () => void
}

export function AccessListTable({
  records,
  showActions,
  onRegisterExit,
  isLoading = false,
  isError = false,
  errorMessage = DEFAULT_ERROR_MESSAGE,
  onRetry = () => {},
}: AccessListTableProps) {
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
