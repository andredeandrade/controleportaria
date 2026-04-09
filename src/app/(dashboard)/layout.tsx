'use client';

import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

const drawerWidth = 264;

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    subtitle: 'Resumo operacional da portaria',
    icon: <DashboardRoundedIcon />,
  },
  {
    label: 'Moradores',
    href: '/moradores',
    subtitle: 'Cadastros e permissões internas',
    icon: <ApartmentRoundedIcon />,
  },
  {
    label: 'Visitantes',
    href: '/visitantes',
    subtitle: 'Solicitações e autorizações de entrada',
    icon: <BadgeOutlinedIcon />,
  },
];

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname ?? '';
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentPage =
    menuItems.find(({ href }) => currentPath === href || currentPath.startsWith(`${href}/`)) ?? {
      label: 'Painel da Portaria',
      subtitle: 'Área interna do sistema',
    };

  const handleNavigate = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <PersonOutlineRoundedIcon />
          </Avatar>
          <Box>
            <Typography fontWeight={700}>Controle Portaria</Typography>
            <Typography variant="body2" color="rgba(226, 232, 240, 0.72)">
              Menu principal
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'rgba(148, 163, 184, 0.16)' }} />

      <List sx={{ px: 1.5, py: 2 }}>
        {menuItems.map((item) => {
          const selected = currentPath === item.href || currentPath.startsWith(`${item.href}/`);

          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={selected}
                onClick={() => {
                  handleNavigate(item.href);
                }}
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
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar sx={{ minHeight: 72 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setMobileOpen((prev) => !prev);
            }}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              {currentPage.label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentPage.subtitle}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip
              label="Autenticado"
              color="primary"
              variant="outlined"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            />
            <Button
              color="inherit"
              startIcon={<LogoutRoundedIcon />}
              onClick={() => {
                handleNavigate('/');
              }}
              sx={{ textTransform: 'none' }}
            >
              Sair
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => {
            setMobileOpen(false);
          }}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              backgroundColor: '#081120',
              color: '#F8FAFC',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(148, 163, 184, 0.12)',
              backgroundColor: '#081120',
              color: '#F8FAFC',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          px: { xs: 2, md: 4 },
          py: 3,
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />
        {children}
      </Box>
    </Box>
  );
}
