'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { useAccessListContext } from '@/modules/acessos/context/AccessListContext'

export function AccessListViewModeToggle() {
  const { viewMode, setViewMode } = useAccessListContext()

  return (
    <Stack direction="row" spacing={2}>
      <Button
        size="small"
        variant={viewMode === 'all' ? 'contained' : 'outlined'}
        color={viewMode === 'all' ? 'primary' : 'inherit'}
        onClick={() => setViewMode('all')}
        sx={
          viewMode === 'all'
            ? undefined
            : { color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }
        }
      >
        Todos
      </Button>

      <Button
        size="small"
        variant={viewMode === 'active' ? 'contained' : 'outlined'}
        color={viewMode === 'active' ? 'primary' : 'inherit'}
        onClick={() => setViewMode('active')}
        sx={
          viewMode === 'active'
            ? undefined
            : { color: 'text.primary', borderColor: 'rgba(255, 255, 255, 0.1)' }
        }
      >
        Acesso ativo
      </Button>
    </Stack>
  )
}
