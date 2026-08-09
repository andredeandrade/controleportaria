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

// Design tokens — sidebar usa a camada mais escura da hierarquia tonal
const sidebar = {
  bg: '#060e20',
  border: '#424754',
  itemText: '#dae2fd',
  itemTextMuted: '#c2c6d6',
  itemHover: 'rgba(173, 198, 255, 0.06)',
  itemActive: 'rgba(173, 198, 255, 0.12)',
  itemActiveBorder: '#adc6ff',
  childDot: '#8c909f',
  childDotActive: '#adc6ff',
}

type SideBarProps = {
  onItemClick?: () => void
}

export default function SideBar({ onItemClick }: SideBarProps) {
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
    color: sidebar.itemText,
    minHeight: 40,
    px: '10px',
    '& .MuiListItemIcon-root': { minWidth: 36, color: 'inherit' },
    '&:hover': { backgroundColor: sidebar.itemHover },
    '&.Mui-selected': {
      backgroundColor: sidebar.itemActive,
      color: sidebar.itemActiveBorder,
      borderLeft: `2px solid ${sidebar.itemActiveBorder}`,
      pl: '8px',
      '& .MuiListItemIcon-root': { color: sidebar.itemActiveBorder },
    },
    '&.Mui-selected:hover': { backgroundColor: 'rgba(173, 198, 255, 0.18)' },
  }

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: 280 },
        minWidth: { md: 280 },
        backgroundColor: sidebar.bg,
        borderRight: { md: `1px solid ${sidebar.border}` },
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SideBarUserInfo />

      <Divider sx={{ borderColor: sidebar.border, mx: 2 }} />

      {/* Nav principal — cresce para empurrar ações ao rodapé */}
      <List
        sx={{
          px: '8px',
          py: '12px',
          flexGrow: 1,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: `${sidebar.border} transparent`,
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: sidebar.border, borderRadius: 4 },
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
                        color: childSelected ? sidebar.itemActiveBorder : sidebar.itemTextMuted,
                        fontSize: '0.8125rem',
                        '& .MuiListItemIcon-root': { minWidth: 24, color: 'inherit' },
                        '&.Mui-selected': {
                          backgroundColor: sidebar.itemActive,
                          borderLeft: `2px solid ${sidebar.itemActiveBorder}`,
                          pl: '8px',
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: '50%',
                            backgroundColor: childSelected
                              ? sidebar.childDotActive
                              : sidebar.childDot,
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
      <Divider sx={{ borderColor: sidebar.border, mx: 2 }} />
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
              color: isLoggingOut ? sidebar.itemTextMuted : sidebar.itemText,
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
