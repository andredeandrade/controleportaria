// Tabela de ocorrências para desktop
'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/table/DataTable'
import type { OccurrenceRecord } from './hooks/useOccurrences'

export type OccurrencesTableProps = {
  records: OccurrenceRecord[]
}

export function OccurrencesTable({ records }: OccurrencesTableProps) {
  const columns: ColumnDef<OccurrenceRecord>[] = [
    { accessorKey: 'occurrenceType', header: 'Tipo' },
    { accessorKey: 'date', header: 'Data' },
    { accessorKey: 'time', header: 'Hora' },
    { accessorKey: 'responsible', header: 'Responsável' },
    { accessorKey: 'report', header: 'Relato' },
  ]

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhuma ocorrência encontrada."
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
        fontSize: '0.97rem',
        borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
      }}
    />
  )
}
