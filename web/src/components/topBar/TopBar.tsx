'use client'

import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

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
        backgroundColor: '#F8F9FF',
        borderBottom: '1px solid',
        borderColor: '#BEC8D2',
        color: '#505F76',
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: { xs: '12px', md: '24px' } }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onOpenMenu}
          sx={{ display: { md: 'none' }, mr: 1, color: 'text.primary' }}
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
              color: '#505F76',
              '&:hover': {
                color: '#0D1C2D',
                backgroundColor: 'rgba(14, 165, 233, 0.08)',
              },
            }}
          >
            <Badge
              variant="dot"
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: 'success.main',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                },
              }}
            >
              <NotificationsNoneRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
