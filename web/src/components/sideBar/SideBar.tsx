'use client'

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useSidebarRoutes } from '@/hooks/useSidebarRoutes'
import { logout } from '@/services/auth/service'
import { useState } from 'react'
import SideBarUserInfo from './components/SideBarUserInfo'

type SideBarProps = {
  onItemClick?: () => void
}

export default function SideBar({ onItemClick }: SideBarProps) {
  const itemHoverBg = 'rgba(173, 198, 255, 0.06)'
  const itemSelectedBg = 'rgba(0, 76, 110, 1)'
  const itemSelectedHoverBg = 'rgba(0, 76, 110, 0.92)'
  const childSelectedBg = 'rgba(173, 198, 255, 0.12)'
  const scrollBarColor = '#334155 transparent'

  const pathname = usePathname() ?? ''
  const router = useRouter()
  const menuItems = useSidebarRoutes()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push('/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const itemButtonSx = {
    borderRadius: '8px',
    color: '#CBD5E1',
    minHeight: 40,
    px: '10px',
    '& .MuiListItemIcon-root': { minWidth: 36, color: 'inherit' },
    '&:hover': { backgroundColor: itemHoverBg },
    '&.Mui-selected': {
      backgroundColor: itemSelectedBg,
      color: '#89CEFF',
      '& .MuiListItemIcon-root': { color: '#89CEFF' },
    },
    '&.Mui-selected:hover': {
      backgroundColor: itemSelectedHoverBg,
    },
  }

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: 256 },
        minWidth: { md: 256 },
        backgroundColor: '#0B1326',
        borderRight: { md: '1px solid' },
        borderColor: '#334155',
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SideBarUserInfo />

      <Divider sx={{ borderColor: 'rgba(51,65,85,0.5)', mx: 2 }} />

      {/* Nav principal — cresce para empurrar ações ao rodapé */}
      <List
        sx={{
          px: '8px',
          py: '12px',
          flexGrow: 1,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: scrollBarColor,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#334155', borderRadius: 4 },
        }}
      >
        {menuItems.map((item) => {
          const hasActiveChild = item.children?.some((child) => pathname === child.href) ?? false
          const selected = item.href
            ? pathname === item.href || pathname.startsWith(`${item.href}/`)
            : hasActiveChild
          const Icon = item.IconComponent

          return (
            <Box key={item.label} sx={{ mb: '2px' }}>
              <ListItem disablePadding>
                {item.href ? (
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    selected={selected}
                    onClick={onItemClick}
                    sx={itemButtonSx}
                  >
                    <ListItemIcon>{Icon ? <Icon fontSize="small" /> : null}</ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: { variant: 'body2', fontWeight: selected ? 600 : 400 },
                      }}
                    />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    disableRipple
                    selected={selected}
                    sx={{ ...itemButtonSx, cursor: 'default' }}
                  >
                    <ListItemIcon>{Icon ? <Icon fontSize="small" /> : null}</ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: { variant: 'body2', fontWeight: selected ? 600 : 400 },
                      }}
                    />
                  </ListItemButton>
                )}
              </ListItem>

              {item.children?.map((child) => {
                const childSelected =
                  pathname === child.href || pathname.startsWith(`${child.href}/`)

                return (
                  <ListItem key={child.href} disablePadding sx={{ mt: '2px' }}>
                    <ListItemButton
                      component={Link}
                      href={child.href}
                      selected={childSelected}
                      onClick={onItemClick}
                      sx={{
                        ...itemButtonSx,
                        ml: '20px',
                        color: childSelected ? '#89CEFF' : '#94A3B8',
                        fontSize: '0.8125rem',
                        '& .MuiListItemIcon-root': { minWidth: 24, color: 'inherit' },
                        '&.Mui-selected': {
                          backgroundColor: childSelectedBg,
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            backgroundColor: childSelected ? '#89CEFF' : '#94A3B8',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={child.label}
                        slotProps={{
                          primary: {
                            variant: 'body2',
                            fontSize: '0.8125rem',
                            fontWeight: childSelected ? 600 : 400,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </Box>
          )
        })}
      </List>

      {/* Ações de rodapé */}
      <Divider sx={{ borderColor: 'rgba(51,65,85,0.5)', mx: 2 }} />
      <List sx={{ px: '8px', py: '8px' }}>
        <ListItem disablePadding sx={{ mb: '2px' }}>
          <ListItemButton component={Link} href="/configuracoes" sx={itemButtonSx}>
            <ListItemIcon>
              <SettingsRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Configurações" slotProps={{ primary: { variant: 'body2' } }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            disabled={isLoggingOut}
            sx={{
              ...itemButtonSx,
              color: isLoggingOut ? '#94A3B8' : '#EF4444',
            }}
          >
            <ListItemIcon>
              {isLoggingOut ? (
                <CircularProgress size={16} sx={{ color: 'inherit' }} />
              ) : (
                <LogoutRoundedIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={isLoggingOut ? 'Saindo...' : 'Sair'}
              slotProps={{ primary: { variant: 'body2' } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
