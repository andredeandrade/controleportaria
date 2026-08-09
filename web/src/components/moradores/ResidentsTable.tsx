'use client'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import IconButton from '@mui/material/IconButton'
import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

import { DataTable } from '@/components/table/DataTable'
import type { ResidentRecord } from '@/types/moradores'

type ResidentsTableProps = {
  records: ResidentRecord[]
}

function formatVehicles(vehicles: ResidentRecord['vehicles']) {
  if (vehicles.length === 0) return '-'
  return vehicles.map((v) => v.plate).join(', ')
}

export function ResidentsTable({ records }: ResidentsTableProps) {
  const columns: ColumnDef<ResidentRecord>[] = [
    { accessorKey: 'name', header: 'Nome' },
    { accessorKey: 'unit', header: 'Unidade' },
    { accessorKey: 'relation', header: 'Vínculo' },
    { accessorKey: 'phone', header: 'Telefone' },
    {
      id: 'vehicles',
      header: 'Veículos',
      cell: ({ row }) => formatVehicles(row.original.vehicles),
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <IconButton
          component={Link}
          href={`/moradores/${row.original.id}/editar`}
          size="small"
          aria-label="Editar morador"
          sx={{
            color: '#8c909f',
            '&:hover': { color: '#adc6ff', backgroundColor: 'rgba(173, 198, 255, 0.08)' },
          }}
        >
          <EditRoundedIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhum morador encontrado."
      containerSx={{
        backgroundColor: '#171f33',
        border: '1px solid #424754',
        borderRadius: 2,
        overflow: 'hidden',
      }}
      headerCellSx={{
        px: '24px',
        backgroundColor: '#131b2e',
        color: '#c2c6d6',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        borderBottom: '1px solid #424754',
        whiteSpace: 'nowrap',
      }}
      bodyCellSx={{
        px: '24px',
        color: '#dae2fd',
        fontSize: '0.875rem',
        borderBottom: '1px solid #1f2a3f',
      }}
      rowSx={{
        '&:hover': { backgroundColor: 'rgba(173, 198, 255, 0.04)' },
        '&:last-child td': { borderBottom: 'none' },
      }}
    />
  )
}
