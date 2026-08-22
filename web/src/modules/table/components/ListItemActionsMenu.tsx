'use client'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import type { MouseEvent, ReactNode } from 'react'
import { useState } from 'react'

export type ListItemActionMenuOption = {
  id: string
  label: string
  onClick: () => void
  disabled?: boolean
  icon?: ReactNode
}

type ListItemActionsMenuProps = {
  items: ListItemActionMenuOption[]
  ariaLabel?: string
}

export function ListItemActionsMenu({
  items,
  ariaLabel = 'Abrir ações do item',
}: ListItemActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  if (items.length === 0) {
    return null
  }

  const isOpen = Boolean(anchorEl)

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleItemClick = (onClick: () => void) => {
    handleClose()
    onClick()
  }

  return (
    <>
      <IconButton
        aria-label={ariaLabel}
        onClick={handleOpen}
        size="small"
        sx={{
          color: '#475569',
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'rgba(148, 163, 184, 0.12)',
          },
        }}
      >
        <MoreVertRoundedIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              mt: 0.5,
              minWidth: 180,
              borderRadius: 2,
              border: '1px solid rgba(226, 232, 240, 1)',
              boxShadow: '0 16px 32px rgba(15, 23, 42, 0.14)',
            },
          },
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleItemClick(item.onClick)}
            disabled={item.disabled}
            sx={{ gap: 1.25, py: 1.1 }}
          >
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
