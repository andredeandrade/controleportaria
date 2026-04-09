'use client'

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
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
        backgroundColor: 'rgba(15, 23, 42, 0.94)',
        color: '#F8FAFC',
        borderBottom: '1px solid',
        borderColor: 'rgba(148, 163, 184, 0.16)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar sx={{ minHeight: 72, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 0 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onOpenMenu}
            sx={{ display: { md: 'none' }, mr: 1, alignSelf: 'center' }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Typography
            component={Link}
            href="/dashboard"
            variant="h6"
            fontWeight={700}
            noWrap
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 1,
              '&:hover': {
                opacity: 0.88,
              },
            }}
          >
            Controle Portaria
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/"
          color="inherit"
          startIcon={<LogoutRoundedIcon />}
          sx={{
            textTransform: 'none',
            borderColor: 'rgba(148, 163, 184, 0.28)',
            '&:hover': {
              backgroundColor: 'rgba(30, 41, 59, 0.72)',
            },
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  )
}
