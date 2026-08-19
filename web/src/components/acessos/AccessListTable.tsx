'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ColumnDef } from '@tanstack/react-table'

import { RegisterExitButton } from '@/components/acessos/styles/AccessStyles'
import { DataTable } from '@/components/table/DataTable'
import type { AccessRecord } from '@/components/acessos/hooks/useAccessList'

type AccessListTableProps = {
  records: AccessRecord[]
  showActions: boolean
  onRegisterExit: (record: AccessRecord) => void
}

function DateTimeCell({ value }: { value: string }) {
  const [datePart, timePart] = value.split(', ')

  return (
    <Stack spacing={0}>
      <Typography variant="body2" color="text.primary">
        {datePart}
      </Typography>
      {timePart ? (
        <Typography variant="caption" color="text.disabled">
          {timePart}
        </Typography>
      ) : null}
    </Stack>
  )
}

export function AccessListTable({ records, showActions, onRegisterExit }: AccessListTableProps) {
  const columns: ColumnDef<AccessRecord>[] = [
    {
      id: 'name',
      header: 'Nome',
      cell: ({ row }) => (
        <Stack spacing={0.25}>
          <Typography variant="body2" fontWeight={700} color="text.primary">
            {row.original.name}
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ fontFamily: 'monospace' }}>
            {row.original.document}
          </Typography>
        </Stack>
      ),
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
      id: 'entryAt',
      header: 'Entrada',
      cell: ({ row }) => <DateTimeCell value={row.original.entryAt} />,
    },
    {
      id: 'exitAt',
      header: 'Saída',
      cell: ({ row }) => <DateTimeCell value={row.original.exitAt} />,
    },
  ]

  if (showActions) {
    columns.push({
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        if (row.original.hasExited) {
          return null
        }

        return (
          <RegisterExitButton
            variant="contained"
            size="small"
            onClick={() => onRegisterExit(row.original)}
          >
            Registrar saida
          </RegisterExitButton>
        )
      },
    })
  }

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhuma movimentação de entrada encontrada."
      containerSx={{
        bgcolor: 'background.paper',
        borderColor: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
      }}
      headerCellSx={{
        padding: '10px 14px',
        color: 'text.disabled',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.06)',
        whiteSpace: 'nowrap',
      }}
      bodyCellSx={{
        padding: '14px',
        color: 'text.primary',
        fontSize: '0.875rem',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.06)',
      }}
      rowSx={{
        '&:hover': {
          bgcolor: 'action.hover',
        },
        '&:last-child td': {
          borderBottom: 'none',
        },
      }}
    />
  )
}
