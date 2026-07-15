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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type TopBarProps = {
  drawerWidth: number
  onOpenMenu: () => void
}

export default function TopBar({ drawerWidth, onOpenMenu }: TopBarProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      router.replace('/')
      router.refresh()
      setIsLoggingOut(false)
    }
  }

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
      <Toolbar sx={{ minHeight: 72, display: 'flex', alignItems: 'center', position: 'relative' }}>
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
              position: { xs: 'absolute', md: 'static' },
              left: { xs: '50%', md: 'auto' },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              '&:hover': {
                opacity: 0.88,
              },
            }}
          >
            Controle Portaria
          </Typography>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="Sair"
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <LogoutRoundedIcon />
          </IconButton>

          <Button
            color="inherit"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              textTransform: 'none',
              borderColor: 'rgba(148, 163, 184, 0.28)',
              '&:hover': {
                backgroundColor: 'rgba(30, 41, 59, 0.72)',
              },
            }}
          >
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
