'use client'

import type { ColumnDef } from '@tanstack/react-table'

import type { ResidentRecord } from '@/components/moradores/hooks/useResidents'
import { DataTable } from '@/components/table/DataTable'

type ResidentsTableProps = {
  records: ResidentRecord[]
}

function formatVehicles(vehicles: ResidentRecord['vehicles']) {
  if (vehicles.length === 0) {
    return 'Sem veículo cadastrado'
  }

  return vehicles.map((vehicle) => `${vehicle.type}: ${vehicle.plate}`).join(' | ')
}

export function ResidentsTable({ records }: ResidentsTableProps) {
  const columns: ColumnDef<ResidentRecord>[] = [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'unit',
      header: 'Unidade',
    },
    {
      accessorKey: 'relation',
      header: 'Vínculo',
    },
    {
      accessorKey: 'phone',
      header: 'Telefone',
    },
    {
      id: 'vehicles',
      header: 'Veículos',
      cell: ({ row }) => formatVehicles(row.original.vehicles),
    },
  ]

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhum morador encontrado."
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
