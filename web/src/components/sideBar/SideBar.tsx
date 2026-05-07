'use client'

import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidebarRoutes } from '@/hooks/useSidebarRoutes'

type SideBarProps = {
  onItemClick?: () => void
}

export default function SideBar({ onItemClick }: SideBarProps) {
  const pathname = usePathname() ?? ''
  const menuItems = useSidebarRoutes()

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: 280 },
        minWidth: { md: 280 },
        backgroundColor: '#081120',
        color: '#F8FAFC',
        borderRight: { md: '1px solid rgba(148, 163, 184, 0.16)' },
        minHeight: { xs: 'auto', md: '100vh' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              bgcolor: 'rgba(148, 163, 184, 0.22)',
              color: '#E2E8F0',
            }}
          >
            <PersonOutlineRoundedIcon />
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={700} noWrap>
              André Andrade
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(226, 232, 240, 0.72)' }} noWrap>
              Segurança
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.16)' }} />

      <List sx={{ px: 1.5, py: 2 }}>
        {menuItems.map((item) => {
          const hasActiveChild = item.children?.some((child) => pathname === child.href) ?? false
          const selected = item.href
            ? pathname === item.href || pathname.startsWith(`${item.href}/`)
            : hasActiveChild
          const Icon = item.IconComponent

          return (
            <Box key={item.label} sx={{ mb: 0.5 }}>
              <ListItem disablePadding>
                {item.href ? (
                  <ListItemButton
                    component={Link}
                    href={item.href}
                    selected={selected}
                    onClick={onItemClick}
                    sx={{
                      borderRadius: 2,
                      color: 'rgba(248, 250, 252, 0.92)',
                      '& .MuiListItemIcon-root': {
                        minWidth: 40,
                        color: 'inherit',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(51, 65, 85, 0.52)',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(51, 65, 85, 0.66)',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(15, 23, 42, 0.72)',
                      },
                    }}
                  >
                    <ListItemIcon>{Icon ? <Icon /> : null}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    disableRipple
                    selected={selected}
                    sx={{
                      borderRadius: 2,
                      color: 'rgba(248, 250, 252, 0.92)',
                      cursor: 'default',
                      '& .MuiListItemIcon-root': {
                        minWidth: 40,
                        color: 'inherit',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(51, 65, 85, 0.4)',
                      },
                    }}
                  >
                    <ListItemIcon>{Icon ? <Icon /> : null}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                )}
              </ListItem>

              {item.children?.map((child) => {
                const childSelected =
                  pathname === child.href || pathname.startsWith(`${child.href}/`)

                return (
                  <ListItem key={child.href} disablePadding sx={{ mt: 0.5 }}>
                    <ListItemButton
                      component={Link}
                      href={child.href}
                      selected={childSelected}
                      onClick={onItemClick}
                      sx={{
                        ml: 1.5,
                        borderRadius: 2,
                        color: 'rgba(226, 232, 240, 0.84)',
                        '& .MuiListItemIcon-root': {
                          minWidth: 28,
                          color: 'inherit',
                        },
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(51, 65, 85, 0.52)',
                        },
                        '&.Mui-selected:hover': {
                          backgroundColor: 'rgba(51, 65, 85, 0.66)',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(15, 23, 42, 0.72)',
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: childSelected
                              ? 'primary.main'
                              : 'rgba(148, 163, 184, 0.72)',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </Box>
          )
        })}
      </List>
    </Box>
  )
}
