'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AccessListTableDateTimeCell } from '@/components/acessos/AccessListTableDateTimeCell'
import { RegisterExitButton } from '@/components/acessos/styles/AccessStyles'
import type { AccessRecord } from '@/components/acessos/hooks/useAccessList'
import { TableCell } from '@/components/table/TableCell'
import { TableRow } from '@/components/table/TableRow'

type AccessListTableRowProps = {
  record: AccessRecord
  showActions: boolean
  onRegisterExit: (record: AccessRecord) => void
}

export function AccessListTableRow({ record, showActions, onRegisterExit }: AccessListTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Stack spacing={0.25}>
          <Typography variant="body2" fontWeight={700} color="text.primary">
            {record.name}
          </Typography>
          {record.categoryUnits.map((categoryUnit) => (
            <Typography key={categoryUnit.id} variant="caption" color="text.disabled">
              {categoryUnit.label}
            </Typography>
          ))}
        </Stack>
      </TableCell>
      <TableCell>{record.locomotion}</TableCell>
      <TableCell>{record.plate}</TableCell>
      <TableCell>
        <AccessListTableDateTimeCell value={record.entryAt} />
      </TableCell>
      <TableCell>
        <AccessListTableDateTimeCell value={record.exitAt} />
      </TableCell>
      {showActions ? (
        <TableCell>
          {record.hasExited ? null : (
            <RegisterExitButton
              variant="contained"
              size="small"
              onClick={() => onRegisterExit(record)}
            >
              Registrar saida
            </RegisterExitButton>
          )}
        </TableCell>
      ) : null}
    </TableRow>
  )
}
