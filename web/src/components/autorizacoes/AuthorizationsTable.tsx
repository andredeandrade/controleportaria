// Tabela de autorizações para desktop
'use client'

import type { ColumnDef } from '@tanstack/react-table'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

import { DataTable } from '@/components/table/DataTable'
import type { AuthorizationRecord } from './hooks/useAuthorizations'

export type AuthorizationsTableProps = {
  records: AuthorizationRecord[]
}

export function AuthorizationsTable({ records }: AuthorizationsTableProps) {
  const router = useRouter()

  const columns: ColumnDef<AuthorizationRecord>[] = [
    { accessorKey: 'authorizedName', header: 'Autorizado' },
    { accessorKey: 'document', header: 'Documento' },
    { accessorKey: 'validFromDate', header: 'Válido de' },
    { accessorKey: 'validToDate', header: 'Válido até' },
    {
      id: 'actions',
      header: 'Ação',
      cell: () => (
        <Button
          variant="contained"
          size="small"
          onClick={() => router.push('/movimentacoes/entrada/registrar')}
          sx={{
            minWidth: 148,
            bgcolor: '#16A34A',
            color: '#FFFFFF',
            fontWeight: 700,
            boxShadow: 'none',
            '&:hover': {
              bgcolor: '#15803D',
              boxShadow: 'none',
            },
          }}
        >
          Registrar entrada
        </Button>
      ),
    },
  ]

  return (
    <DataTable
      data={records}
      columns={columns}
      emptyMessage="Nenhuma autorização encontrada."
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
