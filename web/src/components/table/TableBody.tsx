'use client'

import type { ReactNode } from 'react'
import MuiTableBody from '@mui/material/TableBody'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { bodyCellSx } from '@/components/table/styles/TableStyles'

type TableBodyProps = {
  children: ReactNode
  isEmpty: boolean
  emptyMessage: string
  colSpan: number
}

export function TableBody({ children, isEmpty, emptyMessage, colSpan }: TableBodyProps) {
  return (
    <MuiTableBody>
      {isEmpty ? (
        <MuiTableRow>
          <MuiTableCell colSpan={colSpan} sx={bodyCellSx}>
            <Typography variant="body2" color="text.secondary">
              {emptyMessage}
            </Typography>
          </MuiTableCell>
        </MuiTableRow>
      ) : (
        children
      )}
    </MuiTableBody>
  )
}
