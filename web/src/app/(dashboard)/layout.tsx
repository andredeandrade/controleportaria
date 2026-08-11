'use client'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import type { ReactNode } from 'react'
import { useState } from 'react'

import SideBar from '@/components/sideBar'
import TopBar from '@/components/topBar'

const drawerWidth = 280

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar
        drawerWidth={drawerWidth}
        onOpenMenu={() => {
          setMobileOpen(true)
        }}
      />

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => {
            setMobileOpen(false)
          }}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              backgroundColor: '#060e20',
            },
          }}
        >
          <SideBar
            onItemClick={() => {
              setMobileOpen(false)
            }}
          />
        </Drawer>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SideBar />
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          px: { xs: 2, md: 4 },
          py: 3,
          minHeight: '100vh',
        }}
      >
        <Toolbar sx={{ minHeight: 56 }} />
        {children}
      </Box>
    </Box>
  )
}
