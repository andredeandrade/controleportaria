'use client'

import type { ColumnDef } from '@tanstack/react-table'

import type { ExitMovementRecord } from '@/components/movimentacoes/saida/hooks/useExitMovements'
import { DataTable } from '@/components/table/DataTable'

type ExitMovementsTableProps = {
  records: ExitMovementRecord[]
}

export function ExitMovementsTable({ records }: ExitMovementsTableProps) {
  const columns: ColumnDef<ExitMovementRecord>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'category',
      header: 'Categoria',
    },
    {
      accessorKey: 'locomotion',
      header: 'Locomoção',
    },
    {
      accessorKey: 'plate',
      header: 'Placa',
    },
    {
      accessorKey: 'exitAt',
      header: 'Saída em',
    },
  ]

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhuma movimentação de saída encontrada."
      containerSx={{
        bgcolor: '#F8FAFC',
        borderColor: 'rgba(203, 213, 225, 0.9)',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
      }}
      headerCellSx={{
        px: 3,
        py: 2.25,
        bgcolor: '#E2E8F0',
        color: '#0F172A',
        fontSize: '0.95rem',
        fontWeight: 700,
        borderBottom: '1px solid rgba(203, 213, 225, 0.9)',
        whiteSpace: 'nowrap',
      }}
      bodyCellSx={{
        px: 3,
        py: 2.5,
        color: '#0F172A',
        fontSize: '0.95rem',
        borderBottom: '1px solid rgba(226, 232, 240, 1)',
      }}
      rowSx={{
        '&:nth-of-type(odd)': {
          bgcolor: '#FFFFFF',
        },
        '&:nth-of-type(even)': {
          bgcolor: '#F8FAFC',
        },
        '&:hover': {
          bgcolor: '#EEF2FF',
        },
        '&:last-child td': {
          borderBottom: 'none',
        },
      }}
    />
  )
}
