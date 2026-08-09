'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'

type TopBarProps = {
  drawerWidth: number
  onOpenMenu: () => void
}

export default function TopBar({ drawerWidth, onOpenMenu }: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: { md: `${drawerWidth}px` },
        width: { md: `calc(100% - ${drawerWidth}px)` },
        backgroundColor: 'rgba(6, 14, 32, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #424754',
      }}
    >
      <Toolbar sx={{ minHeight: 56, px: { xs: '12px', md: '24px' } }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onOpenMenu}
          sx={{ display: { md: 'none' }, mr: 1, color: '#dae2fd' }}
        >
          <MenuRoundedIcon />
        </IconButton>

        {/* Empurra os ícones para a direita */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <IconButton
            color="inherit"
            aria-label="Notificações"
            sx={{
              color: '#c2c6d6',
              '&:hover': { color: '#dae2fd', backgroundColor: 'rgba(173, 198, 255, 0.08)' },
            }}
          >
            <Badge
              variant="dot"
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: '#4edea3',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                },
              }}
            >
              <NotificationsNoneRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            component={Link}
            href="/configuracoes"
            aria-label="Configurações"
            sx={{
              color: '#c2c6d6',
              '&:hover': { color: '#dae2fd', backgroundColor: 'rgba(173, 198, 255, 0.08)' },
            }}
          >
            <SettingsRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
